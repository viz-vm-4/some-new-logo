# 01 — Figure/Ground

**A Swiss programme for Vizuara Books: one grid, one typeface, three inks, and on every cover a single figure built from the idea the book teaches.**

## The idea
Every cover uses the same 12 × 15 module grid (44 px fields, 12 px gutters, 30 px margins; 720 × 888 divides exactly) and one typeface, in the manner of a Müller-Brockmann concert series, Lars Müller's list or Gerstner's *Designing Programmes*. The system is the brand, so the Vizuara name can stay quiet. The **ground** carries the level, so a shelf of fifty reads as a gradient of difficulty, even in greyscale. On that ground stands exactly one **figure**, drawn from the book's own mechanism using only squares, circles and bars on the grid, in SVG. The **signal** ink marks the one thing the book teaches you to see. The back cover explains the figure in one sentence.

## Palette (three inks, permuted by level)
| Ink | Hex | Level 1 Beginner | Level 2 Intermediate | Level 3 Advanced |
|---|---|---|---|---|
| Paper | `#F3F2EE` | ground | signal | figure + title |
| Signal Red | `#DC2A1E` | signal | ground | signal |
| Ink | `#141414` | figure + title | figure + title | ground |

The presentation page background is `#E6E5E1`. Red was chosen as a true red (hue ≈ 4°), clear of the retired orange/magenta pinwheel. In greyscale the three grounds come out at about 95 %, 45 % and 8 %, so level still reads.

## Type
**Archivo** (Google Fonts), and nothing else. It is a grotesque in the Akzidenz tradition, with a width axis in reserve.
- Title: Bold 700. It sits flush left, and the cap height of the first line sits on the top margin (`text-box: trim-both cap alphabetic`). Size steps down 68/64 → 60/57 → 50/48 → 46/45 px until the longest hand-broken line fits 11 columns (auto-fit in JS). Tracking is −2.4 %.
- Subtitle: Regular 21/26. Colophon: Bold and Regular 13.5/17. Figure labels: Semibold 13.

## Programme addendum (after review)
A grid of module squares is reserved for mechanisms that *are* matrices: attention, a device mesh, a tiled GEMM, image patches. A mechanism that is only tabulated (a comparison, a sequence over time) must find its own silhouette. Charlie covers keep the colophon rule; the room floor sits one gutter above it, and the fourth cell reads "Book II" over "Intelligence Factory".

## How level is encoded (three ways, redundantly)
1. **Ground ink**: paper, red or black (see the table above). This reads at 180 px and in greyscale.
2. **The ribbon** is the imprint mark: a bookmark hanging from the top trim in column 12, with its tail notched into a V for Vizuara. Its length is the level: 1, 2 or 3 modules. It hangs from the top of the spine too, so level shows on a shelf of spines.
3. **The colophon** states it: "Level 2 / Intermediate".

