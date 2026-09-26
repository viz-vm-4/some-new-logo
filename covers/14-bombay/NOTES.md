# 14 · Signboard

**Every Vizuara book is lettered like a Bombay shop board and labelled like a Sivakasi matchbox.**

## The idea

A cover is a painted board. The title is the shop name. It's set in one bespoke display letter
(*Board Block*, drawn in code for this system) with the full sign-painter treatment: a coal
keyline, a split two-colour fill, a hand-ruled inline and a block shadow. Each title line is
condensed or extended to fill the board, as painters do. Pasted on the board is a printed
label that carries **one object drawn from the book's own mechanism**: the causal mask, the
device mesh, the tiled matmul. A perforated stamp on the label's corner gives the level. The
imprint signs off quietly at the foot, in Latin and Devanagari at equal size. The street
supplies the craft and the publisher supplies the discipline: one grid, one letter, seven
enamel tins, no ornament that doesn't do a job.

## Traditions, and what was taken from each (structure, not surface)

| Tradition | Principle taken |
|---|---|
| **Mumbai hand-painted shop signboards** (enamel on tin/board) | The layered "shadow letter": keyline, split fill, inline, block shadow. **Fit the line to the board**: letters are condensed or extended so each line fills the measure at its chosen cap height. Connective words (*for*, *from*, *and the*, *vs*) go small, in script. A painted double border rule. A "trade line" of small letters under the name (subtitles). |
| **Sivakasi safety-match & firecracker labels** (litho) | One central object on a sunburst whose rays converge on it. A name panel above the picture. A **contents line** below ("Avg. contents 50 sticks") that becomes `CONTENTS 43 CAPSULES · 10 HOURS`. |
| **1960s–80s Indian pulp paperbacks** (Hindi pocket-book *jasoosi* novels) | Title-first hierarchy, with lettering taking the top half of the cover. The bill-poster "X vs Y" stack (*Pi vs Hermes vs Codex*). A series lockup for a sub-series (*Charlie and the …*). |
| **Letterpress visiting / wedding cards and rate cards** | The small cartouche tag ("Regd.", "Estd.") is reused for parenthetical acronyms: `LLMs`, `DeiT`. Dotted leaders and a ruled list make the back cover a **rate board** that keys the whole system. |
| **India Post stamps** | A perforated stamp that carries a "denomination", which here is the level (1/2/3). |
| **Indian Railways Edmondson card tickets** | Notched ("ticket") corners on the board frame and the label. |
| **Maharashtra's shop-sign rule** (Devanagari may not be smaller than other scripts) | Bilingual imprint at equal size: **VIZUARA BOOKS · विज़ुआरा बुक्स**. |

Deliberately left out: truck-art slogans, paisley, elephants, deities or other sacred imagery,
mandala clip-art, fake distress or "vintage" texture, and any one painter's personal hand. Everything is flat,
exact vector that will print clean at any size.

## Palette (enamel tins)

| Tin | Hex | Role |
|---|---|---|
| Chrome Yellow | `#F3B21B` | Foundations board · letter lower fill · Level 1 stamp |
| Signal Red | `#CF2A1E` | Neural Networks board · inline · Level 2 stamp |
| Maroon | `#6D1A24` | Language Models board |
| Bottle Green | `#0E6641` | Agents & Context board |
| Post Blue | `#1F3A93` | Systems & Scale board |
| Firozi | `#11837E` | Vision & Robotics board |
| Coal | `#16120F` | keylines · Charlie sub-series board · Level 3 stamp |
| Chuna (lime-wash) | `#F4EBD6` | letter upper fill · rules · paper `#FBF4E4` for labels |

Block shadows use a dark of the board (`#7E1710`, `#420D14`, `#07402A`, `#12235C`, `#0A5553`) or Signal Red on Coal.
The retired orange/sky-blue/magenta pinwheel is not used anywhere.

## Type

- **Board Block** is custom. It's a skeleton (centre-line) display alphabet, A–Z, 0–9 and a few marks, written in
  JS/SVG and inlined in `index.html`. Weight, keyline, inline and block shadow are
  all strokes of the same skeleton, so the layered treatment is exact vector. Width is a
  parameter, so lines can be fitted to the board. Stroke weight thins as letters condense so the
  counters stay open. Spacing uses a three-band (top/middle/bottom) optical kerning model.
- **Yellowtail** (Google Fonts) is used only for sign-painter connectives: *from, for, and the, vs, in, &*.
- **Anek Latin / Anek Devanagari** (Ek Type, a Mumbai foundry; Google Fonts) is used for all small text that has
  to be *read*: imprint, contents line, stamp words, tags.

## How level is encoded

