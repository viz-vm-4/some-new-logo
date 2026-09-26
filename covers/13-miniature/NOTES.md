# 13 — Muraqqa

*Every book is a folio from one album.*

## The idea

A Mughal *muraqqa* (the imperial albums assembled for Jahangir and Shah Jahan in the Agra, Delhi and
Lahore ateliers, c. 1605–1658) gives every painting the same page architecture. There is a wide
coloured margin (*hashiya*). Inside it sits a stack of ruled borders in gold, colour and black,
drawn with a ruling pen (*jadval*). The words go in a lobed cartouche, and at the centre is a
small, flat, exact painting. The album opens with a *shamsa*, the rosette that carries the owner's
name. Vizuara Books takes that architecture whole and fixes it: margin, jadval, cartouche, the
miniature, and the shamsa as the imprint. Only the contents change.

- The **margin pigment** gives the level.
- The **cartouche** holds the title as the hero, in large type.
- The **miniature** is a flat, jewel-toned, diagrammatic painting of the book's actual mechanism.
  It shares one flat, stippled ground with the cartouche, chosen by the book's subject family.

The shelf reads as one album, and each folio is recognisable by its painting and its ground.

## Traditions and the structural principle taken from each

| Source | What was taken |
|---|---|
| Mughal album folio (muraqqa), Jahangir / Shah Jahan period, North India | The page architecture itself: picture inside jadval inside hashiya, text in a lobed cartouche, owner named in a shamsa. |
| Pahari painting, Basohli school (Jammu hills, late 17th c.) | Colour logic: one flat, saturated ground per picture (peori yellow, hingul red, malachite), no modelling, no gradient, jewel accents. |
| Rajput court painting (Mewar, Bundi, Kota) | Space: the pavilion drawn frontally with its floor tipped up in plan. This gives the four "rooms" of the Charlie series. |
| Unfinished miniatures (sanguine underdrawing on primed *wasli*, colour partly laid) | Process: a forthcoming book is shown as an unfinished folio. |
| Mughal/Pahari miniature craft | The painter's habits: an ink outline on every shape, gold edging, pearls strung as dotted lines, a white highlight on every stone, fine stippled grounds. |

What was left out on purpose: figures, deities or any sacred iconography, paisley, elephants, the
Taj, mandalas, and domes or arches. The pavilion is flat-roofed, with stepped *kangura* merlons and
a *chhajja* eave. The only picture the system ever paints is a small garden of two cypresses and a
pool, used as the input image in the vision books. No living artist's signature work is imitated.

**Credit and commission (production).** A working miniature painter from the living Pahari or
Rajasthani ateliers (Kangra and Chamba; Jaipur, Udaipur, Kishangarh) would be commissioned to hand-rule
a master jadval and paint a master shamsa and cartouche. They would be paid per edition and credited
by name on every colophon ("Borders ruled and seal painted by …"), and the per-book miniatures would
be reviewed with them for proportion and pigment.

## Palette (named after the pigments of the tradition)

**Constant pigments.** The three level pigments live in the hashiya and nowhere else.

| Name | Role | Hex |
|---|---|---|
| Peori (Indian yellow) | beginner margin only | `#E4A42E` |
| Sabz (malachite) | intermediate margin only | `#1E6A52` |
| Lajward (lapis) | advanced margin only | `#243B8C` |
| Wasli (paper ivory) | cartouche; verso | `#F3EAD3` |
| Sona (shell gold) | jadval, bezels; print as metallic spot or foil | `#C9A04A` |
| Kajal (lamp black) | ink outline, title | `#1C1814` |

**Grounds, one per subject family.** The miniature and the cartouche's spandrels share the ground,
with a fine vector stipple (*pardakht*) on every painted ground. A new book takes the ground of its
family. A forthcoming book sits on primed, unpainted wasli (`#F1E7CF`, no stipple) until it is
published.

| Ground | Family | Hex | Books here |
|---|---|---|---|
| Surmai (slate) | Foundations: maths, statistics, classical ML | `#4E5660` | mathematical-foundations |
| Jamuni (jamun purple) | Neural networks & deep learning | `#5A2D5C` | neural-networks |
| Hingul (vermilion) | Language models | `#CF3B22` | build-llms |
| Asmani (sky) | Vision & multimodal | `#9DBBD0` | deit |
| Lakh (lac crimson) | Agents, context & memory | `#8C1F35` | ai-context-engineering, pi-vs-hermes-vs-codex |
| Kajal (lamp black) | Systems & infrastructure | `#1C1814` | 5d-parallelism (kernel-engineering once published) |
| Geru (red ochre) | Data & code | `#9C4A2B` | sql-masterclass |
| Gulabi (pink) | A series: one ground for the whole set | `#E7B09C` | Charlie I–IV |

