# On the Bench

**Direction 21 (wildcard) — Vizuara Books cover system.** This direction was called *Some Assembly Required* in round 1. It was renamed because direction 10 independently reached a model-kit concept too. Modellers say a kit is "on the bench" while they are building it.

## The idea

Every Vizuara book builds a model, so every cover is a **model kit, photographed on the modeller's bench**. Each book's subject is broken into its real components and molded as pictorial plastic parts on a sprue, numbered in build order and ready to snap off. The components are the causal mask, the all-reduce ring, the KV cache, the split test.

The constant that makes the set is **the bench**: a green self-healing cutting mat, ruled in true inches along the left and bottom edges. Printed at 7.5 × 9.25 in, that ruler measures correctly. The pun does half the work (an ML *model*, a scale *model*). The other half is Vizuara's promise: *a library for building things*, where half the titles end in *from Scratch*. The bench, frame, type, imprint, maker's tab and footer never change; only the parts do.

The *Charlie and the Intelligence Factory* books are the **Factory Edition**: gold-plated sprues on a chocolate bench.

### What keeps this take distinct from direction 10

- The mat, not a box. Every cover is the same bench with a different kit on it.
- The parts are **pictorial objects**: a thumbs-up, a C-clamp crushing a transcript, an eye, a key, a multi-armed bandit. The sprue is not a diagram of the mechanism.
- Injection-moulded shading (light top-left, shade bottom-right, a hard shadow on the mat).
- The gold-plated Factory Edition and the clear-plastic Test Shot as special runs.

## Concepts considered and rejected

