# 17 — Interference

**The idea.** Every Vizuara book is one field of black lines plus one spot colour, built the way op art is
built (line displacement, density modulation, moiré, figure–ground). The book's idea is the force that
bends the lines. A Gaussian swells them, a causal mask turns them, compaction squeezes them, a roofline
folds them, and attention makes two ring systems interfere. Each field works at two distances. At 180 px
in the web library, or across the room, the lines average into one bold tonal emblem. In the hand the
field resolves into lines and starts to shimmer. The layout is strict: the field sits on top and bleeds
off three sides, 544 px deep. Below it is a paper plate holding a caption row, the title and the imprint.
Colour appears only inside the field, and only where the concept is.

## Palette
- Ink `#121212` and Paper `#F4F2EC` are constants. All type is ink on paper.
- Eight spot inks, one per book: Vermilion `#E2371D`, Ultramarine `#2A3BD4`, Viridian `#00906A`,
  Violet `#6A36CF`, Cadmium `#F2BD00`, Deep Teal `#007F8C`, Carmine `#BE1238`, Chartreuse `#7DAE12`.
- **Colour knocks out ink, except on the two moiré covers.** On most covers colour replaces ink run by run,
  so the two never overlap. On `transformers-from-scratch` and `deit-from-scratch` the coloured grating
  overprints the black one (`mix-blend-mode: multiply`, carried into those PDFs as `/BM /Multiply`),
  because there the overprint *is* the image.
- Every emblem also carries its concept in greyscale through form. Where a coloured element could vanish
  in grey, it gets a form difference as well: the solid 5D ribbon, the heavier NN fan, the thin [MASK]
  placeholders.

## Type
Archivo (Google Fonts), one family on its width axis.
- **Titles:** 800 weight, width 100, tracking −0.028 em, word-space +0.04 em, set at 72/58/50 px by
  length. Breaks are set by hand and punctuation hangs, e.g. the "(" of "(DeiT)".
- **Subtitles:** 500 weight, 23 px, broken at the sense break.
- **Caption row and imprint:** 600–700 weight at width 112–125, tracked caps.
- **Series line:** 13.5 px italic in sentence case, so it never reads as part of the imprint.

## Imprint
"VIZUARA BOOKS" plus a small mark: five lines each bent by the same V. It is the system's one move,
used as a signature. It always sits bottom-left and is never louder than the title.

## Level
Level is the **grain** of the field, shown in two places.
1. **Caption row:** three 14 px squares ruled with 3 / 4 / 6 bars (coarse / medium / fine). The book's
   level is inked and the other two are outlines, followed by the word. On the finest square the gaps
   stay above 1 px.
2. **The field:** every field function takes its dominant pitch from the level: beginner 16 px,
   intermediate 12 px, advanced 8 px. For fields that aren't a plain grating, the level still sets the
   structure:
   - Neural Networks (beginner): few neurons with 2 px edges.
   - Pi vs Hermes vs Codex (advanced): the uncompressed pitch stays at 6–8 px in every band.
   - Charlie: the spacing of the wall and floor lines.
   - Kernel (advanced): an 8 px roofline stack.

## Emblems (how each was derived)
- **AI Context Engineering:** the context window as a lens. Every line of the stream survives, but the
  relevant slice is magnified into the window (in colour) while the rest is compressed around it.
- **Mathematical Foundations for ML:** a 2-D Gaussian lifts a field of lines, making the normal
  distribution a surface. The region **within 1.5σ** is printed in colour (mask G > 0.32).
- **Neural Networks from Scratch:** a 6-9-9-6 fully-connected network drawn edge by edge. The first and
  last neurons sit outside the trim, so the web bleeds. The fans interfere into moiré. One hidden neuron's
  fan-in and fan-out are in colour and heavier. At each neuron the converging edges fuse into a small
  solid star instead of a nest of slivers.
- **Build LLMs from Scratch:** the causal attention mask. Attended cells are heavy horizontals, the masked
  future is hairline verticals, and the diagonal (each token attending to itself) is in colour.