## Emblems (one line per book)
- **ai-context-engineering**: Outside the window is a uniform field of dots. Inside, the information is selected and ordered into instructions (squares), tools (rings), retrieved knowledge (large dots) and compressed memory (small dots), around one query (signal).
- **mathematical-foundations-for-ml**: A matrix maps the unit circle (outline) to an ellipse (solid). The eigenvectors only stretch: v₁ by λ₁ = 1.95 out past the circle, v₂ by λ₂ = 0.52 inside it. That is Av = λv, drawn as red bars ending on the ellipse's vertices.
- **neural-networks-from-scratch**: One neuron. Nine inputs whose stroke width is |w| converge on one summing disc, and the output leaves bent by ReLU.
- **build-llms-from-scratch**: The causal self-attention matrix of a GPT. Square area is attention weight, the upper triangle is masked (dots), and the last row (the token being predicted) is in signal.
- **5d-parallelism**: Thirty-two GPUs (2⁵), with one binary split per axis. Each gap width is one axis: TP 4, CP 12 and DP 44 px across; EP 12 and PP 44 px down. Five labels, each used once, and one rank in red.
- **pi-vs-hermes-vs-codex**: Three context windows (frames) after compaction, standing on the rule with the oldest turns at the bottom. Pi puts the summary (red) under the recent turns. Hermes keeps head and tail around a summarised middle. Codex keeps only a handoff summary. The empty frame above each is the freed context.
- **machine-learning-fundamentals**: A decision map. Every grid point gets a predicted class (solid or ring). The learned boundary is red and runs at 45°, midway between lattice diagonals, so it touches no point. Three points sit clearly on the wrong side.
- **git-github-masterclass**: A commit graph drawn like a transit diagram. A red feature branch leaves main and merges back, and another branch is still open, running off the edge.
- **decision-trees-from-scratch**: Greedy binary splits drawn orthogonally, with one example's route from the root question to its leaf in red.
- **rag-in-production**: Thirty chunks as unit vectors on a quarter circle, ranked by angle to the query (cosine similarity). The top four are at full weight and the query is in signal.
- **sciml**: The direction field of a damped oscillator (one stroke per module, integrated with RK4 in the page), with a red solution curve spiralling into equilibrium.
- **diffusion-lm-from-scratch**: Rows are denoising steps; the top row is all [MASK] (small dots). Each step unmasks a scheduled 1–2 tokens (red), scattered across the width (1,2,2,2,2,2,1 over steps 1–7). Revealed tokens stay, so the finished sentence stands on the rule.
- **vla-world-models**: A kinematic schematic on the grid: joints on module centres, links only at 0°, 45° or 90°. Solid is the pose now; the outline is the pose the world model imagines reaching the target (red); the dots are the path it predicts for the end effector.
- **kernel-engineering** (forthcoming): A tiled GEMM. One output tile of C accumulates a row-strip of A against a column-strip of B.
- **Charlie and the Intelligence Factory** (sub-series): each book is one room of the same floor plan, with walls drawn in the grid's gutters. The door and corridor sit at the same height on all four covers, so the set shelved face-out becomes one continuous floor. Room I has a right door, II and III have both, IV has a left door.
  - **charlie-language-room**: The prompt is prefilled as one block, then tokens are decoded one at a time and leave through the door.
  - **charlie-vision-room**: A 3 × 3 patch grid becomes 9 tokens in the corridor, and the output image generates itself (outline). One patch is traced through all three stages, with every element a gutter clear of the walls.
  - **charlie-sound-room**: Turn-taking. The user speaks above the axis. After a short endpointing silence the agent answers below it. The user barges in (signal), and the agent's speech stops dead at full amplitude.
  - **charlie-reasoning-room**: A grid world. The agent's steps (dots) find their own way from the door to the reward (red).

## Covers rendered (18)
Core set: ai-context-engineering, mathematical-foundations-for-ml, neural-networks-from-scratch, build-llms-from-scratch, 5d-parallelism, pi-vs-hermes-vs-codex.
Range: machine-learning-fundamentals, git-github-masterclass, decision-trees-from-scratch, rag-in-production, sciml, diffusion-lm-from-scratch, vla-world-models, kernel-engineering (coming soon).
Sub-series: charlie-language-room, charlie-vision-room, charlie-sound-room, charlie-reasoning-room.
Extra: a full print wrap (back + 56 px spine + front) for *Build Large Language Models (LLMs) from Scratch*. It is on the page as `.wrap`.

## Print notes
- Everything is vector (inline SVG and live text). The minimum stroke is 3 px (≈ 2.25 pt), and there is no light-grey text.
- Figures bleed only where the idea continues past the page. Critical text keeps ≥ 30 px from the trim.
- PDFs are at exact trim (540 × 666 pt) and are checked with `tools/pdfpeek.js`: all 18 match their JPGs. The `@media print` rule that stacks covers at the trim origin predates the render.js fix and is kept only as a harmless belt-and-braces.

## What I'd do next
- Draw the remaining ~32 figures with the same rules. Each one has to survive the question "what is this the mechanism *of*?" before it is drawn.
- Give Archivo's width axis a job for the very longest titles (e.g. DeiT) instead of stepping down in size.
- Specify spot inks for offset printing: Pantone 485 C for the red, rich black 60/40/40/100, and uncoated stock so the paper ink *is* the paper. Proof the red ground for a slight warm shift.
- Design spines for the whole list and photograph a shelf of real spines to tune ribbon lengths.
- Build a tiny generator (JSON → SVG cover) so new books are set by the system, not by hand, while each figure stays hand-constructed.