A perforated **stamp** on the label's top-right corner. The numeral is in Board Block, with the level word
beneath. The stamp gets hotter and darker with difficulty: **1 Beginner = Chrome**,
**2 Intermediate = Signal Red**, **3 Advanced = Coal**. Light, mid and dark, so it still reads in greyscale and at 180px.
(Board colour is kept for the *shelf*, which is a second, independent axis.)

## Emblems: one per book, from the subject

| Book | Label caption | Derivation |
|---|---|---|
| AI Context Engineering | The Context Window | An overflowing pile of candidate context (system, tools, memory, docs, history) and the curated window it is packed into, with a token-budget gauge. |
| Mathematical Foundations for ML | The Gradient | A ball on a loss curve, its tangent (the derivative), and shrinking descent steps to the flagged minimum. |
| Neural Networks from Scratch | The Multilayer Perceptron | A 3-4-4-2 MLP. Weights are line weight, and each hidden unit carries its activation curve. |
| Build LLMs from Scratch | The Causal Mask | The lower-triangular attention mask. Each token attends to itself and the past, and the "future" cells are struck out. |
| 5D Parallelism | The Device Mesh | Two pipeline stages, each split 2×2 by data × tensor. The two further axes (expert, context) run off as dashed arrows. |
| Pi vs Hermes vs Codex | The Compaction Press | A long message history, a screw press squeezing it into a dense block, and the block filed into a memory drawer. |
| Charlie I · Language Room | The Decode Loop | A machine stamps tokens out one at a time onto a belt, and each new token is fed back in (autoregressive decoding). |
| Charlie II · Vision Room | The Patch Grid | A picture cut into a 4×4 grid of patches and read off as a sequence behind a class token (ViT). |
| Charlie III · Sound Room | The Voice Loop | A waveform, then a harmonic-stack spectrogram, then a street horn-speaker that answers (voice agent in and out). |
| Charlie IV · Reasoning Room | The Multi-Armed Bandit | Three one-armed machines, each with its believed value, and the arm being pulled (explore/exploit). |
| DeiT from Scratch | The Distillation Token | A convnet teacher's prediction is matched by the extra DIST token, which rides through the student beside CLS. |
| RAG in Production | The Card Catalogue | A query goes to the index drawer, the top-3 cards rise, and query plus cards go on together as the prompt. |
| VLA & World Models for Robotics | The Arm and its World Model | A camera sees, an instruction is read, the arm acts, and a dashed ghost arm is the world model's predicted next state. |
| SQL Masterclass | The Inner Join | Two tables matched row to row on a shared key column, under the ⋈ symbol. |
| Kernel Engineering (coming soon) | The Tiled Matmul | A row-block of A and a column-block of B are staged through on-chip SRAM to fill one tile of C. The "Coming soon" sash is a removable label strip. |

**Sub-series:** *Charlie and the Intelligence Factory* uses a Coal board, a fixed `CHARLIE and the` lockup,
the room name as hero, a series line with the book number, and a room colour on the label (red, firozi, blue, green).

**Print wrap:** *AI Context Engineering* at 7.5in + 0.67in spine + 7.5in. The back is painted as a rate board that
keys all seven shelves and the three stamps, so every book teaches the reader how to read the rest of the shelf.

## Crediting and commissioning practitioners

A production version should commission a **working Mumbai signboard painter** to hand-paint each series lockup, the
`CHARLIE and the` lockup and the Vizuara imprint for special editions and launch boards. It should also have them review Board Block's
proportions against their own hand. They should be paid per lockup plus a reprint fee, and credited by name and shop on the
copyright page ("Lettering system after the signboard painters of Mumbai; lockups painted by … , … Sign Works,
Mumbai"). A **Sivakasi label printer** could litho a limited run of the labels as inserts or bookmarks, credited
the same way. **Ek Type** (Anek) should be credited in the colophon.

## What I'd do next

1. Extend Board Block: `&`, `·`, `%`, `?`, lowercase for mixed-case acronyms, and a **Devanagari display
   companion** drawn with a Devanagari lettering artist, so the imprint and spine could be fully bilingual.
2. Draw emblems for the remaining ~35 titles to the same rules (one object, one idea, 3px keyline, ≤5 inks).
3. Spec the tins as five spot inks (Pantone matches for the enamels) so that yellow, red and coal print as solids, not CMYK builds.
4. Proof the inline at 7.5in and at postcard size. On the thinnest strokes (under ~7.5px) the inline is dropped automatically; confirm that threshold on press.
5. Confirm the Devanagari spelling with Vizuara (Hindi-style **विज़ुआरा** with nukta is used; a Marathi rendering
   would likely be **व्हिझुआरा**).