- **5D Parallelism:** de Bruijn's pentagrid. Five families of parallel lines, whose dual is a Penrose
  tiling: the 2-D shadow of a 5-D lattice. One ribbon (one axis) is solid colour.
- **Pi vs Hermes vs Codex:** one history of vertical lines with three compaction profiles (top / middle /
  bottom band). Older lines are squeezed left into memory (colour), and the lines bend where one profile
  hands over to the next. The profiles are illustrative and do not claim to show the real algorithms.
- **Transformers:** attention as interference. The sequence is a full-bleed ring field. One head is a
  disc of coloured rings from a second centre, and the fringes exist only where the two overprint.
- **Prompt Engineering:** read left to right like text. The first 144 px of every line is the prompt, in
  colour: three identical bumps, a three-shot example. The completion (ink) carries the same bump on
  toward the right edge and slowly lets it go.
- **SQL Masterclass:** a JOIN. A table of rows overlaps a table of columns, and only the matched region,
  where both line systems exist, is in colour. Everything snaps to one grating, so each edge of the join
  ends on a whole line.
- **DeiT from Scratch:** distillation as a moiré hidden image. A black teacher grating sits under a
  coloured student grating whose phase is set per 48 px patch. A disc appears only where the two overlap,
  already cut into patches the way a ViT sees it.
- **Diffusion LM from Scratch:** masked diffusion with the sequence held still. There is one fixed row of
  tokens, and each row below it is one denoising step. A token is a thin violet [MASK] placeholder until
  its step, then its word in full ink from there down. The result is violet stalactites of different
  depths.
- **Kernel Engineering (forthcoming):** the roofline, the kernel engineer's own diagram. Every line rises
  along the memory-bound slope and runs flat under the compute ceiling. Ink marks the attainable region
  and paper sits above the roof. The ridge point, where a kernel turns compute-bound, runs down the stack
  in colour.
- **Charlie and the Intelligence Factory (I–IV):** a sub-series with one corridor and four rooms. The
  same perspective room is used each time (depth lines on the walls, converging lines on the floor and
  ceiling), and the vanishing point walks left to right from I to IV. The back wall holds the room:
  - Language: lines of text.
  - Vision: an iris of rings.
  - Sound: modulated waves, each whole inside the frame.
  - Reasoning: a binary search tree with the chosen path in colour.

## Print
- Everything is SVG/HTML vector. The PDFs contain no raster images, and `tools/pdfpeek.js` reads `ok`
  on all 16.
- **Within each line system, strokes are at least 1 px and paper gaps at least 1.2 px at trim.** This is
  enforced in the generators:
  - `hLines` thins a crowded line to keep a 1.6 px gap, and fuses lines that can't hold one.
  - Pi scales its layout so both trims fall mid-gap, and gap-guards slanted lines.
  - Charlie walls stop before their gaps drop below 1.6 px, and the first wall line sits about 10 px
    inside the trim.
  - NN fuses converging edges at each neuron.
  - The roofline and SQL gratings are phased so that the trims fall mid-gap.
- `covers/17-optical/tools/printcheck.js` + `printcheck.py` check this. They render every cover at 5×
  with the type hidden, run a morphological opening at 1 CSS px, and flag any ink or paper feature
  thinner than that. 15 of 16 covers pass. The one flagged cover is `transformers-from-scratch`, whose
  flags are all inside the head disc, where the black and carmine rings run nearly tangent. That is the
  moiré fringe itself; see the review response.
- Displaced fields are windowed or phased so no line is cut into a sliver at the field edge.
- A full wrap (back + 0.5 in spine + front) is on the page for AI Context Engineering, and the field runs
  round the book. The back carries a plain-language blurb and an "On the cover" colophon.

## Review response
Every must-fix claim was checked against the renders, using the 5× print check plus crops, before
changing anything. All eight were correct.

**Must-fix (all done):**
1. **Charlie edge wall line:** confirmed (z=1 put a 5 px bar centred on the trim). The wall sequence now
   starts at z = 1/(1+0.8·dz), which puts the first line about 10 px inside the trim.
