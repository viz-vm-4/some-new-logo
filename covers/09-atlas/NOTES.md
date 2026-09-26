# 09 — Interchange

**Every book is a map of its own territory.**

## The idea

Each Vizuara book is drawn as a transit diagram of its subject, in one strict cartographic language: Beck/Vignelli schematics. The **parts** of the book are the **lines**. Every **capsule** is a **station**: one tick per capsule, counted from the live catalogue. A 69-capsule book really does run longer than a 9-capsule one. The code audits every map against the data and logs any mismatch. The **geography is the subject's own architecture**: a transformer's residual stream, a decision tree's splits, the five axes of a GPU cluster, a git commit graph. One fixed frame holds all of these maps together. The title is signage-grade and always the loudest element. A map key at the foot doubles as the table of contents, and the imprint sits bottom-right as a quiet signature. Vizuara is the guide through the territory, and its mark is two lines meeting at an interchange.

## System

- **Trim**: 720 × 888 px (7.5 × 9.25 in). Margins are 40 px, and critical text is always at least 24 px from the trim. Lines may bleed off the left and right edges, the way a map sheet continues.
- **Frame** (identical on every cover):
  - Header: stage on the Vizuara roadmap at left, level at right, over a 3 px rule.
  - Title: set flush-left and hand-broken.
  - Tagline: in italic.
  - Map: drawn in the space between the title and the foot, centred automatically.
  - Foot: a 1.5 px rule, then the key (bullet, part name, capsule range), then the stats line ("43 stations · 8 lines · 10 hours") and the imprint.
- **Map vocabulary**, the same on every cover:
  - **Line** = a part. Its colour follows part order, so every book sets off on the red line.
  - **Tick** = one capsule.
  - **Ring** = a capsule where lines meet.
  - **Pill** = an interchange across a bundle: a layer, a gate, the capstone.
  - **Bullet** = the part number where a line begins. It matches the key. Numerals are white or ink, whichever contrasts more, so the light inks (saffron, lime, the lifted night inks) take ink numerals.
  - **Territory** = the subject's geography, drawn in tint and named in italic, the way maps name rivers and hills.
  - **Hollow line in a hatched corridor** = under construction. This is the coming-soon state.
  - **Off-grid** = the single line allowed off 45°: a vector sum (the maths resultant), shown with its components dashed.
  - **Locator** = in a series, the shared plan shrinks to a small "you are here" inset, and the volume's own room fills the map.
- Geometry is octilinear (0/45/90°) with a fixed 18–36 px bend radius. Lines are 8 px and ticks 3.6 px. Rings are 6.6 px radius with a 2.7 px ink stroke. Nothing is thinner than 1.6 px at trim. Every render runs an audit: tick count per part against the catalogue, and a minimum tick pitch of 10 px. Both pass on all 14 covers; the tightest pitch is 15 px.

## Palette

| Role | Day | Night |
|---|---|---|
| Paper / ground | `#F3EFE6` | `#15181D` |
| Ink | `#16181B` | `#EEEAE0` |
| Secondary ink (ranges, territory names) | `#4B4D51` | `#A6A8AB` |
| Territory tint / tint 2 / tint 3 | `#E3DDCF` / `#D6CEBC` / `#C4B9A2` | `#2B313A` / `#363D47` / `#444C58` |
| Context (other lines) | `#C4BCAC` | `#3A4049` |

The line inks are spot-colour-like, assigned by part order. The night variants are lifted so they hold on the dark ground.

| Part | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|---|
| Day | `#D8432E` | `#1F4E9C` | `#12875A` | `#E9A31B` | `#6C3F99` | `#8C5A2E` | `#0D7F89` | `#8DAA2A` | `#C2577A` | `#6F767D` |
| Night | `#E8563F` | `#4A7DD6` | `#23A676` | `#F0B232` | `#9467CE` | `#BC8552` | `#1AA3AE` | `#A8C63D` | `#DC7096` | `#9CA3AA` |

None of these build on the retired orange/sky-blue/magenta pinwheel.

## Type (Google Fonts)

- **Overpass ExtraBold 800**, for titles, set at −0.024em and 0.955 leading. It is the Highway Gothic lineage, so the title reads as the station name.
- **Overpass Bold 700/800 caps**, for the header, key, stats, map labels and bullets. Tracking is +0.05–0.17em.
- **Newsreader Italic**, for taglines and territory names. This is the cartographer's convention of setting natural features in italic.

## Level

- **Beginner ●** and **Intermediate ■** are day maps on a paper ground.
- **Advanced ◆** is a night map on an ink ground.

