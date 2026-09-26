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
| AI Context Engineering | The Context Window | One framed window packed with system, tools, memory, documents, history and query. Two slips that did not fit lie across the top, and a token-budget gauge is built into the frame. |
| Mathematical Foundations for ML | The Gradient | A ball on a loss curve, its tangent (the derivative), and shrinking descent steps to the flagged minimum. |
| Neural Networks from Scratch | The Artificial Neuron | One neuron, opened up: three input wires whose thickness is their weight, a Σ summing drum, a bias knob, the sigmoid window and one output. It's the first thing you build from scratch. |
| Build LLMs from Scratch | The Causal Mask | The lower-triangular attention mask. Each token attends to itself and the past, and the "future" cells are struck out. |
| 5D Parallelism | The Device Mesh | Two pipeline stages, each split 2×2 by data × tensor. The two further axes (expert, context) run off as dashed arrows. |
| Pi vs Hermes vs Codex | The Compaction Press | A history too tall for the panel runs off its top. The screw press turns it into a 96×34 brick of the same stripes, squeezed thin. The press's bed is a drawer, which is where compacted memory is kept. |
| Charlie I · Language Room | The Decode Loop | A machine stamps tokens out one at a time onto a belt. The newest (red) token at the outlet is fed straight back into the hopper (autoregressive decoding). |
| Charlie II · Vision Room | The Patch Grid | One picture cut into a 4×4 grid of patches, with a red class token at the head of the sequence (ViT). |
| Charlie III · Sound Room | The Voice Loop | A ring runs listen (mic) → transcript → reply → speak (a street horn aimed back at the mic) → listen. A red gate on the ring marks where a user can barge in. |
| Charlie IV · Reasoning Room | The Multi-Armed Bandit | Three one-armed machines, each with its believed value, and the arm being pulled (explore/exploit). |
| DeiT from Scratch | The Distillation Token | A transformer student carries one extra token (DIST, red) beside the class token. Only DIST's output is taught by the convnet teacher's prediction (one dashed arrow). |
| RAG in Production | The Card Catalogue | One card-catalogue drawer (the index), with the three best-matching cards pulled up out of it (top-k). |
| VLA & World Models for Robotics | The Arm and its World Model | One arm grasps the block it was told to pick up (the instruction is a tag on its base). Three dashed outlines of block and gripper (t+1, t+2, t+3) show the world model's predicted rollout. |
| SQL Masterclass | The Inner Join | Two tables whose key cells carry pip-counted ids, wired only where the ids match. Each table has one row with no partner: it is struck out, knocked back and left unwired. That is what makes the join *inner*. |
| Kernel Engineering (coming soon) | The Tiled Matmul | One row-block of A and one column-block of B are all that is needed to fill one tile of C, and the k-loop arrow walks the row. The "Coming soon" sash is a removable label strip. |

**Sub-series:** *Charlie and the Intelligence Factory* uses a Coal board, a fixed `CHARLIE and the` lockup, the room
name as hero, and a room colour on the label (red, firozi, blue, green). A small yellow `BOOK I OF IV` cartouche sits on the
label's left shoulder, opposite the stamp, and the foot carries `THE INTELLIGENCE FACTORY`. Titles start at 58px like every
other cover, so title tops line up across the shelf.

## The emblem rule (the label grammar)

A Sivakasi label shows **one object**, and so does every Vizuara label:

1. **One object**, drawn from the book's own mechanism, covering at least half the picture panel, with the rays converging on it.
2. **At most one arrow and at most two tags.** The one exception is an object whose named parts *are* the subject: the device mesh's five axes.
3. **No pipelines.** Never draw A → B → C as a row of small things. If a process has stages, draw the machine that does it
   (the press, the decode machine, the voice ring).
4. Flat enamel inks only (at most five per label), a 3px coal keyline, no gradients. Nothing important goes in the top-right 60×30px of
   the panel, because the stamp sits there.
