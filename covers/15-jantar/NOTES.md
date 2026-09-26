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
Stone (all levels): lit `#F8D2B6` → `#E08763`, shade `#8A3124` (evening shade `#733040`, glow `#FFC994`/`#E58454`)
Marble edging `#FFFBF4` · Poché / plinth `#5B1D18` · Plinth text `#F4EADC` / `#E3C3AE` · Water `#6F8580`

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
Level is the **time of day**. The single flat field that is both sky and ground is limewash (morning, beginner), ochre (noon, intermediate) or indigo (evening, advanced), and the sun lowers from high and clear to raking with long shadows. The three sky values step light → mid → dark, so the level also reads in greyscale and at 180 px. The plinth repeats it with a stepped glyph (one, two or three steps down, filled) and the word itself. "The deeper the book, the later in the day."

## Imprint
The mark is an **inverted stepped V**: a stepwell in section, which also reads as a V. It is set with *VIZUARA Books* in tracked caps, small and always in the same place on the plinth. It never competes with the title.

## Emblems (one line each)
- **Mathematical Foundations for ML** (B): the Samrat Yantra. The right triangle and the circle, the first mathematics, built as an instrument, with the gnomon's shadow falling on the graduated quadrant.
- **Neural Networks from Scratch** (B): a stepwell dug from scratch, cut in section. The terraces are layers and the paired flights between them (after Chand Baori) are the connections. Water at the bottom.
- **AI Context Engineering** (I): a long wall with one window. The sun comes through the single opening and lights four of the tokens in a row, and the rest of the sequence stays in shadow.
- **Build LLMs from Scratch** (I): a stair built one step at a time, each step resting on all the steps before it. The next step is still a dashed setting-out line (the next token).
- **5D Parallelism for Large Model Training** (A): a field of identical gnomons in rows and columns, one instrument replicated, their evening shadows running in parallel.
- **Pi vs Hermes vs Codex: Context Compaction and Memory** (A): three ways to fold the same climb (a straight flight, a switchback and a spiral), all reaching the same height in less and less ground. Compaction as architecture.
- **Transformers: Theory, Intuition, and Building from Scratch** (I): the Jai Prakash bowl. Every direction of the sky is mapped onto one grid, and a crosswire's shadow picks out a single point, as attention does.
- **Build Decision Trees from Scratch** (B): a court split by walls whose height is their depth in the tree. The root split is tallest, the next splits lower, the last splits lowest, and the leaf cells hold a marble or sandstone block (the two classes).
- **Charlie and the Intelligence Factory, I–IV** (sub-series): the same tall chamber cut open in section, with its poché frame and numeral as the series mark. Its roof is pierced in a pattern that belongs to the room, and the sun draws that pattern on the back wall. I *Language*: slits, light in a sequence. II *Vision*: a 4×4 grid, light in patches (ViT). III *Sound*: slits cut to a waveform. IV *Reasoning*: a stair climbing toward a single opening, reward as light.
- **Kernel Engineering** (A, coming soon): a jali. The GPU tile is the stone tile, and the screen's shadow is a grid of lit tiles. **Coming-soon rule:** the instrument is only partly built, and the rows still to be laid are dashed setting-out lines.

## Deliverables here
`index.html` (presentation plus 13 covers plus a print wrap, back/spine/front for *Mathematical Foundations*), `renders/` (PNG 2×, JPG 1×, vector PDFs at exact trim, `_contact-180.png`, `_wrap.jpg`), `src/` (engine, scenes, template, build script).

## What I'd do next
- Model the remaining ~37 titles. Each needs one scene function, typically 10–40 lines on top of the shared engine. Keep a catalogue of instrument types (gnomon, bowl, quadrant, wall-with-opening, jali, stepwell, stair, court) so the shelf stays varied.
- Add a meridian line or paving joints on the ground where a structure needs anchoring, and a single scale figure as an option on the largest instruments.
- Check each instrument against measured survey drawings of the Jaipur and Delhi observatories, correct the proportions and quadrant graduations, and add real hour and declination scales.
- Fix the spine formula (spine width from page count) and write a back-cover template for every level.
- Proof the three skies and the poché on uncoated and coated stock, and tune shadow values for press gain.

## Credit and collaboration (production)
A production version should be drawn with, and credited to, an Indian architectural illustrator working from measured drawings of the Jantar Mantar sites. It should acknowledge the sandstone carvers and lime-plaster (*araish*) craftspeople of Jaipur, whose finishes the palette comes from, for example through a colophon on the back flap, and ideally through a commissioned photographic or survey collaboration with the site's conservation team.
