# Final proof — 14-bombay

I checked eight of the nine must-fixes in the renders and they are fixed. All title, level and capsule/hour data matches books.json, the PDFs embed only Yellowtail and Anek, and every pdfpeek diff is 3–4 with nothing flagged. What remains is the clearance around Pi's 'and', which is below the 8px the review asked for, plus five minor geometry and print-safety issues: one on the Charlie language cover, one on DeiT and three on the print wrap.

Review must-fixes confirmed fixed: 8

## Review items not yet fixed

- **mixline-pi-and-clearance** — Must-fix 1 is only partly done. Six of the seven script lines now clear their block letters by about 5–11px. On pi-vs-hermes-vs-codex, 'and' in the trade line is now at the right size (k 1.25, spans the cap band), but it does not meet the review's explicit 'at least 8px clear on each side'. Measured ink-to-ink on the 2x render, it is about 2.5px from the N of COMPACTION (the N's block shadow almost meets the keyline of 'a', with only 1px of clear column) and about 5.5px from the M of MEMORY. So the line still reads close to 'COMPACTIONand MEMORY'. NOTES says only that 'none touch'. Fix: in mixLine, count the preceding block word's shadow offset in its right ink edge, and raise the script↔block gap on this trade line until both sides clear by 8px or more. Then re-measure.

## Defects

- **charlie-language-belt-token-clipped** (minor) — charlie-language-room: the rightmost token on the decode belt runs into the label panel's right frame and is cut off. About 28px of the 36px box is visible, its right keyline is missing and its dash is off-centre. It also sits past the end of the black belt, which stops at about x=596, so it hangs in mid-air. This reads as a clipping glitch, not a deliberate crop.
  - *Fix:* Draw one fewer token, or end the token row at least 10px inside the panel's inner frame, and extend the belt so it runs under the last token.
- **deit-arrow-touches-block** (minor) — deit-from-scratch: the red dashed teacher→DIST arrow runs straight along the top-left corner of the transformer block. For about 8px of height (around y 590–598 at 1x) the red dash is 0–0.5px from the block's black keyline, so the arrow looks as if it hits the student block.
  - *Fix:* Move the curve's control point about 10px further left, or start the arc higher, so every dash stays at least 6px clear of the transformer block's keyline.
- **wrap-mini-stamp-words-illegible** (minor) — _wrap: the three key stamps on the back cover's rate board ('THE STAMP TELLS THE LEVEL') and the spine stamp still carry LEVEL and BEGINNER/INTERMEDIATE/ADVANCED. On the back stamps these words are about 2–2.5px cap height, and on the spine stamp about 3px, which is roughly 1.5–2.5pt at trim. Most are reversed out of red or coal. That is far below the size must-fix 9 set for the front stamp. They print as illegible grey bars and will fill in.
  - *Fix:* Use the numeral alone on the mini stamps. On the rate board, set the level names as Anek labels of 7pt or more next to each stamp. On the spine, show only the numeral.
- **wrap-spine-stamp-hits-rule** (minor) — _wrap spine: the level stamp is not centred between the two spine rules. Its left perforation sits about 5px inside the left rule (x≈726), while its right perforation sits right on the right rule (x≈777–778) and covers it from y≈30 to 76.
  - *Fix:* Centre the stamp on the spine rules (centre x≈751.5), or shrink it until it clears both rules by at least 4px.
- **wrap-spine-imprint-near-edge** (minor) — _wrap spine: the rotated Devanagari imprint 'विज़ुआरा' ends at y=867, only 21px (0.22in) from the bottom trim of an 888px wrap that has no bleed. That is inside the 24px safe margin. The front and back footers sit 50px from the edge.
  - *Fix:* Move the spine's V block and Devanagari imprint up about 15–20px, so the imprint ends at least 24px (preferably at least 36px) from the bottom trim.
