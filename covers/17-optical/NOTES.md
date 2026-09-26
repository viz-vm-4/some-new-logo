# 17 — Interference

**The idea.** Every Vizuara book is one field of black lines plus one spot colour, built the way op art is built
(Riley, Vasarely, Cruz-Diez): line displacement, density modulation, moiré, figure–ground. The book's idea is
the force that bends the lines. A Gaussian swells them, a causal mask turns them, compaction squeezes them,
and attention makes two ring systems interfere. Each field works at two distances. From across the room (or
at 180 px in the web library) the lines average into one bold tonal emblem. In the hand it resolves into lines
and starts to shimmer. The system is strict: field on top, bleeding off three sides, 544 px deep. Below it a
paper plate with a caption row, the title, and the imprint. Colour appears only inside the field, and only
where the concept is.

## Palette
- Ink `#121212`, Paper `#F4F2EC` (constants; all type is ink on paper)
- Eight spot inks, one per book: Vermilion `#E2371D`, Ultramarine `#2A3BD4`, Viridian `#00906A`,
  Violet `#6A36CF`, Cadmium `#F2BD00`, Deep Teal `#007F8C`, Carmine `#BE1238`, Chartreuse `#7DAE12`
- Colour always overprints ink (multiply, carried into the PDFs as `/BM /Multiply`), so moiré fields print
  as true overprints. Every emblem also works in greyscale, because its form carries the concept and the
  colour only marks it.

## Type
Archivo (Google Fonts), one family on its width axis.
- Titles: 800 weight, width 100, tracking −0.028 em, set at 72/58/50 px by length, with hand-set breaks.
- Subtitles: 500 weight, 23 px.
- Caption row, series line and imprint: 600–700 weight at width 112–125, tracked caps.

## Imprint
"VIZUARA BOOKS", with a small mark: five lines each bent by the same V. It is the system's one move, used
as a signature. It always sits bottom-left and is never louder than the title.

## Level
Level is encoded as grain, in two places.
1. **Caption row:** three small squares (coarse / medium / fine grating). The book's level is inked and the
   other two are outlines, followed by the word.
2. **The field itself:** wherever the field is a grating, its line pitch follows the level. Beginner is
   16 px, intermediate 12 px, advanced 8 px. Beginner covers look bold and stripy. Advanced ones look fine
   and silky, so the shelf sorts itself by texture.

## Emblems (how each was derived)
- **AI Context Engineering:** the context window as a lens. Every line of the stream survives, but the
  relevant slice is magnified into the window (in colour) while the rest is compressed around it.
- **Mathematical Foundations for ML:** a 2-D Gaussian lifts a field of lines (the normal distribution as a
  surface). The ~1σ region is inked in colour.
- **Neural Networks from Scratch:** a 12-18-18-12 fully-connected network drawn edge by edge across the
  whole field. The all-to-all fans interfere into moiré. One hidden neuron's fan-in and fan-out are in
  colour.
- **Build LLMs from Scratch:** the causal attention mask. Attended cells are heavy horizontals, the masked
  future is hairline verticals, and the diagonal (each token attending to itself) is in colour.
- **5D Parallelism:** de Bruijn's pentagrid. Five families of parallel lines, whose dual is a Penrose
  tiling, the 2-D shadow of a 5-D lattice. One ribbon (one line of one family, i.e. one axis) is in colour.
- **Pi vs Hermes vs Codex:** one history of vertical lines with three compaction profiles (top / middle /
  bottom band). Older lines are squeezed left into memory (colour). The lines bend where one profile hands
  over to the next. The profiles are illustrative and don't claim the real algorithms.
- **Transformers:** attention as interference. The sequence is a full-bleed ring field. One head is a disc
  of coloured rings from a second centre. The fringes exist only where the two overprint.
- **Prompt Engineering:** one small input (colour), and the ripple runs through every line downstream.
- **SQL Masterclass:** a JOIN. A table of rows overlaps a table of columns, and only the matched region,
  where both line systems exist, is in colour.
- **DeiT from Scratch:** distillation as a moiré hidden image. A black teacher grating sits under a coloured
  student grating whose phase is set per 48 px patch. A disc appears only where the two overlap, already cut
  into patches the way a ViT sees it.
- **Diffusion LM from Scratch:** masked diffusion, read top to bottom. Every token starts as the same short
  [MASK] block (colour) and is unmasked, step by step, into word-length ink.
- **Kernel Engineering (forthcoming):** Riley's *Movement in Squares* read as a tiled matmul. Tiles compress
  toward the chip, and one tile is in colour.
- **Charlie and the Intelligence Factory (I–IV):** a sub-series with one corridor and four rooms. The same
  perspective room (depth lines on the walls, converging lines on the floor and ceiling) is used each time.
  The vanishing point walks left to right from I to IV, so the four spines/covers side by side read as a walk
  down the factory. The back wall holds the room: lines of text (Language), an iris of rings (Vision),
  modulated waves (Sound), and a binary search tree with the chosen path in colour (Reasoning). The series
  line sits opposite the imprint.

## Print
- Everything is SVG/HTML vector. The PDFs contain no raster images.
- Minimum line or gap is 1 px at trim (≈0.26 mm). Nothing goes below it, and slivers are filtered out.
- Displaced fields are windowed so no line is cut into a sliver at the field edge.
- A full wrap (back + 0.5 in spine + front) is on the page for AI Context Engineering. The field runs round
  the book. The back carries a plain-language blurb and an "On the cover" colophon that explains the emblem.

## What I'd do next
- Write field functions for the remaining ~35 titles from the same small grammar (displace, modulate,
  overprint, rotate), and keep a ledger so no two books share a field *and* an ink.
- Add a spine system: the field continues across every spine, so a shelf row reads as one continuous
  Riley stripe interrupted by titles.
- Proof on press with the spot inks as real Pantone overprints (the moiré covers want a true second plate).
  Also check the 8 px advanced gratings on uncoated stock for dot gain.
- Animate the fields slightly on the web library (a 1–2 px phase drift on hover) so the thumbnails shimmer
  like the printed object.
