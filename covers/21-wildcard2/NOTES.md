# Some Assembly Required

**Direction 21 (wildcard) — Vizuara Books cover system**

## The idea

Every Vizuara book builds a model, so every cover is a **model kit**. Each book's subject is broken into its real components and molded onto a plastic sprue, numbered in build order and ready to snap off. The components are the causal mask, the all-reduce ring, the KV cache, the split test. The sprue lies on a modeller's cutting mat, ruled in true inches at trim size. The pun does half the work (an ML *model*, a scale *model*). The other half is Vizuara's own promise: *a library for building things*, where half the titles end in *from Scratch*. The bench, frame, type, imprint and footer never change. Only the parts change, so 50 covers read as one shelf and no two look alike. Model kits are also something people already collect in numbered series, which is where the kit number comes from.

## Concepts considered and rejected

1. **Safety signage of the Intelligence Factory** (ISO 7010 grammar: green square = beginner, blue circle = intermediate, yellow warning triangle = advanced). The level encoding was superb, redundant in both shape and colour. Rejected because it is a one-joke system that slides into novelty "CAUTION: GRADIENTS" merch. One geometric sign on a grid also sits too close to direction 01, and pictograms can't show a mechanism like attention.
2. **Weaving drafts / Jacquard drawdowns.** A drawdown is literally a boolean matrix product, and the Jacquard loom is where programmable machines come from. Intellectually perfect. Rejected because the picture is a textile pattern (colliding with 12 and 05), and at 180 px it says nothing about the subject of the book.
3. **Stained-glass windows**, with the lead lines tracing each architecture. Superb at thumbnail size (black cames, jewel colour). Rejected because it reads as ecclesiastical and as a generic filter look, and there is nothing Vizuara about it.
4. **Warli painting** (Maharashtra, Vizuara's home state). The *tarpa* dance circle really does look like ring all-reduce. Rejected because it is GI-tagged Adivasi art: putting it on commercial tech covers raises real appropriation questions, and it has already become corporate-lobby décor.
5. **Pharmacy capsules / blister packs** (Vizuara's unit is literally the "capsule"). Memorable, but it frames learning as medicine, and pills say nothing about the subject.
6. **Magic-lantern lecture slides** (Vizuara books follow real lectures). Rejected because every cover becomes a black field with a glowing circle, and the title can't be the hero.

The model kit won because it has a system built in: frame, gates, numbered parts, maker's tab, skill level and kit number all come from real kits. The emblem is *derived from the subject by construction* (you have to decompose the topic into parts). And it produces a toy-like, collectible object that is still typographically serious.

## Palette (hex)

| Role | Name | Hex |
|---|---|---|
| Ground | Bench green (cutting mat) | `#1B463C` |
| Mat rules | 1 in / ½ in grid | `#2D6255` / `#24544A` |
| Ruler numerals & ticks | | `#79A596` |
| Titles, imprint, level | Cream | `#F3EEE2` |
| Taglines, kit number | Sage | `#A7C4BA` |
| Charlie sub-series ground | Factory chocolate | `#3A2219` |

**Plastic = subject family** (each plastic has a body colour plus molded light/shade tones):

| Plastic | Body | Family |
|---|---|---|
| Bone | `#ECE4D1` | Foundations, maths & programming |
| Signal red | `#E2533A` | Neural networks & vision architectures |
| Chrome yellow | `#F1BF2C` | Language models & how they are trained |
| Aluminium | `#B8BDC1` | Systems, scale & serving |
| Lilac | `#B6A5E6` | Agents, context & memory |
| Factory gold | `#D5A84C` + sheen | *Charlie and the Intelligence Factory* (Factory Edition) |
| Test shot (clear) | `#4A6E64` | Coming-soon books |

The old orange / sky-blue / magenta pinwheel is not used anywhere.

## Type

- **Archivo ExtraBold (800), 87.5% width.** Titles only, tracked −1.2%, line breaks set by hand and auto-fitted to the 624 px measure. Semi-condensed keeps even the 55-character DeiT title large in three lines.
- **Archivo 700 at 112.5% width, spaced +0.2em** for the VIZUARA BOOKS imprint.
- **Martian Mono** for everything a kit prints: part numbers, taglines, kit numbers, capsules · hours, skill level.

Both come from Google Fonts.

## Imprint

A **V molded on its own little sprue** (a V part hanging from a square runner by two gates). On each cover it sits small, top-left, next to the wordmark VIZUARA BOOKS. VIZUARA is also molded into every sprue's **maker's tab**, as real manufacturers do, next to the sprue letter (A; I–IV for the Factory Edition). The brand signs the work; the title speaks.

## Level

Kits have always printed a skill level, so level appears as **three numbered squares filled to the level** (1 = beginner, 2 = intermediate, 3 = advanced), with the level word beside them in the footer. The count of filled squares reads at 180 px and in greyscale.

## How each emblem was derived

- **ai-context-engineering.** The context window as a compartmented tray (SYSTEM / TOOLS / RETRIEVED / HISTORY), plus what gets packed into it: document, message, tool, memory chip, retriever.
- **mathematical-foundations-for-ml.** The notation itself, molded: Σ, a Gaussian with σ ticks, a matrix, ∇, ∫, a vector. Linear algebra, calculus, probability.
- **neural-networks-from-scratch.** A 3-4-2 network (hero), one neuron with Σ inside, the sigmoid, the loss bowl with its ball (gradient descent), and the parameters w and b.
- **build-llms-from-scratch.** The causal attention mask (hero), a transformer block (ATTN + FFN), a Q·K·V head, tokens split as to|ken|s, a positional wave.
- **5d-parallelism.** A 4×4 GPU grid, the all-reduce ring, the five labelled axis arrows DP·TP·PP·CP·EP, and pipeline stages.
- **pi-vs-hermes-vs-codex.** A long chat transcript, a C-clamp compacting it into a block, a memory chip, and three badges (π, a wing, a codex) separated by "vs" tiles.
- **decision-trees-from-scratch.** A depth-2 tree with split tests on its nodes (hero), a staircase decision boundary through two classes, a ≤ tile, class-count bars.
- **sql-masterclass.** A table, a join (two rings with the inner join filled), a primary key, a WHERE funnel, SELECT \*.
- **deit-from-scratch.** A big teacher network and a small student network (distillation), image patches, and the CLS and DIST tokens.
- **rlhf-from-scratch.** Thumbs-up human feedback, an A/B preference pair, a reward model with one output, the PPO clipped objective, and the KL penalty as a spring between π and ref.
- **git-github-masterclass.** A commit graph with a branch and a merge (hero), a terminal, a diff, a release tag, a fork.
- **kernel-engineering** (coming soon → Test Shot). A GPU die with SM tiles and L2, the REG/SMEM/HBM memory hierarchy, a warp of 32 threads, a tile grid.
- **charlie-language-room** (I, inference). A speech bubble mid-generation (…), the KV cache, a latency stopwatch, a sampling die, next-token tiles.
- **charlie-vision-room** (II, ViT). An eye, an image cut into 3×3 patches (the picture engraved across the tiles), the CLS + patch sequence, an encoder block.
- **charlie-sound-room** (III, voice agents). A waveform, a microphone, a two-turn conversation, a speaker.
- **charlie-reasoning-room** (IV, RL). A multi-armed bandit (three one-armed bandits with unknown payoffs), a grid world with a path to the goal, a +1 reward coin, a chain of thought.

## Special runs

- **Factory Edition** (*Charlie and the Intelligence Factory*, I–IV). Every rule stays; only the bench (chocolate) and the finish (gold plate with one continuous sheet of light across the whole sprue) change, and the sprue letters are Roman. The header reads INTELLIGENCE FACTORY · I–IV.
- **Test Shot** (coming-soon books). Clear, unpainted plastic plus a TEST SHOT · COMING SOON stamp; the footer says COMING SOON instead of capsules.

## How it scales

`index.html` is a small engine. Each book is a data record: slug, kit number, level, plastic, title lines, a one-line truthful tagline, and a list of parts in rows. The engine does the rest:

- scales and centres the parts;
- cuts tapered gates to the nearest runner;
- places the numbered tags;
- finds a clear span on the frame for the maker's tab;
- skips ejector-pin marks where they would collide;
- auto-fits the title and tagline.

The parts library holds about 60 parameterised parts (network, causal mask, cluster, tile, bubble…), many reusable across books. A new title is roughly 3–8 parts and a tagline.

## Print

- Pure vector SVG. The exported PDFs contain **zero raster images**, and the drop shadow is kept off the artwork.
- No rule under 1 px at trim, and the smallest type is 9 px (ruler numerals, decorative).
- Every plastic is light on a dark bench, so everything holds in greyscale. I checked a greyscale contact sheet; red is the weakest and was lightened.
- The ruler along the left and bottom edges is accurate at 7.5 × 9.25 in.
- For press: gloss UV spot on the plastic only over a matte mat; a metallic ink (e.g. Pantone 871) for the Factory Edition; a clear or pearlescent varnish for Test Shots.

## Deliverables in this folder

- `index.html`: the presentation (rationale, palette, type, level, rules), 16 covers and a full print wrap for *Build LLMs from Scratch*. The wrap's back cover works like a kit box's side panel: the same parts out of the sprue and assembled, instruction-sheet style, plus the parts list. The spine carries a plastic-coloured block with the kit number, so a shelf reads as a numbered, colour-coded set.
- `renders/`: PNG @2×, JPG @1×, vector PDFs at exact trim, `_contact-180.png`, `_sheet.png`.

## What I'd do next

1. Draw the parts for the remaining ~36 titles (many parts are shared: networks, tiles, blocks, clusters). Then review all 52 as one 180 px grid, rebalancing plastic families so no colour clumps.
2. Web: a tap or hover "snap-off" animation, where parts pop off the sprue. In the reader, a part snaps off as each capsule is finished, so you literally assemble the kit as you read ("Books you finish").
3. Collectibles: kit-number decal sheets and a printed "catalogue" poster of all sprues; the Factory Edition as a boxed set.
4. Polish a few drawings with more time (the Hermes wing, speaker, funnel), and hand-kern the largest title settings.
