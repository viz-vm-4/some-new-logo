# 15 — Jantar: instruments in stone

## The idea
In Delhi (1724) and Jaipur (1728–34), Sawai Jai Singh II built astronomical instruments as buildings. The Samrat Yantra is a staircase-topped right triangle 27 m high that tells the time by its shadow. The Jai Prakash is a sunken bowl whose marble grid maps the sky, and a crosswire's shadow on that grid shows where the sun stands. Jantar gives every Vizuara book one such instrument, derived from the book's subject and drawn the way an architect would draw it: axonometric, one hard sun, true cast shadows, red sandstone with white marble edging. The system is a small stage that stays fixed. The title sits in the sky. The instrument stands on the ground. At the same line on every cover the ground is cut open in section, and that section (oxblood poché) becomes the plinth that carries the imprint. Wells and stepwells show in section through it. The shelf reads as one observatory, and each book is a different instrument in it.

All images are generated in code. `src/engine.js` is a small renderer (~330 lines, no libraries). It models convex solids, back-face culls them, orders faces with a BSP tree and computes analytic hard shadows: every sun-facing face is projected along the sun ray onto each lit receiver plane and clipped to it. Output is pure flat-toned SVG polygons, so the PDFs are vector at any size. `src/covers.js` holds one short scene function per book. `python3 src/build.py` inlines both into the self-contained `index.html`.

## Sites and principles taken (structure, logic, craft; no surface ornament)
- **Jantar Mantar, Jaipur** (UNESCO WHS): the **Samrat Yantra**, a gnomon inclined at the site latitude of about 27° with two quadrant arcs lying in the equatorial plane, graduated in marble. The **Jai Prakash Yantra**, a hemispherical bowl with an altitude/azimuth grid and a crosswire whose shadow marks the reading. The principle: *the geometry is the instrument, and light does the computing.*
- **Jantar Mantar, New Delhi**: the **Misra Yantra** and the stairs that climb to nowhere. The principle: *monumental scale, walls graduated like rulers.*
- **Chand Baori, Abhaneri** (9th century): the criss-cross double flights on every terrace of the stepped pit. The principle: *layers connected to layers.*
- **Panna Meena ka Kund, Amer**, and stepwells generally: the pit cut in section, water at the bottom.
- **Jali** screens of Rajasthan and Gujarat: a stone lattice treated as a filter for light, whose shadow is the image.
- **Sciagraphy / Beaux-Arts "shades and shadows"**: one consistent sun, shade and cast shadow as the drama, and the section drawn in poché.
- No elephants, domes, deities, paisley or mandala clip-art. The circular Jai Prakash grid is a working coordinate system and is always drawn obliquely, as a bowl.

## Palette (hex)
Stone (all levels): lit `#F1BF9C` → `#DD8460`, shade `#8A3124` (evening shade `#733040`, glow `#FFC994`/`#E58454`)
Marble edging `#FFFBF4` · Poché / plinth `#5B1D18` · Marble cut line along every section edge `#F4EADC` · Plinth text `#F4EADC` / `#E3C3AE` · Unreached level step `#8C4A3E` · Water `#6F8580`

| Level | Hour | Sky = ground | Cast shadow | Title ink |
|---|---|---|---|---|
| Beginner | Morning | `#EFE6D7` limewash | `#BE9B85` | `#26140E` |
| Intermediate | Noon | `#D9A546` haldi ochre | `#A26C27` | `#26140E` |
| Advanced | Evening | `#1E2046` indigo | `#0B0C22` | `#F6EDE0` |

The retired orange/sky-blue/magenta pinwheel is not used anywhere.

## Type
- **Anek Latin** (Ek Type, Mumbai), SemiBold at 80% width, for titles (80 px for two lines, 68 px for three), the imprint and labels.
- **Tiro Devanagari Hindi** (Tiro Typeworks), Italic, for subtitles, captions, the back cover and the figure line.
Both come from Google Fonts. Anek is an Indian foundry's design, so the voice is Indian without being decorative.

