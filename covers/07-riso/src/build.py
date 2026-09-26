#!/usr/bin/env python3
"""Inline the engine, the book specs and the page script into one self-contained index.html."""
import pathlib

here = pathlib.Path(__file__).resolve().parent
page = (here / 'page.html').read_text()
scripts = ''.join(f'<script>\n/* ---- {name} ---- */\n{(here / name).read_text()}\n</script>\n'
                  for name in ('riso.js', 'books.js', 'wrap.js', 'page.js'))
(here.parent / 'index.html').write_text(page.replace('<!--SCRIPTS-->', scripts))
print('wrote', here.parent / 'index.html')
