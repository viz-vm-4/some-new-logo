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
  Captions are written in a code voice (`lr = 0.0006`, `lambda = 0.55`, `u_t + u·u_x`, `2^k`,
  `depth <= 7`) so every glyph is one Plex Mono actually has — no per-glyph fallback in print.

## Grid (720 × 888)

- Meta line at 34px: level squares + level word left; capsules · hours (or *Forthcoming*, or
  *Room N of IV*) right. 40px side margins.
- Title from y = 76, always finished by y ≈ 290.
- **Plate**: y 306 → 790. Written rule: *fields* (maths, NN, SciML) bleed left and right
  (720 wide); *charts* (context, LLM, 5D, pi, trees, git, kernel) sit exactly on the 40px column,
  x 40–680. The Charlie sub-series uses a centred 456 × 456 square "room" instead.
- **The answer**: every plate carries one accent figure ≥ 2.4px, drawn on a ground-coloured
  casing, so it is the heaviest thing on the plate in weight and luminance, not just hue — it
  survives 180px and greyscale.
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
  Vizuara books (195 merges), then run on this book's own title: the merge tree, each arch as tall
  as the merge was late to be learned; 47 characters → 10 tokens; the arches that build "Scratch"
  in white.
- **5D Parallelism** — discrete-event simulation of one step on a 128-GPU mesh (DP2 × PP8 × TP2 ×
  CP2 × EP2), 1F1B schedule, 16 micro-batches, ±7% kernel noise, groups wait for their slowest
  member; red = gradient all-reduce.
- **Pi vs Hermes vs Codex** — one simulated 200-turn agent session replayed under three textbook
  compaction policies, lettered A–C (drop-oldest, rolling summary, tiered memory); every third
  message's position in the window over time; summaries in red. Caption says outright these are
  not the three agents' own implementations.
- **Build Decision Trees from Scratch** — CART (Gini, depth ≤ 7) grown on 300 labelled points; the
  partition drawn with line weight by depth, root split in red, leaves hatched by vote.
- **Git & GitHub Masterclass** — a simulated repository history (commits, feature branches, merges)
  laid out like `git log --graph`, time running right; main in red.
- **Scientific ML (SciML)** — viscous Burgers' equation (ν = 0.01/π) from a seeded, perturbed
  start (u0 = −sin πx + 0.39 sin 3πx − 0.12 sin 5πx, to t = 1.5 — printed in the caption) solved
  by finite volumes; 170 particles carried by the flow; shocks tracked and drawn in red, merging
  into a Y.
- **Kernel Engineering** (forthcoming) — a Kogge–Stone prefix sum over 64 threads, 6 steps, with the
  seeded input digits on top; red = the additions one thread depends on, and the sum it reaches
  (checked against a sequential sum).
- **Charlie I · Language Room** — a character 5-gram model trained in-page on the library's titles;
  beam search (width 32) continues "Charlie and the …" across the full room; branch weight is its
  probability relative to the best branch at that depth; only finished whole-word titles are
  labelled; red is this book's own title, found as its no. 11 guess.
- **Charlie II · Vision Room** — fixed 2-D sine–cosine position embeddings, the kind used by MAE
  and Simple ViT (8 × 8 patches, d = 256): each glyph contours one patch's cosine similarity to
  every position.
- **Charlie III · Sound Room** — a voice synthesised in-page (glottal pulses → 3 formant filters,
  /a/→/i/→/u/), then analysed: pitch by autocorrelation, loudness by a 512-point STFT; 35 harmonic
  ribbons, width = loudness, the fundamental in white.
- **Charlie IV · Reasoning Room** — Thompson sampling on a 12-armed Bernoulli bandit, 1,600 pulls,
  sqrt time axis; each dash a pull, thin line = the agent's belief; the best arm in red (pulled
  1,345 times, paid out 990 — both counted separately).

Sub-series treatment: the Charlie books swap the full-bleed field for the square room plate, add
an italic lead-in, and carry "Room N of IV" in the meta line — same grid, recognisably a set.

## Print

- Everything is vector; PDFs from `render.js --pdf` embed Newsreader and IBM Plex Mono.
- Minimum stroke 0.5 CSS px (0.375pt) — only in the densest textures; most lines are 0.7–1.5px.
- No grey body text on light grounds; captions are full ink. Checked as greyscale conversions of
  the JPGs at 180px and 440px: the cased accent is the heaviest figure on every plate.
- PDFs embed only Newsreader and IBM Plex Mono (checked with `grep FontName`); labels on plates
  sit on ground-coloured cards, not `paint-order` halos (those print as blobs in Chrome PDF).
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

## Generator map — all 52 slugs (to catch collisions before writing them)

Rules: one mechanism per book, never reused; **survey books** (… Fundamentals / Mastery,
Foundations, certification) get a plate computed from the book's own capsule list (topic graph,
laid out by force-directed layout, the capsule it starts from in accent) until a single algorithm
is chosen; the **Kimi K3** trio becomes a sub-series like Charlie: one MoE router run seen at
three scales.

