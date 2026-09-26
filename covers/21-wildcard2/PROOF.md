# Final proof — 21-wildcard2

All five must-fix items are fixed in the renders: the Kernel stamp now sits on the bench, the RLHF curve is L^CLIP for A>0 with ticks at 1 and 1+ε, the tree uses y ≤ 4 and all 17 points are on the right side, the Gaussian ticks fall on ±1σ/±2σ, and DeiT has a CNN teacher and a patch decal. PDF fonts are only Archivo and Martian Mono, pdfpeek reports all 16 PDFs as ok, and every capsule, hour and level count matches books.json; the only problem found is that _sheet.png is out of date.

Review must-fixes confirmed fixed: 5

## Defects

- **_sheet** (minor) — renders/_sheet.png is out of date. It was saved at 22:32, before the final index.html (22:37) and the cover renders (22:37–22:38). On the decision-trees cover in the sheet, the tree labels still read 'x ≤ 2.5 / y ≤ 1 / y ≤ 4', and the ≤ is a thin glyph that doesn't match the Martian Mono around it. The final JPG, PNG and PDF, and tree() at index.html line 411, all read 'x <= 2.5 / y <= 1 / y <= 4'. So the presentation sheet shown to the client doesn't match the covers going to print.
  - *Fix:* Re-render renders/_sheet.png from the current index.html, the same way the covers were rendered. Then check that the decision-trees tree labels in the sheet read '<='.
