#!/usr/bin/env python3
"""
Master orchestration script for analyses under `analysis/`.

Responsibilities (initial version):
- Import the major Python packages used across the analyses so missing imports surface early.
- Provide helper functions to:
  - execute Jupyter notebooks (in-process) and Rmarkdown files (via Rscript/rmarkdown::render)
  - run modules while capturing stdout/stderr to a timestamped log file
  - backup and clear the `outputs/` folder so we can measure runtime "without" cached .pkl artifacts
  - measure runtime with and without existing .pkl cache files
- Define orchestration functions for the prioritized analyses (task_space and group_advantage).

Notes:
- This script intentionally does NOT auto-run heavy analyses on import. Use the CLI at the bottom to
  invoke only the steps you want (or import functions programmatically).
- Before running any step that clears `outputs/`, the script creates a backup under
  `.analysis_master_backups/` so you can restore outputs if desired.

Usage examples:
  # list available steps
  python analysis/run_master.py --list

  # run only the task space pipeline
  python analysis/run_master.py --steps task_space

  # run group advantage pipeline end-to-end
  python analysis/run_master.py --steps group_advantage

  # run both
  python analysis/run_master.py --steps task_space,group_advantage

"""
from __future__ import annotations

import sys
import os
import time
import datetime
import shutil
import subprocess
import logging
import json
import pickle
import pandas as pd
from pathlib import Path
from typing import Callable, Iterable, List, Optional, Dict, Any
ROOT = Path(__file__).resolve().parent.parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))
from analysis.analysis_task_space.generate_mcgrath import generate_mcgrath

# Data science imports (import errors are logged but don't crash immediately)
_missing_packages = []
try:
    import pandas as pd
except Exception as e:
    _missing_packages.append(('pandas', str(e)))
try:
    import numpy as np
except Exception as e:
    _missing_packages.append(('numpy', str(e)))
try:
    import scipy
except Exception as e:
    _missing_packages.append(('scipy', str(e)))
try:
    import matplotlib
    import matplotlib.pyplot as plt
except Exception as e:
    _missing_packages.append(('matplotlib', str(e)))
try:
    import seaborn as sns
except Exception as e:
    _missing_packages.append(('seaborn', str(e)))
try:
    import sklearn
except Exception as e:
    _missing_packages.append(('scikit-learn', str(e)))
try:
    import statsmodels
except Exception as e:
    _missing_packages.append(('statsmodels', str(e)))
try:
    import tensorflow as tf
except Exception as e:
    # TensorFlow is optional for some analyses; keep going
    _missing_packages.append(('tensorflow', str(e)))
try:
    import optuna
except Exception as e:
    _missing_packages.append(('optuna', str(e)))
try:
    import shap
except Exception as e:
    _missing_packages.append(('shap', str(e)))
try:
    from tqdm import tqdm
except Exception as e:
    _missing_packages.append(('tqdm', str(e)))

# Notebook execution
try:
    import nbformat
    from nbconvert.preprocessors import ExecutePreprocessor
except Exception as e:
    _missing_packages.append(('nbconvert/nbformat', str(e)))

ROOT = Path(__file__).resolve().parent.parent
ANALYSIS_DIR = Path(__file__).resolve().parent
OUTPUTS_DIR = ROOT / 'outputs'
BACKUP_ROOT = ANALYSIS_DIR / '.analysis_master_backups'
BACKUP_ROOT = ROOT / '.analysis_master_backups'

# Ensure outputs/logs exist at repo root
OUTPUTS_DIR.mkdir(parents=True, exist_ok=True)
LOG_DIR = OUTPUTS_DIR / 'logs'
LOG_DIR.mkdir(parents=True, exist_ok=True)

REQUIRED_OUTPUT_SUBDIRS = [
    OUTPUTS_DIR / 'processed_data',
    OUTPUTS_DIR / 'figures',
    OUTPUTS_DIR / 'cached_pkls',
    LOG_DIR,
]

LEGACY_CACHED_PKL_FILES = [
    'train_test_data.pkl',
    'iv_lists.pkl',
    'enet_noise_robustness.pkl',
    'enet_noise_robustness_r2_results.pkl',
    'enet_noise_robustness_rmse_results.pkl',
]


