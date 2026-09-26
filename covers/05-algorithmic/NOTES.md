# 05 — Figure 0

**Every cover is one run of the book's own algorithm.**

## The idea

A technical book's cover should be evidence, not decoration. In *Figure 0* each plate is computed
in the page, at load/print time, by the subject of the book itself: gradient descent draws the maths
book, a network trained in the browser draws *Neural Networks from Scratch*, a pipeline schedule
draws *5D Parallelism*, one agent session replayed through three compaction policies draws *Pi vs
Hermes vs Codex*. The caption under every plate is always labelled **FIG. 0** and says exactly what
ran; every number in it (steps, merges, accuracy, compaction counts, the sum a GPU thread arrives
at) is read back from the run that drew the picture. So the cover is the book's first worked
example, and the honesty rule is structural: if a caption says it's computed, the code that
computed it is the code that drew it. Everything around the plate stays quiet — one serif for the
title, one mono for data, three grounds for three levels, one signal colour that only ever marks
the answer.

Seeded and deterministic: the seed is the FNV-1a hash of the slug, so reloading gives the same
cover, and changing the algorithm changes the cover. All plates are inline SVG (vector, print-safe);
nothing is raster, nothing is stock or AI-generated.

## Palette

One palette, rotated by level:

| role | beginner | intermediate | advanced |
|---|---|---|---|
| ground | Paper `#EEEDE7` | Signal `#D8372B` | Carbon `#141518` |
| ink (title, lines) | Carbon `#141518` | Carbon `#141518` | `#ECEAE3` |
| secondary ink | `#96968F` | `#9C2A21` | `#5E5F63` |
| accent (the result) | Signal `#D8372B` | `#F4F2EB` (white) | `#EF4031` |

The accent is always whichever colour the ground is not, and it marks only the *result*: the
minima, the learned decision boundary, the shock, the chosen chunks, the trunk of the repo.
Captions name the accent word ("in red" / "in white") so they stay true on every ground.
The old orange / sky-blue / magenta pinwheel palette is not used anywhere.

## Type

- **Newsreader** (Google Fonts, variable, `opsz` 72, weight 500) — titles; italic for the Charlie
  lead-in ("Charlie and the") and for subtitles. Title size is set per title length (60–84px) with
  hand-set line breaks so nothing orphans.
- **IBM Plex Mono** — level line, capsule count, the FIG. 0 caption (10px/1.45), plate labels.

## Grid (720 × 888)

- Meta line at 34px: level squares + level word left; capsules · hours (or *Forthcoming*, or
  *Room N of IV*) right. 40px side margins.
- Title from y = 76, always finished by y ≈ 290.
- **Plate**: full-bleed field, y 306 → 790 (720 × 484). The Charlie sub-series uses a centred
  456 × 456 square "room" instead.
- Caption bottom-left (≤ 4 lines, 486px wide); imprint bottom-right.
- Imprint: **the valley** — a V drawn as a loss curve with its minimum found (a dot in the accent),
  + "Vizuara" in Newsreader. Signature-sized; never competes with the title.

## Level

Level is depth: Paper → Signal → Carbon, the deeper the book the darker the plate. It survives
greyscale print by construction (light / mid / dark), and is repeated by three squares (■□□ / ■■□ /
■■■) and the word in the meta line.

## Emblems — how each plate is derived

- **AI Context Engineering** — 2,400 synthetic chunks in a 48-d embedding space (flattened by PCA
  that is computed in-page); one query; maximal marginal relevance (λ 0.55) packs an 8,192-token
  window; threads run from each chosen chunk to its slot, most relevant placed at the window's ends.
- **Mathematical Foundations for ML** — plain gradient descent from 1,472 starts on Himmelblau's
  function; ~500k steps; every path ends in one of the 4 minima (red).
- **Neural Networks from Scratch** — a 2–16–16–1 tanh MLP trained in the page (Adam, 700 steps) on
  two spirals; the plate is the trained net's own output contoured (47 levels) with the learned
  decision boundary in red.