A large trail grade hangs at the header's right margin: a 21 px ●, a 19 px ■ or a 24 px ◆, which comes to about 5 px at 180 px, so a circle and a square still separate. It also carries the level in greyscale and single-colour print. The day/night rule holds inside a series too: the Charlie books mix day and night.

## Emblems — how each map was derived

Data comes from books.vizuara.ai (scraped 2026-09-26): part names, capsule counts per part, hours, roadmap stage and taglines.

- **AI Context Engineering**: the eight parts fan in from above and below and run as one bundle through a tinted *context window* to a pill, the capstone "Putting It All Together". This is context assembly and compression drawn as a Vignelli trunk.
- **Mathematical Foundations for ML**: the three pillars as the axes of one space. Linear algebra + determinants lie on x, probability + distributions on y and calculus on z. Python is the unit circle round the origin. "Putting It Together" is the resultant, the one off-grid line in the library, with its x, y and z components dashed onto the tinted ground plane. That plane is the book's roadmap stage, *the ground floor*.
- **Neural Networks from Scratch**: the training loop the book builds. Parts 0–2 ride the forward pass through the input, hidden and output layer bars to a loss pill. Part 3 (how a network learns) returns underneath as the backward pass, through the same layers. The code half (parts 5–6) runs a second, inner lap. Part 4 is a spur towards CNNs.
- **Build LLMs from Scratch**: the GPT block as a network. Tokens enter and climb the residual stream. Attention (part 1) loops out and back in, splitting into q, k and v tracks. The MLP loops out on the other side and carries the "Layer Norm, GELU, and Shortcut Connections" capsule. Both sub-layers are residual, inside a tinted block bracketed ×12 (the 124M model). Pretraining and finetuning fork at the top towards "next token".
- **5D Parallelism**: Moscow-style. Foundations arrive at a hub, and five parallelism axes fan out over a grid of GPU blocks, with data and ZeRO sharing one corridor. The circle line, "Putting It All Together", composes them.
- **Pi vs Hermes vs Codex**: three harness tracks funnel through the context window into one interchange (compaction). One traced session follows, then the tracks split into three memories and meet again. It has 9 stations and is the smallest map, because it is the shortest book.
- **Data Structures & Algorithms in Python**: 69 stations, the longest line in the library, coiled as a spiral traversal through a matrix grid. That is the actual title of capsule 16.
- **Build Decision Trees from Scratch**: a binary tree with the root at the top, split nodes as rings and leaves as regions. The wrap-up line bridges the two trees ("two trees, one algorithm") and runs on to forests and boosting.
- **Git & GitHub Masterclass**: a commit graph, with time running left to right. The first four parts run down `main`. GitHub (up in the *github.com* band) and GitHub Desktop branch off together and merge forward; the ring at the merge is the pull-request capsule. CI/CD and the open-source part leave the sheet to the right, into the github.com and *open source* bands.
- **Charlie and the Intelligence Factory, I–IV** (sub-series). The shared factory plan is a small "you are here" locator inset with the volume's line lit. A large route bullet by the title carries the numeral. Each volume's own line enters through a gate pill (capsule 01), and its parts are rooms, each with a bullet at its door. Each room is drawn from its subject:
  - **I, Language (inference)**: prefill is one long straight run. Decode climbs a step per token, and the KV cache underneath grows a page per step.
  - **II, Vision**: the image is cut into a 4×4 grid of patches, and the line reads them row by row. It then runs underneath as the flattened token sequence ("patches are tokens").
  - **III, Sound**: listening and speaking are waveforms. The brain is the flat run of text between them, and the wire streams in small chunks.
  - **IV, Reasoning**: the agent–environment loop as a circle line, with the agent above, the environment below, action down one side and reward up the other. The book enters, laps once, and leaves for production.
- **Inference Engineering** (coming soon): a hollow line inside a hatched works corridor, stopping at the four stops the announcement names (batching, KV-cache, paged attention, speculative decoding). The dashed track is the unbuilt extension.

## Extras on the page

- A legend, the palette, the type choices and the mark.
- A 180 px "shelf" of every cover.
- A full **print wrap** for *AI Context Engineering*:
  - Back cover: the whole Vizuara roadmap drawn as one network (six stages, one tick per book, four frontier branches), with this volume ringed as *you are here*. The blurb, capsules, parts, figures and hours all come from the catalogue data.
  - Spine: the book's part colours as a strip, each part as tall as its capsule count.

## What I'd do next

