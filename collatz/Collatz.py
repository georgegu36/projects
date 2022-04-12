#!/usr/bin/env python3

# ---------------------------
# projects/collatz/Collatz.py
# Copyright (C) 2016
# Glenn P. Downing
# ---------------------------

# ------------
# collatz_read
# ------------


def collatz_read(s):
    """
    read two ints
    s a string
    return a list of two ints, representing the beginning and end of a range, [i, j]
    """
    a = s.split()
    return [int(a[0]), int(a[1])]

# ------------
# collatz_eval
# ------------


def collatz_eval(i, j):
    """
    i the beginning of the range, inclusive
    j the end       of the range, inclusive
    return the max cycle length of the range [i, j]
    """
    assert i, j > 0
    size = 200
    cache = load_cache(size)
    start = i
    end = j
    if i == j:
        return cycle_length(i)
    if i > j:
        start = j
        end = i
    cur_max = cycle_length(start)

    assert start, end > 0
    if end <= size:
        while start <= end:
            cur_length = cache[start]
            if cur_max < cur_length:
                cur_max = cur_length
            start += 1
    else:
        while start <= end:
            if start <= size:
                cur_length = cache[start]
            else:
                cur_length = cycle_length(start)
            if cur_max < cur_length:
                cur_max = cur_length
            start += 1
    assert cur_max > 0
    assert start, end > 0
    return cur_max


def cycle_length(n):
    """
    Calculates the cycle length of the number n
    returns an integer
    """
    assert n > 0
    c = 1
    if n == 1:
        return 1
    while n > 1:
        if (n % 2) == 0:
            n = (n // 2)
        else:
            n = (3 * n) + 1
        c += 1
    assert c > 0
    return c


def load_cache(limit):
    """
    creates a cache list with a limit
    limit an integer
    """
    i = 1
    cache = [0]
    for i in range(1, limit + 1):
        cache.append(cycle_length(i))
    return cache

# -------------
# collatz_print
# -------------


def collatz_print(w, i, j, v):
    """
    print three ints
    w a writer
    i the beginning of the range, inclusive
    j the end       of the range, inclusive
    v the max cycle length
    """
    w.write(str(i) + " " + str(j) + " " + str(v) + "\n")

# -------------
# collatz_solve
# -------------


def collatz_solve(r, w):
    """
    r a reader
    w a writer
    """
    for s in r:
        i, j = collatz_read(s)
        v = collatz_eval(i, j)
        collatz_print(w, i, j, v)
