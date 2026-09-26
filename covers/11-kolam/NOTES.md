# 11 · Pulli (புள்ளி)

**A kolam for every book, computed from the book itself.**

## The idea

Every morning across Tamil Nadu, the threshold (*vaasal*) of a house is swept and sprinkled with water, a grid of dots (*pulli*) is laid down in rice flour, and one line is drawn around them. In a *sikku kolam* (also *kambi* or *neli kolam*) the line never touches a dot. It weaves at 45 degrees, crosses itself between neighbouring dots, turns back at every edge of the grid, and closes where it began. Mathematicians have studied kolams as picture grammars (Gift Siromoney's array-grammar work at Madras Christian College) and as mirror curves or Eulerian circuits (the same structure as the Angolan *sona*, studied by Paulus Gerdes and Slavik Jablan). It is an algorithm drawn by hand, which suits a publisher that teaches algorithms. Each Vizuara cover carries one kolam, generated under the real rules:

- **One pulli per capsule.** A 43-capsule book has 43 dots.
- **The dot layout is the subject's structure:** layers, a context window, a bell curve, a warp of threads, a paragraph of tokens.
- **The line follows the kolam rules.** It is modelled as a mirror curve. Between two neighbouring dots it either crosses or turns back, and the border always turns. A seeded annealing search places the turns, respecting a symmetry group, until the drawing closes into **exactly** the number of lines the book calls for: usually one, three for three agents, five for 5D parallelism. The maths imposes real constraints, and they became part of the grammar. A rectangle with coprime sides closes as one line with no turns at all. Mirror symmetry through a row of dots forces at least one line per dot on the axis. On these shapes, half-turn symmetry only ever produced an even number of lines.
- **The emblem field is the same on every cover.** It is a fixed threshold box, so every emblem carries equal weight on the shelf. The book's length shows as the *density* of the weave: a 9-capsule booklet gets a bold three-by-three knot, and the 69-capsule DSA book gets a fine dense weave.

We took the structure, the logic and the craft. We did not take the surface. There are no festival motifs, no deities, no lotus or lamp kolams, and no mandala clip-art. Only the geometric *sikku* form of plain dots and one line is used, and every drawing is computed, not copied.

## Tradition and region, specifically

*Sikku kolam* is a daily threshold practice, mostly carried by women, in **Tamil Nadu** and Tamil homes elsewhere. It is most elaborate in the month of **Margazhi** (mid-December to mid-January). Related practices are *muggu* in Andhra Pradesh and Telangana, *rangoli* in Maharashtra and Gujarat, and *chowk* in the north. Two dot arrangements are used: **nēr pulli** (straight dots, where the line runs at 45°) and **idukku pulli** (interlaced, offset rows, where the line runs orthogonally). Idukku is a declared exception, reserved for branching subjects (the Reasoning Room's tree) and for the Vizuara V; every other cover is nēr. The rice flour (*arisi maavu*) and the red-oxide **kaavi** of thresholds and floors gave us the palette.

## System

| | |
|---|---|
| Trim | 720 × 888 px = 7.5 × 9.25 in |
| Title | Tiro Tamil (Tiro Typeworks: a Tamil–Latin book face made for Indian classical publishing), 80 px as standard, 72 px or 64 px for long titles. Line breaks set by hand. |
| Labels / imprint | Anek Latin (Ek Type, Mumbai), letter-spaced caps at 14 px |
| Kolam caption | Anek Tamil: e.g. `43 புள்ளி · ஒரு கோடு` / "43 pulli · one line". Kolam notebooks record designs the same way, by their dot count. |
| Imprint mark | Five idukku pulli in a V, drawn as **one closed line** by the same generator |
| Emblem | Fixed box, 600 × 396 centred at (360, 574), so it spans y 376–772. That leaves at least 40 px above the footer and below the deepest title. Pitch fits the box. Line weight is ≈ 0.1 × pitch, never under 4.4 px (1.2 mm at trim). |

### Palette (hex)

- Arisi maavu / rice-flour white `#F4EFE4`
- Notebook paper `#EEE7D7`
- Ink `#1A1815`
- Kaavi / red oxide `#8A3120`
- Earth / swept ground before dawn `#1D1B17`
- Ember, the one accent `#D2603F`: kaavi lifted so it reads on earth. It is used only for the level pips and the Tamil caption. On paper the accent is kaavi, and on kaavi it is rice white.

### How level is encoded

**The ground is the level**, and it follows the kolam's own path from practice to public:

- **Beginner**: ink on notebook paper, where kolams are practised (light).
- **Intermediate**: rice flour on kaavi, the red-oxide doorstep (mid-tone).
- **Advanced**: rice flour on the dark swept earth or street before dawn (dark).

The three grounds sit far apart in value, so the code survives greyscale printing. Every cover also shows one to three filled pips (dots again) and the level name.

### Sub-series and states

- **Charlie and the Intelligence Factory** (I–IV): each book has a series line with a roman numeral, and every kolam is drawn in **double line** (*irattai kodu*), a real kolam style that makes the four read as a set. All crossings are drawn flat and merged, the way two flour lines meet, both where a line crosses itself and where two lines cross.
- **Coming soon**: the whole design is pencilled in faintly, as in a kolam notebook. The dots are laid, and only the first third of the line is drawn in full white. The caption gives the grid, not a count: "8 × 4 · one warp · the line has begun" (Tamil "8 × 4 · கோடு தொடங்கியது").

## Emblems, one line per book

- **AI Context Engineering**: 43 dots. An outer 9 × 7 frame (28) around an inner 5 × 3 block (15), which is the window and what you put inside it. The frame is forced to a pure two-strand braid (two lines) and the inside is one line: 3 lines in all, D2.
- **Mathematical Foundations for ML**: 43 dots. The classic nēr diamond 1–3–5–7–11–7–5–3–1, crossed by an eleven-dot horizontal axis (a number line). One line, D2.
- **Neural Networks from Scratch**: 33 dots in layer columns 5–7–9–7–5. Inside a layer the line only crosses, so each column is its own braid. Between layers it turns back everywhere except at one crossing on the centre line (the signal passing forward), and these crossings join the five layers into one line.
- **Build LLMs from Scratch**: 20 dots in a tower of five identical 2 × 2 blocks: the N× decoder stack. Each block is woven the same way (one turn makes it a single line on its own), and each block joins the next through exactly one crossing. One line climbs the whole model.
- **5D Parallelism**: 40 dots, a device mesh 2–4–6–8–8–6–4–2, woven by exactly five closed lines: data, tensor, pipeline, sequence and expert. The solver now rejects any line that touches fewer than 6 dots, and any pair of lines that never cross. Every one of the 10 pairs crosses, and each line touches 16–18 dots. Mirrored left to right, because only a single mirror axis allows an odd count on this shape.
- **Pi vs Hermes vs Codex**: 9 capsules, a 3 × 3 grid, no turns at all. The square falls naturally into three interlaced lines, one for each of the three agents sharing one memory.
- **Data Structures & Algorithms in Python**: 69 dots as a hash table with chaining. There are 9 buckets down the left, and chains of 9–4–8–2–9–6–9–4–9 are braided along the rows as linked lists. The chains are forced never to touch one another, so the single line passes from chain to chain only through the bucket column. This makes a ragged-comb silhouette that nothing else on the shelf has.
- **R Masterclass**: 36 dots stacked as a bell-curve histogram, 1–1–3–5–8–8–5–3–1–1, flat-topped, with long thin tails along the baseline. One line, mirrored left to right.
- **Prompt Engineering**: 31 dots in the shape of a speech bubble (7 × 4 plus a 3-dot tail). There is no symmetry, so the turns fall where the conversation takes them.
- **Build a DeiT from Scratch**: an 8 × 5 grid of image patches (40) plus two token dots, [CLS] and [DIST], set above the first row (42). Crossings are forced where the tokens meet the patches. One line runs through tokens and patches alike, as attention does. The two-dot tab gives a silhouette of its own.
- **Charlie I, Language Room**: 22 dots set like a paragraph (8 + 8 + 6, with a short last line). One line, double-line style.
- **Charlie II, Vision Room**: a 5 × 4 patch grid (20). Four and five share no factor, so a single line crosses every patch and never turns inside.
- **Charlie III, Sound Room**: 20 dots in waveform pulses 3–1–5–1–3–1–5–1 about a centre line. One line, no inner turns.
- **Charlie IV, Reasoning Room**: an idukku triangle 1–2–3–4–5–6 (21), a tree of moves. Mirror symmetry through dots on the axis forces at least three lines, and the search stops at exactly three: bandits, RL, reasoning models.
- **Kernel Engineering** (coming soon): the capsule count is not known yet, so the grid is a **placeholder**, 8 × 4, one warp of GPU threads. The caption gives the grid, not a count ("8 × 4 · one warp · the line has begun"), and it will be regenerated with one dot per capsule when the book ships. It is shown mid-drawing.

## Files

- `index.html`: the presentation page (static SVG, no runtime script needed).
- `src/kolam.js`: the kolam engine. It covers the mirror-curve model, loop tracing, union-find loop counting, symmetry orbits, annealed turn search, smooth Bézier rendering, partial and double-line drawing. It also enforces optional structural constraints: `minLoopDots` (no trivial lines) and `allCross` (every pair of lines must cross).
- `src/books.js`: each book's grammar (shape, number of lines, symmetry, turn density, forced crossings or turns).
- `src/build.js`: writes `index.html`. Run `node covers/11-kolam/src/build.js`. It also runs a **shelf check**: each emblem gets a silhouette signature (hull aspect ratio regardless of orientation, fill ratio, centroid offset), and any two emblems on the same ground that come out as near-twins are flagged. The old 4 × 5 LLM grid against the 5 × 4 Vision Room would have been flagged. The current set passes.
- `renders/`: PNG (2×), JPG (1×), vector PDFs at exact trim, `_contact-180.png` and `_sheet.png`.

## Crediting and commissioning practitioners

A production version should not stop at code. Vizuara should **commission kolam practitioners from Tamil Nadu** to draw the master set by hand from our computed dot grids, and pay them as illustrators. Margazhi kolam competitions, women's self-help collectives and the kolam artists who teach in Chennai are all places to look. Each practitioner should be **credited by name on the back cover** ("Kolam drawn by …"). They should also review the generator's rules and outputs, so the long tail of titles is checked by people who hold the tradition. No living artist's signature designs were imitated here. Only the public, rule-based *sikku* structure was used.

## What I'd do next

- Generate all ~50 titles and tune seeds by eye in a 50-up shelf view. Add a rule that neighbouring titles never share a silhouette.
- On the website, draw each kolam live as one continuous stroke (each is a single SVG path, so `stroke-dashoffset` does it) when a book opens. Show the "line has begun" state growing for coming-soon titles as capsules are published.
- Print tests: a slightly raised matte white ink for the rice-flour line on kaavi and earth stock, and an uncoated cream stock for the notebook covers.
- Spines: a vertical strip of the book's dots, so a shelf of fifty spines reads as one long pulli grid.
- Tamil and bilingual editions: the title face already has a Tamil companion.

## Review response (revision 2)

**Must-fix items, all checked against the renders and all confirmed:**

1. **5D Parallelism.** Confirmed: the five lines touched 28, 14, 8, 2 and 2 dots, and three of them crossed nothing. Instead of hand-forcing particular edges, I added two general solver constraints, `minLoopDots: 6` and `allCross`. Now all 10 pairs of lines cross and the lines touch 16–18 dots each. The reviewer's specific edge rules (force a crossing at the row 4–5 end dots, ban a full column of turns) are implied by these constraints, so they weren't added separately.
2. **Kernel Engineering.** Correct: the caption plus the one-dot-per-capsule rule implied 32 capsules. The caption now gives the grid, "8 × 4 · one warp · the line has begun" (Tamil: "8 × 4 · கோடு தொடங்கியது"). The page caption calls it a placeholder.
3. **Wrap spine.** Confirmed: the whole 43-dot kolam had closed up into a block. The spine now carries a legible excerpt: one side of the frame braid, 7 dots, as a single line with a 2.8 px stroke and gaps of more than 2 px. The 1 px border rules are gone from the artwork, and fold marks now sit outside the trim on the presentation page.
4. **Faux-italic Tamil.** Confirmed. `[lang=ta]` now sets `font-style: normal; font-synthesis: none`, so the italic applies to the Latin part only.

**Improvements taken:**
- The emblem box moved up to centre y = 574 (spanning 376–772). The Charlie box moved to 402–772.
- Silhouette budget: the LLM grid became the N× tower, DSA became the hash-table comb, and DeiT became patches plus a token tab. The shelf check now runs in `build.js`.
- R now uses 1–1–3–5–8–8–5–3–1–1. This bell with long tails no longer echoes the Charlie IV pyramid and doesn't read as a tower. The idukku exception is now stated in the notes.
- Craft:
  - The DeiT title is on three lines, with "Data-Efficient" unsplit.
  - The Charlie IV subtitle breaks after "Learning,".
  - The Kernel subtitle has no trailing period.
  - Double-line crossings are flat and merged throughout, drawn as all outer strokes, then all inner channels.

**Declined, one line each:**
- *DeiT as two lines, one per token.* A kolam line can't honestly be assigned to a particular dot, so I use one line and let the silhouette carry the two tokens.
- *Open rings for the Kernel placeholder dots.* The caption fix removes the false count, and "the dots are down, the line has begun" is the image. Rings would read as a different drawing tradition.
- *Pi and Vision Room both relying on the gcd/no-turn property.* That is the grammar working: 3 × 3 falls into three lines and 5 × 4 into one. They also differ in ground, line style and silhouette.
- *Converting every remaining rectangle.* Vision Room (patches), Kernel (a warp) and Pi (a 3 × 3 square) really are grids, which is the reviewer's own criterion. Language (a paragraph), Prompt (a bubble) and Context (a frame) already have their own silhouettes.

**Still open:** the LLM tower is the thinnest emblem at 180 px (about 20 px wide). It reads as a stack and nothing else looks like it, but it has less presence than the others. The Kernel grid must be regenerated once its capsule count exists.

