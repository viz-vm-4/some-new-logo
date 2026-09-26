# 10 · Wildcard — **Some Assembly Required**

## The idea
Vizuara describes itself as *"a library for building things"*. Its books are taught in **capsules**, and half its titles end in **"from Scratch"**. So every Vizuara book is treated as a **model kit**.

Each cover's emblem is an injection-moulded **parts tree (sprue)**, and the parts are the book's own subject: the causal mask and twelve transformer blocks, a neural network whose runners are its weights, a balanced H-tree runner feeding 32 GPUs through five levels of parallelism. They're laid out ready to snap off and assemble.

The system is the kit box. Every cover has the same runner frame, the same maker's tab, the same skill-level badge and a kit number. Only the plastic and the parts change. Kit culture already has everything the brief asks for:
- a printed **skill level**, which carries our level;
- **catalogue numbers**, which make the library collectable;
- **series colours**, which carry our subject families;
- **test shots**, the clear pre-production mouldings, which carry our coming-soon titles.

No other publisher could own this, because the metaphor comes straight out of Vizuara's own vocabulary.

## Concepts considered and rejected
1. **Blister pack / pharmaceutical packaging.** This makes the "capsule" literal, with a pill for every lesson. Rejected: it reads as medicine, and a drug-packaging parody is the wrong joke for an education brand.
2. **Gashapon capsule toys** ("collect all 52"). The capsule pun works and they are genuinely collectable. Rejected: every cover becomes the same round plastic bubble, and it is too toy-like for *5D Parallelism*.
3. **Merit badges / embroidered patches** ("earn the skill"). Rejected: it is Scouting pastiche, faked embroidery looks cheap in vector, and the emblem gets trapped inside a small badge.
4. **Paper-cut depth, where the number of layers is the level.** This had a lovely level mapping ("deep" learning). Rejected: it is a trendy craft look that anyone could own, and nothing about it is Vizuara.
5. **Kolam dot-grid line drawings.** There is a real link to computation (Siromoney's kolam array grammars) and to Vizuara's Indian roots. Rejected: it is generative-pattern territory (direction 05's), and it decorates rather than showing the subject.
6. **Muybridge-style motion studies of each algorithm.** Rejected: a 12-frame grid turns into noise at 180 px, and it also overlaps 05.
7. **Postage stamps, with the imprint as the postmark.** Philately is collecting by definition. Rejected: the stamp format fights "title is the hero" and shrinks the emblem.

## Palette (with conviction)
**Card encodes level.** The three cards are clearly separated light, mid and dark, so the level survives greyscale.
- **Bone** `#EEE8DC`: beginner
- **Grey Primer** `#A4A39B`: intermediate. This is the modeller's primer grey. Kraft `#C49D63` was tried and rejected because chrome yellow died on it.
- **Carbon** `#171717`: advanced
- **Cocoa** `#3A2219`: the Charlie Factory Edition only

**Plastic encodes series.** Each colour is a single moulding colour, with its edge, shadow and highlight tones derived by formula.
- **Signal Red** `#D8402A`: Foundations (maths, classical ML, programming)
- **Cobalt** `#2F57D3`: Language (LLMs, prompting, transformers)
- **Viridian** `#17936D`: Vision and multimodal
- **Chrome Yellow** `#F2B41E`: Agents and context
- **Styrene White** `#EEECE5`: Systems and scale (training, serving, kernels)
- **Violet** `#8457DB`: Learning and control (RL, RLHF, robotics, SciML)
- **Factory Edition candy:** Strawberry `#EE5D67`, Mint `#5FCDA9`, Lemon `#F3D34E`, Grape `#A57DEB`
- **Clear**: test shot for coming-soon titles. It is the card colour lifted 7% toward white, with light edges and no shadow.
- **Test-shot stamp**: vermilion `#E5533A`, used only there.

The retired orange, sky-blue and magenta pinwheel is not used anywhere.

## Type
- **Archivo** (Omnibus-Type, Google Fonts), ExtraBold at 112.5% width, for titles. Lines are hand-broken so there are no orphans, and each line is auto-fitted to the 650 px measure. Maximum sizes are 92, 76, 64 and 54 px for 1 to 4 lines.
- The title block is **bottom-anchored**, so the last line always sits 34 px above the sprue. The title and the kit read as one unit.
- **IBM Plex Mono** SemiBold for the kit data: kit number, series, badge and contents line.
- Archivo ExtraBold at 125% width, letter-spaced, for text *moulded into* the plastic: the tab and part labels.
- **Imprint:** a new Vizuara mark, a "V" moulded as a tiny sprue. Two parts are gated into one injection point, which also reads as two inputs feeding one neuron. It appears with the words **VIZUARA BOOKS** bottom-left, and again as moulded lettering on each sprue's maker's tab (`VIZUARA · VZ-004 · A`). It is always quieter than the title.

## How level is encoded
Level is encoded twice.
1. The **card colour**: Bone, Grey Primer or Carbon.
2. The kit-box **SKILL LEVEL** badge top-right, which names the level and shows **1, 2 or 3 filled pips**.

The pips carry the level by themselves in greyscale and on the Cocoa sub-series, where the card can't. They also repeat on the spine.

## System anatomy (720 × 888, 36 px margins; critical text ≥ 30 px from trim)
- **Top row**: the kit number `VZ-###` (catalogue order, 001–052) plus the series name on the left, and the skill-level badge on the right.
- **Title block**: bottom-anchored at y = 308, with an optional truthful subtitle (the subtitle given in the catalogue, or the part after a colon).
- **Sprue**: fixed at 648 × 476 from y = 338. It uses the same runner frame (9 px rod, 16 px radius) and the same maker's tab bottom-left on every book, and the tab carries the tree letter (A, or I–IV for the Factory Edition).
- **Rendering**: everything is pure vector SVG, drawn in passes (hard offset shadow → edge → rod body → specular line → part body with a clipped bevel → moulded detail). Runners and parts fuse into one object. There are no filters and no raster images: the PDFs contain zero image XObjects.
- **Minimum strokes**: 1.1 px (0.8 pt) at trim. Moulded part numbers are ≥ 8 px, which is decorative. All critical text is ≥ 11 px.
- **Where it fits, one part = one capsule**: Build LLMs (20), Pi vs Hermes vs Codex (9), Decision Trees (23), Sound Room (20) and Reasoning Room (21).
- **Coming soon**: the sprue is moulded in Clear with no shadow, with a rubber-stamped TEST SHOT · COMING SOON, and the contents line reads "In the factory".
- **Factory Edition**: Cocoa card and candy plastic, with the series name and Roman numeral in the kit line and on the tab. Everything else is unchanged.
- **Spine** (wrap and full-catalogue shelf): the series plastic as a colour band at the head with the kit number, then the level pips, the title, and the mark at the foot.

## Emblems — how each was derived
- **VZ-001 AI Context Engineering.** The context window is a tray with a fixed set of slots: system, tools, memory, docs, history, user, and a 0–128K token ruler. The tree holds more pieces than the tray can take, and choosing among them is the discipline.
- **VZ-002 Mathematical Foundations for ML.** An "alphabet sprue" of the notation: Σ ∫ ∂ ∇ π λ θ √, a matrix, e, ∞ and μ, numbered 1–12.
- **VZ-003 Neural Networks from Scratch.** A 3-4-4-2 perceptron where every weight is a runner, so plastic reaches each neuron along its incoming weights.
- **VZ-004 Build LLMs from Scratch.** 20 capsules, 20 parts: the causal attention mask, 12 transformer blocks, the tokens *to be or not to* and the next token, **?**. The back of the wrap answers it: *be*.
- **VZ-005 5D Parallelism.** A balanced runner (H-tree), which is how real moulds feed many cavities equally. Its five branchings are labelled DP, PP, CP, EP and TP, feeding 2⁵ = 32 GPU dies, each numbered with its rank.
- **VZ-006 Pi vs Hermes vs Codex.** Three agents on one test bench. Each row runs a long history through a compactor to a short summary: 9 capsules, 9 parts. The rows are deliberately identical so the cover makes no claim about which agent does what.
- **VZ-014 Build Decision Trees from Scratch.** The runner is the tree, and plastic enters at the root split (x ≤ t). 11 split diamonds and 12 two-class leaves make 23 parts.
- **VZ-020 R Masterclass.** Least squares, moulded. The fitted line is the runner, each observation hangs off it by a gate as long as its residual, and `lm(y ~ x)` is moulded on the axis.
- **VZ-024 CNN Fundamentals.** The input map with the kernel's footprint, the 3×3 Sobel kernel with its weights, the output map with the cell it just filled, and the feature-map pyramid.
- **VZ-037 Build a DeiT from Scratch.** A picture cut into 3×3 patches, and the token row with CLS plus the extra DIST token. The CNN teacher's runner feeds the distillation token, and there are two heads.
- **VZ-040 Modern Robot Learning.** A robot-arm kit: base plate, two links, servo horns, gripper jaws and their gear, plus a demonstrated trajectory with waypoints.
- **VZ-051 Kernel Engineering** (coming soon). Tiled GEMM: A tiles and B tiles meet in one C₁₂ tile, with the HBM, SMEM and register hierarchy beside it. It is shown as a clear test shot.
- **VZ-046 Charlie I · Language Room.** Inference: every token leaves a K and a V in the cache, the next token and its K₆/V₆ are still on the sprue, and p(next) sits below.
- **VZ-047 Charlie II · Vision Room.** An eye cut into 16 patches (ViT), then [CLS], the position embedding, the head and the answer, "eye".
- **VZ-048 Charlie III · Sound Room.** A spoken phrase cut into 20 frames, one part per capsule, numbered on the runner.
- **VZ-049 Charlie IV · Reasoning Room.** A policy moulded as arrows on a gridworld leading to the goal star, and five bandit arms whose heights are their value estimates: 16 + 5 = 21 parts.

## Series assignment for the whole catalogue (shown as the 52-spine shelf on the page)
- **Foundations / Red:** mathematical-foundations, neural-networks, ml-fundamentals, python-for-data-science, decision-trees, deep-learning-fundamentals, foundations-for-ai-ml, git-github, modern-software-developer, r, sql, dsa-in-python, ml-dl-mastery, writing-papers
- **Language / Cobalt:** build-llms, prompt-engineering, generative-ai-fundamentals, llm-finetuning, nlp-cv-mastery, transformers-from-scratch, diffusion-lm, kimi-k3-from-scratch
- **Vision / Viridian:** cnn, computer-vision-bootcamp, vit, deit, nanovlm, transformers-vision-multimodal
- **Agents / Yellow:** ai-context-engineering, pi-vs-hermes-vs-codex, deepseek-harness, rag-in-production, ai-agents-bootcamp, claude-certified-architect, memory-in-ai-systems, mini-clawdbot, harness-engineering
- **Systems / White:** 5d-parallelism, how-to-host-kimi-k3, pretraining-mini-kimi-k3, llm-production-deployment, kernel-engineering, inference-engineering
- **Learning / Violet:** reinforcement-learning, rlhf, modern-robot-learning, sciml, vla-world-models
- **Factory Edition:** the four Charlie books

## What I'd do next
- **Emblems for the other 36 books**, all written with the same small `Sprue` API (runner, gate, part, groove, text). Some are begging for it:
  - Git: the commit graph *is* a runner, with branches, merges and commits as discs.
  - SQL: two table plates joined by a key runner.
  - RAG: chunk tiles, a retriever, and top-k.
  - Kimi K3 / MoE: a router runner that branches to experts, only some of them filled.
  - LLM Finetuning: a frozen tree in grey plus a small LoRA fret in the series colour.
- **Formalise the emblem spec** as a declarative parts list (JSON), so a new book's cover is a short data file and every layout rule stays enforced.
- **Print finish:** matte laminate with spot-gloss UV on the plastic only, so the sprue literally shines. The coming-soon test shots would get a vellum or clear-acetate jacket.
- **Web:** on hover, the thumbnail's parts "snap off" the runner. The library page could filter by plastic, and a member's profile could show the kits they've completed.
- **Back covers** for every title, with the same assembly-instruction format as the VZ-004 wrap: 4 steps drawn from the same parts, plus a parts count.

## Files
- `index.html`: the presentation page. It has the rationale, palette and type, 16 covers at full size, the full print wrap for VZ-004 (`.wrap`), the 52-spine catalogue shelf, and the 180 px grid.
- `renders/<slug>.png` (2×), `renders/<slug>.jpg` (1×), `renders/pdf/<slug>.pdf` (vector, exact 7.5 × 9.25 in trim), `renders/_sheet.png` (the full page), and `renders/_wrap-build-llms-from-scratch.png` (the print wrap at 2×).