## How level is encoded
Level is the **time of day**. The single flat field that is both sky and ground is limewash (morning, beginner), ochre (noon, intermediate) or indigo (evening, advanced), and the sun lowers from high and clear to raking with long shadows. The three sky values step light → mid → dark, so the level also reads in greyscale and at 180 px. The plinth repeats it with the imprint's own stepped-well profile, three solid terraces about 30×19 px with one, two or three lit (`#F4EADC`) and the rest dim (`#8C4A3E`), followed by the word itself. Every section edge carries a 2.5 px marble cut line, so the plinth separates from the indigo evening sky even in greyscale (the poché and indigo are close in value). "The deeper the book, the later in the day."

## Imprint
The mark is an **inverted stepped V**: a stepwell in section, which also reads as a V. It is set with *VIZUARA Books* in tracked caps, small and always in the same place on the plinth. It never competes with the title.

## Emblems (one line each)
- **Mathematical Foundations for ML** (B): the Samrat Yantra, seen at 36° so the right triangle reads in profile. The right triangle and the circle, the first mathematics, built as an instrument, with the gnomon's shadow falling on the graduated quadrant.
- **Neural Networks from Scratch** (B): a stepwell block (after Chand Baori) standing on the ground and cut through its near face, so the stepped V shows in poché. Each terrace (a layer) is edged in marble, and paired flights on every riser (the connections) join each layer to the next. Water at the bottom.
- **AI Context Engineering** (I): a long wall with one window. The sun comes through the single opening and lights exactly four tokens in a row of twenty. The row's pitch and phase are computed from the sun so the four stand wholly in the light, and a token is marble in the light and sandstone in shade.
- **Build LLMs from Scratch** (I): a stair built one step at a time, each step resting on all the steps before it. The next step is still a dashed setting-out line (the next token).
- **5D Parallelism for Large Model Training** (A): one instrument, split five ways. Each gnomon is cut crosswise into three stages (pipeline) and lengthwise into two leaves (tensor). The middle row has differently shaped instruments (experts), the rows are replicas (data), and a marble sequence line under each row is broken into equal lengths, one per column (sequence/context).
- **Pi vs Hermes vs Codex: Context Compaction and Memory** (A): three ways to fold the same climb (a switchback, a helix, and a stair wound round a square core), all on the same footprint and reaching the same marble-capped height, with a dashed datum across them. Compaction as architecture. The folds are deliberately not mapped to the three products and imply no ranking.
- **Transformers: Theory, Intuition, and Building from Scratch** (I): the Jai Prakash bowl. Every direction of the sky is mapped onto one grid, and a crosswire's shadow picks out a single point, as attention does.
- **Build Decision Trees from Scratch** (B): a court split by walls whose height is their depth in the tree. The root split is tallest, the next splits lower, the last splits lowest, and each leaf cell holds a marble or oxblood block (the two classes, now far apart in value).
- **Charlie and the Intelligence Factory, I–IV** (sub-series): the same chamber in axonometric, with its near wall cut away in poché (the series mark, with the numeral) and its roof pierced in a pattern that belongs to the room. The sun comes through the roof and draws that pattern on the back wall, and the cut-away wall still casts its shadow by drawing convention. I *Language*: slits, light in a sequence. II *Vision*: a 4×4 grid of square openings, light in patches (ViT). III *Sound*: slits cut to a waveform. IV *Reasoning*: a stair climbing toward a single opening, reward as light.
- **Kernel Engineering** (A, coming soon): a jali. The GPU tile is the stone tile, and the screen's shadow is a grid of lit tiles. **Coming-soon rule:** the instrument is only partly built, and the rows still to be laid are dashed setting-out lines.

## Deliverables here
`index.html` (presentation plus 13 covers plus a print wrap, back/spine/front for *Mathematical Foundations*), `renders/` (PNG 2×, JPG 1×, vector PDFs at exact trim, `_contact-180.png`, `_wrap.jpg`), `src/` (engine, scenes, template, build script).

