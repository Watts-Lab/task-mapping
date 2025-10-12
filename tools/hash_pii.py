"""
Scan repository files for MTurk/Worker IDs (pattern: starts with 'A' and 12-13 alphanumerics) and replace them with HMAC-SHA256 hashed tokens.
Writes mapping files to .pii_hashes/ (ignored by git). Safe to run multiple times; it will reuse existing mappings.

Usage:
    python3 tools/hash_pii.py --root . --dry-run

This script will:
 - Walk files under the repo (excluding .git, .pii_hashes, and outputs/* if desired)
 - For text files, search for IDs matching regex r"A[0-9A-Za-z]{12,13}"
 - Replace with stable HMAC using a key stored in .pii_hashes/key.bin (generated if missing)
 - Save mapping in .pii_hashes/mapping.csv (original -> hash)
 - Print a summary of files changed

NOTE: This script modifies files in-place. Make a backup or run under git to review changes.
"""
import argparse
import hashlib
import hmac
import os
import json
import re
import csv
from pathlib import Path

# Match MTurk Worker IDs that start with 'A' and have at least 12 alnum chars.
# Some WorkerIds are longer than 13 chars, so allow up to 40 to be safe.
ID_RE = re.compile(r"\bA[0-9A-Za-z]{12,40}\b")

def load_or_create_key(key_path: Path) -> bytes:
    if key_path.exists():
        return key_path.read_bytes()
    key = os.urandom(32)
    key_path.parent.mkdir(parents=True, exist_ok=True)
    key_path.write_bytes(key)
    return key


def hmac_hash(key: bytes, value: str) -> str:
    # produce short stable hash to keep filenames readable
    h = hmac.new(key, value.encode('utf-8'), hashlib.sha256).hexdigest()
    return 'hk_' + h[:16]


def is_binary(file_path: Path) -> bool:
    try:
        with open(file_path, 'rb') as f:
            chunk = f.read(8000)
            if b"\0" in chunk:
                return True
    except Exception:
        return True
    return False


def scan_and_replace(root: Path, dry_run=True, exclude_dirs=None):
    if exclude_dirs is None:
        exclude_dirs = {'.git', '.pii_hashes'}
    # path to this script; do not modify the scanner itself
    try:
        this_script = Path(__file__).resolve()
    except Exception:
        this_script = None
    key_path = root / '.pii_hashes' / 'key.bin'
    mapping_path = root / '.pii_hashes' / 'mapping.csv'
    key = load_or_create_key(key_path)

    mapping = {}
    if mapping_path.exists():
        with mapping_path.open('r', newline='') as f:
            reader = csv.reader(f)
            for row in reader:
                if len(row) >= 2:
                    mapping[row[0]] = row[1]

    files_changed = []
    for dirpath, dirnames, filenames in os.walk(root):
        # skip excluded dirs
        parts = Path(dirpath).parts
        if any(p in exclude_dirs for p in parts):
            continue
        for name in filenames:
            fp = Path(dirpath) / name
            # skip mapping files and the scanner script itself
            if fp.match('*/.pii_hashes/*'):
                continue
            if this_script is not None and fp.resolve() == this_script:
                continue
            # Special handling for Jupyter notebooks: only touch code/markdown cell "source"
            if fp.suffix == '.ipynb':
                try:
                    nb_text = fp.read_text(encoding='utf-8')
                    nb = json.loads(nb_text)
                except Exception:
                    # unreadable notebook
                    continue
                rel = str(fp.relative_to(root))
                notebook_changed = False
                ids = set()
                for cell in nb.get('cells', []):
                    if cell.get('cell_type') in ('code', 'markdown'):
                        src = ''.join(cell.get('source', []))
                        found = set(ID_RE.findall(src))
                        if not found:
                            continue
                        ids |= found
                        new_src = src
                        for pid in found:
                            if pid not in mapping:
                                mapping[pid] = hmac_hash(key, pid)
                            new_src = new_src.replace(pid, mapping[pid])
                        if new_src != src:
                            # preserve source as list of lines with line endings
                            cell['source'] = new_src.splitlines(keepends=True)
                            notebook_changed = True
                if ids:
                    files_changed.append(rel)
                    if not dry_run and notebook_changed:
                        backup_dir = root / '.pii_hashes' / 'backups'
                        backup_dir.mkdir(parents=True, exist_ok=True)
                        backup_path = backup_dir / (rel.replace(os.sep, '__') + '.bak')
                        backup_path.write_text(nb_text, encoding='utf-8')
                        # write notebook back out
                        fp.write_text(json.dumps(nb, ensure_ascii=False, indent=1), encoding='utf-8')
                continue
            if is_binary(fp):
                continue
            try:
                text = fp.read_text(encoding='utf-8')
            except UnicodeDecodeError:
                try:
                    text = fp.read_text(encoding='latin-1')
                except Exception:
                    continue
            ids = set(ID_RE.findall(text))
            if not ids:
                continue
            new_text = text
            for pid in ids:
                if pid not in mapping:
                    mapping[pid] = hmac_hash(key, pid)
                new_text = new_text.replace(pid, mapping[pid])
            if new_text != text:
                rel = str(fp.relative_to(root))
                files_changed.append(rel)
                if not dry_run:
                    # backup original
                    backup_dir = root / '.pii_hashes' / 'backups'
                    backup_dir.mkdir(parents=True, exist_ok=True)
                    backup_path = backup_dir / (rel.replace(os.sep, '__') + '.bak')
                    backup_path.write_text(text, encoding='utf-8')
                    fp.write_text(new_text, encoding='utf-8')
    # write mapping
    if not dry_run:
        mapping_path.parent.mkdir(parents=True, exist_ok=True)
        with mapping_path.open('w', newline='') as f:
            writer = csv.writer(f)
            for k, v in sorted(mapping.items()):
                writer.writerow([k, v])
    return files_changed, mapping


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--root', default='.', help='Repository root')
    parser.add_argument('--dry-run', action='store_true', help='Do not write files, just report')
    args = parser.parse_args()
    root = Path(args.root).resolve()
    print(f"Scanning {root} (dry_run={args.dry_run}) for MTurk-like IDs...")
    changed, mapping = scan_and_replace(root, dry_run=args.dry_run)
    print(f"Found {len(mapping)} unique IDs; {len(changed)} files would be changed.")
    if len(changed) > 0:
        for f in changed[:200]:
            print(' -', f)
    if args.dry_run:
        print('Dry run; no files modified. To apply changes, re-run without --dry-run')
