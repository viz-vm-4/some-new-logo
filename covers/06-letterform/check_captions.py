#!/usr/bin/env python3
"""Build-time check for the Codepoint system: every single-character caption must print
the character's codepoint and its official Unicode name, verbatim; the codepoint must be the
first character of the emblem. Tokens (tok:'...') print themselves and a role, and are skipped.
    python3 covers/06-letterform/check_captions.py
"""
import re, sys, unicodedata, pathlib

src = (pathlib.Path(__file__).parent / 'index.html').read_text(encoding='utf-8')
bad = 0
block = src[src.index('const BOOKS = ['):src.index('const REST = [')]
for chunk in block.split('{slug:')[1:]:
    slug = re.match(r"'([^']+)'", chunk).group(1)
    m = re.search(r"cp:'U\+([0-9A-F]+)', name:'([^']+)'", chunk)
    if not m:
        print(f"tok {slug:34s} (token caption, printed literally)"); continue
    cp, name = m.groups()
    text = re.search(r"runs:\[\{t:'([^']+)'", chunk).group(1)
    ch = chr(int(cp, 16)); official = unicodedata.name(ch)
    ok = (name == official) and text[0] == ch
    bad += not ok
    print(f"{'ok ' if ok else 'BAD'} {slug:34s} U+{cp} {name}" + ('' if ok else f"   -> expected {official!r} for {text[0]!r}"))
sys.exit(1 if bad else 0)
