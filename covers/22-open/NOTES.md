# Textmode — a cover system for Vizuara Books

## The idea
Every Vizuara book teaches a machine that reads and writes text, so every cover is made of text.
Each emblem is set in a monospaced font on a strict **120 × 74 grid of 6 × 12 px character cells**,
the way the first computer art came off line printers. It always shows the book's actual mechanism,
with real numbers in it: the causal mask, the device mesh, the gradient step, the iris tree. It never
shows a picture of "AI". The vocabulary is small and strict: glyph ramps (` .:-=+*#%@`), slope-aware lines
(`- / | \`), frames (`+--+`) and inverse-video *tiles* that carry a number or a label. That strictness
is what makes 50 different figures read as one shelf. The title, in a big Fraunces serif, is the hero.
It ends in a text-cursor block, which is the shelf signature. The Vizuara mark is a single character
cell with a V knocked out, sitting small in the corner.

Everything is live HTML/SVG/type, drawn by code: no raster images and no image-model output. Every glyph
is individually positioned in SVG, so alignment never depends on font metrics, and the PDFs are vector.

## Layout (every cover)
- Imprint row (top, 30px): cell mark + VIZUARA BOOKS · level word + 3-cell meter.
- Title zone (y 80–352): lines set by hand (no orphans), auto-sized to fill 646px up to 112px. Text after
  a colon becomes the italic subtitle (Transformers, Pi vs Hermes vs Codex). Parentheticals such as
  (LLMs) and (DeiT) drop to the italic. The series kicker sits above the title (Charlie).
- Figure zone: cols 6–113, rows 31–66.
- Footer (bottom, 30px): `fig.` caption saying what the figure is (a front-of-book colophon) · capsules and hours
  from books.json, or `coming soon`.
- Margins are 36px (6 columns); all critical text is ≥ 30px from every edge.

## Colour: hue = shelf, lightness = level
Eight subject families (the Penguin idea of coding genres by colour). Each family is exactly **three
inks**, defined in OKLCH, so any cover can be printed in three spot colours. **Level picks which ink is the
ground**: beginner = paper, intermediate = vivid, advanced = deep. The other two inks draw the figure. Because
it's lightness, level survives greyscale printing and reads across a thumbnail grid (see the greyscale shelf
on the page). The old orange / sky-blue / magenta pinwheel is not used.

| Family | hue° | paper (beginner) | vivid (intermediate) | deep (advanced) |
|---|---|---|---|---|
| Foundations | 258 | `#e9f1fd` | `#4780d2` | `#07254f` |
| Language models | 34 | `#ffebe7` | `#e55e40` | `#4a1408` |
| Vision & multimodal | 305 | `#f3edfb` | `#926abe` | `#2d1841` |
| Systems & scale | 212 | `#e5f3f6` | `#449aaa` | `#032c33` |
| Agents & context | 152 | `#e4f5e8` | `#56aa70` | `#10301b` |
| RL & robotics | 82 | `#fcf0dc` | `#ca9830` | `#392b11` |
| Code & data (greenbar olive) | 122 | `#edf4df` | `#8fa165` | `#252c12` |
| The Intelligence Factory (cocoa) | 58 | `#fcebdf` | `#ad7951` | `#321f0f` |

## Type
- **Fraunces** 640, optical size 144, SOFT 0 / WONK 0: titles; italic 400–420 for subtitles and parentheticals.
- **JetBrains Mono** 400/500/700/800: every figure, the imprint, the level, captions and counts. Figures use only
  glyphs in the Latin, Latin-1, general punctuation and Greek subsets Google Fonts serves, so nothing falls back.

## Emblems (one line each)
- **AI Context Engineering**: sixteen candidate sources, six pulled by dotted leaders into a framed context window (system, tools, memory, retrieved ×2, history, user), with a token-budget meter.
- **Mathematical Foundations for ML**: filled contour plot of f(x) = ½ xᵀHx (ellipses = Hessian eigenstructure) and a real gradient-descent zig-zag, iterates numbered, down to x*.
- **Neural Networks from Scratch**: a 3-4-4-2 perceptron; neurons are tiles holding their activations, one forward pass lit.
- **Build LLMs from Scratch**: a 12×12 causal self-attention matrix over "The model reads one token at a time and writes the next"; the printed weights are softmaxed rows, the upper triangle is masked, and the last row predicts "token".
- **5D Parallelism**: 32 GPUs as a 2×2×2×2×2 mesh; each tile's label is its coordinate (dp pp cp tp ep); rank 0 and its five one-axis partners are lit.
- **Pi vs Hermes vs Codex**: three transcripts as three hourglasses, older turns funnelling into a summary tile when the window fills, live turns widening below (generic, no claims about each agent's internals).
- **SQL Masterclass**: a real query (JOIN, GROUP BY, ORDER BY) and its result set as a tile grid.
- **Git & GitHub Masterclass**: a network graph of main plus two branches (dark-mode, search), commits as hash tiles, merges, HEAD, and the matching `git log --oneline`.
- **Build Decision Trees from Scratch**: the classic iris tree (petal length ≤ 2.45, petal width ≤ 1.75, petal length ≤ 4.95) with the real sample counts.
- **Transformers**: one attention head, with "it" attending back to "animal" in "the animal did not cross the street because it was too tired". Arc height is distance and ink weight is attention weight.
- **Reinforcement Learning**: a gridworld solved by value iteration (γ = 0.9). Each cell shows its value and greedy arrow, and the start-to-goal path is set in tiles.
- **CNN Fundamentals**: a handwritten 7 as 14×14 pixel tiles, a 3×3 Sobel-x window, and the actual 12×12 feature map it produces.
- **DeiT from Scratch**: a picture cut into 16 patches, flattened into a sequence of mini-patches behind a class token and a **distillation token** ("learns from a teacher").
- **Kernel Engineering (coming soon)**: a tiled GEMM, C += A·B, caught mid-run. The active A row-block, B column-block and output tile are lit, finished tiles are filled, and a progress bar shows the kernel "still running", which is the coming-soon treatment.
- **Charlie and the Intelligence Factory (I–IV)**: a sub-series inside the system. It uses one family (cocoa, a chocolate-factory nod), with level still set by lightness. Every room is a door (with its room inside), a big tile-painted room number, and a belt carrying what the room makes: tokens (Language), image patches (Vision), a waveform (Sound), and rollouts with +1/0 rewards (Reasoning).

## Deliverables here
- `index.html`: the presentation, with rules, palette, type and mark, the core set, the range, the sub-series, the 180px shelf in colour and greyscale, and a **print wrap** (back with a colophon explaining the figure, a spine with vertical title, cursor, level meter and mark, and the front). Built for Build LLMs from Scratch.
- `renders/`: 2× PNG, 1× JPG and vector PDF (exact 7.5 × 9.25 in trim) for all 18 covers; `_contact-180.png`; `_sheet.png`.

## What I'd do next
- Write emblems for the remaining ~32 titles. The engine (grid, lines, tiles, frames, ramp shading) makes each one a
  short function, and a style lint should check that every emblem has at least one solid tile so it holds at 180px.
- Spine rules for the whole catalogue: spine width from page count, and the family ink banding so a shelf of spines
  reads as colour blocks by subject, darker as it gets more advanced.
- Tune the three inks per family against real press proofs (or pick Pantone matches) and add 0.125in bleed.
- Web: the figure can be served as live text (selectable, searchable), and a book page could animate the cursor
  or "type" the figure in on first view.