def ensure_output_dirs(*extra: Path) -> None:
    """Ensure required output subdirectories exist before running pipelines."""
    for path in REQUIRED_OUTPUT_SUBDIRS:
        path.mkdir(parents=True, exist_ok=True)
    for path in extra:
        Path(path).mkdir(parents=True, exist_ok=True)
    relocate_legacy_cached_pkls()


def relocate_legacy_cached_pkls() -> None:
    """Move legacy cached PKL files into outputs/cached_pkls if they were written to outputs/."""
    cache_dir = OUTPUTS_DIR / 'cached_pkls'
    moved: list[str] = []
    for filename in LEGACY_CACHED_PKL_FILES:
        src = OUTPUTS_DIR / filename
        if not src.exists():
            continue

        dest = cache_dir / filename
        try:
            dest.parent.mkdir(parents=True, exist_ok=True)
            if dest.exists():
                logger.info('Cached file already exists at %s; removing stray %s', dest, src)
                src.unlink()
            else:
                shutil.move(src, dest)
                moved.append(filename)
        except Exception as exc:
            logger.warning('Failed to relocate legacy cached PKL %s -> %s: %s', src, dest, exc)

    if moved:
        logger.info('Moved legacy cached PKL files into outputs/cached_pkls: %s', ', '.join(moved))


def sync_task_map_visual_labels() -> None:
    """Use the curated McGrath sector labels from data/ into outputs/ for plotting."""
    source_path = ROOT / 'data' / 'hand_labeled_task_mcgrath_sectors.csv'
    if not source_path.exists():
        raise FileNotFoundError(
            f"Required label file not found: {source_path}. Add it to the repo before running the pipeline."
        )

def sync_task_map_dataset() -> None:
    """Mirror the generated task_map.csv into data/ for downstream R code."""
    generated = OUTPUTS_DIR / 'processed_data' / 'task_map.csv'
    if not generated.exists():
        raise FileNotFoundError(
            'Expected task map at %s before syncing to data/' % generated
        )

    target = ROOT / 'data' / 'task_map.csv'
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(generated, target)
    logger.info('Copied %s -> %s', generated, target)


def assert_exists(description: str, *paths: Path) -> None:
    missing = [p for p in paths if not p.exists()]
    if missing:
        raise FileNotFoundError(
            f"Missing expected {description}: {', '.join(str(p) for p in missing)}"
        )

# Make repo root importable so we can import analysis.* modules when running the
# script from the repository root or elsewhere. This avoids ModuleNotFoundError
# like "No module named 'analysis'" when dynamically importing analysis
# submodules (e.g., generate_mcgrath).
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

# global seed to use when running analyses (wherever possible)
SEED = 19104

# configure logging
timestamp = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
log_file = LOG_DIR / f'master_run_{timestamp}.log'
logger = logging.getLogger('analysis_master')
logger.setLevel(logging.DEBUG)
fmt = logging.Formatter('%(asctime)s %(levelname)s %(message)s')
fh = logging.FileHandler(log_file)
fh.setLevel(logging.DEBUG)
fh.setFormatter(fmt)
ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.INFO)
ch.setFormatter(fmt)
logger.addHandler(fh)
logger.addHandler(ch)

logger.info('Starting analysis master script')
logger.info('Using ANALYSIS_SEED=%s (will also set PYTHONHASHSEED for subprocesses)', SEED)
if _missing_packages:
    # These packages are optional for some analyses. Log at INFO with an install hint
    logger.info(
        'Some optional packages could not be imported at start (they are optional): %s. '
        'If you want to enable full functionality, install them in your Python environment, e.g. '
        "python3 -m pip install pandas numpy scipy matplotlib seaborn scikit-learn statsmodels nbformat nbconvert tqdm optuna",
        _missing_packages,
    )


# Try to locate Rscript on PATH or common install locations
def find_rscript() -> Optional[str]:
    # check PATH
    from shutil import which
    p = which('Rscript')
    if p:
        return p
    # common Homebrew /usr locations on macOS
    candidates = ['/opt/homebrew/bin/Rscript', '/usr/local/bin/Rscript', '/usr/bin/Rscript']
    for c in candidates:
        if Path(c).exists():
            return c
    return None