- Before scaling to 50, tag each map's silhouette (bundle, fan, hub, tree, loop, spiral, staircase, grid) in the audit. Cap any one silhouette at about 1 in 8, and vary the entry point so the grid doesn't become a wall of left-edge rainbows.

- Generate all 50 maps. Around 60% could come from a handful of parametric templates (bundle, fan, tree, loop, spiral, layers). The flagship titles should stay hand-routed.
- Label stations with capsule titles on the back covers and on the web (hover already works on the page), and add a fold-out "network map" poster of the whole library for print buyers.
- Test the ten inks as Pantone spot colours on uncoated stock. Tune the saffron and lime on paper, and the brown on night.
- Add a variable-width system for the spine based on real page counts, and make the spine strip the recognisable shelf pattern.
- For the web library, a hover state that animates the reader's progress as the stations they have completed.

## Review response

I checked every claim against the renders before acting on it.

**Must-fix: all six done.**

1. **Maths resultant collinear with z.** Correct. The NE diagonal from the origin is the continuation of the SW z-axis, so it read as −z. The resultant is now the single off-grid line: it is aimed at components (236, 150, 100) and projected (about 25° up-right), with dashed guides dropping to the ground plane and running out to the x and z axes. The exception is in the legend ("Off-grid").
2. **LLM block without the MLP.** Correct. I added the MLP sub-layer as a second residual loop on the other side of the stream. It is part 3's line, and the "Layer Norm, GELU, and Shortcut Connections" capsule is on it. Attention sits below it, as in GPT-2.
3. **Git fork running backwards.** Correct. Time now runs strictly left to right. GitHub and Desktop branch together and merge forward, with a ring and a "PULL REQUEST" label at the merge. CI/CD and the open-source fork leave the sheet to the right, into bands, so nothing dead-ends.
4. **White numerals on saffron/lime.** Correct. Bullet numerals now take whichever of white or ink contrasts more, computed from each ink's luminance. That means ink on saffron and lime, and on most lifted night inks, the way the NYC yellow bullets work. It applies to map bullets, key bullets and the series bullet.
5. **Decision-tree labels and title break.** Correct. 'classification' and 'regression' now mirror each other beside their outer branches. 'TO FORESTS & BOOSTING' stands alone. The title is broken as "Build Decision Trees / from Scratch".
6. **'200 figures' invented.** Partly wrong. The number is real: the book page on books.vizuara.ai lists "43 capsules · 200 figures · ~10 hours", and I scraped it. The reviewer was right that it was hardcoded, though. Figures and the blurb are now scraped for every book into `DATA`. The back cover (blurb, capsules, parts, figures, hours, spine title and level) is driven entirely from `DATA`, and the roadmap network from a `ROADMAP` block with its source noted.

**Improvements**

1. **NN as the training loop.** Taken. The braid overclaimed "fully connected", and it echoed AI Context Engineering's left-edge bundle. It is now the forward/backward training loop with an inner code lap.
2. **Charlie as four emblems.** Taken. The reviewer was right that four colours of one plan is the brief's own complaint. The plan is now a locator inset, and each volume has a subject room (KV-cache staircase, patch grid, waveform, agent–environment loop).
3. **Level legibility at 180 px.** Taken as the enlarged trail grade (21/19/24 px at the header's right margin). I declined the extra doubled rule for intermediate: at 180 px a 3 px double rule becomes a sub-pixel line, and the glyph change already separates the two.
4. **Bullet/tick grammar.**
   - Taken: every line now has a bullet where it begins (DSA 0–8 ride the spiral, Git 1–3 sit on main, Pi has its 3, Charlie rooms have door bullets).
   - Taken: the router audits a 10 px minimum pitch, and Git's crammed main is re-spaced.
   - **Declined:** re-inking Pi so that "1 = blue". Ink follows part *order* (every book sets off on red), and the bullet shows the book's *own* part number. Pi vs Hermes vs Codex numbers its parts from 1 on the site, and the key must match the book's contents.
5. **Plan against repetition.** Agreed, and noted for scale-up (see "What I'd do next"). The NN redesign already breaks up the left-edge rainbow trio.
6. **Print hardening.**
   - Taken: night tints are lifted to `#2B313A` / `#363D47` (tint 3 `#444C58`).
   - **Declined** inside this deliverable: exporting the PDFs with bleed. The renderer's contract is exact trim, and every other direction shares it. The artwork is already bleed-ready: grounds are flat fills, and edge-running lines are drawn 20 px (0.21 in) past the trim, beyond the 9 px a printer needs. A print export only has to widen the page box.
