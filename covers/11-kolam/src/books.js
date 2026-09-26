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
    why: 'The classic diamond of nēr pulli, pierced by a horizontal axis of eleven dots — a number line through the figure — and drawn as a single closed line.',
  },
  'neural-networks-from-scratch': {
    shape: () => K.fromCols([5, 7, 9, 7, 5], 'ner', 'centre'), loops: 1, sym: 'D2', density: 0.26,
    force: (e) => (e.dir === 'N' ? 'x' : undefined), // each layer is a braid; the line turns back between layers except where a few links carry it across
    spec: 'layers 5–7–9–7–5',
    why: 'Columns of dots are the layers of a small network, 5–7–9–7–5. Inside a layer the line only crosses, so each column reads as its own braid; between layers it mostly turns back, and a few crossings, the weights, carry it across until the whole network is one line.',
  },
  'build-llms-from-scratch': {
    shape: () => K.fromRows(Array(10).fill(2), 'ner'), loops: 1, sym: 'none', density: 0.25,
    // five 2 x 2 blocks stacked; between blocks exactly one crossing, alternating sides
    force: (e, d) => {
      if (e.dir !== 'N') return undefined;
      const y = d[1], k = Math.round(y - 0.5);            // boundary between display rows k and k+1
      if (k % 2 === 0) return undefined;                   // inside a block: free
      const side = ((k - 1) / 2) % 2 === 0 ? 0 : 1;        // which column carries the crossing
      return Math.round(d[0]) === side ? 'x' : 'm';
    },
    spec: 'a tower of five 2 × 2 blocks',
    why: 'Five blocks of four stacked into a tower: the N× decoder stack. Each block is woven on its own and joined to the next by exactly one crossing, alternating sides, so a single line climbs the whole model.',
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
    shape: () => K.fromRows([2, 4, 6, 8, 8, 6, 4, 2], 'ner'), loops: 5, sym: 'MX', density: 0.22,
    minLoopDots: 6, allCross: true, iters: 6000, restarts: 6, // every line substantial, every pair of lines crosses
    spec: 'nēr pulli 2–4–6–8–8–6–4–2',
    why: 'Forty dots, a mesh of devices, carried by exactly five closed lines — data, tensor, pipeline, sequence and expert parallelism. The solver rejects any line that covers fewer than six dots and any pair of lines that never cross, so every line weaves through every other, as every device sits in all five groupings.',
  },
  'pi-vs-hermes-vs-codex': {
    shape: () => K.fromRows([3, 3, 3], 'ner'), loops: 3, sym: 'D4', density: 0,
    spec: '3 × 3',
    why: 'Nine dots, no turns: the square falls naturally into three interlaced lines — three agents compacting the same memory.',
  },
  'dsa-in-python': {
    shape: () => K.fromMask([9, 4, 8, 2, 9, 6, 9, 4, 9].map((L) => 'o'.repeat(L + 1)).join('\n'), 'ner'), loops: 1, sym: 'none', density: 0.3,
    // a hash table with chaining: bucket column on the left, a linked list braided along each row;
    // chains never touch each other, so the line passes between them only through the buckets
    force: (e, d) => (e.dir === 'E' ? 'x' : Math.round(d[0]) === 0 ? 'x' : 'm'),
    spec: 'hash table: 9 buckets, chains 9–4–8–2–9–6–9–4–9',
    why: 'A hash table with chaining: nine buckets down the left and a linked list braided along each row. The chains never touch each other; the single line passes from one to the next only through the bucket array.',
  },
  'r-masterclass': {
    shape: () => K.fromCols([1, 1, 3, 5, 8, 8, 5, 3, 1, 1], 'ner', 'bottom'), loops: 1, sym: 'MX', density: 0.22,
    spec: 'columns 1–1–3–5–8–8–5–3–1–1',
    why: 'Ten columns of dots stacked as a histogram of the normal distribution, flat-topped with long thin tails along the baseline: the bell curve that R was built to draw.',
  },
  'deit-from-scratch': {
    shape: () => K.fromMask(['oo......', 'oooooooo', 'oooooooo', 'oooooooo', 'oooooooo', 'oooooooo'].join('\n'), 'ner'), loops: 1, sym: 'none', density: 0.1,
    force: (e, d) => (e.dir === 'N' && d[1] < 1 ? 'x' : undefined), // the two tokens are always threaded into the patches
    spec: '8 × 5 patches + [CLS] + [DIST]',
    why: 'An 8 × 5 grid of image patches with two extra tokens set above the first row, the class token and the distillation token. The line is forced to cross wherever the tokens meet the patches, and one line runs through tokens and patches alike, as attention does.',
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
    why: 'Interlaced dots fanning out row by row, a tree of possible moves. Mirror symmetry through dots on the centre line means it can never close as fewer than three lines: bandits, reinforcement learning, reasoning models.',
  },
  'prompt-engineering': {
    shape: () => K.fromMask(['ooooooo', 'ooooooo', 'ooooooo', 'ooooooo', '..o....', '.oo....'].join('\n'), 'ner'), loops: 1, sym: 'none', density: 0.22,
    spec: 'a speech bubble: 7 × 4 and a tail of 3',
    why: 'Thirty-one dots in the shape of a speech bubble: a prompt is something you say. With no symmetry to lean on, the turns fall where the conversation takes them.',
  },
  'kernel-engineering': {
    shape: () => K.fromRows([8, 8, 8, 8], 'ner'), loops: 1, sym: 'MX', density: 0.22, partial: 0.34, placeholder: true,
    spec: '8 × 4 — one warp (placeholder)',
    why: 'The capsule count is not known yet, so this grid is a placeholder: 8 × 4, one warp of GPU threads. The dots are down and the line has only just begun; it will be regenerated with one dot per capsule when the book ships.',
  },
};

if (typeof module !== 'undefined') module.exports = { BOOKS, SYM, ring };