# Utility: run a shell command and stream output to logger
def run_command(cmd: List[str], cwd: Optional[Path] = None, env: Optional[Dict[str, str]] = None, timeout: Optional[int] = None) -> int:
    """Run a shell command while ensuring the ANALYSIS_SEED and PYTHONHASHSEED are set in the environment.

    This helps make Rscript/subprocess and Python notebook executions reproducible where possible.
    """
    logger.info('Running command: %s (cwd=%s)', ' '.join(cmd), str(cwd) if cwd else None)
    # Merge provided env with the current OS environment and enforce seed variables
    new_env = os.environ.copy()
    if env:
        new_env.update(env)
    # Ensure the analysis seed and python hash seed are present
    new_env.setdefault('ANALYSIS_SEED', str(SEED))
    new_env.setdefault('PYTHONHASHSEED', str(SEED))
    process = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, cwd=cwd, env=new_env, text=True)
    try:
        for line in process.stdout:
            logger.info(line.rstrip())
        process.wait(timeout=timeout)
    except subprocess.TimeoutExpired:
        process.kill()
        logger.error('Command timed out: %s', cmd)
        return 1
    return process.returncode


# Execute a Jupyter notebook in place and capture outputs
def execute_notebook(nb_path: Path, timeout: int = 600, kernel_name: Optional[str] = None) -> None:
    logger.info('Executing notebook %s', nb_path)
    nb = nbformat.read(str(nb_path), as_version=4)
    if not kernel_name:
        kernel_name = nb.metadata.get('kernelspec', {}).get('name', 'python3')
    # Prepend a small seeding cell so notebook kernels initialize deterministic seeds where possible
    try:
        from nbformat.v4 import new_code_cell
        seed_cell = new_code_cell("""
import os, random
import numpy as np
seed = int(os.getenv('ANALYSIS_SEED', '{}'))
print(f'Using ANALYSIS_SEED={seed}')
random.seed(seed)
np.random.seed(seed)
try:
    import tensorflow as tf
    tf.random.set_seed(seed)
except Exception:
    pass
""".format(SEED))
        # Only prepend if first cell doesn't already set ANALYSIS_SEED
        if not nb.cells or 'ANALYSIS_SEED' not in ''.join(nb.cells[0].get('source','')):
            nb.cells.insert(0, seed_cell)
    except Exception:
        logger.debug('Could not insert seed cell into notebook; continuing without injecting seed')
    # Import ExecutePreprocessor lazily so we can provide a clearer error message
    # when nbconvert/nbformat are not available in the environment.
    try:
        from nbconvert.preprocessors import ExecutePreprocessor
    except Exception as e:
        logger.error('nbconvert/nbformat is required to execute notebooks: %s', e)
        raise RuntimeError('Install nbformat and nbconvert in your Python environment to execute notebooks (e.g. pip install nbformat nbconvert)')

    ep = ExecutePreprocessor(timeout=timeout, kernel_name=kernel_name)
    ep.allow_errors = False
    ep.preprocess(nb, {'metadata': {'path': str(nb_path.parent)}})
    # persist the in-memory notebook back to the original path only (no executed_* artefacts)
    nbformat.write(nb, str(nb_path))
    logger.info('Finished executing notebook; updated %s in place', nb_path)


# Render an Rmarkdown file via Rscript calling rmarkdown::render
def render_rmarkdown(rmd_path: Path, output_dir: Optional[Path] = None) -> int:
    logger.info('Rendering RMarkdown %s', rmd_path)
    # Build the R expression safely to avoid unterminated f-strings and quote issues
    # Ensure the R process uses the analysis seed when rendering
    expr = (
        "seed_val <- as.integer(Sys.getenv('ANALYSIS_SEED', '" + str(SEED) + "')); "
        "set.seed(seed_val); message(sprintf('Using ANALYSIS_SEED=%d', seed_val)); "
        f"rmarkdown::render('{rmd_path.as_posix()}'"
    )
    if output_dir:
        expr += f", output_dir = '{str(output_dir)}'"
    expr += ")"
    # Use find_rscript (defined at module level) to locate the executable
    rscript = find_rscript()
    if not rscript:
        logger.error('Rscript not found on PATH. Please install R and ensure Rscript is available. '
                     'On macOS with Homebrew: brew install --cask r or brew install r')
        raise RuntimeError('Rscript not found; cannot render RMarkdown')

    cmd = [rscript, '-e', expr]
    return run_command(cmd, cwd=rmd_path.parent)