The old orange/sky/magenta pinwheel is not used anywhere.

## Type

Both typefaces were designed in India.

- **Eczar 600** (Vaibhav Singh / Rosetta) sets the titles. It is a Latin + Devanagari display serif
  with a calligraphic edge. Titles are broken by hand, and a fitter shrinks a title only if it
  overflows the cartouche.
- **Anek Latin** (Ek Type, Mumbai) sets the rubrics, imprint and labels, semi-expanded, in tracked
  capitals.

## How level is encoded

Level is encoded twice, and both signals survive greyscale:

1. **Margin pigment.** Peori is beginner, sabz is intermediate and lajward is advanced. In greyscale
   they step light, middle, dark.
2. **Rule count.** The margin carries one, two or three rules around the jadval: ink rules on peori,
   gold rules on the other two margins.

The word itself (Beginner / Intermediate / Advanced) is also set in the imprint, beside the capsule
count and reading time.

## Emblems: how each book's miniature was derived

- **AI Context Engineering.** A fixed-size window, composed in ordered registers: system, tools,
  retrieved documents, conversation history, query. Around it is a field of candidate tiles, and
  only the chosen ones are threaded in.
- **Mathematical Foundations for ML.** A linear map painted as the miniaturist's own trick. A square
  tiled floor with a round pool is seen in plan; the same floor is tipped up by
  A = [[1, ½], [0, ⅘]], and the pool becomes an ellipse. Basis vectors and their images are shown
  exactly. The matrix is set entirely in Eczar, with stacked fractions.
- **Neural Networks from Scratch.** A 3·5·5·2 perceptron. Weights are threads: gold where positive,
  vermilion on an ink underlay where negative, so the sign survives greyscale; width equals magnitude.
  Stones are coloured by their activation in a real forward pass through exactly those weights, on a
  lightness ramp (lapis, vermilion, saffron, ivory). The path of strongest activation is strung with
  pearls and ends at the prediction.
- **Build LLMs from Scratch.** Causal self-attention: the lower-triangular mask painted cell by
  cell (with an attention sink on the first token and a strong diagonal). The ramp gets lighter at
  every step (ink, lapis, sky, pale gold, ivory), and each row's strongest cell is set in a gold
  bezel. Below are the token row and the next token emerging from the last row.
- **5D Parallelism.** The device mesh drawn as a nested jadval. It is nested in Megatron's rank
  order, outermost to innermost: pipeline (gold, heaviest), data (vermilion), expert (lapis),
  context (malachite), tensor (ink, finest). A thinner rule means a closer, faster link. That gives
  64 devices. The key sits on the mesh's own ivory and is laid out by measured width.
- **Pi vs Hermes vs Codex.** Three stelae, each holding one long conversation. Old turns thin and
  crowd as they reach a press of two gold jaws, and come out as a gold summary. The three summaries
  are 10%, 20% and 35% of the stele. Recent turns are kept whole. Each memory jewel sits in a niche
  beside its stele, threaded in gold to the one old turn it keeps. The columns are deliberately
  unlabelled, so they make no claim about which agent does what.
- **SQL Masterclass.** An inner join. Key values are pigments, matching pigments are threaded
  between the two tables, and the joined rows are laid out below in the correct order.
- **Build a DeiT from Scratch.** The garden image is cut into patches. The class token and the
  vermilion distillation token go through three encoder layers. A convnet teacher (feature maps
  shrinking) guides the distillation head.
- **Kernel Engineering (forthcoming).** A tiled matmul C = A·B, shown as an unfinished miniature:
  the underdrawing is complete, and only the blocks of C already computed (in row-major order) are
  painted. The block under the brush is vermilion, with its A row-panel and B column-panel laid in.