5. Don't repeat a motif on the same shelf. The slip pile now belongs to the compaction press alone.

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
2. Draw emblems for the remaining ~35 titles to the label grammar above. Deep Learning Fundamentals can take the stacked-layer network that the neuron replaced.
3. Spec the tins as five spot inks (Pantone matches for the enamels) so that yellow, red and coal print as solids, not CMYK builds.
4. Proof the inline at 7.5in and at postcard size. On the thinnest strokes (under ~7.5px) the inline is dropped automatically; confirm that threshold on press.
5. Confirm the Devanagari spelling with Vizuara (Hindi-style **विज़ुआरा** with nukta is used; a Marathi rendering
   would likely be **व्हिझुआरा**).

## Review response (art-director review, revision 1)

I checked all nine must-fix claims against the 2x renders before changing anything, and all nine held.

**Must-fix (all done)**
1. *Script collisions.* mixLine now spaces on the script's **ink** (canvas `actualBoundingBoxLeft/Right`, plus keyline and
   shadow), not on its advance width. After that, the gap is 0.2H script↔block and 0.24H block↔block. Pi's `and` is at k 1.25, base 0.8.
   After the proof check, a block word's right edge also includes its keyline and block shadow, and the script↔block gap is at least 10px, so every connective (Pi's `and` included) clears its neighbours by 10px or more ink-to-ink. I also moved the script's keyline to a separate layer instead of `paint-order`,
   which Chrome's PDF ignores.
2. *SQL join.* Key cells now carry a pip-counted key id, and wires connect equal ids only. Each table has one partnerless row
   (ids 5 and 6), struck and knocked back with no wire.
3. *Press expands its input.* The history is now a column running off the top of the panel. The press output is a 96×34 brick of the
   same stripes. Instead of a separate cabinet, the press bed is the drawer, so there is still one object.
4. *Decode loop.* The arc now starts at the newest (red) token at the outlet and drops into the hopper. The tag reads `FED BACK`.
5. *Sound-room harmonics and horn.* Solved by replacing the emblem (see improvement 3), so no spectrogram remains and nothing touches the frame.
6. *Gradient flag.* The pole stands at (cx, f(cx)) and the last step ends at cx.
7. *Kernel A label.* The SRAM chip and its curves are gone. The A/B/C labels are drawn last on paper tags, clear of every path, with no halo.
8. *DeiT acronym.* The tag text went from 0.4H to 0.46H, and the tag moved to the end of the TRANSFORMER line, so the text is now about 35px (it was 18px).
   The LLMs tag grew with it.
9. *Stamp words.* All three level words are 10.5px Anek wdth 75 / 800 with 0.6 tracking. The stamp widened from 84 to 94px so
   INTERMEDIATE fits the field.

**Improvements**
1. *Emblem grammar.* Taken, and written up as "The emblem rule" above. I rebuilt the context window, press, card catalogue, decode loop,
   patch grid, voice, distillation, arm and tiled matmul as single objects. There are two partial keeps. The **device mesh**
   keeps its five axis tags, because they are the object's parts. The **distillation** emblem keeps teacher and student as two
   things, because distillation *is* a relation between two models; it is held to one arrow.
2. *LLMs line break.* Taken: `BUILD` / `LARGE LANGUAGE` / `MODELS (LLMs)` / `from SCRATCH`.
3. *Voice ring.* Taken, with mic, transcript, reply and horn on a directional ring and a red barge-in gate.
4. *VLA.* Taken. The camera is gone, there is one solid arm, a t+1…t+3 outline rollout, the instruction sits on the base, and one PREDICTED tag. The arm now
   reaches from the right so the rollout rises clear of it.
5. *Single neuron.* Taken. The MLP graph is kept in reserve for Deep Learning Fundamentals.
6. *Charlie repetition.* Taken. I dropped the top series line and replaced it with a `BOOK n OF IV` cartouche on the label shoulder, and the titles
   now start at 58.

Nothing declined.

**Proof check (revision 1b):**
- Pi's `and` now clears both neighbours by 10px or more.
- The decode belt carries four tokens, all on the belt and clear of the frame.
- The DeiT teacher arrow now climbs 14px left of the student block.
- On the wrap, the mini stamps show the numeral only, and the level names are set beside them in 12px Anek.
- The spine stamp is centred between the rules at 0.42 scale.
- The spine imprint now ends more than 50px from the trim.