# Run an R script (.R) via Rscript; returns the subprocess exit code
def run_r_script(r_path: Path, cwd: Optional[Path] = None) -> None:
    logger.info('Running R script %s', r_path)
    rscript = find_rscript()
    if not rscript:
        logger.error('Rscript not found on PATH. Cannot run R script %s', r_path)
        raise RuntimeError('Rscript not found; cannot run R script')
        
    expr = (
        "seed_val <- as.integer(Sys.getenv('ANALYSIS_SEED', '" + str(SEED) + "')); "
        "set.seed(seed_val); message(sprintf('Using ANALYSIS_SEED=%d', seed_val)); "
        f"source('{r_path.name}')"
    )
    rc = run_command([rscript, '-e', expr], cwd=(cwd or r_path.parent))
    if rc != 0:
        raise RuntimeError(f'R script failed (exit {rc}): {r_path}')
        return None

# Ensure a purl'd .R script exists for an Rmd: if missing, try to generate it with knitr::purl
def ensure_r_script(rmd_path: Path) -> Path:
    r_path = rmd_path.with_suffix('.R')
    if r_path.exists():
        return r_path
    # try to generate via knitr::purl using Rscript
    rscript = find_rscript()
    if not rscript:
        logger.error('Rscript not found; cannot generate .R from %s', rmd_path)
        raise RuntimeError('Rscript not found; cannot purl Rmd')
    expr = f"knitr::purl('{rmd_path.name}', output = '{r_path.name}')"
    rc = run_command([rscript, '-e', expr], cwd=rmd_path.parent)
    if rc != 0:
        logger.error('Failed to purl %s -> %s (exit %s)', rmd_path, r_path, rc)
        raise RuntimeError(f'Failed to purl {rmd_path}')
    if not r_path.exists():
        logger.error('Expected generated R script not found: %s', r_path)
        raise RuntimeError('Generated R script not found after purl')
    logger.info('Generated R script %s from %s', r_path, rmd_path)
    return r_path


# Backup current outputs folder before destructive actions
def backup_outputs() -> Path:
    if not OUTPUTS_DIR.exists():
        logger.info('No outputs/ folder to backup')
        return None
    ts = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
    dest = BACKUP_ROOT / f'outputs_backup_{ts}'
    dest.parent.mkdir(parents=True, exist_ok=True)
    logger.info('Backing up %s -> %s', OUTPUTS_DIR, dest)
    shutil.copytree(OUTPUTS_DIR, dest)
    return dest


# Clear outputs directory (delete contents but leave directory)
def clear_outputs() -> None:
    if not OUTPUTS_DIR.exists():
        logger.info('outputs/ folder does not exist; nothing to clear')
        return
    for child in OUTPUTS_DIR.iterdir():
        try:
            if child.is_dir():
                shutil.rmtree(child)
            else:
                child.unlink()
        except Exception as e:
            logger.exception('Failed to remove %s: %s', child, e)
    logger.info('Cleared outputs/ folder')


# Timing wrapper: time a callable and log its stdout/stderr automatically (callable should perform work)
def time_callable(name: str, func: Callable[[], Any]) -> Dict[str, Any]:
    logger.info('Timing: %s', name)
    start = time.time()
    try:
        res = func()
        elapsed = time.time() - start
        logger.info('Completed %s in %.3f sec', name, elapsed)
        return {'name': name, 'elapsed_sec': elapsed, 'result': res}
    except Exception:
        elapsed = time.time() - start
        logger.exception('Error during %s after %.3f sec', name, elapsed)
        raise
    
