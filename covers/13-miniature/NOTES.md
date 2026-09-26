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
- The **miniature** is a flat, jewel-toned, diagrammatic painting of the book's actual mechanism,
  on a ground colour of its own.

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

| Name | Role | Hex |
|---|---|---|
| Peori (Indian yellow) | beginner margin; ground | `#E4A42E` |
| Sabz (malachite) | intermediate margin; ground | `#1E6A52` |
| Lajward (lapis) | advanced margin; ground | `#243B8C` |
| Hingul (vermilion) | ground; rubrics; the jadval's red rule | `#CF3B22` |
| Lakh (lac crimson) | ground | `#8C1F35` |
| Gulabi (pink) | ground of the Charlie series | `#E7B09C` |
| Asmani (sky) | accent | `#9DBBD0` |
| Wasli (paper ivory) | cartouche; verso | `#F3EAD3` |
| Sona (shell gold) | jadval, bezels; print as metallic spot or foil | `#C9A04A` |
| Kajal (lamp black) | ink outline, title | `#1C1814` |

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
  exactly.
- **Neural Networks from Scratch.** A 3·5·5·2 perceptron. Weights are threads: gold where positive,
  vermilion where negative, width equal to magnitude. Neurons are set stones, and one forward path
  is strung with pearls.
- **Build LLMs from Scratch.** Causal self-attention: the lower-triangular mask painted cell by
  cell (with an attention sink on the first token and a strong diagonal), the token row beneath,
  and the next token emerging from the last row.
- **5D Parallelism.** The device mesh drawn as a nested jadval. Each axis of parallelism is a rule
  of its own pigment and weight: data (gold), pipeline (vermilion), tensor (lapis), context
  (malachite), expert (ink). That gives 64 devices, with a key.
- **Pi vs Hermes vs Codex.** Three stelae, each holding one long conversation. Early turns are set
  aside (outlined only), a compacted summary sits under the press, recent turns are kept whole, and
  a jewel of memory is set at the foot. The columns are deliberately unlabelled, so they make no
  claim about which agent does what.
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
  - *Language Room*: a paged KV cache as niches in the wall, filling page by page, with the decode
    row on the floor and the new token in gold.
  - *Vision Room*: the garden picture on the wall cut into 4×4 patches, and the same patches laid
    out on the floor as a sequence behind a class token.
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
