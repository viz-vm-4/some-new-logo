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

## How level is encoded (three ways, redundantly)
1. **Ground ink**: paper, red or black (see the table above). This reads at 180 px and in greyscale.
2. **The ribbon** is the imprint mark: a bookmark hanging from the top trim in column 12, with its tail notched into a V for Vizuara. Its length is the level: 1, 2 or 3 modules. It hangs from the top of the spine too, so level shows on a shelf of spines.
3. **The colophon** states it: "Level 2 / Intermediate".

## Emblems (one line per book)
- **ai-context-engineering**: Outside the window is a uniform field of dots. Inside, the information is selected and ordered into instructions (squares), tools (rings), retrieved knowledge (large dots) and compressed memory (small dots), around one query (signal).
- **mathematical-foundations-for-ml**: A matrix maps the unit circle to an ellipse. The two eigenvectors, the directions that do not turn, run off the page in red.
- **neural-networks-from-scratch**: One neuron. Nine inputs whose stroke width is |w| converge on one summing disc, and the output leaves bent by ReLU.
- **build-llms-from-scratch**: The causal self-attention matrix of a GPT. Square area is attention weight, the upper triangle is masked (dots), and the last row (the token being predicted) is in signal.
- **5d-parallelism**: Sixty-four GPUs in a device mesh. Each gap width is one axis (TP 4 px, CP/EP 12 px, DP/PP 44 px), nested as the book composes them, and one rank is in red.
- **pi-vs-hermes-vs-codex**: A full context, then what each harness leaves behind. Pi keeps a summary plus recent turns. Hermes keeps head and tail around a summarised middle. Codex writes a handoff summary. Freed slots are hollow.
- **machine-learning-fundamentals**: A decision map. Every grid point gets a predicted class (solid or ring), the learned linear boundary is red, and three points sit on the wrong side.
- **git-github-masterclass**: A commit graph drawn like a transit diagram. A red feature branch leaves main and merges back, and another branch is still open, running off the edge.
- **decision-trees-from-scratch**: Greedy binary splits drawn orthogonally, with one example's route from the root question to its leaf in red.
- **rag-in-production**: Thirty chunks as unit vectors on a quarter circle, ranked by angle to the query (cosine similarity). The top four are at full weight and the query is in signal.
- **sciml**: The direction field of a damped oscillator (one stroke per module, integrated with RK4 in the page), with a red solution curve spiralling into equilibrium.
- **diffusion-lm-from-scratch**: Rows are denoising steps. Masked positions are hollow, and the tokens unmasked at each step are red, appearing everywhere at once rather than left to right.
- **vla-world-models**: A robot arm acting now (solid) and the pose the world model imagines reaching the target (outline), with the gripper's predicted path in dots.
- **kernel-engineering** (forthcoming): A tiled GEMM. One output tile of C accumulates a row-strip of A against a column-strip of B.
- **Charlie and the Intelligence Factory** (sub-series): each book is one room of the same floor plan, with walls drawn in the grid's gutters. The door and corridor sit at the same height on all four covers, so the set shelved face-out becomes one continuous floor. Room I has a right door, II and III have both, IV has a left door.
  - **charlie-language-room**: The prompt is prefilled as one block, then tokens are decoded one at a time and leave through the door.
  - **charlie-vision-room**: The picture is cut into patches, the patches become tokens in the corridor, and pixels generate themselves. One patch is traced through all three stages.
  - **charlie-sound-room**: A waveform that is loud in the room and silent (flat) in the corridor. The signal sample is "now".
  - **charlie-reasoning-room**: A grid world. The agent's steps (dots) find their own way from the door to the reward (red).

## Covers rendered (18)
Core set: ai-context-engineering, mathematical-foundations-for-ml, neural-networks-from-scratch, build-llms-from-scratch, 5d-parallelism, pi-vs-hermes-vs-codex.
Range: machine-learning-fundamentals, git-github-masterclass, decision-trees-from-scratch, rag-in-production, sciml, diffusion-lm-from-scratch, vla-world-models, kernel-engineering (coming soon).
Sub-series: charlie-language-room, charlie-vision-room, charlie-sound-room, charlie-reasoning-room.
Extra: a full print wrap (back + 56 px spine + front) for *Build Large Language Models (LLMs) from Scratch*. It is on the page as `.wrap`.

## Print notes
- Everything is vector (inline SVG and live text). The minimum stroke is 3 px (≈ 2.25 pt), and there is no light-grey text.
- Figures bleed only where the idea continues past the page. Critical text keeps ≥ 30 px from the trim.
- PDFs are at exact trim (540 × 666 pt). Chrome mis-paints SVG transforms and clips for fixed elements laid out beyond page 1, so in `@media print` every cover is stacked at the trim origin. The screen layout is unaffected.

## What I'd do next
- Draw the remaining ~32 figures with the same rules. Each one has to survive the question "what is this the mechanism *of*?" before it is drawn.
- Give Archivo's width axis a job for the very longest titles (e.g. DeiT) instead of stepping down in size.
- Specify spot inks for offset printing: Pantone 485 C for the red, rich black 60/40/40/100, and uncoated stock so the paper ink *is* the paper. Proof the red ground for a slight warm shift.
- Design spines for the whole list and photograph a shelf of real spines to tune ribbon lengths.
- Build a tiny generator (JSON → SVG cover) so new books are set by the system, not by hand, while each figure stays hand-constructed.
