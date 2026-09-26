# Final proof — 19-terminal

All six must-fixes are fixed in the renders. The PDFs use only Martian Mono and pdfpeek matches every render; the two ?? flags are just dense text. Capsule and hour counts match books.json. What's left are minor issues: three text or label intrusions into the 24px top safe margin, one label collision, one truncated JSON block, one drifting axis, and some small factual slips in captions and output.

Review must-fixes confirmed fixed: 6

## Defects

- **decision-trees-from-scratch** (minor) — The two upper leaf-count chips, 'virginica [0, 1, 2]' and 'virginica [0, 0, 43]', are on grid row 1, so their glyphs sit about 11–22px from the top trim. That is inside the 24px safe margin, and they are data labels, not bleed texture.
  - *Fix:* Move those two chips (cr:1) to row 5 (y≈55). Row 5 corresponds to petal width ≈2.35, which no sample has, so no points get covered. Row 3 already holds the split-threshold chips.
- **5d-parallelism** (minor) — The selected rank-00 node chip ('pe 00 dp' at the top of the 5-cube) is on row 1, about 11–22px from the top trim, so it is inside the 24px safe margin.
  - *Fix:* Compress the lattice vertically: use scy=(H-68)/sy instead of (H-34)/sy. Rank 00 then lands on row 3 (y≈33) and rank 31 on row 47, still above the caption.
- **neural-networks-from-scratch (_wrap back cover)** (minor) — The back-cover code listing starts on row 1. Line 1 ('# mnist_from_scratch.py -- …') has ink at about 13–21px from the top trim, and line 2 straddles the 24px line.
  - *Fix:* Start the listing on row 3 (row=i+3). The 45 lines then run to row 47, which is still above the stdout block at row 52.5.
- **charlie-sound-room** (minor) — The gap label '240 ms' is exactly 6 characters and fills the 6-column gap (cols 61–66). It runs flush into the agent's first waveform column, so the row reads '240 mssuree.' The label collides with the art.
  - *Fix:* Set it as '240ms' at cols 61–65 so a blank column sits on each side. Alternatively, move '240 ms' below the waveform to row 49, between the USER and AGENT chips.
- **ai-context-engineering** (minor) — The TOOLS text is clipped. The 16-row box fills up, and the diff_deploy schema stops at '"Show config changes in a deploy",' with a dangling comma. Its input_schema is silently dropped, so the packed tool JSON shown is invalid.
  - *Fix:* Make the schemas fit in 16 rows: compact the JSON whitespace, or drop the per-tool "description" strings, or remove the third tool. Otherwise end the block with an explicit '…' truncation marker.
- **charlie-language-room** (minor) — The x-axis '+' ticks are placed every round(112/12)=9 columns, but the data, labels and markers use the true 9.33 columns per doubling. The ticks drift 2–4 columns: '64', '256' and '1024' sit 2–3 columns right of their ticks, and the last tick is at col 112 instead of 116. On the drawn ticks, the ridge marker at 295 reads as about 2^8.56 ≈ 377.
  - *Fix:* Draw each tick at Math.round(col(2**k)) for k=0..12 instead of using (c-x0)%9.
- **pi-vs-hermes-vs-codex** (minor) — The summaries are presented as faithful but state things that are not in their transcripts. The left one ends 'next: commit.' and the middle one ends 'next: ship behind a flag.', yet neither transcript mentions committing or a flag.
  - *Fix:* Delete 'next: commit.' and 'next: ship behind a flag.' from the S[] strings (the funnel refits automatically), or add a turn to each transcript that actually says it.
- **pi-vs-hermes-vs-codex** (minor) — The gallery caption and NOTES say the mechanism is 'drawn identically three times', but the funnels are fitted per column. Their top widths are 26, 28 and 22 columns, over 19, 20 and 20 rows, and the middle funnel is visibly wider.
  - *Fix:* Either use one top width for all three and match the summary lengths so the silhouettes are the same, or change the wording to 'drawn the same way three times'.
- **neural-networks-from-scratch (_wrap back cover)** (minor) — The stdout block shows '$ python mnist_from_scratch.py' followed only by 'epoch 9 …' and the array. The listed program prints ten epoch lines (epochs 0–9), so the output shown is not what that command prints, and nothing marks the lines as left out.
  - *Fix:* Change the command line to '$ python mnist_from_scratch.py | tail -2', or insert a '...' line before 'epoch 9'.