## Review response
The art-director review (REVIEW.md, 8/10) was checked against the renders; all six must-fix claims were correct.

**Must-fix: all done**
1. *git-v stale render*: deleted. `render.js` now prunes stale slugs and writes `renders/_wrap.jpg`. The contact sheet shows 18 covers.
2. *rag origin disc*: done as specified. The disc sits at (46, 786) with r 16, so its left edge is on the 30 px margin and its bottom on the 802 baseline, clear of the rule. R0 is shortened by 16 px. I also enforced ≥ 2° between rays (and 2.5° to the query), from improvement 6.
3. *math eigenvectors cut by the clip*: took the reviewer's first option. The eigenvectors are now the λ-scaled vectors: red bars from the centre to the ellipse's major and minor vertices, with the unit circle as the before-state, and no clip. It says Av = λv more directly than the bleeding lines did. The same clip fault was also on machine-learning-fundamentals (the boundary's top end stopped at the invisible clip line). Both of its ends are now cut on grid lines: the gutter above the dots and the 802 baseline.
4. *vision room flush to the walls*: 3 × 3 patches → 9 corridor tokens → 3 × 3 output. Everything is at least a gutter from the walls, and the grids are set diagonally (upper-left, lower-right).
5. *5D shows six axes*: now 32 ranks (2⁵), one binary split per axis, five labels each used once. Cells are tall (65 × 90) to fill the field.
6. *diffusion steps 5–6 unmask nothing*: used the reviewer's schedule verbatim, t = [4,5,2,1,5,7,6,3,4,6,2,3].

**Improvements taken**
- **Too many module matrices (1).** I agree. I added the rule above in a principled form rather than as a quota. Kernel stays the canonical matrix; Pi and Diffusion were redrawn.
- **Pi vs Hermes vs Codex (2).** Adopted as three standing windows. Frames replace hollow slots, and each label sits in its window's freed space (there is no room below columns that stand on the rule).
- **Sound room turn-taking (4).** Adopted.
- **Charlie colophon and subtitles (5).** Adopted in full: floor raised to 790–802, full-width rule back at 814, "Book II / Intelligence Factory", and subtitles without the book number or the "Vision: Vision" stutter.
- **Title breaks and tangencies (6).**
  - 5D becomes '5D Parallelism for / Large Model Training'.
  - Math becomes '… / Foundations / for Machine Learning'.
  - LLMs take the reviewer's break. I first tried keeping "Large Language Models" whole on one line, but that forced the title down to 46 px, and the title being the hero matters more.
  - SciML was reset by the same principle to 'Scientific / Machine Learning / (SciML)' at 68 px.
  - The tree's d1 leaf moved to column 6.
  - The ML boundary now runs at 45° midway between lattice diagonals. That is the only diagonal slope that can clear every dot; adjusting b alone could not.

**Partly taken or declined**
- **Diffusion as empty ground (1).** Declined in part. Masked positions are small 8 px [MASK] dots rather than empty ground, because the mask *is* the diffusion-LM concept, and the dots reuse the attention cover's masked-cell mark. The hollow squares that caused the twinning are gone.
- **VLA as a token diagram (3).** Partly taken. I built the reviewer's version (patches + instruction tokens → seven action bars + an imagined frame) and compared it side by side. It covered every word of the title but read as a four-panel dashboard at 180 px. Instead I kept the kinematic figure and rebuilt it as a schematic in the system's own terms: joints on module centres, links only at 0/45/90°, no drawn gripper or claws, a single 4 px outline for the imagined pose, and the predicted path routed clear of every ring. Vision and Language stay unshown on purpose: one figure, one idea — the act-and-imagine loop.

**Still open**
- VLA remains the most literal figure on the shelf. A stronger non-pictorial idea for "world model" would replace it.
- The `@media print` stacking workaround is kept; it is harmless now that render.js isolates each cover at trim.