1. **Safety signage of the Intelligence Factory** (ISO 7010 grammar: green square = beginner, blue circle = intermediate, yellow warning triangle = advanced). The level encoding was superb. Rejected because it is a one-joke system that slides into novelty "CAUTION: GRADIENTS" merch, it sits too close to direction 01, and pictograms can't show a mechanism.
2. **Weaving drafts / Jacquard drawdowns.** A drawdown is literally a boolean matrix product. Rejected because the picture is a textile pattern (colliding with 12 and 05) and says nothing about the subject at 180 px.
3. **Stained-glass windows**, with the lead lines tracing each architecture. Rejected as ecclesiastical, a generic filter look, and not Vizuara's.
4. **Warli painting** (Maharashtra, Vizuara's home state; the *tarpa* dance circle really does look like ring all-reduce). Rejected because it is GI-tagged Adivasi art, which raises appropriation questions, and it has already become corporate-lobby décor.
5. **Pharmacy capsules / blister packs** (Vizuara's unit is the "capsule"). Rejected because it frames learning as medicine, and pills say nothing about the subject.
6. **Magic-lantern lecture slides.** Rejected because every cover becomes a black field with a glowing circle, and the title can't be the hero.

## Palette (hex)

| Role | Name | Hex |
|---|---|---|
| Ground | Bench green (cutting mat) | `#1B463C` |
| Mat rules | 1 in / ½ in grid | `#2D6255` / `#24544A` |
| Ruler numerals & ticks | | `#79A596` |
| Titles, imprint, level | Cream | `#F3EEE2` |
| Taglines, kit number | Sage | `#A7C4BA` |
| Factory Edition ground | Factory chocolate | `#3A2219` |

**Plastic = subject family:**

| Plastic | Body | Family |
|---|---|---|
| Bone | `#ECE4D1` | Foundations, maths & programming |
| Signal red | `#E2533A` | Neural networks & vision architectures |
| Chrome yellow | `#F1BF2C` | Language models & how they are trained |
| Aluminium | `#B8BDC1` | Systems, scale & serving |
| Lilac | `#B6A5E6` | Agents, context & memory |
| Factory gold | `#D5A84C` + sheen | Factory Edition (Charlie) |
| Test shot (clear) | `#4A6E64` | Coming-soon books |

The retired orange / sky-blue / magenta pinwheel is not used.

## Type

- **Archivo ExtraBold (800), 87.5% width** for titles, tracked −1.2% and broken by hand, then auto-fitted to the 624 px measure. Factory Edition titles set "Charlie and the" at half size as a series line.
- **Archivo 700 at 112.5% width** for the VIZUARA BOOKS imprint.
- **Martian Mono** for part numbers, taglines, kit numbers and the capsules · hours footer.

## Imprint

A V molded on its own little sprue, small, top-left, beside the wordmark. VIZUARA is also molded into every sprue's **maker's tab**, next to the sprue letter (A; I–IV for the Factory Edition). The tab now sits in **one fixed slot, top-right on the frame, on every cover**, and the parts are laid out around it.

## Level

Three **30 px** numbered squares filled to the level (1 beginner, 2 intermediate, 3 advanced), with the level word beside them, as on a kit box's skill badge. At 180 px each square is about 7.5 px, and the count of filled squares reads in the contact sheet and in greyscale.

## How each emblem was derived

- **ai-context-engineering.** The context window as a compartmented tray (SYSTEM / TOOLS / RETRIEVED / HISTORY) plus what gets packed into it: document, message, tool, memory chip, retriever.
- **mathematical-foundations-for-ml.** The notation itself: Σ, a Gaussian N(0, σ) with ticks at ±1σ and ±2σ, a matrix, ∇, ∫, a vector.
- **neural-networks-from-scratch.** A 3-4-2 network (hero), one neuron with Σ inside, the sigmoid, the loss bowl with its ball (gradient descent), w and b.
- **build-llms-from-scratch.** The causal attention mask (hero), a transformer block (ATTN + FFN), a Q·K·V head, tokens split as to|ken|s, a positional wave.
- **5d-parallelism.** Five parallelism axes (DP·TP·PP·CP·EP) radiating 72° apart from one hub (hero), the all-reduce ring with molded direction arrows, then a GPU grid and four pipeline stages.
- **pi-vs-hermes-vs-codex.** A long chat transcript as one tall tray of alternating turns, a C-clamp compacting it into a block about a third its height, memory notes, and three badges (π, a winged Hermes, a codex) separated by "vs" tiles.
- **decision-trees-from-scratch.** A depth-2 tree: x ≤ 2.5, then y ≤ 1 on the left and y ≤ 4 on the right. Beside it is the exact staircase boundary that tree produces, with every point on its correct side, plus a ≤ tile and class-count bars.
- **sql-masterclass.** A table, a join (two rings with the inner join filled), a primary key, a WHERE funnel, SELECT \*.
- **deit-from-scratch.** A **CNN teacher** (feature maps shrinking in size, growing in channels) pointing at the DIST token. Below: image patches, the CLS + patch token row, and the transformer encoder block (the student).
- **rlhf-from-scratch.** Thumbs-up human feedback and an A/B preference pair (hero row), then a reward model with one output, PPO's clipped objective for A > 0 (rises with r, flat after 1+ε; ticks at 1 and 1+ε), and the KL penalty as a spring between π and ref.
- **git-github-masterclass.** A commit graph with a branch and a merge (hero), a terminal, a diff, a release tag, a fork.
- **kernel-engineering** (Test Shot). A single-row first sprue: a GPU die (SM tiles and L2) and the REG/SMEM/HBM memory hierarchy.
- **charlie-language-room** (I, inference). A speech bubble mid-generation (…), the KV cache, a latency stopwatch, a sampling die, next-token tiles.
- **charlie-vision-room** (II, ViT). An eye on its own hero row. Below: an image cut into patches (the picture is a decal laid across the tiles), the CLS + patch sequence, an encoder block.
- **charlie-sound-room** (III, voice agents). A waveform (hero), the ASR → LLM → TTS loop with its next-turn return and a barge-in bolt, a voice-activity window bracketing the speech, and a USER/AGENT turn-taking timeline with overlapping hand-offs.
- **charlie-reasoning-room** (IV, RL). A multi-armed bandit (three one-armed bandits with unknown payoffs), a grid world with a path to the goal, a +1 reward coin, a chain of thought.

## How it scales

Each book is a data record: slug, kit number, level, plastic, title lines, a truthful tagline, and parts in rows. The engine does the rest:

- It scales the parts. The hero row goes up to 1.6×, other rows up to 1.3×.
- It cuts tapered gates, numbers the tags, and skips ejector pins that would collide.
- It keeps the tab slot clear. Gates never run into it, and parts are pushed down beneath it.
- It auto-fits the title and tagline.

A **hero registry** checks the catalogue on every render and logs an error if it finds a problem. The rules:

- A hero part belongs to one book.
- A part shared between books may only appear below the hero row.

This matters because about 15 future transformer titles will all reach for the causal mask, Q·K·V and tokens. Covers can also use a single-row "big part" layout (Kernel) or a hero on its own row (Vision Room, Sound Room), so a grid of 50 has rhythm.

## Print

- Pure vector SVG. The PDFs contain no raster images, and `tools/pdfpeek.js` reports all 16 as `ok` against their JPGs.
- No rule under 1 px at trim.
- All plastics are light on a dark bench, so the set holds in greyscale.
- For press: gloss UV on the plastic only over a matte mat, a metallic ink for the Factory Edition, and a clear or pearlescent varnish for Test Shots.

## Deliverables

- `index.html`: the presentation, 16 covers, and the print wrap for *Build LLMs from Scratch*. The back cover works like a kit box's side panel: the parts assembled, instruction-sheet style, with the parts list. The spine carries a plastic-coloured block with the kit number.
- `renders/`: PNG @2×, JPG @1×, vector PDFs, `_contact-180.png`, `_wrap.jpg`, `_sheet.png`.

## Review response (round 2)

I checked every claim in REVIEW.md against the renders before changing anything. **All five must-fix items were correct.** The decision-tree issue was worse than reported: three hollow points also sat on the filled side of the right-hand step.

**Must-fix: all done.**
1. **kernel-engineering stamp.** The stamp now sits on the bench beside the title ("Kernel" is short), never over plastic, so no gate or tag can show through it. The kit is now a single-row first sprue.
2. **RLHF clipped objective.** Redrawn as L^CLIP for A > 0: a straight rise from the origin to r = 1+ε, then flat, with no floor. Molded ticks sit at r = 1 and 1+ε. It is renamed "PPO clipped objective (A > 0)".
3. **Decision trees.** The right child is now **y ≤ 4**, so the tree yields exactly the staircase drawn. All 17 points were re-placed on their correct sides.
4. **Gaussian.** Now exp(−d²/2σ²) with σ = 30 and a width of 232, so the ticks are at ±1σ and ±2σ, the inflection points sit on the inner ticks, and the tails reach about zero.
5. **DeiT.** The teacher is now a CNN (four feature-map slabs, engraved CNN) pointing at the DIST tile. The student is the encoder block fed by the CLS + patch token row. The dense MLP blob is gone. The patch picture is a tinted decal clipped to the tiles, so it survives the gaps; this also fixes the Vision Room.

**Improvements taken:**
- **Skill level.** Squares go from 21 to 30 px; checked on the contact sheet.
- **Maker's tab.** Locked to one slot, top-right on every cover. Parts yield: colliding gates are dropped, and parts under the tab move down. Pi vs Hermes no longer falls back to a stub.
- **Sound Room.** Rebuilt around the mechanism: the ASR → LLM → TTS loop with barge-in, a VAD window, and USER/AGENT turn-taking. No message bubbles remain.
- **5D.** An axis-hub hero with five axes at 72°. The ring's direction arrows are now molded on the ring. The GPU grid and pipeline stages move to row 2, and the title is reset as "5D Parallelism for / Large Model Training".
- **Pi vs Hermes.** The transcript is one tall tray, about 3× the clamped block. The wing is redrawn with scalloped primaries. The shared memory chip is replaced by a distinct "memory notes" part.
- **System.** Added the hero registry lint, a hero cap of 1.6×, single-row and hero-alone layouts (Kernel, Vision, Sound), and moved RLHF's reward network out of the hero row.
- **Type.** "Build Large / Language Models / (LLMs) from Scratch"; Factory Edition titles use a half-size "Charlie and the" series line.

**Declined:**
- **Latency bar engraved "< 800 ms"** (Sound Room). A specific number is a factual claim about the book that I can't verify. Turn-taking and barge-in already carry the real-time story.
- **Per-agent compaction strategies instead of the Pi/Hermes/Codex badges.** I don't know how the book characterises each agent's strategy, and inventing it would break the brief's truthfulness rule. The clamp and transcript carry the mechanism.

## Still open / next

1. Draw parts for the remaining ~36 titles and review all 52 as one 180 px grid, rebalancing plastic families.
2. The barge-in bolt on the Sound Room reads, but it is the weakest glyph on that kit; it could become a molded "interrupt" notch on the TTS tile.
3. Web: a snap-off animation, and parts that snap off as capsules are finished in the reader.
4. Kit-number decal sheets and a boxed Factory Edition as collectibles.
