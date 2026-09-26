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
    shape: () => K.fromMask([...ring(9, 7).map((r, y) => (y >= 1 && y <= 5 ? r.slice(0, 2) + (y >= 1 && y <= 5 ? ' ' : '') + ' ' : r))].join('\n'), 'ner'),
    loops: 2, sym: 'D2', density: 0.2,
    spec: 'ring 9 × 7 around 5 × 3',
    why: 'An outer frame of 28 dots around an inner block of 15: the window, and what you choose to put inside it. Two lines, one held within the other.',
  },
  '5d-parallelism': {
    shape: () => K.fromMask([
      '   oo   ',
      '   oo   ',
      '   oo   ',
      'oo oo oo',
    ].join('\n'), 'ner'), loops: 5, sym: 'D4', density: 0.22,
    spec: 'cross 4 × 4 + 4 arms',
    why: 'A cross of forty dots — a 4 × 4 core and four arms — woven by exactly five closed lines: data, tensor, pipeline, sequence and expert parallelism.',
  },
  'pi-vs-hermes-vs-codex': {
    shape: () => K.fromRows([3, 3, 3], 'ner'), loops: 3, sym: 'D4', density: 0,
    spec: '3 × 3',
    why: 'Nine dots, no turns: the square falls naturally into three interlaced lines — three agents compacting the same memory.',
  },
};

if (typeof module !== 'undefined') module.exports = { BOOKS, SYM, ring };