# Time with and without pickle cache: given a list of pkl paths and a run function that produces them.
def time_with_and_without_pkls(name: str, pkl_paths: Iterable[Path], run_func: Callable[[], Any]) -> Dict[str, Any]:
    pkl_paths = [Path(p) for p in pkl_paths]
    tl: Dict[str, Any] = {'name': name}
    # time loading (if present)
    load_times = {}
    for p in pkl_paths:
        if p.exists():
            t0 = time.time()
            try:
                with p.open('rb') as f:
                    _ = pickle.load(f)
                load_times[str(p)] = time.time() - t0
                logger.info('Loaded cache %s in %.3f sec', p, load_times[str(p)])
            except Exception as e:
                load_times[str(p)] = None
                logger.exception('Error loading %s: %s', p, e)
        else:
            load_times[str(p)] = None
    tl['load_times'] = load_times

    # backup outputs then clear
    backup = backup_outputs()
    clear_outputs()

    # run the function (from scratch) and time it
    tstart = time.time()
    try:
        run_func()
        gen_time = time.time() - tstart
        logger.info('Generated results for %s in %.3f sec (from scratch)', name, gen_time)
        tl['gen_time_sec'] = gen_time
    except Exception:
        gen_time = time.time() - tstart
        logger.exception('Error generating results for %s after %.3f sec', name, gen_time)
        tl['gen_time_sec'] = gen_time
        tl['error'] = True

    # restore outputs backup to avoid destructive side-effects for other steps
    if backup is not None:
        logger.info('Restoring outputs from backup %s', backup)
        # clear current outputs then copy backup back
        clear_outputs()
        shutil.copytree(backup, OUTPUTS_DIR, dirs_exist_ok=True)
        logger.info('Restored outputs from backup')

    return tl


# -----------------------------
# Orchestration functions for prioritized analyses
# -----------------------------

# Task space pipeline
def run_task_space_pipeline():
    """Orchestrate the task space analysis:
    1) generate task map from raw annotations (Rmarkdown)
    2) plot/clean visuals (Rmarkdown)
    """
    logger.info('Running task_space pipeline')
    ensure_output_dirs()
    # paths
    rmd_generate = ANALYSIS_DIR / 'analysis_task_space' / 'generate_task_map_from_raw.Rmd'
    rmd_visuals = ANALYSIS_DIR / 'analysis_task_space' / 'clean_task_map_visuals.Rmd'

    results = []

    if rmd_generate.exists() or (rmd_generate.with_suffix('.R')).exists():
        # Prefer a purl'd .R script; if Rmd missing but .R exists, run it directly
        if rmd_generate.exists():
            r_script_generate = ensure_r_script(rmd_generate)
        else:
            r_script_generate = rmd_generate.with_suffix('.R')
        results.append(time_callable('task_space.generate_map', lambda: run_r_script(r_script_generate)))
        if results and not results[-1].get('error'):
            sync_task_map_dataset()
        # Generate the McGrath categorical mapping as part of task-space preprocessing
        try:
            task_map_path = OUTPUTS_DIR / 'processed_data' / 'task_map.csv'
            out_path = OUTPUTS_DIR / 'processed_data' / 'task_map_with_mcgrath_categories_appended.csv'
            def _gen_mcgrath_ts():
                df = pd.read_csv(task_map_path)
                mc = generate_mcgrath(df)
                mc.to_csv(out_path, index=False)
            results.append(time_callable('task_space.generate_mcgrath', _gen_mcgrath_ts))
            sync_task_map_visual_labels()
        except Exception as e:
            logger.exception('Failed to generate mcgrath categories in task_space: %s', e)
    else:
        logger.warning('Missing %s and %s; skipping', rmd_generate, rmd_generate.with_suffix('.R'))

    if rmd_visuals.exists() or (rmd_visuals.with_suffix('.R')).exists():
        sync_task_map_visual_labels()
        if rmd_visuals.exists():
            r_script_visuals = ensure_r_script(rmd_visuals)
        else:
            r_script_visuals = rmd_visuals.with_suffix('.R')
        results.append(time_callable('task_space.plot_visuals', lambda: run_r_script(r_script_visuals)))
    else:
        logger.warning('Missing %s and %s; skipping', rmd_visuals, rmd_visuals.with_suffix('.R'))

    return results