- **Build LLMs from Scratch** — a byte-pair tokenizer trained in the page on the titles of all 52
  Vizuara books (195 merges); arcs join consecutive uses of the same token (word-initial tokens
  above, the rest below); "Scratch" in white.
- **5D Parallelism** — discrete-event simulation of one step on a 128-GPU mesh (DP2 × PP8 × TP2 ×
  CP2 × EP2), 1F1B schedule, 16 micro-batches, ±7% kernel noise, groups wait for their slowest
  member; red = gradient all-reduce.
- **Pi vs Hermes vs Codex** — one simulated 200-turn agent session replayed under three generic
  compaction policies (drop-oldest, rolling summary, tiered memory); lines are message positions in
  the window over time; summaries in red. (Deliberately *not* labelled as the three products'
  actual implementations — the caption only claims what was simulated.)
- **Build Decision Trees from Scratch** — CART (Gini, depth ≤ 7) grown on 300 labelled points; the
  partition drawn with line weight by depth, root split in red, leaves hatched by vote.
- **Git & GitHub Masterclass** — a simulated repository history (commits, feature branches, merges)
  laid out like `git log --graph`, time running right; main in red.
- **Scientific ML (SciML)** — viscous Burgers' equation (the classic PINN benchmark) solved by
  finite volumes; 170 particles carried by the flow; shocks in red, merging into a Y.
- **Kernel Engineering** (forthcoming) — a Kogge–Stone prefix sum over 64 threads, 6 steps, with the
  seeded input digits on top; red = the additions one thread depends on, and the sum it reaches
  (checked against a sequential sum).
- **Charlie I · Language Room** — a character 5-gram model trained in-page on the library's titles;
  beam search continues "Charlie and the …"; the tree is its branches, labels are the titles it
  finished (it invents "Rearning"); red is this book's own title, found as its no. 11 guess.
- **Charlie II · Vision Room** — the fixed 2-D sine–cosine position embeddings of a ViT (8 × 8
  patches, d = 256): each glyph contours one patch's cosine similarity to every position.
- **Charlie III · Sound Room** — a voice synthesised in-page (glottal pulses → 3 formant filters,
  /a/→/i/→/u/), then analysed: pitch by autocorrelation, loudness by a 512-point STFT; 35 harmonic
  ribbons, width = loudness, the fundamental in white.
- **Charlie IV · Reasoning Room** — Thompson sampling on a 12-armed Bernoulli bandit, 1,600 pulls,
  sqrt time axis; each dash a pull, thin line = the agent's belief; the best arm in red.

Sub-series treatment: the Charlie books swap the full-bleed field for the square room plate, add
an italic lead-in, and carry "Room N of IV" in the meta line — same grid, recognisably a set.

## Print

- Everything is vector; PDFs from `render.js --pdf` embed Newsreader and IBM Plex Mono.
- Minimum stroke 0.5 CSS px (0.375pt) — only in the densest textures; most lines are 0.7–1.5px.
- No grey body text on light grounds; captions are full ink. Checked as a greyscale contact sheet.
- A full wrap (back + 0.75in spine + front) is on the page for *Mathematical Foundations*; the back
  cover prints the exact function that drew the front, plus its seed.
- Page load, including training the network, is ~1.3s in headless Chromium.

## What I'd do next

1. Write generators for the remaining ~38 titles (RAG: HNSW graph search; Transformers: a real
   attention map from a tiny trained model; Diffusion LM: denoising trajectories; RLHF: reward-model
   Bradley–Terry fits; SQL: a B-tree built by inserts; Inference Engineering: paged KV-cache block
   allocation under continuous batching; DSA: a quicksort swap trace).
2. A CI check that re-runs every generator and asserts the caption numbers and the SVG hash — so a
   cover can never drift from its caption.
3. Export each plate as a standalone SVG + the source snippet, for the book's own "Figure 0"
   opening page — the cover becomes the first figure of chapter 1.
4. Spine system for the whole shelf (level squares + valley mark line up across 50 spines).
5. Per-title optical kerning pass on the big Newsreader settings, and a proof on uncoated stock to
   tune the red and the 0.5px textures.
