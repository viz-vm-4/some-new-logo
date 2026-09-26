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
  - **Bullet** = the part number at a terminus. It matches the key.
  - **Territory** = the subject's geography, drawn in tint and named in italic, the way maps name rivers and hills.
  - **Hollow line in a hatched corridor** = under construction. This is the coming-soon state.
- Geometry is octilinear (0/45/90°) with a fixed 18–36 px bend radius. Lines are 8 px and ticks 3.6 px. Rings are 6.6 px radius with a 2.7 px ink stroke. Nothing is thinner than 1.6 px at trim.

## Palette

| Role | Day | Night |
|---|---|---|
| Paper / ground | `#F3EFE6` | `#15181D` |
| Ink | `#16181B` | `#EEEAE0` |
| Secondary ink (ranges, territory names) | `#4B4D51` | `#A6A8AB` |
| Territory tint / tint 2 | `#E3DDCF` / `#D6CEBC` | `#21262D` / `#2A3038` |
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

The trail grade (● ■ ◆) repeats the level in the header, so it still reads in greyscale and in a single-colour print. At 180 px the shelf shows its difficulty from across the room as light and dark covers, and the rule holds inside a series too: the Charlie books mix day and night.

## Emblems — how each map was derived

Data comes from books.vizuara.ai (scraped 2026-09-26): part names, capsule counts per part, hours, roadmap stage and taglines.

- **AI Context Engineering**: the eight parts fan in from above and below and run as one bundle through a tinted *context window* to a pill, the capstone "Putting It All Together". This is context assembly and compression drawn as a Vignelli trunk.
- **Mathematical Foundations for ML**: the three pillars as the axes of one space. Linear algebra + determinants lie on x, probability + distributions on y and calculus on z. Python is the unit circle round the origin, and "Putting It Together" is the resultant vector. The tinted plane is the book's roadmap stage, *the ground floor*.
- **Neural Networks from Scratch**: the input, hidden and output layers are interchange bars. The seven parts re-order between the layers, so their crossings draw a fully connected net.
- **Build LLMs from Scratch**: the GPT figure as a network. Tokens enter, climb the residual stream and loop out through attention, which splits into q, k and v tracks inside a tinted block. A bracket marks it ×12, as in the 124M model the book builds. Pretraining and finetuning fork at the top towards "next token".
- **5D Parallelism**: Moscow-style. Foundations arrive at a hub, and five parallelism axes fan out over a grid of GPU blocks, with data and ZeRO sharing one corridor. The circle line, "Putting It All Together", composes them.
- **Pi vs Hermes vs Codex**: three harness tracks funnel through the context window into one interchange (compaction). One traced session follows, then the tracks split into three memories and meet again. It has 9 stations and is the smallest map, because it is the shortest book.
- **Data Structures & Algorithms in Python**: 69 stations, the longest line in the library, coiled as a spiral traversal through a matrix grid. That is the actual title of capsule 16.
- **Build Decision Trees from Scratch**: a binary tree with the root at the top, split nodes as rings and leaves as regions. The wrap-up line bridges the two trees ("two trees, one algorithm") and runs on to forests and boosting.
- **Git & GitHub Masterclass**: a commit graph. The first four parts run down `main`. GitHub, Desktop and CI/CD branch off and merge back, the GitHub ones up in the *github.com* band. The last part forks away below as *your fork*, towards open source.
- **Charlie and the Intelligence Factory, I–IV** (sub-series): one factory plan with four lines leaving one gate, a pill that is each book's capsule 01. Each volume lights its own line and turns its parts into rooms, drawn as alternating tint along the line. The other three volumes stay grey. A large route bullet next to the title carries the series numeral.
- **Inference Engineering** (coming soon): a hollow line inside a hatched works corridor, stopping at the four stops the announcement names (batching, KV-cache, paged attention, speculative decoding). The dashed track is the unbuilt extension.

## Extras on the page

- A legend, the palette, the type choices and the mark.
- A 180 px "shelf" of every cover.
- A full **print wrap** for *AI Context Engineering*:
  - Back cover: the whole Vizuara roadmap drawn as one network (six stages, one tick per book, four frontier branches), with this volume ringed as *you are here*.
  - Spine: the book's part colours as a strip, each part as tall as its capsule count.

## What I'd do next

- Generate all 50 maps. Around 60% could come from a handful of parametric templates (bundle, fan, tree, loop, spiral, layers). The flagship titles should stay hand-routed.
- Label stations with capsule titles on the back covers and on the web (hover already works on the page), and add a fold-out "network map" poster of the whole library for print buyers.
- Test the ten inks as Pantone spot colours on uncoated stock. Tune the saffron and lime on paper, and the brown on night.
- Add a variable-width system for the spine based on real page counts, and make the spine strip the recognisable shelf pattern.
- For the web library, a hover state that animates the reader's progress as the stations they have completed.