# Group advantage pipeline
def run_group_advantage_pipeline():
    """Orchestrate group advantage analysis:
    1) raw data cleaning (Rmd)
    2) run models notebook(s)
    3) run viz notebook(s)
    """
    logger.info('Running group_advantage pipeline')
    ensure_output_dirs()
    rmd_clean = ANALYSIS_DIR / 'analysis_group_advantage' / 'raw_data_cleaning.rmd'
    nb_models = ANALYSIS_DIR / 'analysis_group_advantage' / 'models.ipynb'
    nb_viz = ANALYSIS_DIR / 'analysis_group_advantage' / 'viz.ipynb'
    nb_demographics = ANALYSIS_DIR / 'analysis_group_advantage' / 'demographics_viz.ipynb'

    results = []

    if rmd_clean.exists() or (rmd_clean.with_suffix('.R')).exists():
        # If Rmd exists, purl to R; otherwise run the existing R script directly
        r_script_clean = ensure_r_script(rmd_clean) if rmd_clean.exists() else rmd_clean.with_suffix('.R')
        # Ensure mcgrath mapping exists before running raw data cleaning; task_space is the source of truth
        try:
            task_map_path = OUTPUTS_DIR / 'processed_data' / 'task_map.csv'
            out_path = OUTPUTS_DIR / 'processed_data' / 'task_map_with_mcgrath_categories_appended.csv'
            def _gen_mcgrath_ga():
                df = pd.read_csv(task_map_path)
                mc = generate_mcgrath(df)
                mc.to_csv(out_path, index=False)
            results.append(time_callable('group_advantage.ensure_mcgrath_before_clean', _gen_mcgrath_ga))
        except Exception as e:
            logger.exception('Failed to ensure mcgrath categories before cleaning: %s', e)
        # Now run raw data cleaning (which may expect the mcgrath CSV part-way through)
        # Run from the script's directory so that '../outputs' within the R script resolves to the repo outputs/
        results.append(time_callable('group_advantage.raw_data_cleaning', lambda: run_r_script(r_script_clean, cwd=r_script_clean.parent)))
        if results and not results[-1].get('error'):
            assert_exists(
                'group advantage condition-level CSVs',
                OUTPUTS_DIR / 'processed_data' / 'condition_level_group_advantage.csv',
                OUTPUTS_DIR / 'processed_data' / 'condition_level_group_advantage_with_ivs.csv',
                OUTPUTS_DIR / 'processed_data' / 'condition_level_group_advantage_with_ivs_and_categories.csv',
            )
    else:
        logger.warning('Missing %s and %s; skipping', rmd_clean, rmd_clean.with_suffix('.R'))

    if nb_models.exists():
        results.append(time_callable('group_advantage.models', lambda: execute_notebook(nb_models, timeout=3600)))
    else:
        logger.warning('Missing %s; skipping', nb_models)

    if nb_viz.exists():
        results.append(time_callable('group_advantage.viz', lambda: execute_notebook(nb_viz, timeout=3600)))
    else:
        logger.warning('Missing %s; skipping', nb_viz)

    # demographics_viz
    if nb_demographics.exists():
        results.append(time_callable('group_advantage.demographics_viz', lambda: execute_notebook(nb_demographics, timeout=1800)))
    else:
        logger.warning('Missing %s; skipping', nb_demographics)

    return results


# -----------------------------
# CLI: select which steps to run
# -----------------------------
if __name__ == '__main__':
    import argparse

    parser = argparse.ArgumentParser(description='Master orchestrator for analyses in analysis/')
    parser.add_argument('--steps', type=str, default='', help='Comma-separated steps: task_space,group_advantage')
    parser.add_argument('--list', action='store_true', help='List available steps')
    parser.add_argument('--with-pkl', action='store_true', help='For steps that support it, measure load-time from .pkl and generate-time from scratch')
    args = parser.parse_args()

    available = ['task_space', 'group_advantage']
    if args.list:
        print('Available steps:')
        for s in available:
            print(' -', s)
        sys.exit(0)

    selected = [s.strip() for s in args.steps.split(',') if s.strip()]
    if not selected:
        logger.info('No steps selected; use --list to see available steps')
        sys.exit(0)

    final_results = {}
    for step in selected:
        if step == 'task_space':
            final_results['task_space'] = run_task_space_pipeline()
        elif step == 'group_advantage':
            final_results['group_advantage'] = run_group_advantage_pipeline()
        else:
            logger.warning('Unknown step: %s', step)

    # Save a JSON summary of timings
    summary_path = LOG_DIR / f'master_summary_{timestamp}.json'
    with summary_path.open('w') as f:
        json.dump(final_results, f, default=str, indent=2)
    logger.info('Wrote summary to %s', summary_path)
    logger.info('Done')