| slug | plate | state |
|---|---|---|
| ai-context-engineering | MMR packing of an 8k window | done |
| mathematical-foundations-for-ml | GD on Himmelblau | done |
| neural-networks-from-scratch | MLP trained in-page, logit contours | done |
| build-llms-from-scratch | BPE merge tree of its own title | done |
| 5d-parallelism | 1F1B on a 128-GPU mesh | done |
| pi-vs-hermes-vs-codex | 3 textbook compaction policies | done |
| decision-trees-from-scratch | CART partition | done |
| git-github-masterclass | simulated `git log --graph` | done |
| sciml | Burgers' shocks | done |
| kernel-engineering | Kogge–Stone scan | done |
| charlie-language/vision/sound/reasoning-room | beam search / 2-D pos-emb / STFT / Thompson | done |
| inference-engineering | paged KV-cache block allocation under continuous batching | next |
| harness-engineering | agent-loop state machine: tool calls, retries, a timeline | next |
| deepseek-harness | needs the book's content; must not repeat harness-engineering | open |
| how-to-host-kimi-k3 / pretraining-mini-kimi-k3 / kimi-k3-from-scratch | Kimi sub-series: one MoE router — serving load per GPU / expert load over training / one sentence's routing path | next |
| transformers-from-scratch | 1-head causal attention trained on the titles — the triangle | next |
| vit-from-scratch | patch embedding of its own rasterised title | next |
| deit-from-scratch | teacher/student agreement of the distillation token | next |
| transformers-vision-multimodal | cross-attention, text tokens → image patches | next |
| nanovlm-from-scratch | contrastive image–text similarity matrix, diagonal emerging | next |
| diffusion-lm-from-scratch | masked diffusion: unmasking order of its own title | next |
| rlhf-from-scratch | Bradley–Terry reward fit on seeded preferences | next |
| llm-finetuning | LoRA: singular spectrum of the low-rank update | next |
| llm-production-deployment | autoscaling queue simulation, latency percentiles | next |
| rag-in-production | HNSW graph built, one greedy search path | next |
| memory-in-ai-systems | Hopfield network storing and recalling patterns | next |
| mini-clawdbot | tool-call dependency DAG scheduled in parallel | next |
| ai-agents-bootcamp | A* search trails on a seeded maze | next |
| reinforcement-learning | Q-learning value field + greedy policy on a gridworld | next |
| modern-robot-learning | 2-link arm reaching by CCD inverse kinematics | next |
| vla-world-models | world-model rollouts diverging from the true trajectory | next |
| cnn-fundamentals | conv feature maps of its own rasterised title | next |
| computer-vision-bootcamp | Hough transform on a procedural scene | next |
| deep-learning-fundamentals | per-layer gradient norms through a deep MLP (vanishing) | next |
| machine-learning-fundamentals | k-means: Lloyd iterations as centroid trails | next |
| generative-ai-fundamentals | Gaussian mixture fit by EM, samples drawn | next |
| prompt-engineering | one prompt sampled at five temperatures (sampling, not beam) | next |
| python-for-data-science | Timsort run-merging trace (Python's own sort) | next |
| dsa-in-python | quicksort swap trace | next |
| sql-masterclass | B-tree built by inserts | next |
| r-masterclass | lowess smoothing iterations (R core) | next |
| writing-papers | Knuth–Plass line breaking of its own blurb | next |
| modern-software-developer | topological sort of a seeded dependency tree | next |
| foundations-for-ai-ml, ml-dl-mastery, nlp-cv-mastery, claude-certified-architect | survey rule: capsule-list topic graph | rule |

## Review response (round 2)

Every must-fix was checked against the renders first; all seven were correct.

1. **889px renders** — confirmed (720×889 / 1440×1778). Re-rendered with the new render.js; `.sec`
   headers now have a fixed 140px height, presentation text uses integer line-heights, and each
   wall snaps to a whole-pixel y. All outputs are now 720×888 / 1440×1776.
2. **Accent fails in greyscale** — confirmed. Every answer is now drawn on a ground-coloured casing
   and at ≥ 2.4px (SciML 4.4, Kernel 3.4, trees root 7, NN boundary 2.6); competing texture knocked
   back (Kernel diagonals .45, 5D fwd/bwd .6/.72, SciML particles .5, NN contours .5); the 5D
   all-reduce is now a solid block per stage. Re-checked on greyscale JPGs at 180px and 440px.
3. **Glyph fallback** — confirmed (DejaVuSansMono in 7 PDFs). Took the code-voice route rather than
   a second mono: it suits a caption that describes code. No DejaVu in any PDF now. `git log
   --graph` is nowrap.
4. **SciML "classic benchmark"** — correct. The caption now prints the seeded initial condition and
   t = 1.5; the benchmark claim is gone. Kept the perturbed start: the merging Y is the image.
5. **Bandit "won"** — correct. Now "pulled 1,345 times … paid out 990", both counted.
6. **Pi/Hermes/Codex mapping** — correct that the layout implied it. Panels are lettered A–C and
   the caption says they are "not the three agents' own implementations". I kept the order
   simple → complex, because that progression is the plate's argument; the letters and the
   disclaimer break the mapping. Labelling each agent's real policy needs the book's content,
   which I don't have.
7. **Vision provenance** — correct. Caption now says "the fixed 2-D sine–cosine kind used by MAE and
   Simple ViT".

Improvements:
1. **LLM plate** — taken: the merge tree of the book's own title (first option). Kept the attention
   triangle for *Transformers from Scratch* so the two don't collide.
2. **Language Room** — taken: tree spans the room, weight = probability, labels only for whole-word
   titles, on cards. Kept left-to-right rather than radial, because it reads in the direction the
   text is generated.
3. **Pi line budget** — taken: every third message on all three panels, 0.7px strokes. Panel A
   stays the densest, honestly: drop-oldest never consolidates anything.
4. **Column rule + tree classes** — taken, written into the grid above; tree points are now
   rings / dots / crosses.
5. **Titles** — taken: Maths "Mathematical / Foundations for / Machine Learning" 68px; 5D
   "5D Parallelism / for Large / Model Training" at 72px (74 would pass y 290); SciML
   "Scientific / Machine Learning / (SciML)". Kerning: declined a manual pass for now. I reviewed
   the 84px settings with the font's own kerning on and saw no pair that needed overriding.
6. **Generator map** — taken: the table above, with the survey-book rule and the Kimi sub-series.
