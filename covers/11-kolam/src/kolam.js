// Sikku kolam generator — Vizuara Books / direction 11 "Pulli"
//
// Model (the "mirror curve" formalisation of sikku / kambi kolam, after Gerdes and Jablan):
//   * pulli (dots) sit at the centres of unit cells of a square lattice (u,v).
//   * the line travels at 45 degrees, passing between neighbouring dots at the midpoint of
//     the edge they share.  Inside each cell the line cuts all four corners, so every dot is
//     encircled.
//   * at every edge midpoint the line either CROSSES (goes straight through, the "sikku") or
//     TURNS BACK around its own dot (a two-sided mirror on that edge).  The outer border of the
//     dot field is always a turn — this is what makes the loops around the border dots.
//   * the result is always a set of smooth closed lines that never touch a dot.  We search the
//     turn placements (respecting a symmetry group) until the number of closed lines equals
//     the target — usually exactly one: a single unbroken line through every dot.
//   nēr pulli  (straight dots)     = lattice drawn upright, lines run at 45 degrees
//   idukku pulli (interlaced dots) = same lattice turned 45 degrees, rows offset by half.

(function (root) {
  'use strict';

  // ---------- seeded RNG ----------
  function rng(seed) {
    let s = (seed >>> 0) || 1;
    return function () { // mulberry32
      s = (s + 0x6D2B79F5) >>> 0;
      let t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // ---------- shapes ----------
  // ASCII mask in DISPLAY coordinates: any non-space, non-'.' char is a dot.
  // For 'idukku', dots must sit on a checkerboard (x+y even after the first dot is fixed);
  // characters are read at their column/row.
  function fromMask(mask, lattice) {
    const lines = mask.replace(/^\n+|\n+$/g, '').split('\n');
    const pts = [];
    lines.forEach((ln, y) => { for (let x = 0; x < ln.length; x++) if (ln[x] !== ' ' && ln[x] !== '.') pts.push([x, y, ln[x]]); });
    return fromDisplay(pts, lattice);
  }
  // rows: array of row lengths, centred.  For 'ner' all rows must have equal parity to be
  // centred exactly; for 'idukku' consecutive rows alternate parity.
  function fromRows(rows, lattice) {
    const pts = [];
    const maxL = Math.max(...rows);
    rows.forEach((L, y) => {
      if (lattice === 'idukku') {
        for (let i = 0; i < L; i++) pts.push([(maxL - L) + 2 * i, y, 'o']);
      } else {
        const off = (maxL - L) / 2;
        for (let i = 0; i < L; i++) pts.push([off + i, y, 'o']);
      }
    });
    return fromDisplay(pts, lattice);
  }
  // columns: heights, anchor 'centre' or 'bottom'
  function fromCols(cols, lattice, anchor) {
    const pts = []; const maxH = Math.max(...cols);
    cols.forEach((H, x) => {
      const off = anchor === 'bottom' ? maxH - H : (maxH - H) / 2;
      for (let j = 0; j < H; j++) pts.push([x, off + j, 'o']);
    });
    return fromDisplay(pts, lattice);
  }
  function fromDisplay(pts, lattice) {
    // convert display (x,y) [y down] to model (u,v) [v up]
    const cells = [];
    if (lattice === 'idukku') {
      // neighbours are diagonal in display: (x±1, y±1).  u=(x+y)/2, v=(x-y)/2 ... choose so that
      // display = rotate45(model)
      const p0 = pts[0];
      for (const [x, y, ch] of pts) {
        if (((x + y) - (p0[0] + p0[1])) % 2 !== 0) throw new Error('idukku mask not on checkerboard at ' + x + ',' + y);
        const u = (x + y) / 2, v = (x - y) / 2; // integer or half-integer consistently
        cells.push({ u: u, v: v, ch });
      }
      // shift to integers
      const fu = cells[0].u - Math.floor(cells[0].u), fv = cells[0].v - Math.floor(cells[0].v);
      cells.forEach((c) => { c.u -= fu; c.v -= fv; });
    } else {
      for (const [x, y, ch] of pts) {
        if (Math.abs(x - Math.round(x)) > 1e-9) { // half-integer centring: shift all
          cells.push({ u: x, v: -y, ch });
        } else cells.push({ u: x, v: -y, ch });
      }
      const fu = cells[0].u - Math.floor(cells[0].u);
      cells.forEach((c) => { c.u -= fu; });
    }
    cells.forEach((c) => { c.u = Math.round(c.u); c.v = Math.round(c.v); });
    return { lattice, cells };
  }

  // ---------- model ----------
  const K = (u, v) => u + ',' + v;
  function build(shape) {
    const set = new Map();
    shape.cells.forEach((c, i) => set.set(K(c.u, c.v), i));
    const edges = []; // internal edges between neighbouring cells
    const edgeAt = new Map();
    shape.cells.forEach((c, i) => {
      const r = set.get(K(c.u + 1, c.v));
      if (r !== undefined) { edgeAt.set('E' + K(c.u, c.v), edges.length); edges.push({ a: i, b: r, dir: 'E', mu: c.u + 0.5, mv: c.v }); }
      const t = set.get(K(c.u, c.v + 1));
      if (t !== undefined) { edgeAt.set('N' + K(c.u, c.v), edges.length); edges.push({ a: i, b: t, dir: 'N', mu: c.u, mv: c.v + 0.5 }); }
    });
    return { shape, set, edges, edgeAt };
  }

  // segments: cell i, corner q in 0..3 = NE, SE, SW, NW.  ends: side letters
  const CORN = ['NE', 'SE', 'SW', 'NW'];
  const SIDES = { NE: ['N', 'E'], SE: ['S', 'E'], SW: ['S', 'W'], NW: ['N', 'W'] };
  const segId = (i, c) => i * 4 + CORN.indexOf(c);

  // returns partner map: key "seg:side" -> ["seg", side, type]
  function links(M, mirrors) {
    const P = new Map();
    const link = (s1, e1, s2, e2, type) => { P.set(s1 + ':' + e1, [s2, e2, type]); P.set(s2 + ':' + e2, [s1, e1, type]); };
    const cells = M.shape.cells;
    cells.forEach((c, i) => {
      // N side
      const nE = M.edgeAt.get('N' + K(c.u, c.v));
      if (nE !== undefined && !mirrors[nE]) {
        const j = M.edges[nE].b;
        link(segId(i, 'NW'), 'N', segId(j, 'SE'), 'S', 'x');
        link(segId(i, 'NE'), 'N', segId(j, 'SW'), 'S', 'x');
      } else link(segId(i, 'NW'), 'N', segId(i, 'NE'), 'N', nE === undefined ? 'b' : 'm');
      // S side (only turns; crossings made from the cell below's N)
      const sE = M.edgeAt.get('N' + K(c.u, c.v - 1));
      if (sE === undefined || mirrors[sE]) link(segId(i, 'SW'), 'S', segId(i, 'SE'), 'S', sE === undefined ? 'b' : 'm');
      // E side
      const eE = M.edgeAt.get('E' + K(c.u, c.v));
      if (eE !== undefined && !mirrors[eE]) {
        const j = M.edges[eE].b;
        link(segId(i, 'NE'), 'E', segId(j, 'SW'), 'W', 'x');
        link(segId(i, 'SE'), 'E', segId(j, 'NW'), 'W', 'x');
      } else link(segId(i, 'NE'), 'E', segId(i, 'SE'), 'E', eE === undefined ? 'b' : 'm');
      const wE = M.edgeAt.get('E' + K(c.u - 1, c.v));
      if (wE === undefined || mirrors[wE]) link(segId(i, 'NW'), 'W', segId(i, 'SW'), 'W', wE === undefined ? 'b' : 'm');
    });
    return P;
  }

  const other = (seg, side) => { const s = SIDES[CORN[seg % 4]]; return s[0] === side ? s[1] : s[0]; };

  // trace all closed lines. returns array of cycles; each cycle = array of steps
  // step = { cell, from: side, to: side, typeTo: 'x'|'b'|'m' }
  function trace(M, mirrors) {
    const P = links(M, mirrors);
    const nSeg = M.shape.cells.length * 4;
    const seen = new Uint8Array(nSeg);
    const cycles = [];
    for (let s0 = 0; s0 < nSeg; s0++) {
      if (seen[s0]) continue;
      const cyc = [];
      let s = s0, from = SIDES[CORN[s0 % 4]][0];
      let guard = 0;
      while (true) {
        seen[s] = 1;
        const to = other(s, from);
        const [s2, e2, type] = P.get(s + ':' + to);
        cyc.push({ cell: Math.floor(s / 4), from, to, type });
        s = s2; from = e2;
        if (s === s0 && from === SIDES[CORN[s0 % 4]][0]) break;
        if (++guard > nSeg * 4) throw new Error('trace runaway');
      }
      cycles.push(cyc);
    }
    return cycles;
  }
  // fast loop counter: precompute pairings once per model
  function prepCount(M) {
    const cells = M.shape.cells;
    const fixed = []; // pairs of segment ids always joined (border turns)
    const byEdge = M.edges.map(() => ({ x: [], m: [] }));
    const add = (arr, a, b) => { arr.push(a, b); };
    cells.forEach((c, i) => {
      const nE = M.edgeAt.get('N' + K(c.u, c.v));
      if (nE !== undefined) { const j = M.edges[nE].b;
        add(byEdge[nE].x, segId(i, 'NW'), segId(j, 'SE')); add(byEdge[nE].x, segId(i, 'NE'), segId(j, 'SW'));
        add(byEdge[nE].m, segId(i, 'NW'), segId(i, 'NE')); add(byEdge[nE].m, segId(j, 'SW'), segId(j, 'SE'));
      } else add(fixed, segId(i, 'NW'), segId(i, 'NE'));
      if (M.edgeAt.get('N' + K(c.u, c.v - 1)) === undefined) add(fixed, segId(i, 'SW'), segId(i, 'SE'));
      const eE = M.edgeAt.get('E' + K(c.u, c.v));
      if (eE !== undefined) { const j = M.edges[eE].b;
        add(byEdge[eE].x, segId(i, 'NE'), segId(j, 'SW')); add(byEdge[eE].x, segId(i, 'SE'), segId(j, 'NW'));
        add(byEdge[eE].m, segId(i, 'NE'), segId(i, 'SE')); add(byEdge[eE].m, segId(j, 'NW'), segId(j, 'SW'));
      } else add(fixed, segId(i, 'NE'), segId(i, 'SE'));
      if (M.edgeAt.get('E' + K(c.u - 1, c.v)) === undefined) add(fixed, segId(i, 'NW'), segId(i, 'SW'));
    });
    const n = cells.length * 4;
    const par = new Int32Array(n);
    return function (mirrors) {
      for (let i = 0; i < n; i++) par[i] = i;
      const f = (x) => { while (par[x] !== x) { par[x] = par[par[x]]; x = par[x]; } return x; };
      let comps = n;
      const u = (a, b) => { const ra = f(a), rb = f(b); if (ra !== rb) { par[ra] = rb; comps--; } };
      for (let k = 0; k < fixed.length; k += 2) u(fixed[k], fixed[k + 1]);
      for (let e = 0; e < byEdge.length; e++) { const arr = mirrors[e] ? byEdge[e].m : byEdge[e].x; u(arr[0], arr[1]); u(arr[2], arr[3]); }
      return comps;
    };
  }
  const countLoops = (M, mirrors) => prepCount(M)(mirrors);

  // ---------- symmetry ----------
  // display coords of a model point
  function toDisplay(lattice, u, v) {
    if (lattice === 'idukku') return [(u + v), (u - v)]; // x = u+v, y(down) = u-v   (scaled by sqrt2 later)
    return [u, -v];
  }
  function symmetryGroup(M) {
    const L = M.shape.lattice;
    const pts = M.shape.cells.map((c) => toDisplay(L, c.u, c.v));
    const cx = pts.reduce((a, p) => a + p[0], 0) / pts.length, cy = pts.reduce((a, p) => a + p[1], 0) / pts.length;
    const T = {
      id: (x, y) => [x, y],
      mx: (x, y) => [2 * cx - x, y],          // mirror left/right
      my: (x, y) => [x, 2 * cy - y],          // mirror top/bottom
      r2: (x, y) => [2 * cx - x, 2 * cy - y], // 180 rotation
      r4: (x, y) => [cx - (y - cy), cy + (x - cx)],
      r4b: (x, y) => [cx + (y - cy), cy - (x - cx)],
      d1: (x, y) => [cx + (y - cy), cy + (x - cx)],
      d2: (x, y) => [cx - (y - cy), cy - (x - cx)],
    };
    const key = (p) => Math.round(p[0] * 2) + ',' + Math.round(p[1] * 2);
    const S = new Set(pts.map(key));
    const ok = {};
    for (const [n, t] of Object.entries(T)) ok[n] = pts.every((p) => S.has(key(t(p[0], p[1]))));
    return { T, ok, cx, cy };
  }
  // orbits of internal edges under chosen transforms
  function edgeOrbits(M, names) {
    const L = M.shape.lattice;
    const G = symmetryGroup(M);
    const use = names.filter((n) => G.ok[n]);
    const key = (p) => Math.round(p[0] * 4) + ',' + Math.round(p[1] * 4);
    const byMid = new Map();
    M.edges.forEach((e, i) => byMid.set(key(toDisplay(L, e.mu, e.mv)), i));
    const orbitOf = new Int32Array(M.edges.length).fill(-1);
    const orbits = [];
    M.edges.forEach((e, i) => {
      if (orbitOf[i] >= 0) return;
      // closure under the generated group
      const stack = [i]; const orb = []; orbitOf[i] = orbits.length;
      while (stack.length) {
        const j = stack.pop(); orb.push(j);
        const d = toDisplay(L, M.edges[j].mu, M.edges[j].mv);
        for (const n of use) {
          const k = byMid.get(key(G.T[n](d[0], d[1])));
          if (k !== undefined && orbitOf[k] < 0) { orbitOf[k] = orbits.length; stack.push(k); }
        }
      }
      orbits.push(orb);
    });
    return { orbits, used: use, G };
  }

  // ---------- search ----------
  // opts: loops (target), sym (array of transform names), density (target fraction of turns),
  //       seed, force(e, disp) -> 'm' | 'x' | undefined, iters, noIsolated
  function solve(shape, opts) {
    const M = build(shape);
    const R = rng(opts.seed || 1);
    const sym = opts.sym || ['mx', 'my', 'r2', 'r4', 'r4b', 'd1', 'd2'];
    const { orbits, used } = edgeOrbits(M, sym);
    const L = shape.lattice;
    const mirrors = new Uint8Array(M.edges.length);
    const locked = new Uint8Array(orbits.length);
    if (opts.force) {
      orbits.forEach((orb, oi) => {
        const e = M.edges[orb[0]];
        const d = toDisplay(L, e.mu, e.mv);
        const f = opts.force(e, d, M);
        if (f === 'm') { orb.forEach((j) => (mirrors[j] = 1)); locked[oi] = 1; }
        else if (f === 'x') locked[oi] = 1;
      });
    }
    const free = orbits.map((_, i) => i).filter((i) => !locked[i]);
    const target = opts.loops || 1;
    const dens = opts.density == null ? 0.25 : opts.density;
    const nE = M.edges.length;
    const isolatedPenalty = (m) => {
      if (!opts.noIsolated) return 0;
      // a cell whose every side is a turn is an isolated ring: allowed only if it has no internal edges at all
      let pen = 0;
      M.shape.cells.forEach((c) => {
        const es = [M.edgeAt.get('N' + K(c.u, c.v)), M.edgeAt.get('N' + K(c.u, c.v - 1)), M.edgeAt.get('E' + K(c.u, c.v)), M.edgeAt.get('E' + K(c.u - 1, c.v))];
        const internal = es.filter((x) => x !== undefined);
        if (internal.length && internal.every((x) => m[x])) pen++;
      });
      return pen;
    };
    const cnt = prepCount(M);
    const lp = opts.loopPenalty || 1.6;
    const aesthetic = opts.aesthetic || null;
    const score = (m) => {
      const loops = cnt(m);
      let md = 0; for (let i = 0; i < nE; i++) md += m[i];
      const d = nE ? md / nE : 0;
      const q = Math.abs(d - dens) * 8 + isolatedPenalty(m) * 3 + (aesthetic ? aesthetic(m, M) : 0);
      return { s: Math.abs(loops - target) * lp + q, q, loops, d };
    };
    let best = null;
    const restarts = opts.restarts || 6;
    const iters = opts.iters || 5000;
    for (let rs = 0; rs < restarts; rs++) {
      // random symmetric start near the target density
      for (const oi of free) { const on = R() < dens; orbits[oi].forEach((j) => (mirrors[j] = on ? 1 : (locked[oi] ? mirrors[j] : 0))); }
      let cur = score(mirrors);
      for (let it = 0; it < iters && free.length; it++) {
        const oi = free[Math.floor(R() * free.length)];
        orbits[oi].forEach((j) => (mirrors[j] ^= 1));
        const nx = score(mirrors);
        const temp = 1.2 * (1 - it / iters) + 0.03;
        if (nx.s <= cur.s || R() < Math.exp((cur.s - nx.s) / temp)) {
          cur = nx;
          if (nx.loops === target && (!best || nx.q < best.sc.q)) best = { m: mirrors.slice(), sc: nx };
        } else orbits[oi].forEach((j) => (mirrors[j] ^= 1));
      }
    }
    if (!best) best = { m: mirrors.slice(), sc: score(mirrors) };
    const m = best.m;
    const cycles = trace(M, m);
    return { M, mirrors: m, cycles, loops: cycles.length, density: best.sc.d, symmetry: used, orbits: orbits.length };
  }

  // ---------- geometry ----------
  const SIDE_V = { N: [0, 1], S: [0, -1], E: [1, 0], W: [-1, 0] };
  // node where the line meets side `side` of cell (u,v): type x = crossing at the midpoint,
  // b/m = turn: point at distance r from the dot, tangent along the edge.
  function geom(sol, o) {
    const r = o.r ?? 0.36;        // radius of a turn around a dot (units of pitch)
    const rb = o.rb ?? r;         // radius at the outer border
    const hX = o.hX ?? 0.2;       // handle crossing->turn
    const hT = o.hT ?? 0.2;       // handle on the turn side
    const L = sol.M.shape.lattice;
    const cells = sol.M.shape.cells;
    const paths = sol.cycles.map((cyc) => {
      const nodes = []; // [{p:[u,v], t:[tu,tv], type}]
      for (let k = 0; k < cyc.length; k++) {
        const st = cyc[k];
        const c = cells[st.cell];
        const vFrom = SIDE_V[st.from], vTo = SIDE_V[st.to];
        const dir = [vTo[0] - vFrom[0], vTo[1] - vFrom[1]]; // diagonal travel dir (unnormalised)
        // node at the exit side
        let p, t;
        if (st.type === 'x') {
          p = [c.u + 0.5 * vTo[0], c.v + 0.5 * vTo[1]];
          t = [dir[0] / Math.SQRT2, dir[1] / Math.SQRT2];
        } else {
          const rr = st.type === 'b' ? rb : r;
          p = [c.u + rr * vTo[0], c.v + rr * vTo[1]];
          // tangent along the edge: the component of dir perpendicular to vTo
          const nx = dir[0] - (dir[0] * vTo[0] + dir[1] * vTo[1]) * vTo[0];
          const ny = dir[1] - (dir[0] * vTo[0] + dir[1] * vTo[1]) * vTo[1];
          const n = Math.hypot(nx, ny); t = [nx / n, ny / n];
        }
        nodes.push({ p, t, type: st.type === 'x' ? 'x' : 't' });
      }
      return nodes;
    });
    return paths.map((nodes) => ({ nodes, toSvg: (X) => pathD(nodes, X, hX, hT, r) }));
  }
  function pathD(nodes, X, hX, hT, r) {
    // X: model->screen transform
    const f = (p) => X(p[0], p[1]);
    const n = nodes.length;
    let d = '';
    const s0 = f(nodes[n - 1].p);
    d += 'M' + s0[0].toFixed(2) + ' ' + s0[1].toFixed(2);
    for (let k = 0; k < n; k++) {
      const A = nodes[(k - 1 + n) % n], B = nodes[k];
      let ha, hb;
      if (A.type === 'x' && B.type === 'x') { ha = hb = 0.2357; }         // straight 45-degree run
      else if (A.type === 't' && B.type === 't') { ha = hb = 0.5523 * r; } // quarter circle round the dot
      else { ha = A.type === 'x' ? hX : hT; hb = B.type === 'x' ? hX : hT; }
      const c1 = f([A.p[0] + A.t[0] * ha, A.p[1] + A.t[1] * ha]);
      const c2 = f([B.p[0] - B.t[0] * hb, B.p[1] - B.t[1] * hb]);
      const e = f(B.p);
      if (A.type === 'x' && B.type === 'x') d += 'L' + e[0].toFixed(2) + ' ' + e[1].toFixed(2);
      else d += 'C' + c1[0].toFixed(2) + ' ' + c1[1].toFixed(2) + ' ' + c2[0].toFixed(2) + ' ' + c2[1].toFixed(2) + ' ' + e[0].toFixed(2) + ' ' + e[1].toFixed(2);
    }
    return d + 'Z';
  }

  // model -> display bounds & transform at pitch p (distance between neighbouring dots)
  function layout(sol, pitch) {
    const L = sol.M.shape.lattice;
    const s = L === 'idukku' ? pitch / Math.SQRT2 : pitch;
    const disp = (u, v) => { const d = toDisplay(L, u, v); return [d[0] * s, d[1] * s]; };
    const pts = sol.M.shape.cells.map((c) => disp(c.u, c.v));
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    pts.forEach(([x, y]) => { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); });
    return { disp, pts, box: { x0, x1, y0, y1, w: x1 - x0, h: y1 - y0 } };
  }

  // render an SVG group string.  o: {pitch, stroke, dot, color, dotColor, accent, accentLoop, cx, cy, partial}
  function svg(sol, o) {
    const pitch = o.pitch;
    const lay = layout(sol, pitch);
    const ox = o.cx - (lay.box.x0 + lay.box.x1) / 2, oy = o.cy - (lay.box.y0 + lay.box.y1) / 2;
    const X = (u, v) => { const d = lay.disp(u, v); return [d[0] + ox, d[1] + oy]; };
    const G = geom(sol, o);
    let out = '';
    G.forEach((g, i) => {
      const col = (o.accentLoop != null && i === o.accentLoop) ? o.accent : (o.loopColors ? o.loopColors[i % o.loopColors.length] : o.color);
      const dash = o.partial != null ? ` pathLength="1000" stroke-dasharray="${Math.round(o.partial * 1000)} 2000" stroke-dashoffset="${o.partialOffset || 0}"` : '';
      out += `<path d="${g.toSvg(X)}" fill="none" stroke="${col}" stroke-width="${o.stroke}" stroke-linecap="round" stroke-linejoin="round"${dash}/>`;
    });
    if (o.dot > 0) sol.M.shape.cells.forEach((c) => { const p = X(c.u, c.v); out += `<circle cx="${p[0].toFixed(2)}" cy="${p[1].toFixed(2)}" r="${o.dot}" fill="${o.dotColor || o.color}"/>`; });
    return { svg: out, box: lay.box, ox, oy };
  }

  const api = { rng, fromMask, fromRows, fromCols, build, trace, countLoops, solve, svg, layout, symmetryGroup, edgeOrbits };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Kolam = api;
})(this);
