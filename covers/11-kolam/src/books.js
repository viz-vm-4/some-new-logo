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
  MY: ['my'],
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
    shape: () => K.fromCols([5, 7, 9, 7, 5], 'ner', 'centre'), loops: 1, sym: 'D2', density: 0.26,
    force: (e) => (e.dir === 'N' ? 'x' : undefined), // each layer is a braid; the line turns back between layers except where a few links carry it across
    spec: 'layers 5–7–9–7–5',
    why: 'Columns of dots are the layers of a small network (5–7–9–7–5); every step from one layer to the next is a crossing — a fully connected layer.',
  },
  'build-llms-from-scratch': {
    shape: () => K.fromRows([4, 4, 4, 4, 4], 'ner'), loops: 1, sym: 'D2', density: 0.38,
    force: (e) => (e.dir === 'E' ? 'x' : undefined), // each row is a braided block; between blocks the line mostly turns back
    spec: '4 × 5, in five blocks',
    why: 'Five rows of four: a stack of transformer blocks, each braided on its own and joined to the next only through a few crossings, like the residual stream that runs through them all.',
  },
  'ai-context-engineering': {
    shape: () => K.fromMask([
      'rrrrrrrrr',
      'r.......r',
      'r.ooooo.r',
      'r.ooooo.r',
      'r.ooooo.r',
      'r.......r',
      'rrrrrrrrr',
    ].join('\n'), 'ner'),
    loops: 3, sym: 'D2', density: 0.2,
    force: (e, d, M) => (M.shape.cells[e.a].ch === 'r' ? 'x' : undefined),
    spec: 'frame 9 × 7 around 5 × 3',
    why: 'An outer frame of 28 dots around an inner block of 15: the window, and what you choose to put inside it. The frame is a plain two-strand braid; everything inside is one line.',
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
    ].join('\n'), 'ner'), loops: 5, sym: 'MX', density: 0.22,
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
    shape: () => K.fromMask('oooooooo\noooooooo\noooooo', 'ner'), loops: 1, sym: 'none', density: 0.18,
    spec: 'a paragraph: 8 + 8 + 6',
    why: 'Twenty-two dots set like a paragraph of text: two full lines and a short last one. A single line reads through every token and returns to the start.',
  },
  'charlie-vision-room': {
    shape: () => K.fromRows([5, 5, 5, 5], 'ner'), loops: 1, sym: 'D2', density: 0,
    spec: '5 × 4 patches',
    why: 'An image cut into a 5 × 4 grid of patches. Four and five share no factor, so a single line crosses every patch without once turning inside.',
  },
  'charlie-sound-room': {
    shape: () => K.fromCols([3, 1, 5, 1, 3, 1, 5, 1], 'ner', 'centre'), loops: 1, sym: 'MY', density: 0.12,
    spec: 'pulses 3–1–5–1–3–1–5–1',
    why: 'Columns of dots rise and fall about a centre line like the pulses of a sampled waveform; the line runs through them without a single inner turn.',
  },
  'charlie-reasoning-room': {
    shape: () => K.fromRows([1, 2, 3, 4, 5, 6], 'idukku'), loops: 3, sym: 'MX', density: 0.2,
    spec: 'idukku pulli 1–2–3–4–5–6',
    why: 'Interlaced dots fanning out row by row, a tree of possible moves. Mirror symmetry through the centre forces exactly three lines: bandits, reinforcement learning, reasoning models.',
  },
  'kernel-engineering': {
    shape: () => K.fromRows([8, 8, 8, 8], 'ner'), loops: 1, sym: 'MX', density: 0.22, partial: 0.27,
    spec: '8 × 4 — one warp',
    why: 'Thirty-two dots, one warp of GPU threads. The book is coming, so the dots are down and the line has only just begun.',
  },
};

if (typeof module !== 'undefined') module.exports = { BOOKS, SYM, ring };
