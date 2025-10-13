"""
One-off utility to fix a mis-labeled task name caused by PII hashing.

Replaces occurrences of the hashed token 'hk_bdaf755327fff794' used in place of
the task name 'Advertisement' so that the full task name is 'Advertisement Writing'.

It updates files under data/ and outputs/processed_data/ in-place.
"""
from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

TARGETS = [
    ROOT / 'data',
    ROOT / 'outputs' / 'processed_data',
]

REPLACEMENTS = {
    'hk_bdaf755327fff794 Writing': 'Advertisement Writing',
    'hk_bdaf755327fff794 writing': 'Advertisement Writing',
    'hk_bdaf755327fff794  Writing': 'Advertisement Writing',
    'hk_bdaf755327fff794': 'Advertisement',  # fallback if token appears without suffix
}

ALLOWED_SUFFIXES = {'.csv', '.tsv', '.md', '.rmd', '.Rmd', '.txt'}


def process_file(path: Path) -> bool:
    try:
        text = path.read_text(encoding='utf-8', errors='ignore')
    except Exception:
        return False

    original = text
    for old, new in REPLACEMENTS.items():
        text = text.replace(old, new)

    if text != original:
        path.write_text(text, encoding='utf-8')
        return True
    return False


def main() -> int:
    changed = 0
    for base in TARGETS:
        if not base.exists():
            continue
        for p in base.rglob('*'):
            if not p.is_file():
                continue
            if p.suffix not in ALLOWED_SUFFIXES:
                continue
            if process_file(p):
                changed += 1
                print(f'Updated: {p.relative_to(ROOT)}')

    print(f'Total files updated: {changed}')
    return 0


if __name__ == '__main__':
    sys.exit(main())