- **Charlie and the Intelligence Factory (sub-series, I–IV).** One Rajput pavilion and four rooms.
  The series name and number sit as a rubric in the cartouche, and all four share a gulabi ground.
  - *Language Room*: paged attention. The floor holds the logical sequence (12 tokens in runs of
    four, the newest in gold). The wall holds physical memory: 8 pages of 4 slots, allocated out of
    order, two pages held by another request and three free. Gold threads are the block table.
  - *Vision Room*: the garden picture on the wall cut into 4×4 patches, as the class token sees it.
    Ignored patches fall into shade, and the three it attends to most are set in gold and threaded
    to the class token. The patch sequence runs along a dark runner on the floor.
  - *Sound Room*: a spectrogram hung like a textile, with the waveform as the balustrade.
  - *Reasoning Room*: a tree of thought on the wall with one gold path to the reward, and five
    bandit arms on the floor with the greedy choice in gold.

## Deliverables

- `index.html` is the presentation: rationale, anatomy of a folio, pigments, type, level key, the
  6 core covers, 7 range covers, a print wrap for *Neural Networks from Scratch*, and notes.
- `renders/` holds the PNG (2×) and JPG (1×) files, `renders/pdf/` holds the vector PDFs at trim,
  and `renders/_contact-180.png` is the thumbnail check.

## What I'd do next

- Print tests: gold as a metallic spot (or foil on the jadval and shamsa only), grounds as spot
  colours on uncoated stock, and a check of the 1–1.5 px rules at trim.
- The commission described above: a hand-ruled master jadval and shamsa, digitised and used as the
  system's constant elements.
- Write the emblem brief for the other ~40 titles, keeping to the rules: one mechanism, one ground,
  ink outline, gold only for what matters.
- A Devanagari title line in the cartouche for Hindi editions (Eczar already carries Devanagari).
- A spine system: the cartouche turned on its side, the shamsa at the foot, and the level rules at
  the head, so a shelf of 50 reads as one album.

## Review response

I checked every claim against the renders and the font files first. All four must-fix items were
right, and I fixed them.

**Must fix**
1. **⅘ fallback (fixed).** U+2158 is not in Eczar (checked the cmap), and ½ exists only in the
   Latin subset. Both fractions are now stacked Eczar numerals with a 2px ivory bar, and `A =` is
   one run with a real space. Every PDF now embeds only Eczar and Anek Latin, with no raster images.
2. **NN sign and colophon (fixed).** Negative weights now sit on an ink underlay 1.6px wider and
   survive greyscale (checked). The stones come from a real forward pass through the drawn weights
   (sigmoid, fixed inputs), mapped to a lightness ramp. The pearl path follows the argmax at each
   layer. The back-cover colophon now says exactly that.
3. **5D key (fixed).** The key is on an ivory band with the mesh's own gold-and-ink edge. Items are
   laid out by measured text width with equal gaps, centred under the mesh.
4. **LLM ramp (fixed).** The ramp is ink, lapis, sky, pale gold, ivory, lighter at every step. Gold
   is now only a bezel on each row's argmax.

**Improvements taken**
- **Grounds (taken).** The grounds now come from eight non-level pigments, one per subject family,
  with the rule written down, so the margin alone tells the level at 180px. Stipple is on every
  painted ground, drawn as zero-length dashes so it stays vector.
- **Title measure and breaks (taken).** The measure is C.w − 160 (about 430px), and the three
  re-breaks are as suggested. "5D Parallelism" is the hero line with "for Large Model Training" as
  the sub line at 0.58em.
- **Pi (taken).** Visible compaction geometry, bold 10/20/35% ratios, and memory niches threaded
  to specific old turns.
- **Language Room (taken).** A real block table: pages of four, out-of-order allocation, free and
  foreign pages, and gold threads from floor runs to wall pages.
- **Vision Room (taken).** The Vision Room now shows the ViT's class-token attention, which DeiT
  doesn't: shade on ignored patches, gold on the top three, threads to the class token, and a dark
  runner under the sequence.
  - *Partly differs from the suggestion:* ignored patches are shaded with a kajal veil, not tinted
    lapis. A lapis wash over the saffron terrace turned muddy, and a neutral shade keeps each
    patch's own pigment.
- **5D nesting order (taken).** The order is now pp > dp > ep > cp > tp (Megatron's rank order),
  so a thinner rule really does mean a faster link.

**Declined**
- None of the improvements.

**Cost I accepted**
- With the tighter measure, one-line titles (SQL Masterclass, Kernel Engineering) set smaller than
  before, though they still read at 180px.

