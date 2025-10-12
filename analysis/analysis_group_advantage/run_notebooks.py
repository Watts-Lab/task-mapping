from nbclient import NotebookClient
from nbformat import read, write, NO_CONVERT
import sys
import pathlib

def run_nb(path):
    path = pathlib.Path(path)
    nb = read(path.open('r', encoding='utf-8'), as_version=4)
    client = NotebookClient(nb, timeout=600, kernel_name='python3')
    client.execute()
    out_path = path.with_name(path.stem + '_executed.ipynb')
    write(nb, out_path.open('w', encoding='utf-8'))
    print('Wrote', out_path)

if __name__ == '__main__':
    for p in sys.argv[1:]:
        run_nb(p)
