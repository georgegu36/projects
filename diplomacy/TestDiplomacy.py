
# -------
# imports
# -------

from io import StringIO
from unittest import main, TestCase

from Diplomacy import diplomacy_print, diplomacy_solve, diplomacy_format

# -----------
# TestDiplomacy
# -----------


class TestDiplomacy (TestCase):
    # -----
    # solve
    # -----

    def test_solve_1(self):
        r = StringIO("A Madrid Hold\nB Barcelona Move Madrid\nC London Support B\n")
        w = StringIO()
        diplomacy_solve(r, w)
        self.assertEqual(
            w.getvalue(), "A [dead]\nB Madrid\nC London\n")

    def test_solve_2(self):
        r = StringIO("A Madrid Hold\nB Barcelona Move Madrid")
        w = StringIO()
        diplomacy_solve(r, w)
        self.assertEqual(
            w.getvalue(), "A [dead]\nB [dead]\n")

    def test_solve_3(self):
        r = StringIO("A Madrid Hold\nB Barcelona Move Madrid\nC London Support B\nD Austin Move London")
        w = StringIO()
        diplomacy_solve(r, w)
        self.assertEqual(
            w.getvalue(), "A [dead]\nB [dead]\nC [dead]\nD [dead]\n")

# ----
# main
# ----

if __name__ == "__main__":
    main()

""" #pragma: no cover
$ coverage run --branch TestDiplomacy.py >  TestDiplomacy.out 2>&1
"""
