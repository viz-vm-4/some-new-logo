# 04 — Drawing Office

**Every Vizuara book is issued as an engineering drawing of the machine it teaches you to build.**

## The idea
Vizuara's whole pitch is that you build the thing yourself, from an empty file. So each cover is
the sheet you would build it from: the book's core mechanism drawn with a real drafting office's
conventions (orthographic and isometric views, sections and hatching, detail views, conventional
breaks, dimension lines, balloons, a parts list). The brand lives in the **title block**, the
bordered form every engineering drawing carries. Drawing no. = book no. Level is stamped in ink.
Capsules and hours are the drawing's extent. A units note says what the drawing is measured in
(tokens, neurons, GPUs, reward). Vizuara signs in the bottom-right corner, where a drawing office
signs its work. The sheet (frame, zone marks, the drawing number repeated upside-down top-left for
flat-file filing, title block) never changes. The drawing is different every time. Not a blueprint:
it's drafting paper, graphite and a single engineering ink, closer to a patent-office sheet or a
Braun service manual than to cyan-and-white.

## Palette
| role | hex |
|---|---|
| Drafting paper (the sheet) | `#EBEAE4` |
| Graphite (outlines, all primary lettering) | `#1F2123` |
| Soft graphite (secondary lettering, ≥7:1 on paper) | `#474B4F` |
| Construction grey (lines only, never text) | `#8A8E91` |
| Engineering ink: the one quantity the book teaches you to control | `#D0381B` |

The ink has one job per cover: the context-window limit, the loss and the backward pass, det A,
the causal mask, rank 0, the summaries a harness writes, the reward. In greyscale it prints as a
clear mid-grey between graphite and paper.

## Type (Google Fonts)
- **Instrument Sans** SemiBold at width 88: titles, the book's subtitle line, the imprint.
- **Overpass Mono** 500–700: all lettering, dimensions, title-block labels. Overpass comes from
  Highway Gothic, which shares its lineage with drafting-template lettering.
- **Noto Sans Mono** and **Noto Sans Math** are named, loaded fallbacks for the few glyphs Overpass
  lacks (Greek: λ π Σ; math: → ≤ ∂ ⌀ ‖ ∞). Subscripts are drawn as shifted Overpass Mono tspans, so
  the PDFs embed only these four families and never a system font.
- **Title sizes are a rule, not a per-book choice:** two lines set at 64 px, or 52 px (then 46) if the
  longest line exceeds a 584 px measure; three lines at 42 px. The subtitle sits on a fixed baseline
  in every title block. Line breaks come before a preposition or conjunction and never split a
  compound noun ("Build Large Language Models / (LLMs) from Scratch", "Charlie and / the Sound Room").

## Level
Filled ink squares in the LEVEL cell of the title block, like a tolerance class stamped on a
drawing (more squares = tighter work), with the word always spelled out beside it:
■□□ Beginner · ■■□ Intermediate · ■■■ Advanced. At 180 px the squares still show as a short or long
red dash.

