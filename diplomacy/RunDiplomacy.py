
# -------
# imports
# -------

import sys

from Diplomacy import diplomacy_solve

# ----
# main
# ----

if __name__ == "__main__":
    diplomacy_solve(sys.stdin, sys.stdout)

""" #pragma: no cover
$ cat RunDiplomacy.in
1 10
100 200
201 210
900 1000



$ python Rundiplomacy.py < Rundiplomacy.in > Rundiplomacy.out

$ cat Rundiplomacy.out
1 10 1
100 200 1
201 210 1
900 1000 1



$ python -m pydoc -w diplomacy"
# That creates the file diplomacy.html
"""