## What I'd do next
- Cap stairs at about one cover in eight across the full catalogue and draw on the rest of the Jantar vocabulary: Ram Yantra (open cylinder with radial pillars), Rashivalaya (twelve differently tilted gnomons, a natural fit for the mixture-of-experts Kimi books), Digamsha (a pillar inside two concentric walls, for RAG), Nadivalaya (a two-faced equatorial dial, for encoder–decoder).
- Model the remaining ~37 titles. Each needs one scene function, typically 10–40 lines on top of the shared engine. Keep a catalogue of instrument types (gnomon, bowl, quadrant, wall-with-opening, jali, stepwell, stair, court) so the shelf stays varied.
- Add a meridian line or paving joints on the ground where a structure needs anchoring, and a single scale figure as an option on the largest instruments.
- Check each instrument against measured survey drawings of the Jaipur and Delhi observatories, correct the proportions and quadrant graduations, and add real hour and declination scales.
- Fix the spine formula (spine width from page count) and write a back-cover template for every level.
- Proof the three skies and the poché on uncoated and coated stock, and tune shadow values for press gain.

## Credit and collaboration (production)
A production version should be drawn with, and credited to, an Indian architectural illustrator working from measured drawings of the Jantar Mantar sites. It should acknowledge the sandstone carvers and lime-plaster (*araish*) craftspeople of Jaipur, whose finishes the palette comes from, for example through a colophon on the back flap, and ideally through a commissioned photographic or survey collaboration with the site's conservation team.

## Review response (round 2)
Before changing anything I checked each claim against the renders. All four must-fixes held up, and all four are fixed.

**Must fix**
1. *Neural Networks crowds the imprint and has 20 px panel edges.* Confirmed: the old pit ran down to y≈806. Redrawn: the stepwell is now a block standing on the ground, cut through its near face. Nothing goes below the plinth line at 748, so the imprint has the same clearance as on every other cover. The block bleeds decisively off the left trim and stops inside the margin on the right. Terraces are separated by marble lips and lit from one side, the flights read as dark zigzags, and the stray pale specks are gone.
2. *The level glyph reads as tofu.* Confirmed at 1×. It is now the imprint's own stepped-well profile: three solid terraces, 30×19 px with 2.4 px gaps, lit `#F4EADC` for the levels reached and dim `#8C4A3E` for the rest. There are no outlines left.
3. *5D shows only data parallelism.* Agreed. Every gnomon is split into three stages (pipeline) and two leaves (tensor), the middle row carries differently shaped instruments (experts), the rows replicate (data), and the sequence line under each row is broken into per-column lengths (sequence/context). The caption now reads "One instrument, split five ways".
4. *The Pi/Hermes/Codex folds don't read and imply a ranking.* Agreed on both counts. The drawing now has three towers inside the margin on one ground line. They share a footprint (150 units) and a marble-capped height, with a dashed datum at that height. They are a switchback with half-landings and lit zigzag flights, a continuous helix whose treads overlap by about 30% with the column carried to the top landing, and a stair wound round a square core. The caption "Three ways to fold one climb" makes no compactness claim, and NOTES no longer does either.

**Improvements**
1. *Greyscale value structure.* Taken. A marble cut line is drawn along every section edge (the renderer collects poché faces and outlines them last), and it now holds the evening plinth in greyscale. Beginner lit stone is deepened (`#F1BF9C`/`#DD8460`) so lit faces don't dissolve into limewash. Decision-trees' second class is now oxblood rather than marble.
2. *The Charlie rooms read as a garage door.* Taken. The rooms are now axonometric, turned 18° with the near wall cut in poché, so the pierced roof slab is visible from above and the sun's pattern lands on the back wall. The Vision openings are square (30×30), and the old stray ticks are gone with the old construction. I did not draw volumetric light shafts: flat-tone sciagraphy has no convention for them, and the pattern on the wall already shows the mechanism.
3. *Samrat end-on, right edge sliver.* Taken. The camera is now at az 36° and the whole instrument sits inside the page.
4. *Context tokens: three and a half lit.* Taken. The token row's pitch and phase are computed from the sun so that exactly four tokens stand in the light. Tokens are marble in the light and stone shade in the dark.
5. *Too many stairs.* Partly taken. The principle goes into "What I'd do next" for the other ~37 titles. In this set I kept them: the Samrat and Chand Baori stairs are the real buildings, build-LLMs and the folds are about stairs, and the Reasoning room's climb is the sub-series' one stair.
6. *Subtitle rag.* Taken. The two subtitles break at the natural pause, `.sub` uses `text-wrap: balance`, and I dropped the trailing period on the Kernel subtitle.