## Imprint
A **V-block** (the machinist's fixture that cradles round stock for inspection) drawn in section:
a hatched V holding one part (in ink) with its centre mark. It reads as a V, it's a real drafting
object, and it only appears at the foot of the title block beside the VIZUARA wordmark, so the
title is always louder.

## Emblems: how each drawing was derived
- **VB·001 AI Context Engineering**: Section A–A through one context window, drawn as a multi-core
  cable. Instructions, tools, knowledge, memory and a jacketed (isolated) sub-agent strand sit
  inside a fixed ink diameter, with small solid strands for compressed history. The book's four
  strategies (write / select / compress / isolate) are called out in ink.
- **VB·002 Mathematical Foundations for ML**: the unit circle and unit square under a symmetric
  matrix A. "Before" is in phantom line and "after" in solid: an ellipse whose eigen-axes are
  centre lines, dimensioned λ₁ and λ₂. λ₂ is taken outside the ellipse on the tangent at the minor
  vertex. det A, the parallelogram, is the one ink area.
- **VB·003 Neural Networks from Scratch**: a 4-6-6-3 MLP drawn as a hole pattern (centre-marked
  holes, "6× ReLU" callouts). Detail A enlarges one first-hidden-layer neuron: four weighted
  inputs w₁–w₄, Σ, bias, ReLU. The cross-entropy loss sends the backward pass home in ink.
- **VB·004 Build LLMs from Scratch**: GPT-2 (124M) general arrangement, drawn pre-LN with flow
  upward: LN₁ → masked MHA → ⊕, then LN₂ → FFN → ⊕, with residuals bypassing each sublayer. A
  conventional break stands for the 12 identical blocks, and ln_f and the LM head sit on top.
  Section B–B, cut through masked attention, is the causal mask, with the allowed cells in solid
  ink.
- **VB·005 5D Parallelism**: an isometric 4×4×4 lattice of GPUs, dimensioned data × tensor ×
  pipeline, with rank 0 in ink on the lattice's top corner (its leader crosses no cubes).
  Auxiliary views C (context ring) and E (top-2 expert routing) supply the other two axes.
- **VB·006 Pi vs Hermes vs Codex**: one overflowing session drawn three times as a turned shaft
  against a 3 px ink context-limit datum. Pi cuts at a turn, Hermes gets a conventional S-break
  through the middle, and Codex couples to the next model. Every summary is solid ink.
- **VB·046–049 Charlie and the Intelligence Factory** (sub-series): the drawing type switches to
  architecture, with an enlarged plan of one room per book, column grid bubbles, poché walls, door
  swings, hexagonal equipment tags keyed to an equipment schedule, and a **key plan** that walks the
  ink room I→IV across the four covers.
  - Language: scheduler, prefill, a decode loop, paged KV-cache racks (used pages in solid ink).
  - Vision: an image cut into 4×4 patches, flattened onto a conveyor as [CLS] + 16 tokens, with the
    lifted patch and its token in ink, fed to the encoder.
  - Sound: mic → VAD → ASR → LLM → TTS → speaker and a barge-in path. A chain dimension gives each
    stage's time t, and they sum to the latency budget, drawn as one ink bar.
  - Reasoning: bandit arms on the north wall, and the floor is a gridworld. Every tile carries
    V(s) from value iteration (γ = 0.9, computed in the drawing function), with the greedy path from
    S and the +1 goal tile in ink.
- **VB·014 Build Decision Trees from Scratch** (beginner): feature space cut by greedy
  axis-aligned splits, beside the tree that makes them. The thresholds use baseline dimensioning
  from the origin corner (t₁ and t₃ from the left edge, t₂ from the bottom). Each node's Gini
  impurity is computed from the 18 plotted samples, and the root split is in ink.
- **VB·051 Kernel Engineering** (coming soon): tiled C = A·B with one output tile, the strips it
  reads and the current k-step in ink, plus a schematic of the memory hierarchy
  (HBM/SRAM/registers).
  It is stamped **PRELIMINARY — NOT FOR CONSTRUCTION** and its extent is left blank until it's built.

The drawing number is the book's position in the catalogue (books.json order).

## Deliverables
- `index.html`: the presentation page (direction, rationale, palette/type/level/line conventions,
  a drawing register table, all 12 covers at full size, and a print wrap of VB·003 as `.wrap`: the
  back is a parts list of chapters numbered bottom-up the way a bill of materials grows from the
  title block, the spine carries number/title/level/mark, and the front is the cover).
- `renders/`: PNG @2×, JPG @1×, vector PDFs at exact 7.5 × 9.25 in trim.
- Everything is HTML + inline SVG drawn in code. There are no raster images. The line floor is
  0.9 px at trim, and dimension labels sit on paper knock-outs, not stroke halos (those don't
  survive Chrome's PDF output).

## What I'd do next
1. Turn the drawing helpers (dimension, leader, balloon, section, break, isometric box) into a
   small documented kit, so a new book's cover is one ~60-line drawing function. Then draw the
   remaining ~37 titles.
2. Give each book a "sheet 2": the back cover as its parts list (as in the wrap), generated from
   the book's real chapter data.
3. Spine system for the shelf: drawing numbers and level squares aligned across spines, so a row
   of books reads like a flat file.
4. Print proof on uncoated stock and tune the paper tint and ink for press. Then consider a
   two-colour (graphite + one PMS) print spec, which this system is already built for.

## Review response (revision 2)

I checked every claim against the code and the renders before changing anything. All eight
must-fix items were correct and are fixed:

1. **GPT-2 block order.** Confirmed: read bottom-up, the old block ran FFN before attention and
   placed the adds post-norm. Each block is now, bottom to top, LN₁ → masked MHA → ⊕₁ → LN₂ → FFN →
   ⊕₂. Residual 1 bypasses LN₁ + MHA and residual 2 bypasses LN₂ + FFN; ln_f and the LM head sit
   above block 12. Cutting plane B–B, the leaders and the spec note ("pre-LN") follow.
2. **Vision patch count.** Confirmed (12 tokens for 16 patches). There are now [CLS] + 16 tokens,
   with index 6 in ink to match the lifted patch at row 1, col 2, and the conveyor is labelled.
3. **Glyph fallback.** Confirmed: DejaVu and Liberation were embedded. A coverage test showed no
   Google mono font serves the subscript digits, so subscripts are now shifted Overpass Mono
   tspans. Greek and math symbols come from Noto Sans Mono and Noto Sans Math, loaded and named in
   the font stack, and Σ is no longer set in Instrument Sans. `strings *.pdf | grep FontName` now
   lists only Instrument Sans, Overpass Mono, Noto Sans Mono and Noto Sans Math.
4. **ts:72 overflow.** Confirmed. Titles now follow the size rule above, and the subtitle is pinned
   to one baseline on every cover.
5. **Missing equipment tags** (Sound, Reasoning). Confirmed. All four tags are placed on both plans,
   with tag 4 in ink on the ink element.
6. **Decision-tree dimensions and Gini.** Confirmed (I recomputed 0.648, 0.463 and 0.490). The
   thresholds now use baseline dimensioning from the origin, and the Gini labels are computed from
   the point arrays.
7. **Detail A inputs.** Confirmed. It now shows four weighted inputs, w₁–w₄.
8. **Math λ knock-outs.** Confirmed. λ₂ is dimensioned outside the ellipse (the tangent at the
   minor vertex and the major axis serve as extension lines). λ₁'s label sits on the axis side of
   its dimension line, clear of the unit circle and the ellipse, with no knock-out.

Improvements:
1. **Title size rule.** Taken (see Type above).
2. **Line-break rule.** Taken. Build LLMs, 5D and all four Charlie titles are re-broken.
3. **Charlie tags and masses.** Taken: tags are hexagons, so they no longer echo the grid bubbles,
   and every room now has a solid ink mass of 38 px or more. I only partly scaled up the interiors:
   the Language and Vision rooms keep some empty floor, because a plan needs circulation space to
   read as a room.
4. **Rethink Sound and Reasoning.** Taken, with one change. The Sound room is now a chain
   dimension, but its stations are labelled t_VAD … t_TTS rather than with the example ms values
   the review suggested. Those numbers would be invented, and the book does not publish them. The
   "ms" units cell stays true because the budget is stated in ms. Reasoning is now a gridworld with
   computed V(s), which I think is the best thing on the shelf.
5. **One ink quantity per cover.** Taken for Math (only det A), Build LLMs (the mask cells in solid
   ink; the MHA bands are no longer red), Pi (solid summaries, 3 px limit), Language (the decode
   loop went graphite), and 5D (the experts in View E went graphite). Two partial declines. The
   Context cover keeps the four strategy words in ink, because they are the labels of the one ink
   quantity (the window) and the reviewer named that cover strongest. The Kernel stamp stays ink,
   because a status stamp is a separate drawing-office device, not part of the emblem.
6. **Convention slips.** All taken:
   - Kernel's "SECTION M–M" is renamed "MEMORY HIERARCHY (SCHEMATIC)".
   - The −∞ is at lettering size and knocked out.
   - The ENV box is gone, because the Reasoning room was redrawn.
   - The stamp is pulled in to about 20 px from the border.
   - Top and bottom zone numerals are symmetric at 28 px from trim.
   - The rank-0 leader no longer crosses any cube.

Still open: the tool warns only on layout and diffs. A printed proof on uncoated stock would still
be needed to tune the paper tint.