2. **Transformers 0.52 px ring:** confirmed. The coloured rings now stop at r + w/2 ≤ R − 1, so the clip
   never cuts a stroke.
3. **Kernel = Riley's *Movement in Squares*:** agreed, and it is gone. It is replaced by the roofline
   field as suggested: an 8 px stack, attainable region in ink, ridge point in cadmium, and a lines-only
   field again.
4. **Prompt slab and sliver:** confirmed. The whole emblem was rethought (improvement 3), and its
   displacement is identical per line, so neighbours can't fuse. `hLines` also has a general gap guard
   now, which also fixed a sub-pixel gap at the crown of the Mathematical Foundations swell (it hadn't
   been flagged).
5. **SQL ragged join:** confirmed. Both tables and the join are snapped to one grating, and every side of
   the red grid ends on a whole line.
6. **Sound room clipped waves:** confirmed. The stack is inset by clip + amplitude + half stroke + 4 px.
7. **"1σ" was wrong:** confirmed (G > 0.32 is the 1.5σ contour). I kept the shape and corrected the text
   to "within 1.5σ" in the caption and in these notes.
8. **Print spec untrue:** confirmed on both counts.
   - The multiply sentence is reworded: colour knocks out, except on the two moiré covers.
   - DeiT now draws both gratings at p/2 + 0.15 px. Shifted patches become a clean solid tone and
     unshifted ones hide the student grating completely, so there are no 0.32 px slivers.
   - The grain mark now uses 3/4/6 bars.
   - The print check exists and was run (results above).

**Where I don't fully agree:** the check does not demand ≥1 px gaps *between two different line
systems that cross*. Two independent gratings necessarily pass through every gap size where they drift
in and out of phase. That near-coincidence *is* the moiré fringe on Transformers, and no stroke width
removes it. On press those sub-pixel gaps between the two inks close up with dot gain and print as the
darker fringe, which is the intended image. Every single-system gap on that cover is ≥ 1.2 px.

**Improvements taken:**
- **Level as grain, everywhere:** NN, Pi and Charlie now derive their structure from GRAIN, and the grain
  mark uses 3/4/6 bars. Kernel is an 8 px line field.
- **Diffusion rethink:** fixed token positions and a per-token unmask step, as suggested. To keep a form
  difference in greyscale, [MASK] is a thin 2 px violet placeholder and a word is a full 4 px ink stroke.
- **Prompt rethink:** now directional, as above.
- **NN:** bleeds top and bottom, uses 6-9-9-6 neurons with 2 px edges, and the hot fan is 4.6 px.
- **5D:** the coloured ribbon is solid, a form difference as well as a colour one.
- **Plate:**
  - Tails are broken at the sense break, and the kernel tail has no full stop.
  - Title block raised 8 px and foot lowered 6 px, so two-line tails get about 40 px of air above the
    imprint.
  - The "(" of (DeiT) hangs.
  - h2 has word-space +0.04 em.
- **Ledger idea:** added to "What next" with base geometry.

**Improvement declined:**
- **Moving the Charlie series line into a kicker above the title:** declined. The kicker adds about 27 px
  above a two-line title plus a two-line tail (Reasoning), which recreates the crowding the review asked
  me to fix. I kept the foot position but changed its voice to italic sentence case, 13.5 px, untracked,
  so it no longer reads as one long run of tracked caps with the imprint.

## What I'd do next
- **Ledger for the remaining ~35 titles:** track base geometry (horizontal / vertical / radial / grid /
  tiling / perspective / network) as well as field and ink, so no geometry dominates the shelf. Three
  covers are already "horizontal lines with a central event" (Context, Math, and, before this round,
  Prompt). The next ones should come from the vertical, radial and tiling families.
- **Spine system:** the field continues across every spine, so a shelf row reads as one continuous stripe
  interrupted by titles.
- **Press proof:** proof with the spot inks as real Pantone plates (the moiré covers want a true second
  plate), and check the 8 px advanced gratings on uncoated stock for dot gain.
- **Web library:** a 1–2 px phase drift on hover, so the thumbnails shimmer like the printed object.
