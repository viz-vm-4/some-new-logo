/* Book specs + one emblem per book. Each emblem returns ink artwork per drum:
   { flash: [svg for drum 1, svg for drum 2], key: svg for the key (level) drum, defs } */
(function () {
  'use strict';
  const { EMBLEMS, halftone, lineScreen, circ, rectD, polyD, T, f, textStyle, esc, W, H, M } = window.RISO;
  const p = (d, extra = '') => d ? `<path d="${d}"${extra}/>` : '';
  const bar = (a, b, w) => { // thick straight stroke as a polygon
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1;
    const nx = -dy / L * w / 2, ny = dx / L * w / 2;
    return polyD([[a[0] + nx, a[1] + ny], [b[0] + nx, b[1] + ny], [b[0] - nx, b[1] - ny], [a[0] - nx, a[1] - ny]]);
  };
  const ring = (x, y, r, w) => circ(x, y, r + w / 2) + circ(x, y, r - w / 2);
  const pe = (d) => d ? `<path d="${d}" fill-rule="evenodd"/>` : '';
  const serifSub = (x, y, base, sub, size, anchor) => `<text x="${f(x)}" y="${f(y)}"${anchor ? ` text-anchor="${anchor}"` : ''} style="${textStyle({ font: 'serif', italic: true, size })}">${esc(base)}<tspan dy="${f(size * 0.2)}" style="font-size:${f(size * 0.62)}px">${esc(sub)}</tspan></text>`;
  const mono = (sz = 13, w = 500, ls = 0.06) => ({ font: 'mono', size: sz, weight: w, ls });

  const BOOKS = [
    { slug: 'ai-context-engineering', fullTitle: 'AI Context Engineering', title: ['AI Context', 'Engineering'],
      flash: ['sunflower'], wdth: 90, titleMax: 112,
      note: 'The context window as a solid block of ink. Every source — system prompt, tools, memory, retrieved docs, history, query — is a strip of tokens; inside the window they overprint solid, outside they survive only as a 30% screen. A token-budget ruler runs down the edge.' },
    { slug: 'mathematical-foundations-for-ml', fullTitle: 'Mathematical Foundations for Machine Learning',
      title: ['Mathematical', 'Foundations for', 'Machine Learning'], flash: ['yellow'], wdth: 84, titleMax: 96,
      note: 'A normal density printed as a solid of Yellow; the 68–95–99.7 rule overprinted as three Hunter Green halftone steps that fade in beneath the title.' },
    { slug: 'neural-networks-from-scratch', fullTitle: 'Neural Networks from Scratch', title: ['Neural Networks', 'from Scratch'],
      flash: ['fpink'], wdth: 86, titleMax: 104,
      note: 'A 3-5-5-2 multilayer perceptron. Positive weights print in green, negative in pink, stroke width = |w|; hidden units carry their activation as a halftone.' },
    { slug: 'build-llms-from-scratch', fullTitle: 'Build Large Language Models (LLMs) from Scratch',
      title: ['Build Large', 'Language Models', '(LLMs) from Scratch'], flash: ['orange'], wdth: 84, titleMax: 90,
      note: 'The causal attention mask of a decoder-only LLM. Dot size = attention weight; the staircase reads “Every token attends to itself and those before it” — which is exactly what the matrix shows.' },
    { slug: '5d-parallelism', fullTitle: '5D Parallelism for Large Model Training', title: ['5D Parallelism'],
      tail: ['for Large Model Training'], tailIsTitle: true, flash: ['aqua', 'fpink'], wdth: 86, titleMax: 112,
      note: 'A 2×2×2×2×2 device mesh drawn as a projected 5-cube: 32 GPUs, 80 links, each link direction one axis of parallelism (data, tensor, pipeline, context, expert). Each axis has its own ink and its own stroke form, so the legend survives greyscale.' },
    { slug: 'pi-vs-hermes-vs-codex', fullTitle: 'Pi vs Hermes vs Codex: Context Compaction and Memory',
      title: ['Pi vs Hermes', 'vs Codex'], tail: ['Context Compaction', 'and Memory'], tailIsTitle: true, flash: ['yellow', 'fpink'], wdth: 88, titleMax: 108, tailSize: 44,
      note: 'Three agent harnesses, three columns of the same conversation. User and agent turns crowd together until the line screen closes into a solid block of memory. The columns share one compaction curve on purpose: the cover sets up the comparison, the book makes it.' },

    { slug: 'charlie-language-room', fullTitle: 'Charlie and the Language Room', series: 'I', kicker: 'Charlie and the',
      title: ['Language Room'], tail: ['Inference Engineering'], flash: ['sunflower', 'fpink'], wdth: 88, titleMax: 104, tailSize: 38, room: 'language',
      note: 'Series I. Speculative decoding as a paragraph: draft tokens the target model accepts print solid pink; the first rejected draft is struck through; the target’s own token prints in the key ink. The last run is still an unverified outline.' },
    { slug: 'charlie-vision-room', fullTitle: 'Charlie and the Vision Room', series: 'II', kicker: 'Charlie and the',
      title: ['Vision Room'], tail: ['Vision Transformers'], flash: ['sunflower', 'aqua'], wdth: 88, titleMax: 104, tailSize: 38, room: 'vision',
      note: 'Series II. What a ViT does: an image (a crescent — C for Charlie) is cut into a 4×4 grid of patches, and the patches leave the room on the factory conveyor as a sequence of tokens behind a [CLS] token.' },
    { slug: 'charlie-sound-room', fullTitle: 'Charlie and the Sound Room', series: 'III', kicker: 'Charlie and the',
      title: ['Sound Room'], tail: ['Voice Agents'], flash: ['sunflower', 'forange'], wdth: 88, titleMax: 104, tailSize: 38, room: 'sound',
      note: 'Series III. A voice-agent conversation as a waveform: the user’s turns in orange, the agent’s replies in blue.' },
    { slug: 'charlie-reasoning-room', fullTitle: 'Charlie and the Reasoning Room', series: 'IV', kicker: 'Charlie and the',
      title: ['Reasoning Room'], tail: ['From bandits to reasoning models'], flash: ['sunflower', 'green'], wdth: 86, titleMax: 104, tailSize: 36, room: 'reasoning',
      note: 'Series IV. A search tree grown from a root of bandit arms; leaf rewards as halftones, one chain of reasoning printed solid.' },

    { slug: 'kernel-engineering', fullTitle: 'Kernel Engineering', title: ['Kernel', 'Engineering'],
      tail: ['From silicon to speculative decoding —', 'GPU kernels for modern LLMs.'], tailSize: 29,
      flash: ['yellow', 'fpink'], wdth: 90, titleMax: 118,
      note: 'A tiled matrix multiply. A row-panel of A (yellow) and a column-panel of B (pink) cross; where the inks overprint, tile C[i,j] is computed. Forthcoming titles are printed as press proofs, with crop marks and registration targets.' },
    { slug: 'deit-from-scratch', fullTitle: 'Build a Data-Efficient Image Transformer (DeiT) from Scratch',
      title: ['Build a Data-Efficient', 'Image Transformer', '(DeiT) from Scratch'], flash: ['aqua', 'forange'], wdth: 82, titleMax: 84,
      note: 'DeiT’s one new idea: a distillation token, prepended to the patch sequence next to the class token. Its output is trained against a convolutional teacher’s prediction — the dashed lines meet at the distillation loss, not in the token.' },
    { slug: 'machine-learning-fundamentals', fullTitle: 'Machine Learning Fundamentals', title: ['Machine Learning', 'Fundamentals'],
      flash: ['bubblegum', 'cornflower'], wdth: 86, titleMax: 104,
      note: 'A linear classifier. Its confidence for each class is a halftone screen in that class’s ink, set at opposing angles; the decision boundary is where the two screens cross at 50% and the inks mix.' },
    { slug: 'reinforcement-learning', fullTitle: 'Reinforcement Learning', title: ['Reinforcement', 'Learning'],
      flash: ['yellow'], wdth: 88, titleMax: 112,
      note: 'A gridworld after value iteration. Each cell’s value V(s) is its dot size, arrows show the greedy policy, and the agent’s path runs from start to the goal.' },
    { slug: 'sql-masterclass', fullTitle: 'SQL Masterclass', title: ['SQL', 'Masterclass'], flash: ['aqua', 'yellow'], wdth: 92, titleMax: 124,
      note: 'An INNER JOIN told truthfully: CUSTOMERS in Aqua, ORDERS in Yellow, matched on a key. Every matched pair prints in both drums, so the result table is Green; a customer with two orders appears twice, and unmatched rows stay a single screened ink.' },
  ];

  // Level, length, forthcoming status and the full title come from the catalogue (covers/_shared/books.json),
  // inlined at build time — so 50 covers cannot drift from books.vizuara.ai. The hand-set line breaks are
  // checked against the catalogue title.
  if (window.CATALOG) {
    const norm = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '');
    for (const b of BOOKS) {
      const c = window.CATALOG[b.slug];
      if (!c) { console.error('not in catalogue:', b.slug); continue; }
      b.fullTitle = c.title; b.level = c.level; b.capsules = c.capsules; b.hours = c.hours; b.coming = !!c.coming_soon;
      if (c.series_no) b.series = c.series_no;
      const set = [b.kicker || '', ...b.title, ...(b.tailIsTitle ? b.tail : [])].join(' ');
      if (norm(set) !== norm(c.title)) console.error('title lines do not match catalogue:', b.slug, '|', set, '|', c.title);
    }
  }

  // ================================================================ AI Context Engineering
  // The context window is a solid block of Sunflower. Sources of tokens run across the whole page as strips;
  // inside the window they print solid Federal Blue (overprinting to a deep olive), outside only as a screen.
  EMBLEMS['ai-context-engineering'] = ({ R, K, title }) => {
    const top = title.bottom + 26, bot = 780;
    const win = { x0: 150, x1: 566, y0: title.baseline + 3, y1: 806 };
    const pitch = 28, bh = 17, lab = 108;
    const rows = [];
    for (let y = top; y + bh <= bot; y += pitch) rows.push(y);
    const segs = [];
    rows.forEach((y) => {
      let x = -60 + R() * 140;
      while (x < 780) { const len = 34 + Math.pow(R(), 1.25) * 210; segs.push({ x0: x, x1: x + len, y }); x += len + 9 + R() * 14; }
    });
    const inside = [], outside = [];
    for (const s of segs) {
      const a = Math.max(s.x0, win.x0 + lab), b = Math.min(s.x1, win.x1 - 16);
      if (b > a + 6) inside.push({ ...s, x0: a, x1: b });
      if (s.x0 < win.x0 - 14) outside.push({ ...s, x1: Math.min(s.x1, win.x0 - 14) });
    }
    let strips = '';
    for (const s of inside) strips += rectD(s.x0, s.y, s.x1 - s.x0, bh);
    const hit = (x, y) => outside.some((s) => x >= s.x0 && x <= s.x1 && y >= s.y && y <= s.y + bh);
    const dots = halftone({ box: [-10, top - 4, 730, bot + 4], cell: 6.5, angle: 45, tone: (x, y) => hit(x, y) ? 0.3 : 0 });
    const block = rectD(win.x0, win.y0, win.x1 - win.x0, win.y1 - win.y0);
    let key = p(strips);
    const plan = [['system', 1], ['tools', 2], ['memory', 2], ['retrieved', 4], ['history', 5], ['query', 1]];
    let ri = 0;
    for (const [name, n] of plan) {
      if (ri >= rows.length) break;
      key += T(win.x0 + 14, rows[ri] + 13, name, mono(13, 500, 0.02));
      if (ri > 0) key += p(rectD(win.x0, rows[ri] - 6, 94, 2));
      ri += n;
    }
    // token budget ruler down the right edge of the window
    const ry0 = top, ry1 = win.y1 - 16;
    for (let i = 0; i <= 24; i++) { const y = ry0 + (ry1 - ry0) * i / 24; key += p(rectD(win.x1 + 6, y - 1, i % 6 === 0 ? 18 : 9, 2)); }
    key += T(win.x1 + 8, ry0 - 14, '128K', mono(12.5));
    key += T(win.x1 + 32, ry1 + 4.5, '0', mono(12.5));
    return { flash: [p(block) + p(dots)], key };
  };

  // ================================================================ Mathematical Foundations
  EMBLEMS['mathematical-foundations-for-ml'] = ({ R, K, title }) => {
    const base = 752, mu = 410, sig = 112;
    const peakY = title.bottom - 46;            // the bell rises behind the last line: green overprints yellow
    const peak = base - peakY;
    const g = (x) => Math.exp(-((x - mu) ** 2) / (2 * sig * sig));
    const yAt = (x) => base - peak * g(x);
    const pts = [[-20, base]];
    for (let x = -20; x <= 740; x += 3) pts.push([x, yAt(x)]);
    pts.push([740, base]);
    const bell = polyD(pts);
    // the 68–95–99.7 rule as three halftone steps, fading in below the title
    const clearY = title.bottom + 14;
    const tone = (x, y) => {
      if (y < yAt(x) + 6 || y > base - 4) return 0;
      const z = Math.abs(x - mu) / sig;
      const band = z < 1 ? 0.62 : z < 2 ? 0.34 : z < 3 ? 0.14 : 0;
      const fade = Math.max(0, Math.min(1, (y - clearY) / 150));
      return band * fade;
    };
    let key = p(halftone({ box: [0, clearY, W, base], cell: 7.2, angle: 45, tone }));
    // sigma dividers
    [-2, -1, 1, 2].forEach((k) => { const x = mu + k * sig; key += p(rectD(x - 1.75, Math.max(yAt(x), clearY + 30), 3.5, base - Math.max(yAt(x), clearY + 30))); });
    // the density curve + axis
    const lw = 5.5;
    let top = [], bot = [];
    const flush = () => { if (top.length > 1) key += p(polyD(top.concat(bot.reverse()))); top = []; bot = []; };
    for (let x = -20; x <= 740; x += 3) {
      if (title.hits(x, yAt(x), 7)) { flush(); continue; }   // key ink never crosses a line of type
      top.push([x, yAt(x) - lw / 2]); bot.push([x, yAt(x) + lw / 2]);
    }
    flush();
    key += p(rectD(-10, base, 740, 5));
    // ticks and labels
    const lab = { font: 'math', italic: true, size: 29 };
    [[-2, 'μ−2σ'], [-1, 'μ−σ'], [0, 'μ'], [1, 'μ+σ'], [2, 'μ+2σ']].forEach(([k, s]) => {
      const x = mu + k * sig;
      key += p(rectD(x - 2.5, base, 5, 16));
      key += T(x, base + 46, s, { ...lab, anchor: 'middle' });
    });
    return { flash: [p(bell)], key };
  };

  // ================================================================ Neural Networks from Scratch
  EMBLEMS['neural-networks-from-scratch'] = ({ R, K, title, book }) => {
    const layers = [3, 5, 5, 2];
    const xs = [132, 300, 468, 612];
    const top = title.bottom + 62, bot = 770, sp = (bot - top) / 4, rN = 31;
    const nodes = layers.map((n, li) => Array.from({ length: n }, (_, i) => ({ x: xs[li], y: (top + bot) / 2 + (i - (n - 1) / 2) * sp, a: R() })));
    let pos = '', neg = '';
    for (let li = 0; li < layers.length - 1; li++) {
      for (const a of nodes[li]) for (const b of nodes[li + 1]) {
        const w = R() * 2 - 1;
        const L = Math.hypot(b.x - a.x, b.y - a.y), ux = (b.x - a.x) / L, uy = (b.y - a.y) / L, tr = w >= 0 ? rN + 1 : 0;
        const d = bar([a.x + ux * tr, a.y + uy * tr], [b.x - ux * tr, b.y - uy * tr], 1.8 + 7.5 * Math.pow(Math.abs(w), 1.5));
        if (w >= 0) pos += d; else neg += d;
      }
    }
    let disks = '', rings = '', act = '';
    nodes.flat().forEach((n) => { disks += circ(n.x, n.y, rN); rings += ring(n.x, n.y, rN, 5); });
    // hidden activations as key-ink halftone inside the units (overprint)
    nodes.slice(1, 3).flat().forEach((n) => {
      act += halftone({ box: [n.x - rN, n.y - rN, n.x + rN, n.y + rN], cell: 7, angle: 15, tone: (x, y) => Math.hypot(x - n.x, y - n.y) < rN - 5 ? 0.12 + n.a * 0.6 : 0 });
    });
    let key = p(pos) + pe(rings) + p(act);
    nodes[0].forEach((n, i) => { key += serifSub(n.x - rN - 16, n.y + 10, 'x', String(i + 1), 36, 'end'); });
    nodes[3].forEach((n, i) => { key += serifSub(n.x + rN + 14, n.y + 10, 'ŷ', String(i + 1), 36); });
    return { flash: [p(neg) + p(disks)], key };
  };

  // ================================================================ Build LLMs from Scratch
  EMBLEMS['build-llms-from-scratch'] = ({ R, K, title }) => {
    const words = ['Every', 'token', 'attends', 'to', 'itself', 'and', 'those', 'before', 'it'];
    const N = words.length, y1 = 800, pch = Math.min(56, Math.floor((y1 - title.bottom - 26) / N)), gap = 6, x0 = M, y0 = y1 - N * pch;
    let fl = '', key = '';
    for (let i = 0; i < N; i++) {
      const sc = [];
      for (let j = 0; j <= i; j++) sc.push(-0.55 * (i - j) + (j === 0 ? 1.1 : 0) + (j === i ? 0.6 : 0) + (R() - 0.5) * 1.6);
      const mx = Math.max(...sc);
      const w = sc.map((s) => Math.exp(s - mx));
      for (let j = 0; j <= i; j++) {
        const t = Math.min(1, 0.07 + w[j] * 0.93);
        const cx = x0 + j * pch, cy = y0 + i * pch;
        if (t > 0.9) fl += rectD(cx, cy, pch - gap, pch - gap);
        else fl += halftone({ box: [cx + 2, cy + 2, cx + pch - gap - 2, cy + pch - gap - 2], cell: 7.5, angle: 45, tone: () => t });
      }
    }
    // causal boundary: the staircase
    let st = [[x0 - gap / 2, y0 - gap / 2]];
    for (let i = 0; i < N; i++) { st.push([x0 + (i + 1) * pch - gap / 2, y0 + i * pch - gap / 2]); st.push([x0 + (i + 1) * pch - gap / 2, y0 + (i + 1) * pch - gap / 2]); }
    for (let k = 0; k < st.length - 1; k++) key += p(bar(st[k], st[k + 1], 5)) + p(rectD(st[k + 1][0] - 2.5, st[k + 1][1] - 2.5, 5, 5));
    words.forEach((wd, i) => { key += T(x0 + (i + 1) * pch + 12, y0 + i * pch + pch / 2 + 3, wd, { font: 'mono', size: 19, weight: 500, ls: -0.01 }); });
    return { flash: [p(fl)], key };
  };

  // ================================================================ 5D Parallelism
  EMBLEMS['5d-parallelism'] = ({ R, K, title }) => {
    const ang = [8, 43, 81, 116, 154].map((a) => a * Math.PI / 180);
    const len = [150, 132, 160, 128, 146];
    const V = ang.map((a, i) => [Math.cos(a) * len[i], Math.sin(a) * len[i]]);
    const verts = [];
    for (let m = 0; m < 32; m++) { let x = 0, y = 0; for (let k = 0; k < 5; k++) if (m >> k & 1) { x += V[k][0]; y += V[k][1]; } verts.push([x, y]); }
    const xsV = verts.map((v) => v[0]), ysV = verts.map((v) => v[1]);
    const bw = Math.max(...xsV) - Math.min(...xsV), bh = Math.max(...ysV) - Math.min(...ysV);
    const top = title.bottom + 26, bot = 770;
    const sc = Math.min((bot - top) / bh, 560 / bw);
    const ox = W / 2 + 12 - (Math.min(...xsV) + bw / 2) * sc, oy = (top + bot) / 2 - (Math.min(...ysV) + bh / 2) * sc;
    const P = verts.map((v) => [ox + v[0] * sc, oy + v[1] * sc]);
    const cx = ox + (Math.min(...xsV) + bw / 2) * sc, cy = (top + bot) / 2;
    // glow behind the mesh: aqua halftone, ending above the legend so the foot stays on clean paper
    let aq = p(halftone({ box: [0, top - 60, W, 785], cell: 8, angle: 15, tone: (x, y) => 0.62 * Math.exp(-(((x - cx) / 250) ** 2 + ((y - cy) / 230) ** 2)) * Math.max(0, Math.min(1, (785 - y) / 50)) }));
    let pk = '', key = '';
    // five axes, told apart by FORM as well as ink (so they survive greyscale):
    // data = thin black rule · tensor = wide aqua bar · pipeline = pink bar with a black dotted core ·
    // context = aqua+pink double rule · expert = black dashes
    const styles = ['data', 'tensor', 'pipeline', 'context', 'expert'];
    const dashes = (a, b, w, on = 0.55, step = 11) => { const L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.floor(L / step)); let d = ''; for (let q = 0; q < n; q++) { const t0 = q / n, t1 = (q + on) / n; d += bar([a[0] + (b[0] - a[0]) * t0, a[1] + (b[1] - a[1]) * t0], [a[0] + (b[0] - a[0]) * t1, a[1] + (b[1] - a[1]) * t1], w); } return d; };
    const dots = (a, b, r, step) => { const L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.floor(L / step)); let d = ''; for (let q = 0; q <= n; q++) d += circ(a[0] + (b[0] - a[0]) * q / n, a[1] + (b[1] - a[1]) * q / n, r); return d; };
    const edge = (a, b, s) => {
      const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1, nx = -(b[1] - a[1]) / L, ny = (b[0] - a[0]) / L;
      const off = (q, o) => [q[0] + nx * o, q[1] + ny * o];
      if (s === 'data') key += p(bar(a, b, 3.8));
      else if (s === 'tensor') aq += p(bar(a, b, 8));
      else if (s === 'pipeline') { pk += p(bar(a, b, 8)); key += p(dots(a, b, 1.7, 8)); }
      else if (s === 'context') { const d = bar(off(a, 4), off(b, 4), 2.8) + bar(off(a, -4), off(b, -4), 2.8); aq += p(d); pk += p(d); }
      else key += p(dashes(a, b, 3.8));
    };
    for (let m = 0; m < 32; m++) for (let k = 0; k < 5; k++) {
      if (m >> k & 1) continue;
      edge(P[m], P[m | (1 << k)], styles[k]);
    }
    // GPUs: square chips, knocked-out centre
    let chips = '';
    P.forEach(([x, y]) => { chips += rectD(x - 10, y - 10, 20, 20) + rectD(x - 4, y - 4, 8, 8); });
    key += `<path d="${chips}" fill-rule="evenodd"/>`;
    // legend, drawn with the same strokes
    const ly = 812;
    let lx = M;
    const ms = mono(11.5, 500, 0.1);
    styles.forEach((s) => {
      edge([lx, ly - 4], [lx + 30, ly - 4], s);
      key += T(lx + 38, ly, s.toUpperCase(), ms);
      lx += 38 + window.RISO.measure(s.toUpperCase(), ms) + 26;
    });
    return { flash: [aq, pk], key };
  };

  // ================================================================ Pi vs Hermes vs Codex
  // Three harnesses, three columns of the same conversation: user (U) and agent (A) turns crowd together as
  // the context fills, until the line screen closes up into a solid block of memory. All three columns use
  // the SAME compaction curve on purpose — the cover frames the comparison; it does not rank the products.
  EMBLEMS['pi-vs-hermes-vs-codex'] = ({ R, K, title, book }) => {
    const top = title.bottom + 64, bot = 800, cw = 190, gapc = 25, c0 = 0.34, e = 1.0, hL = 8.5;
    const cols = [{ x: M, name: 'PI' }, { x: M + cw + gapc, name: 'HERMES' }, { x: M + 2 * (cw + gapc), name: 'CODEX' }];
    const outs = ['', ''];
    let key = '';
    cols.forEach((c, ci) => {
      let d = '';
      let y = top, n = 0;
      while (y < bot) {
        const t = (y - top) / (bot - top);
        const k = Math.max(0, (t - c0) / (1 - c0));
        const pitch = 30 - (30 - hL) * Math.pow(Math.min(1, k * 1.3), e);
        if (pitch <= hL + 0.35) { d += rectD(c.x, y, cw, bot - y); break; }
        const x0 = k > 0 ? c.x : c.x + 18;
        const len = (cw - (x0 - c.x)) * (k > 0 ? (0.55 + 0.45 * R()) * (1 - k) + k : 0.3 + 0.7 * R());
        d += rectD(x0, y, len, hL);
        if (k === 0) key += T(c.x, y + hL + 1.5, n % 2 ? 'A' : 'U', mono(12, 500, 0));
        y += pitch; n++;
      }
      if (ci === 0) outs[0] += p(d); else if (ci === 1) outs[1] += p(d); else { outs[0] += p(d); outs[1] += p(d); }
      key += T(c.x + 12, bot - 14, 'MEMORY', mono(14, 500, 0.16));
      key += T(c.x, top - 20, c.name, mono(13, 500, 0.16));
    });
    return { flash: outs, key };
  };

  // ================================================================ Charlie and the Intelligence Factory (sub-series)
  // One shared building for the four books: a saw-tooth factory printed in Sunflower, the series ink.
  // Each book opens a different door; the room behind it is printed in that room's own ink.
  function factory(ctx, drawRoom) {
    const { R, K, title, book } = ctx;
    const roofBase = 432, tooth = 180, th = 70, ground = 800;
    const pts = [[-10, ground], [-10, roofBase]];
    for (let x = -10; x < W + 10; x += tooth) { pts.push([x, roofBase - th]); pts.push([x + tooth, roofBase]); }
    pts.push([W + 10, ground]);
    const door = { cx: W / 2 + 40, w: 330, top: 500 };
    const r = door.w / 2;
    const belt = ctx.belt ? ground - 50 : ground;          // a conveyor strip along the floor (Vision room)
    const doorD = `M${door.cx - r} ${belt}V${door.top + r}A${r} ${r} 0 0 1 ${door.cx + r} ${door.top + r}V${belt}Z`;
    const beltD = ctx.belt ? rectD(-10, belt, W + 20, ground - belt) : '';
    const id = book.slug;
    const chim = { x: 600, w: 40, top: 330 };
    const defs = `<clipPath id="doorclip-${id}"><path d="${doorD}"/></clipPath>`;
    const signInk = '#F4AA0F'; // Sunflower as it prints on this stock: the reversed letters show the facade ink
    const sign = `<g fill="${signInk}">${T(M, roofBase + 29, 'CHARLIE AND THE INTELLIGENCE FACTORY', mono(13, 500, 0.2))}${T(W - M, roofBase + 29, 'ROOM ' + book.series, { ...mono(13, 500, 0.2), anchor: 'end' })}</g>`;
    // facade + chimney in the series ink, door knocked out
    let sun = `<path fill-rule="evenodd" d="${polyD(pts)}${doorD}${beltD}"/><path d="${rectD(chim.x, chim.top, chim.w, roofBase - chim.top)}"/>`;
    // smoke: halftone puffs drifting right and off the page, below the title; never printed into a line of type
    const puffs = [[chim.x + 22, chim.top - 26, 21], [chim.x + 60, chim.top - 50, 27], [chim.x + 106, chim.top - 68, 33], [chim.x + 160, chim.top - 80, 39]];
    sun += p(halftone({ box: [chim.x - 40, 150, W + 10, chim.top - 4], cell: 7, angle: 45, tone: (x, y) => {
      if (title.hits(x, y, 12)) return 0;
      let t = 0; puffs.forEach(([px, py, pr], i) => { const d = Math.hypot(x - px, y - py) / pr; if (d < 1) t = Math.max(t, (0.78 - i * 0.13) * (1 - d * d * 0.55)); }); return t; } }));
    let key = '';
    key += p(rectD(-10, roofBase + 8, W + 20, 30));
    for (let x = -10; x < W + 10; x += tooth) key += p(rectD(x - 3, roofBase - th, 6, th + 8));
    key += p(rectD(chim.x - 5, chim.top - 8, chim.w + 10, 10));
    key += p(rectD(-10, ground, W + 20, 6));
    const fw = 9;
    key += `<path d="M${door.cx - r - fw} ${belt}V${door.top + r}A${r + fw} ${r + fw} 0 0 1 ${door.cx + r + fw} ${door.top + r}V${belt}H${door.cx + r}V${door.top + r}A${r} ${r} 0 0 0 ${door.cx - r} ${door.top + r}V${belt}Z"/>`;
    key += T(M - 4, 640, book.series, { font: 'serif', size: 124 });
    const room = drawRoom({ ...ctx, door, r, ground, belt });
    return {
      flash: [sun + (room.f0 || ''), `<g clip-path="url(#doorclip-${id})">${room.f1 || ''}</g>` + (room.f1out || '')],
      key: key + `<g clip-path="url(#doorclip-${id})">${room.key || ''}</g>` + (room.keyOut || ''),
      defs: defs + (room.defs || ''),
      top: sign,
    };
  }

  // Speculative decoding, printed as a paragraph: a small draft model proposes runs of tokens; the target
  // model accepts a prefix (solid pink), rejects the first wrong draft (pink outline, struck through in key
  // ink) and adds its own token (solid key ink). The last run is still unverified: dashed outlines + cursor.
  EMBLEMS['charlie-language-room'] = (ctx) => factory(ctx, ({ R, K, FX, door, r, ground }) => {
    let f1 = '', key = '';
    const x0 = door.cx - r + 24, x1 = door.cx + r - 22, th = 20, lh = 34;
    const pink = FX[1];
    // token stream: steps of k = 4 drafts
    const toks = [];
    for (let st = 0; st < 12; st++) {
      const acc = [4, 2, 3, 1, 4, 2, 0, 3, 4, 1, 2, 3][st];
      for (let q = 0; q < acc; q++) toks.push('acc');
      if (acc < 4) toks.push('rej');
      toks.push('tgt');
    }
    let y = door.top + 64, ti = 0, last = null;
    const lines = Math.floor((ground - 44 - y) / lh) + 1;
    for (let line = 0; line < lines; line++, y += lh) {
      const inset = Math.max(0, r - Math.sqrt(Math.max(0, r * r - Math.max(0, door.top + r - y) ** 2)));
      let x = x0 + inset;
      const final = line === lines - 1;
      const limit = final ? x0 + 118 : x1 - inset;
      while (x < limit && ti < toks.length) {
        const w = 22 + Math.pow(R(), 1.6) * 52;
        if (x + w > limit) break;
        const kind = toks[ti++];
        if (kind === 'acc') f1 += `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${th}" rx="${th / 2}"/>`;
        else if (kind === 'rej') {
          f1 += `<rect x="${f(x + 1.5)}" y="${f(y + 1.5)}" width="${f(w - 3)}" height="${th - 3}" rx="${(th - 3) / 2}" fill="none" stroke="${pink}" stroke-width="3"/>`;
          key += p(bar([x - 4, y + th / 2 + 1], [x + w + 4, y + th / 2 - 1], 3.5));
        } else key += `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${th}" rx="${th / 2}"/>`;
        last = [x + w, y];
        x += w + 7;
      }
      if (final) {
        // the next draft run, not yet verified
        let nx = last[0] + 7;
        for (let q = 0; q < 3; q++) { const w = 30 + q * 6; f1 += `<rect x="${f(nx + 1.5)}" y="${f(y + 1.5)}" width="${f(w - 3)}" height="${th - 3}" rx="${(th - 3) / 2}" fill="none" stroke="${pink}" stroke-width="3" stroke-dasharray="6 4"/>`; nx += w + 7; }
        key += p(rectD(nx + 2, y - 5, 5, th + 10));
      }
    }
    return { f1, key };
  });


  // What a ViT does: the image (a crescent — C for Charlie) is cut into a 4×4 grid of patches inside the room,
  // and the patches leave on the factory's conveyor as a sequence of 16 tokens, led by a [CLS] token.
  EMBLEMS['charlie-vision-room'] = (ctx) => factory({ ...ctx, belt: true }, ({ R, K, door, r, ground, belt }) => {
    let f1 = '', key = '', f1out = '', keyOut = '';
    const n = 4, s = 47, g = 5, gx = door.cx - (n * s - g) / 2, gy = belt - 22 - n * s;
    // coverage of a crescent in each patch, quantised to four printable steps
    // the image: a bold C, in four printable steps (solid, 55%, 22%, 6%)
    const tones = [0.55, 1, 1, 0.55,
                   1, 0.22, 0.06, 0.06,
                   1, 0.22, 0.06, 0.06,
                   0.55, 1, 1, 0.55];
    const tile = (x, y, sz, t, cell) => t >= 1 ? p(rectD(x, y, sz, sz)) : p(halftone({ box: [x + 1, y + 1, x + sz - 1, y + sz - 1], cell, angle: 45, tone: () => t }));
    tones.forEach((t, q) => { const i = q % n, j = Math.floor(q / n); f1 += tile(gx + i * s, gy + j * s, s - g, t, 6.5); });
    // the sequence on the belt: [CLS] + 16 patch tokens in raster order
    const ts = 28, tg = 8, bx = M - 6, by = belt + (ground - belt - ts) / 2;
    keyOut += p(rectD(bx, by, ts, ts));
    tones.forEach((t, q) => { f1out += tile(bx + (q + 1) * (ts + tg), by, ts, t, 5); });
    const ax = bx + 17 * (ts + tg) + 4, ay = by + ts / 2;   // drawn, not a glyph: DM Mono has no arrow
    keyOut += p(rectD(ax, ay - 1.75, 12, 3.5)) + p(polyD([[ax + 20, ay], [ax + 10, ay - 7], [ax + 10, ay + 7]]));
    // rollers under the belt
    for (let x = 14; x < W; x += 36) keyOut += p(circ(x, ground - 2, 3.2));
    keyOut += T(bx, belt - 8, 'CLS', mono(11.5, 500, 0.12));
    return { f1, key, f1out, keyOut };
  });


  EMBLEMS['charlie-sound-room'] = (ctx) => factory(ctx, ({ R, K, door, r, ground }) => {
    let f1 = '', key = '';
    const x0 = door.cx - r + 26, x1 = door.cx + r - 26, cy = 660, bw = 7, gp = 4.4;
    const turns = [[0, 0.22, 'u'], [0.26, 0.58, 'a'], [0.62, 0.76, 'u'], [0.8, 1, 'a']];
    let i = 0;
    for (let x = x0; x < x1; x += bw + gp, i++) {
      const t = (x - x0) / (x1 - x0);
      const tr = turns.find((q) => t >= q[0] && t <= q[1]);
      if (!tr) { f1 += `<rect x="${f(x)}" y="${cy - 3}" width="${bw}" height="6" rx="3"/>`; continue; }
      const lt = (t - tr[0]) / (tr[1] - tr[0]);
      const env = Math.pow(Math.sin(Math.PI * lt), 0.55);
      const h = Math.min(92, 6 + env * (34 + 62 * Math.abs(Math.sin(i * 0.9) * Math.cos(i * 0.37)) + 22 * R()));
      const d = `<rect x="${f(x)}" y="${f(cy - h)}" width="${bw}" height="${f(2 * h)}" rx="${bw / 2}"/>`;
      if (tr[2] === 'u') f1 += d; else key += d;
    }
    const lab = mono(13, 500, 0.12);
    key += T(x0, ground - 22, 'you', lab) + T(x0 + (x1 - x0) * 0.26, ground - 22, 'agent', lab);
    key += T(x0 + (x1 - x0) * 0.62, ground - 22, 'you', lab) + T(x0 + (x1 - x0) * 0.8, ground - 22, 'agent', lab);
    return { f1, key };
  });

  EMBLEMS['charlie-reasoning-room'] = (ctx) => factory(ctx, ({ R, K, door, r, ground }) => {
    let f1 = '', key = '';
    const root = [door.cx, ground - 40];
    const spec = [[[-88, 0, 88], 96], [[-30, 0, 30], 92]]; // child offsets, rise: 3 bandit arms, 3 children each
    let frontier = [{ x: root[0], y: root[1], best: true }];
    let thin = '', halo = '';
    spec.forEach(([offs, rise], L) => {
      const next = [];
      frontier.forEach((n) => {
        const bk = L === 0 ? 2 : (R() < 0.5 ? 0 : 1);
        for (let k = 0; k < offs.length; k++) {
          const x = n.x + offs[k], y = n.y - rise;
          const best = n.best && k === bk;
          thin += bar([n.x, n.y], [x, y], 3.5);
          if (best) halo += bar([n.x, n.y], [x, y], 15);
          next.push({ x, y, best });
        }
      });
      frontier = next;
    });
    key += p(thin);
    f1 += p(halo);
    frontier.forEach((n) => {
      const t = n.best ? 1 : 0.14 + R() * 0.62;
      if (n.best) { f1 += p(circ(n.x, n.y - 14, 11)); key += pe(ring(n.x, n.y - 14, 11, 3.5)); }
      else f1 += p(halftone({ box: [n.x - 11, n.y - 25, n.x + 11, n.y - 3], cell: 4.6, angle: 45, tone: (x, y) => Math.hypot(x - n.x, y - n.y + 14) < 10.5 ? t : 0 }));
      key += p(rectD(n.x - 1.75, n.y - 4, 3.5, 4));
    });
    key += p(circ(root[0], root[1], 11));
    f1 += p(circ(root[0], root[1], 22));
    key += T(root[0] + 30, root[1] + 5, 'bandit', mono(12.5, 500, 0.1));
    return { f1, key };
  });

  // ================================================================ Kernel Engineering (forthcoming → press proof)
  EMBLEMS['kernel-engineering'] = ({ R, K, title }) => {
    const cols = 6, rows = 5, cx0 = 244, cx1 = 684, cy0 = 452, cy1 = 802;
    const tw = (cx1 - cx0) / cols, thh = (cy1 - cy0) / rows;
    const ti = 2, tj = 3;
    const bandY0 = cy0 + ti * thh, bandX0 = cx0 + tj * tw;
    // A row-panel (yellow) from the left edge through C; B column-panel (pink) from the top edge through C
    let yel = '', pink = '', key = '';
    const kx = 7; // k-chunks of the panels
    for (let q = 0; q < 4; q++) {
      const x = -10 + q * 64;
      yel += rectD(x, bandY0 + 3, 58, thh - 6);
    }
    yel += rectD(cx0 + 3, bandY0 + 3, cx1 - cx0 - 6, thh - 6);
    for (let q = 0; q < 7; q++) {
      const y = -10 + q * 66;
      if (y > cy0 - 8) break;
      pink += rectD(bandX0 + 3, y, tw - 6, Math.min(60, cy0 - 3 - y));
    }
    pink += rectD(bandX0 + 3, cy0 + 3, tw - 6, cy1 - cy0 - 6);
    // the rest of C: light screen = tiles still to compute
    const inC = (x, y) => x > cx0 + 4 && x < cx1 - 4 && y > cy0 + 4 && y < cy1 - 4;
    const light = halftone({ box: [cx0, cy0, cx1, cy1], cell: 7, angle: 45, tone: (x, y) => {
      if (!inC(x, y)) return 0;
      const i = Math.floor((y - cy0) / thh), j = Math.floor((x - cx0) / tw);
      if (i === ti || j === tj) return 0;
      const lx = (x - cx0) % tw, ly = (y - cy0) % thh;
      if (lx < 4 || lx > tw - 4 || ly < 4 || ly > thh - 4) return 0;
      return (i < ti || (i === ti && j < tj)) ? 0.34 : 0.1;
    } });
    // die grid: registration crosses at tile corners
    for (let i = 0; i <= rows; i++) for (let j = 0; j <= cols; j++) {
      const x = cx0 + j * tw, y = cy0 + i * thh;
      key += p(rectD(x - 8, y - 1.5, 16, 3) + rectD(x - 1.5, y - 8, 3, 16));
    }
    key += p(rectD(bandX0 - 2, bandY0 - 2, tw + 4, 5) + rectD(bandX0 - 2, bandY0 + thh - 3, tw + 4, 5) + rectD(bandX0 - 2, bandY0 - 2, 5, thh + 4) + rectD(bandX0 + tw - 3, bandY0 - 2, 5, thh + 4));
    key += T(M, bandY0 + thh + 34, 'C[i,j] +=', mono(15, 500, 0)) + T(M, bandY0 + thh + 56, 'A[i,k]·B[k,j]', mono(15, 500, 0));
    key += T(M, bandY0 - 18, 'A', { font: 'serif', italic: true, size: 34 }) + T(bandX0 + tw + 12, 330, 'B', { font: 'serif', italic: true, size: 34 }) + T(cx0 + 4, cy0 - 18, 'C', { font: 'serif', italic: true, size: 34 });
    return { flash: [p(yel) + p(light), p(pink)], key };
  };

  // ================================================================ DeiT from Scratch
  EMBLEMS['deit-from-scratch'] = ({ R, K, title }) => {
    const n = 8, s = 50, g = 5, gx = W - M - n * s + g, gy = Math.max(title.bottom + 60, 360);
    let aq = '', or = '', key = '';
    // the image: a low sun over two ridges, sampled once per 16×16 patch
    const ridge = (u) => Math.min(0.5 + Math.abs(u - 0.3) * 1.25, 0.6 + Math.abs(u - 0.78) * 1.1);
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      const x = gx + i * s, y = gy + j * s, u = (i + 0.5) / n, v = (j + 0.5) / n;
      let t = 0.06 + v * 0.16;
      if (v > ridge(u)) t = 0.58;
      if (v > 0.86) t = 0.76;
      const sd = Math.hypot(u - 0.6875, v - 0.3125);
      if (sd < 0.19) t = 0.84;
      if (sd < 0.13) t = 1;
      if (t >= 1) aq += rectD(x, y, s - g, s - g);
      else aq += halftone({ box: [x + 1, y + 1, x + s - g - 1, y + s - g - 1], cell: 6.2, angle: 15, tone: () => t });
    }
    // class + distillation tokens, prepended to the patch sequence
    const ts = s - g, tx = gx - s - 16;
    const cls = [tx, gy], dist = [tx, gy + s];
    or += rectD(cls[0], cls[1], ts, ts) + rectD(dist[0], dist[1], ts, ts);
    key += pe(rectD(dist[0], dist[1], ts, ts) + rectD(dist[0] + 5, dist[1] + 5, ts - 10, ts - 10));
    key += T(cls[0] - 12, cls[1] + 26, 'cls', { ...mono(15, 500, 0.02), anchor: 'end' });
    key += T(dist[0] - 12, dist[1] + 26, 'dist', { ...mono(15, 500, 0.02), anchor: 'end' });
    // convolutional teacher: feature maps in perspective, shrinking
    const bx = M + 4, by = gy + n * s - 206;
    const slabs = [[0, 150, 20], [40, 114, 26], [78, 80, 32], [114, 48, 40]]; // x offset, height, depth
    slabs.forEach(([ox, hgt, dep], k) => {
      const x = bx + ox, y = by + (150 - hgt) / 2 + 10;
      const face = [[x, y + dep * 0.5], [x + dep, y], [x + dep, y + hgt], [x, y + hgt + dep * 0.5]];
      or += halftone({ box: [x, y, x + dep, y + hgt + dep * 0.5], cell: 5.5, angle: 45, tone: (px, py) => {
        const t = (px - x) / dep; const top = y + dep * 0.5 * (1 - t), bot = y + hgt + dep * 0.5 * (1 - t);
        return py > top + 2 && py < bot - 2 && t > 0.08 && t < 0.92 ? 0.3 + k * 0.17 : 0; } });
      key += pe(polyD(face) + polyD([[x + 3.5, y + dep * 0.5 + 2.5], [x + dep - 3.5, y + 5.5], [x + dep - 3.5, y + hgt - 2.5], [x + 3.5, y + hgt + dep * 0.5 - 5.5]].reverse()));
    });
    // distillation: the dist token's output head is trained against the teacher's prediction.
    // Both feed a loss node; nothing flows from the teacher into the token.
    const last = slabs[3], lx = bx + last[0] + last[2] + 8, ly = by + 85;
    const dx = dist[0] + ts / 2, lossX = dx, lossY = ly;
    const dashes = (a, b, w) => { const L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.floor(L / 12)); let d = ''; for (let q = 0; q < n; q++) { const t0 = q / n, t1 = (q + 0.55) / n; d += bar([a[0] + (b[0] - a[0]) * t0, a[1] + (b[1] - a[1]) * t0], [a[0] + (b[0] - a[0]) * t1, a[1] + (b[1] - a[1]) * t1], w); } return d; };
    const head = (x, y, dirx, diry) => polyD([[x, y], [x - dirx * 11 - diry * 7, y - diry * 11 + dirx * 7], [x - dirx * 11 + diry * 7, y - diry * 11 - dirx * 7]]);
    key += p(dashes([dx, dist[1] + ts + 6], [lossX, lossY - 16], 3.5)) + p(head(lossX, lossY - 13, 0, 1));
    key += p(dashes([lx, ly], [lossX - 16, lossY], 3.5)) + p(head(lossX - 13, lossY, 1, 0));
    key += pe(ring(lossX, lossY, 9, 3.5));
    key += T(lossX, lossY + 30, 'loss', { ...mono(12.5, 500, 0.04), anchor: 'middle' });
    key += T(bx, by + 234, 'prediction = distillation target', mono(11.5, 400, 0.02));
    key += T(bx, by + 214, 'CNN teacher', mono(13, 500, 0.08));
    key += T(gx, gy + n * s + 22, '8 × 8 patches', mono(13, 500, 0.08));
    return { flash: [p(aq), p(or)], key };
  };


  // ================================================================ Machine Learning Fundamentals
  EMBLEMS['machine-learning-fundamentals'] = ({ R, K, title }) => {
    const y0 = title.bottom + 10, y1 = 804, cx = 372, cy = (y0 + y1) / 2 + 10;
    const th = -32 * Math.PI / 180, nx = -Math.sin(th), ny = Math.cos(th); // unit normal of the boundary
    const tx = Math.cos(th), ty = Math.sin(th);
    const sd = (x, y) => (x - cx) * nx + (y - cy) * ny;                    // signed distance
    const pA = (x, y) => 1 / (1 + Math.exp(sd(x, y) / 52));
    const fade = (y) => Math.max(0, Math.min(1, (y - y0) / 70)) * Math.max(0, Math.min(1, (y1 - y) / 30));
    // the label sits on the boundary, in a true knockout of both screens (no dots under it)
    const lt = 236, lcx = cx + tx * lt, lcy = cy + ty * lt, pw = 112, ph = 30;
    const inPill = (x, y, pad = 4) => Math.abs(x - lcx) < pw / 2 + pad && Math.abs(y - lcy) < ph / 2 + pad;
    let a = p(halftone({ box: [0, y0, W, y1], cell: 9, angle: 15, tone: (x, y) => inPill(x, y) ? 0 : 0.62 * pA(x, y) * fade(y) }));
    let b = p(halftone({ box: [0, y0, W, y1], cell: 9, angle: 75, tone: (x, y) => inPill(x, y) ? 0 : 0.62 * (1 - pA(x, y)) * fade(y) }));
    // samples: class A marked ○, class B marked × — the split survives greyscale
    const gauss = () => { let u = 0; for (let i = 0; i < 6; i++) u += R(); return u - 3; };
    let key = '';
    const pts = (mx, my, n, which) => {
      for (let i = 0; i < n; i++) {
        const x = mx + gauss() * 78, y = my + gauss() * 62;
        if (y < y0 + 40 || y > y1 - 24 || x < 40 || x > W - 40 || inPill(x, y, 16)) continue;
        if (which === 'a') { a += p(circ(x, y, 8.5)); key += pe(circ(x, y, 9) + circ(x, y, 5.8)); }
        else { b += p(circ(x, y, 8.5)); key += p(bar([x - 7.5, y - 7.5], [x + 7.5, y + 7.5], 3.6) + bar([x - 7.5, y + 7.5], [x + 7.5, y - 7.5], 3.6)); }
      }
    };
    pts(cx - 150 * nx - 20, cy - 150 * ny, 26, 'a');
    pts(cx + 150 * nx + 20, cy + 150 * ny, 26, 'b');
    // boundary w·x + b = 0 (broken for its label) and the two margins
    const L = 520;
    const seg = (off, w, dash) => {
      const ox = cx + nx * off, oy = cy + ny * off;
      if (!dash) return p(bar([ox - tx * L, oy - ty * L], [ox + tx * (lt - pw / 2 - 10), oy + ty * (lt - pw / 2 - 10)], w) + bar([ox + tx * (lt + pw / 2 + 10), oy + ty * (lt + pw / 2 + 10)], [ox + tx * L, oy + ty * L], w));
      let d = ''; for (let t = -L; t < L; t += 22) d += bar([ox + tx * t, oy + ty * t], [ox + tx * (t + 11), oy + ty * (t + 11)], w);
      return p(d);
    };
    const clipId = 'mlf-clip';
    key += `<g clip-path="url(#${clipId})">${seg(0, 5.5)}${seg(-52, 3, true)}${seg(52, 3, true)}</g>`;
    key += T(lcx, lcy + 5.5, 'p = 0.5', { ...mono(16, 500, 0.04), anchor: 'middle' });
    const defs = `<clipPath id="${clipId}"><rect x="0" y="${f(y0 + 30)}" width="${W}" height="${f(y1 - y0 - 30)}"/></clipPath>`;
    return { flash: [a, b], key, defs };
  };

  // ================================================================ Reinforcement Learning
  EMBLEMS['reinforcement-learning'] = ({ R, K, title }) => {
    const cols = 8, rows = 6, cs = 76, gx = (W - cols * cs) / 2, gy = Math.max(title.bottom + 44, 800 - rows * cs);
    const walls = new Set(['2,1', '2,2', '2,3', '5,2', '5,3', '5,4', '5,5', '3,5', '6,0']);
    const goal = [7, 1], start = [0, 5];
    // BFS distance to goal -> V(s) = gamma^d
    const dist = {}; const q = [goal]; dist[goal.join(',')] = 0;
    while (q.length) {
      const [i, j] = q.shift();
      for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const ni = i + di, nj = j + dj, k = ni + ',' + nj;
        if (ni < 0 || nj < 0 || ni >= cols || nj >= rows || walls.has(k) || k in dist) continue;
        dist[k] = dist[i + ',' + j] + 1; q.push([ni, nj]);
      }
    }
    let fl = '', key = '';
    const cx = (i) => gx + i * cs + cs / 2, cy = (j) => gy + j * cs + cs / 2;
    // one greedy policy with one tie-break, used for both the arrows and the agent's path
    const ORDER = [[1, 0], [0, -1], [0, 1], [-1, 0]];
    const greedy = (i, j) => { let best = null; for (const [di, dj] of ORDER) { const nk = (i + di) + ',' + (j + dj); if (nk in dist && (best === null || dist[nk] < best[2])) best = [di, dj, dist[nk]]; } return best; };
    let cur = start.slice(); const path = [cur.slice()];
    while (dist[cur.join(',')] > 0) { const [di, dj] = greedy(cur[0], cur[1]); cur = [cur[0] + di, cur[1] + dj]; path.push(cur.slice()); }
    const onPath = new Set(path.map((q) => q.join(',')));
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
      const k = i + ',' + j, x = gx + i * cs, y = gy + j * cs;
      if (walls.has(k)) { key += p(rectD(x + 3, y + 3, cs - 6, cs - 6)); continue; }
      if (i === goal[0] && j === goal[1]) { fl += p(rectD(x + 3, y + 3, cs - 6, cs - 6)); continue; }
      const v = Math.pow(0.84, dist[k]);
      fl += p(halftone({ box: [x + 5, y + 5, x + cs - 5, y + cs - 5], cell: 8, angle: 45, tone: () => v * 0.95 }));
      // greedy policy arrow: toward the neighbour with the smallest distance
      const best = greedy(i, j);
      if (best && !onPath.has(k)) {   // cells on the path carry the path's own arrowheads instead
        const ax = cx(i), ay = cy(j), s = 9;
        const [di, dj] = best;
        key += p(polyD([[ax + di * s * 1.3, ay + dj * s * 1.3], [ax - di * s * 0.7 - dj * s, ay - dj * s * 0.7 + di * s], [ax - di * s * 0.7 + dj * s, ay - dj * s * 0.7 - di * s]]));
      }
    }
    // grid ticks
    for (let i = 0; i <= cols; i++) for (let j = 0; j <= rows; j++) key += p(rectD(gx + i * cs - 1, gy + j * cs - 5, 2, 10) + rectD(gx + i * cs - 5, gy + j * cs - 1, 10, 2));
    // the agent's path, start -> goal
    for (let k = 0; k < path.length - 1; k++) {
      const a = [cx(path[k][0]), cy(path[k][1])], b = [cx(path[k + 1][0]), cy(path[k + 1][1])];
      const last = k === path.length - 2;
      const e = last ? [a[0] + (b[0] - a[0]) * 0.42, a[1] + (b[1] - a[1]) * 0.42] : b;
      key += p(bar(a, e, 6));
      if (!last) { const dx = Math.sign(b[0] - a[0]), dy = Math.sign(b[1] - a[1]), mx = (a[0] + b[0]) / 2 + dx * 8, my = (a[1] + b[1]) / 2 + dy * 8;
        key += p(polyD([[mx, my], [mx - dx * 16 - dy * 10, my - dy * 16 + dx * 10], [mx - dx * 16 + dy * 10, my - dy * 16 - dx * 10]])); }
    }
    key += `<path d="${circ(cx(start[0]), cy(start[1]), 16)}${circ(cx(start[0]), cy(start[1]), 11)}" fill-rule="evenodd"/>`;
    key += T(cx(goal[0]), cy(goal[1]) + 12, '+1', { font: 'serif', italic: true, size: 36, anchor: 'middle' });
    return { flash: [fl], key };
  };

  // ================================================================ SQL Masterclass
  // An INNER JOIN, told truthfully: CUSTOMERS (Aqua) and ORDERS (Yellow) are matched on a key. Each matched
  // pair becomes one result row printed in BOTH drums, so the result is Green — a customer with two orders
  // appears twice. Rows with no partner stay single-ink, screened back, and never reach the result.
  EMBLEMS['sql-masterclass'] = ({ R, K, title }) => {
    const cust = [[1, 'Asha'], [2, 'Ben'], [3, 'Chen'], [4, 'Dara']];
    const ord = [[101, 1], [102, 3], [103, 1], [104, 2], [105, 9]];
    const rh = 34, rg = 6, y0 = Math.max(title.bottom + 64, 366);
    const L = { x0: M, x1: 292 }, Rt = { x0: 428, x1: W - M };
    const ms = mono(15, 500, 0.02), hs = mono(12, 500, 0.14);
    let aq = '', ye = '', key = '';
    const screen = (x0, y, x1) => p(halftone({ box: [x0, y, x1, y + rh], cell: 6, angle: 45, tone: () => 0.34 }));
    const matched = new Set(ord.map((o) => o[1]));
    // headers
    key += T(L.x0, y0 - 14, 'CUSTOMERS', hs) + T(L.x1, y0 - 14, 'id · name', { ...hs, anchor: 'end' });
    key += T(Rt.x0, y0 - 14, 'ORDERS', hs) + T(Rt.x1, y0 - 14, 'id · customer_id', { ...hs, anchor: 'end' });
    const cy = {}, oy = {};
    cust.forEach(([id, nm], i) => {
      const y = y0 + i * (rh + rg); cy[id] = y + rh / 2;
      aq += matched.has(id) ? p(rectD(L.x0, y, L.x1 - L.x0, rh)) : screen(L.x0, y, L.x1);
      key += T(L.x0 + 12, y + 23, `${id}  ${nm}`, ms);
    });
    ord.forEach(([id, c], i) => {
      const y = y0 + i * (rh + rg); oy[id] = y + rh / 2;
      ye += cust.some((q) => q[0] === c) ? p(rectD(Rt.x0, y, Rt.x1 - Rt.x0, rh)) : screen(Rt.x0, y, Rt.x1);
      key += T(Rt.x0 + 12, y + 23, `${id}`, ms) + T(Rt.x1 - 12, y + 23, `${c}`, { ...ms, anchor: 'end' });
    });
    // the ON clause: key-ink links from customers.id to orders.customer_id
    const pairs = [];
    ord.forEach(([oid, c]) => { if (cy[c] != null) { key += p(bar([L.x1 + 6, cy[c]], [Rt.x0 - 6, oy[oid]], 3.2)) + p(circ(L.x1 + 6, cy[c], 4.5)) + p(circ(Rt.x0 - 6, oy[oid], 4.5)); pairs.push([c, oid]); } });
    // result: one row per matched pair, printed in both drums (= green)
    pairs.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const ry0 = y0 + ord.length * (rh + rg) + 58;
    key += T(M, ry0 - 14, 'INNER JOIN … ON customers.id = orders.customer_id', hs);
    pairs.forEach(([c, oid], i) => {
      const y = ry0 + i * (rh + rg);
      const d = p(rectD(M, y, W - 2 * M, rh));
      aq += d; ye += d;
      const nm = cust.find((q) => q[0] === c)[1];
      key += T(M + 12, y + 23, `${c}  ${nm}`, ms) + T(Rt.x0 + 12, y + 23, `${oid}`, ms) + T(Rt.x1 - 12, y + 23, `${c}`, { ...ms, anchor: 'end' });
    });
    return { flash: [aq, ye], key };
  };

  window.BOOKS = BOOKS;
})();
