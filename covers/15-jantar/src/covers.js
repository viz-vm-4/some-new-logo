/* Jantar covers: palettes, scenes, assembly */
(function () {
  const { Scene, camera, render, nrm, mix, add, sub, mul, dot, cross, D } = J;
  const W = 720, H = 888, PL = 748; // plinth (section) line

  // ---------- the three hours ----------
  const STONE = { hi: '#F8D2B6', lo: '#E08763', sh: '#8A3124', shUp: '#99392B', g: 0.9, course: 22 };
  const HOURS = {
    beginner: {
      label: 'Beginner', hour: 'Morning', n: 1, light: [32, 54],
      sky: '#EFE6D7', ink: '#26140E', sub: '#7A3A28',
      stone: STONE,
      ground: { flat: '#EFE6D7', sh: '#BE9B85', shUp: '#BE9B85' },
      marble: { hi: '#FFFBF4', lo: '#F5EDE2', sh: '#C39A8A', shUp: '#CBA596' },
      water: { flat: '#35423E', sh: '#2A3431' },
      cut: { flat: '#5B1D18' },
    },
    intermediate: {
      label: 'Intermediate', hour: 'Noon', n: 2, light: [16, 38],
      sky: '#D9A546', ink: '#26140E', sub: '#5B2616',
      stone: STONE,
      ground: { flat: '#D9A546', sh: '#A26C27', shUp: '#A26C27' },
      marble: { hi: '#FFFBF5', lo: '#F2E8DB', sh: '#BF9A86', shUp: '#C8A492' },
      water: { flat: '#35423E', sh: '#2A3431' },
      cut: { flat: '#5B1D18' },
    },
    advanced: {
      label: 'Advanced', hour: 'Evening', n: 3, light: [-36, 15],
      sky: '#23264F', ink: '#F6EDE0', sub: '#E3A57E',
      stone: { hi: '#FFC48E', lo: '#E07B4C', sh: '#5A2731', shUp: '#65303A', g: 0.75, course: 22, courseCol: '#12051a', courseOp: 0.22 },
      ground: { flat: '#23264F', sh: '#0F1026', shUp: '#0F1026' },
      marble: { hi: '#FFE6CE', lo: '#F4C5A3', sh: '#7B4A55', shUp: '#86525C' },
      water: { flat: '#141633', sh: '#0E0F24' },
      cut: { flat: '#5B1D18' },
    },
  };

  // ---------- camera, sun, ground ----------
  // Axonometric camera (elevation 24°). The ground is cut by a vertical section plane facing the
  // camera; its top edge always lands on the plinth line PL. Sun is set relative to the camera.
  function CAM(o) {
    const c = camera(o.az || 0, o.el == null ? 24 : o.el, o.s || 1, o.ox == null ? 360 : o.ox, PL);
    const az = (o.az || 0) * D;
    c.f = [-Math.sin(az), Math.cos(az), 0]; c.rh = [Math.cos(az), Math.sin(az), 0];
    return c;
  }
  function frame(cam, beta = 0) {
    const b = beta * D;
    return [add(mul(cam.rh, Math.cos(b)), mul(cam.f, Math.sin(b))), add(mul(cam.rh, -Math.sin(b)), mul(cam.f, Math.cos(b))), [0, 0, 1]];
  }
  function sunRel(cam, theta, alt) { // theta: 0 = from the right, +90 = from the viewer, -90 = from behind
    const t = theta * D, a = alt * D;
    return nrm(add(add(mul(cam.rh, Math.cos(a) * Math.cos(t)), mul(cam.f, -Math.cos(a) * Math.sin(t))), [0, 0, Math.sin(a)]));
  }
  function ground(S, hr, cam) {
    const P = (a, b, z) => add(add(mul(cam.rh, a), mul(cam.f, b)), [0, 0, z]);
    const A0 = -5000, A1 = 5000, B1 = 6000, Z0 = -1500;
    const c = [P(A0, 0, Z0), P(A1, 0, Z0), P(A0, 0, 0), P(A1, 0, 0), P(A0, B1, 0), P(A1, B1, 0)];
    S.solid([[c[2], c[3], c[5], c[4]], [c[0], c[1], c[3], c[2]]], { mat: (n) => (n[2] > 0.5 ? hr.ground : hr.cut), cast: false, noTrim: true, center: P(0, 3000, -750) });
  }
  // material that turns into section poché on the cutting plane (local y = 0)
  const cutOr = (S, hr, m) => (n, pts) => (dot(n, S.E[1]) < -0.99 && pts.every(p => Math.abs(dot(p, S.E[1])) < 1e-6)) ? hr.cut : m;
  // ground in the camera frame (S.E = camera frame) with rectangular pits given as columns
  function pitGround(S, hr, pits) {
    const gm = cutOr(S, hr, hr.ground), sm = cutOr(S, hr, hr.stone), wm = cutOr(S, hr, hr.water);
    const gmat = (n, pts) => (n[2] > 0.99 ? hr.ground : gm(n, pts));
    pits = pits.slice().sort((a, b) => a.x0 - b.x0);
    let x = -5000;
    for (const p of pits) {
      if (p.x0 > x) S.box(x, 0, -1500, p.x0, 6000, 0, { mat: gmat, cast: false });
      S.box(p.x0, p.y1, -1500, p.x1, 6000, 0, { mat: gmat, cast: false });
      for (const [xa, xb, zt] of p.cols) S.box(xa, 0, -1500, xb, p.y1, zt, { mat: sm });
      if (p.water != null) for (const [xa, xb, zt] of p.cols) if (zt < p.water) S.box(xa, 0, zt, xb, p.y1, p.water, { mat: wm, cast: false });
      x = p.x1;
    }
    S.box(x, 0, -1500, 5000, 6000, 0, { mat: gmat, cast: false });
  }
  const tanD = (a) => Math.tan(a * D);
  const svgLine = (cam, a, b, st) => { const A = cam.P(a), B = cam.P(b); return `<line x1="${A[0].toFixed(2)}" y1="${A[1].toFixed(2)}" x2="${B[0].toFixed(2)}" y2="${B[1].toFixed(2)}" ${st}/>`; };
  function ghostBox(S, cam, x0, y0, z0, x1, y1, z1, col, w = 1.3) {
    const c = [];
    for (const z of [z0, z1]) for (const y of [y0, y1]) for (const x of [x0, x1]) c.push(S.W(x, y, z));
    const E = [[0, 1], [2, 3], [4, 5], [6, 7], [0, 2], [1, 3], [4, 6], [5, 7], [0, 4], [1, 5], [2, 6], [3, 7]];
    return E.map(([i, j]) => svgLine(cam, c[i], c[j], `stroke="${col}" stroke-width="${w}" stroke-dasharray="5 4" stroke-linecap="round"`)).join('');
  }

  // ---------- scenes ----------
  const SCENES = {};

  // Samrat Yantra — the right triangle as instrument. Gnomon points north (away), quadrants as wings.
  SCENES.samrat = (hr) => {
    const cam = CAM({ az: 14, s: 0.86, ox: 372 });
    const S = new Scene(); ground(S, hr, cam);
    const phi = 27, tp = tanD(phi), cp = Math.cos(phi * D), sp = Math.sin(phi * D);
    const y0 = 60, Lg = 820, Hg = Lg * tp, w = 64, par = 11;
    const tri = (x) => [[x, y0, 0], [x, y0 + Lg, 0], [x, y0 + Lg, Hg]];
    S.extrude(tri(-w / 2), [par, 0, 0], { mat: hr.stone });
    S.extrude(tri(w / 2 - par), [par, 0, 0], { mat: hr.stone });
    for (const x of [-w / 2, w / 2 - par]) S.decal([[x, y0, 0], [x + par, y0, 0], [x + par, y0 + Lg, Hg], [x, y0 + Lg, Hg]], [0, -sp, cp], hr.marble);
    const run = 17;
    for (let y = y0; y < y0 + Lg - 0.1; y += run) {
      const ye = Math.min(y0 + Lg, y + run); const z = Math.max(3, (ye - y0) * tp - 9);
      S.box(-w / 2 + par, y, 0, w / 2 - par, ye, z, { mat: hr.stone });
    }
    const R = 250, a = [0, cp, sp], d = [0, sp, -cp];
    const zc = R * cp + 18, yc = y0 + zc / tp, bw = 104, N = 44;
    for (const sg of [-1, 1]) {
      const xf = sg * w / 2;
      const P = (t, s) => [xf + sg * R * Math.cos(t), yc + R * Math.sin(t) * d[1] + s * a[1], zc + R * Math.sin(t) * d[2] + s * a[2]];
      const Nn = (t) => nrm([-sg * Math.cos(t), -Math.sin(t) * d[1], -Math.sin(t) * d[2]]);
      for (let i = 0; i < N; i++) {
        const t0 = (i / N) * Math.PI / 2, t1 = ((i + 1) / N) * Math.PI / 2;
        S.slab([P(t0, -bw / 2), P(t1, -bw / 2), P(t1, bw / 2), P(t0, bw / 2)], 0, { mat: hr.stone });
        const nn = Nn((t0 + t1) / 2);
        S.decal([P(t0, bw / 2 - 16), P(t1, bw / 2 - 16), P(t1, bw / 2 - 4), P(t0, bw / 2 - 4)], nn, hr.marble);
        S.decal([P(t0, -bw / 2 + 4), P(t1, -bw / 2 + 4), P(t1, -bw / 2 + 16), P(t0, -bw / 2 + 16)], nn, hr.marble);
      }
      for (let h = 1; h < 24; h++) {
        const t = (h / 24) * Math.PI / 2, ww = h % 4 === 0 ? 0.0075 : 0.0038, ln = h % 4 === 0 ? 16 : 36;
        S.decal([P(t - ww, -bw / 2 + ln), P(t + ww, -bw / 2 + ln), P(t + ww, bw / 2 - ln), P(t - ww, bw / 2 - ln)], Nn(t), hr.marble, 0.5);
      }
    }
    return { S, cam, L: sunRel(cam, 30, 50) };
  };

  // Stepwell in section (after Chand Baori) — layers joined by criss-cross flights
  SCENES.baori = (hr) => {
    const cam = CAM({ az: 0, s: 1, ox: 360, el: 30 });
    const S = new Scene(); S.E = frame(cam, 0);
    const G = [58, 52, 40, 30, 24, 20, 16, 14], h = 34, X = 300, Y = 520, Zb = -1500, n = G.length;
    pitGround(S, hr, [{ x0: -X, x1: X, y1: Y, cols: [] }]);
    const sm = cutOr(S, hr, hr.stone), wm = cutOr(S, hr, hr.water);
    let ins = 0; const rings = [];
    for (let i = 0; i < n; i++) {
      const g = G[i], zt = -i * h, a0 = -X + ins, a1 = X - ins, b1 = Y - ins;
      S.box(a0, b1 - g, Zb, a1, b1, zt, { mat: sm });
      S.box(a0, 0, Zb, a0 + g, b1 - g, zt, { mat: sm });
      S.box(a1 - g, 0, Zb, a1, b1 - g, zt, { mat: sm });
      rings.push({ a0, a1, b1, zt, g }); ins += g;
    }
    const a0 = -X + ins, a1 = X - ins, b1 = Y - ins;
    S.box(a0, 0, Zb, a1, b1, -n * h - 10, { mat: sm });
    S.box(a0, 0, -n * h - 10, a1, b1, -n * h + 4, { mat: wm, cast: false });
    // flights on each back riser: pairs of small stairs meeting at a landing, offset level to level
    for (let i = 1; i < n; i++) {
      const R = rings[i], ry = R.b1, zt = R.zt;
      const m = 5, rs = h / m, run = 6, pd = Math.min(12, R.g - 4);
      const span = 2 * m * run + 6, off = (i % 2) * span / 2;
      for (let x = R.a0 + 8 + off; x + 2 * m * run <= R.a1 - 8; x += span) {
        for (let j = 0; j < m; j++) {
          S.box(x + j * run, ry - pd, zt, x + (j + 1) * run, ry, zt + (j + 1) * rs, { mat: hr.stone });
          S.box(x + (2 * m - 1 - j) * run, ry - pd, zt, x + (2 * m - j) * run, ry, zt + (j + 1) * rs, { mat: hr.stone });
        }
      }
    }
    return { S, cam, L: sunRel(cam, 30, 52) };
  };

  // A wall with one window — the context window. Sun behind the wall; light falls through onto a row of tokens.
  SCENES.aperture = (hr) => {
    const cam = CAM({ az: 0, s: 1, ox: 360 });
    const S = new Scene(); ground(S, hr, cam); S.E = frame(cam, -14);
    const y0 = 400, t = 44, X0 = -330, X1 = 380, Hh = 400, wx0 = -40, wx1 = 110, wz0 = 150, wz1 = 300;
    const st = hr.stone;
    S.box(X0, y0, 0, wx0, y0 + t, Hh, { mat: st });
    S.box(wx1, y0, 0, X1, y0 + t, Hh, { mat: st });
    S.box(wx0, y0, 0, wx1, y0 + t, wz0, { mat: st });
    S.box(wx0, y0, wz1, wx1, y0 + t, Hh, { mat: st });
    S.box(X0 - 4, y0 - 4, Hh, X1 + 4, y0 + t + 4, Hh + 8, { mat: hr.marble });
    for (let i = 0; i < 16; i++) { const x = -330 + i * 44; S.box(x, 150, 0, x + 30, 180, 30, { mat: hr.marble }); }
    return { S, cam, L: sunRel(cam, -62, 36) };
  };

  // Stair to the sky, climbing a wall — each step rests on all the steps before it
  SCENES.stair = (hr) => {
    const cam = CAM({ az: 0, s: 1, ox: 330 });
    const S = new Scene(); ground(S, hr, cam); S.E = frame(cam, 30);
    const n = 12, run = 40, rise = 34, y0 = 60, y1 = 170, x0 = -230, xe = x0 + n * run;
    const st = hr.stone;
    for (let i = 0; i < n; i++) S.box(x0 + i * run, y0, 0, x0 + (i + 1) * run, y1, (i + 1) * rise, { mat: st });
    // the wall behind: sloped top that follows the stair, with marble coping
    const wy0 = y1, wy1 = y1 + 36, top = (x) => 70 + (x - x0) * rise / run;
    S.extrude([S.W(x0 - 60, wy0, 0), S.W(xe, wy0, 0), S.W(xe, wy0, top(xe)), S.W(x0 - 60, wy0, top(x0 - 60))], mul(S.E[1], wy1 - wy0), { mat: st });
    const cn = nrm(add(mul(S.E[0], -rise), mul(S.E[2], run)));
    S.extrude([S.W(x0 - 60, wy0 - 3, top(x0 - 60)), S.W(xe, wy0 - 3, top(xe)), S.W(xe, wy0 - 3, top(xe) + 7), S.W(x0 - 60, wy0 - 3, top(x0 - 60) + 7)], mul(S.E[1], wy1 - wy0 + 6), { mat: hr.marble });
    const extra = (cam) => ghostBox(S, cam, xe, y0, n * rise, xe + run, y1, (n + 1) * rise, hr.ink, 1.4);
    return { S, cam, L: sunRel(cam, 40, 42), extra };
  };

  // Field of gnomons — one instrument, replicated
  SCENES.field = (hr) => {
    const cam = CAM({ az: 0, s: 0.92, ox: 400 });
    const S = new Scene(); ground(S, hr, cam); S.E = frame(cam, -22);
    for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) {
      const x = -420 + c * 150, y = 80 + r * 150;
      S.extrude([S.W(x, y, 0), S.W(x + 104, y, 0), S.W(x, y, 96)], mul(S.E[1], 34), { mat: hr.stone });
    }
    return { S, cam };
  };

  // Jali screen — tiles of light (coming soon: upper rows still to be built)
  SCENES.jali = (hr) => {
    const cam = CAM({ az: 0, s: 1, ox: 360 });
    const S = new Scene(); ground(S, hr, cam); S.E = frame(cam, -10);
    const nx = 7, nz = 8, hs = 38, bw = 12, t = 16, x0 = -190, y0 = 360, built = 5;
    const Wd = nx * hs + (nx + 1) * bw;
    for (let i = 0; i <= nx; i++) { const x = x0 + i * (hs + bw); S.box(x, y0, 0, x + bw, y0 + t, bw + built * (hs + bw), { mat: hr.stone }); }
    for (let i = 0; i < nx; i++) for (let k = 0; k <= built; k++) {
      const x = x0 + bw + i * (hs + bw), z = k * (hs + bw);
      S.box(x, y0, z, x + hs, y0 + t, z + bw, { mat: hr.stone });
    }
    const extra = (cam) => {
      let s = ''; const zb = bw + built * (hs + bw);
      for (let k = built + 1; k <= nz; k++) { const z = k * (hs + bw); s += svgLine(cam, S.W(x0, y0, z), S.W(x0 + Wd, y0, z), `stroke="${hr.ink}" stroke-width="1.1" stroke-dasharray="4 4" stroke-opacity=".8"`); }
      for (let i = 0; i <= nx; i++) { const x = x0 + i * (hs + bw); s += svgLine(cam, S.W(x, y0, zb), S.W(x, y0, bw + nz * (hs + bw)), `stroke="${hr.ink}" stroke-width="1.1" stroke-dasharray="4 4" stroke-opacity=".8"`); }
      return s;
    };
    return { S, cam, L: sunRel(cam, -58, 22), extra };
  };

  // ---------- books ----------
  const BOOKS = [
    { slug: 'mathematical-foundations-for-ml', title: ['Mathematical', 'Foundations for', 'Machine Learning'], level: 'beginner', capsules: 43, hours: 10, scene: 'samrat', fig: 'After the Samrat Yantra, Jaipur, 1734' },
    { slug: 'neural-networks-from-scratch', title: ['Neural Networks', 'from Scratch'], level: 'beginner', capsules: 33, hours: 7, scene: 'baori', fig: 'After Chand Baori' },
    { slug: 'ai-context-engineering', title: ['AI Context', 'Engineering'], level: 'intermediate', capsules: 43, hours: 10, scene: 'aperture', fig: 'A wall with one window' },
    { slug: 'build-llms-from-scratch', title: ['Build Large Language', 'Models (LLMs)', 'from Scratch'], level: 'intermediate', capsules: 20, hours: 6, scene: 'stair', fig: 'Each step rests on all before it' },
    { slug: '5d-parallelism', title: ['5D Parallelism', 'for Large Model', 'Training'], level: 'advanced', capsules: 40, hours: 9, scene: 'field', fig: 'One instrument, replicated' },
    { slug: 'pi-vs-hermes-vs-codex', title: ['Pi vs Hermes vs Codex:', 'Context Compaction', 'and Memory'], level: 'advanced', capsules: 9, hours: 1, scene: 'wells', fig: 'Three wells in section' },
    { slug: 'kernel-engineering', title: ['Kernel', 'Engineering'], level: 'advanced', soon: true, scene: 'jali', fig: 'A jali, five rows laid' },
  ];

  // ---------- marks ----------
  function mark(col) { // Vizuara stepwell mark: an inverted stepped V
    const r = [[0, 26], [4.5, 18], [9, 10], [13.5, 2]];
    return `<svg class="mk" width="26" height="18" viewBox="0 0 26 18"><path fill="${col}" d="${r.map(([y, w]) => `M${(26 - w) / 2} ${y}h${w}v4.5h-${w}z`).join('')}"/></svg>`;
  }
  function levelGlyph(n, col) {
    let s = ''; for (let i = 0; i < 3; i++) { const h = 5 + i * 4.5, x = i * 9; s += i < n ? `<rect x="${x}" y="1" width="7.5" height="${h}" fill="${col}"/>` : `<rect x="${x + 0.6}" y="1.6" width="6.3" height="${h - 1.2}" fill="none" stroke="${col}" stroke-width="1.2"/>`; }
    return `<svg class="lv" width="26" height="16" viewBox="0 0 26 16">${s}</svg>`;
  }

  function build(b) {
    const hr = HOURS[b.level];
    const t0 = performance.now();
    const sc = SCENES[b.scene](hr);
    const L = sc.L || sunRel(sc.cam, hr.light[0], hr.light[1]);
    const art = render(sc.S, sc.cam, L);
    const extra = sc.extra ? sc.extra(sc.cam) : '';
    console.log(b.slug, sc.S.faces.length, 'faces', Math.round(performance.now() - t0), 'ms');
    const el = document.createElement('div');
    el.className = 'cover lv-' + b.level; el.dataset.slug = b.slug;
    el.style.setProperty('--sky', hr.sky); el.style.setProperty('--ink', hr.ink); el.style.setProperty('--sub', hr.sub);
    const stats = b.soon ? 'Coming soon' : `${b.capsules} capsules · ${b.hours} hours`;
    el.innerHTML = `<svg class="art" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="${hr.sky}"/>${art}${extra}</svg>
      <h2 class="title">${b.title.join('<br>')}</h2>
      <div class="band">
        <div class="row r1"><span class="imp">${mark('#F4EADC')}<b>Vizuara</b> Books</span><span class="lvl">${levelGlyph(hr.n, '#F4EADC')}${hr.label}</span></div>
        <div class="row r2"><span>${stats}</span><span class="fig">${b.fig}</span></div>
      </div>`;
    return el;
  }

  window.JANTAR = { BOOKS, build, HOURS };
})();
