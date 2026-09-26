// Per-book kolam grammar.  Every emblem has exactly one pulli (dot) per capsule.
// shape: how the dots are laid out (the subject's structure)
// loops: how many closed lines (1 = a single unbroken line through every capsule)
// sym:   symmetry the turns must respect ('D2' = mirror both ways, 'C2'/'C4' = rotation, 'D4')
// why:   one line for NOTES / the back cover
const K = typeof require !== 'undefined' ? require('./kolam.js') : window.Kolam;

const SYM = {
  D2: ['mx', 'my', 'r2'],
  D4: ['mx', 'my', 'r2', 'r4', 'r4b', 'd1', 'd2'],
  D4axes: ['mx', 'my', 'r2', 'r4', 'r4b'], // (with r4 the group is D4; kept to lattice axes)
  C2: ['r2'],
  C4: ['r2', 'r4', 'r4b'],
  MX: ['mx'],
  none: [],
};

function ring(w, h) { // one-dot-wide rectangular ring as mask rows
  const rows = [];
  for (let y = 0; y < h; y++) rows.push(y === 0 || y === h - 1 ? 'o'.repeat(w) : 'o' + ' '.repeat(w - 2) + 'o');
  return rows;
}

const BOOKS = {
  'mathematical-foundations-for-ml': {
    shape: () => K.fromRows([1, 3, 5, 7, 11, 7, 5, 3, 1], 'ner'), loops: 1, sym: 'D2', density: 0.24,
    spec: 'nēr pulli 1–3–5–7–11–7–5–3–1',
    why: 'The classic diamond of nēr pulli, pierced by a horizontal axis of eleven dots: the number line running through the square.',
  },
  'neural-networks-from-scratch': {
    shape: () => K.fromCols([5, 7, 9, 7, 5], 'ner', 'centre'), loops: 1, sym: 'D2', density: 0.28,
    force: (e) => (e.dir === 'E' ? 'x' : undefined), // every link between neighbouring layers is a crossing: dense layers
    spec: 'layers 5–7–9–7–5',
    why: 'Columns of dots are the layers of a small network (5–7–9–7–5); every step from one layer to the next is a crossing — a fully connected layer.',
  },
  'build-llms-from-scratch': {
    shape: () => K.fromRows(Array(10).fill(2), 'ner'), loops: 1, sym: 'D2', density: 0.3,
    spec: '2 × 10',
    why: 'A tower two dots wide and ten high: the decoder stack, one block over the next, read by a single line.',
  },
  'ai-context-engineering': {
    shape: () => K.fromMask([
      'ooooooooo',
      'o.......o',
      'o.ooooo.o',
      'o.ooooo.o',
      'o.ooooo.o',
      'o.......o',
      'ooooooooo',
    ].join('\n'), 'ner'),
    loops: 2, sym: 'D2', density: 0.2,
    spec: 'frame 9 × 7 around 5 × 3',
    why: 'An outer frame of 28 dots around an inner block of 15: the window, and what you choose to put inside it. Two lines, one held within the other.',
  },
  '5d-parallelism': {
    shape: () => K.fromMask([
      '....oo....',
      '....oo....',
      '....oo....',
      '...oooo...',
      'oooooooooo',
      'oooooooooo',
      '...oooo...',
      '....oo....',
      '....oo....',
      '....oo....',
    ].join('\n'), 'ner'), loops: 5, sym: 'D4', density: 0.22,
    spec: 'cross: 4 × 4 core, four 2 × 3 arms',
    why: 'A cross of forty dots — a 4 × 4 core and four arms — woven by exactly five closed lines: data, tensor, pipeline, sequence and expert parallelism.',
  },
  'pi-vs-hermes-vs-codex': {
    shape: () => K.fromRows([3, 3, 3], 'ner'), loops: 3, sym: 'D4', density: 0,
    spec: '3 × 3',
    why: 'Nine dots, no turns: the square falls naturally into three interlaced lines — three agents compacting the same memory.',
  },
  'dsa-in-python': {
    shape: () => K.fromRows([5, 7, 9, 9, 9, 9, 9, 7, 5], 'ner'), loops: 1, sym: 'C4', density: 0.26,
    spec: 'octagon 9 × 9',
    why: 'The largest kolam in the library, 69 dots, and still one closed line: an Euler tour, the oldest graph algorithm, drawn by hand.',
  },
  'r-masterclass': {
    shape: () => K.fromCols([1, 2, 4, 7, 8, 7, 4, 2, 1], 'ner', 'bottom'), loops: 1, sym: 'MX', density: 0.24,
    spec: 'columns 1–2–4–7–8–7–4–2–1',
    why: 'Nine columns of dots stacked as a histogram of the normal distribution: the bell curve that R was built to draw.',
  },
  'deit-from-scratch': {
    shape: () => K.fromRows([6, 6, 6, 6, 6, 6, 6], 'ner'), loops: 2, sym: 'D2', density: 0.2,
    spec: '6 × 7 patches',
    why: 'A 6 × 7 grid of image patches carried by two lines, not one: the class token and the distillation token, student and teacher.',
  },
  'charlie-language-room': {
    shape: () => K.fromRows([11, 11], 'ner'), loops: 1, sym: 'D2', density: 0.18,
    spec: '2 × 11',
    why: 'Eleven tokens in two rows: a sentence as a braid, generated one crossing at a time.',
  },
  'charlie-vision-room': {
    shape: () => K.fromRows([5, 5, 5, 5], 'ner'), loops: 1, sym: 'D2', density: 0,
    spec: '5 × 4 patches',
    why: 'An image cut into a 5 × 4 grid of patches. Four and five share no factor, so a single line crosses every patch without once turning inside.',
  },
  'charlie-sound-room': {
    shape: () => K.fromCols([1, 3, 1, 5, 5, 1, 3, 1], 'ner', 'centre'), loops: 1, sym: 'D2', density: 0.2,
    spec: 'waveform 1–3–1–5–5–1–3–1',
    why: 'Columns of dots rise and fall about a centre line like a sampled waveform.',
  },
  'charlie-reasoning-room': {
    shape: () => K.fromRows([1, 2, 3, 4, 5, 6], 'idukku'), loops: 1, sym: 'none', density: 0.22,
    spec: 'idukku pulli 1–2–3–4–5–6',
    why: 'Interlaced dots fanning out row by row, a tree of possible moves; one line — one chain of reasoning — has to find its way through all of them.',
  },
  'kernel-engineering': {
    shape: () => K.fromRows([8, 8, 8, 8], 'ner'), loops: 1, sym: 'D2', density: 0.22, partial: 0.4,
    spec: '8 × 4 — one warp',
    why: 'Thirty-two dots, one warp of GPU threads. The book is coming, so the dots are down and the line has only just begun.',
  },
};

if (typeof module !== 'undefined') module.exports = { BOOKS, SYM, ring };
