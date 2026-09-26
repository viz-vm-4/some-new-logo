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
      water: { flat: '#6F8580', sh: '#4E625E' },
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
      sky: '#1E2046', ink: '#F6EDE0', sub: '#E3A57E',
      stone: { hi: '#FFC994', lo: '#E58454', sh: '#733040', shUp: '#7E3847', g: 0.75, course: 22, courseCol: '#12051a', courseOp: 0.22 },
      ground: { flat: '#1E2046', sh: '#0B0C22', shUp: '#0B0C22' },
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

  // Stepwell in section (after Chand Baori, Abhaneri): the section plane cuts the pit open;
  // terraces (layers) step down, every one joined to the next by pairs of flights (connections).
  SCENES.baori = (hr) => {
    const cam = CAM({ az: 0, s: 1, ox: 360, el: 38 });
    const S = new Scene(); S.E = frame(cam, 0);
    const n = 8, h = 42, g = 34, X = 340, Y = 800, Zb = -1500;
    pitGround(S, hr, [{ x0: -X, x1: X, y1: Y, cols: [] }]);
    const sm = cutOr(S, hr, hr.stone), wm = cutOr(S, hr, hr.water);
    for (let i = 0; i < n; i++) {
      const zt = -i * h, a0 = -X + i * g, a1 = X - i * g, b1 = Y - i * g;
      S.box(a0, b1 - g, Zb, a1, b1, zt, { mat: sm });
      S.box(a0, 0, Zb, a0 + g, b1 - g, zt, { mat: sm });
      S.box(a1 - g, 0, Zb, a1, b1 - g, zt, { mat: sm });
    }
    const a0 = -X + n * g, a1 = X - n * g, b1 = Y - n * g;
    S.box(a0, 0, Zb, a1, b1, -n * h - 12, { mat: sm });
    S.box(a0, 0, -n * h - 12, a1, b1, -n * h + 6, { mat: wm, cast: false });
    // flights on each back riser: pairs of stairs meeting at a landing, offset level to level
    const m = 6, rs = h / m, run = 8, pd = 20, span = 2 * m * run + 10;
    for (let i = 1; i < n; i++) {
      const zt = -i * h, ry = Y - i * g, xa = -X + i * g + 6, xb = X - i * g - 6, off = (i % 2) * span / 2;
      for (let x = xa + off; x + 2 * m * run + 10 <= xb; x += span) {
        for (let j = 0; j < m; j++) {
          S.box(x + j * run, ry - pd, zt, x + (j + 1) * run, ry, zt + (j + 1) * rs, { mat: hr.stone });
          S.box(x + 10 + (2 * m - 1 - j) * run, ry - pd, zt, x + 10 + (2 * m - j) * run, ry, zt + (j + 1) * rs, { mat: hr.stone });
        }
        S.box(x + m * run, ry - pd, zt, x + m * run + 10, ry, zt + h, { mat: hr.stone });
      }
    }
    return { S, cam, L: sunRel(cam, -72, 56) };
  };

  // A wall with one window — the context window. Sun behind the wall; light falls through onto a row of tokens.
  SCENES.aperture = (hr) => {
    const cam = CAM({ az: 0, s: 1, ox: 360 });
    const S = new Scene(); ground(S, hr, cam); S.E = frame(cam, -14);
    const y0 = 420, t = 44, X0 = -330, X1 = 380, Hh = 350, wx0 = -30, wx1 = 110, wz0 = 130, wz1 = 270;
    const st = hr.stone;
    S.box(X0, y0, 0, wx0, y0 + t, Hh, { mat: st });
    S.box(wx1, y0, 0, X1, y0 + t, Hh, { mat: st });
    S.box(wx0, y0, 0, wx1, y0 + t, wz0, { mat: st });
    S.box(wx0, y0, wz1, wx1, y0 + t, Hh, { mat: st });
    S.box(X0 - 4, y0 - 4, Hh, X1 + 4, y0 + t + 4, Hh + 8, { mat: hr.marble });
    for (let i = 0; i < 20; i++) { const x = -360 + i * 36; S.box(x, 212, 0, x + 24, 236, 24, { mat: hr.marble }); }
    return { S, cam, L: sunRel(cam, -62, 36) };
  };

  // Stair to the sky — each step rests on all the steps before it; the next one is still a drawing
  SCENES.stair = (hr) => {
    const cam = CAM({ az: 0, s: 1, ox: 330 });
    const S = new Scene(); ground(S, hr, cam); S.E = frame(cam, 34);
    const n = 12, run = 40, rise = 34, y0 = 70, y1 = 190, x0 = -250, xe = x0 + n * run;
    for (let i = 0; i < n; i++) {
      S.box(x0 + i * run, y0, 0, x0 + (i + 1) * run, y1, (i + 1) * rise, { mat: hr.stone });
      S.box(x0 + i * run - 1.5, y0 - 1.5, (i + 1) * rise, x0 + i * run + 7, y1 + 1.5, (i + 1) * rise + 3, { mat: hr.marble });
    }
    const extra = (cam) => ghostBox(S, cam, xe, y0, n * rise, xe + run, y1, (n + 1) * rise, hr.ink, 1.4);
    return { S, cam, L: sunRel(cam, 26, 40), extra };
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

  // Three wells in section — three ways of keeping water (memory) through the dry months.
  // Each carries the same marble gauge; the water stands at a different mark in each.
  SCENES.wells = (hr) => {
    const cam = CAM({ az: 0, s: 1, ox: 360, el: 26 });
    const S = new Scene(); S.E = frame(cam, 0);
    const Yb = 170;
    const funnel = []; const fx0 = -205, fx1 = -85, st = 11, sd = 26;
    for (let i = 0; i < 5; i++) { funnel.push([fx0 + i * st, fx0 + (i + 1) * st, -i * sd]); funnel.push([fx1 - (i + 1) * st, fx1 - i * st, -i * sd]); }
    funnel.push([fx0 + 5 * st, fx1 - 5 * st, -5 * sd]);
    const pits = [
      { x0: fx0, x1: fx1, y1: Yb, cols: funnel, water: -100, gx: (fx0 + fx1) / 2, gz: -5 * sd },
      { x0: -26, x1: 26, y1: Yb, cols: [[-26, 26, -1200]], water: -210, gx: 0, gz: -1200 },
      { x0: 85, x1: 205, y1: Yb, cols: [[85, 128, -48], [128, 162, -360], [162, 205, -48]], water: -30, gx: 145, gz: -360 },
    ];
    pitGround(S, hr, pits);
    for (const p of pits) {
      // curb on three sides
      const c = 12, ch = 14;
      S.box(p.x0 - c, p.y1, 0, p.x1 + c, p.y1 + c, ch, { mat: hr.stone });
      S.box(p.x0 - c, 0, 0, p.x0, p.y1, ch, { mat: hr.stone });
      S.box(p.x1, 0, 0, p.x1 + c, p.y1, ch, { mat: hr.stone });
      // the gauge: a marble rod standing in the well, rising far above ground, with ticks
      const gy = p.y1 - 40, gw = 7, top = 300;
      S.box(p.gx - gw, gy - gw, Math.max(p.gz, -600), p.gx + gw, gy + gw, top, { mat: hr.marble });
      for (let z = -560; z < top - 10; z += 20) {
        const big = (z % 100 === 0);
        S.decal([S.W(p.gx - gw, gy - gw, z), S.W(p.gx - gw + (big ? 2 * gw : gw), gy - gw, z), S.W(p.gx - gw + (big ? 2 * gw : gw), gy - gw, z + 2.2), S.W(p.gx - gw, gy - gw, z + 2.2)], mul(S.E[1], -1), { flat: '#3b1d1a' }, 0.4);
      }
    }
    return { S, cam };
  };

  // Jai Prakash Yantra — a bowl that maps the sky; a crosswire's shadow marks where the sun stands
  SCENES.jaiprakash = (hr) => {
    const cam = CAM({ az: 0, s: 1, ox: 360, el: 30 });
    const S = new Scene(); ground(S, hr, cam);
    const C = [0, 360], Rw = 300, a = 262, h = 150, top = 158, Rs = (a * a + h * h) / (2 * h), zc = top - h + Rs;
    const NA = 64, NR = 16;
    const ring = (r, z, t) => [C[0] + r * Math.cos(t), C[1] + r * Math.sin(t), z];
    for (let i = 0; i < NA; i++) {
      const t0 = (i / NA) * 2 * Math.PI, t1 = ((i + 1) / NA) * 2 * Math.PI, tm = (t0 + t1) / 2;
      const out = [Math.cos(tm), Math.sin(tm), 0];
      S.face([ring(Rw, 0, t0), ring(Rw, 0, t1), ring(Rw, top, t1), ring(Rw, top, t0)], out, { mat: hr.stone });
      S.face([ring(a, top, t0), ring(a, top, t1), ring(Rw, top, t1), ring(Rw, top, t0)], [0, 0, 1], { mat: hr.marble });
      // bowl: spherical cap from the rim (polar angle p = pa) down to the bottom
      const pa = Math.asin(a / Rs);
      for (let j = 0; j < NR; j++) {
        const p0 = pa * (1 - j / NR), p1 = pa * (1 - (j + 1) / NR);
        const P = (p, t) => [C[0] + Rs * Math.sin(p) * Math.cos(t), C[1] + Rs * Math.sin(p) * Math.sin(t), zc - Rs * Math.cos(p)];
        const pts = j === NR - 1 ? [P(p0, t0), P(p0, t1), P(0, 0)] : [P(p0, t0), P(p0, t1), P(p1, t1), P(p1, t0)];
        const cen = [C[0], C[1], zc];
        const mid = P((p0 + p1) / 2, tm); const inward = nrm(sub(cen, mid));
        S.face(pts, inward, { mat: hr.stone });
      }
    }
    // graduations: meridians every 15°, altitude circles, pushed toward the centre so they sit on the facets
    const cen = [C[0], C[1], zc];
    const Q = (p, t, off = 1.6) => { const q = [C[0] + Rs * Math.sin(p) * Math.cos(t), C[1] + Rs * Math.sin(p) * Math.sin(t), zc - Rs * Math.cos(p)]; return add(q, mul(nrm(sub(cen, q)), off)); };
    const pa = Math.asin(a / Rs);
    for (let k = 0; k < 24; k++) {
      const t = (k / 24) * 2 * Math.PI, w = 0.006;
      for (let j = 0; j < NR; j++) {
        const p0 = pa * (1 - j / NR), p1 = Math.max(0.03, pa * (1 - (j + 1) / NR));
        S.decal([Q(p0, t - w / Math.sin(p0)), Q(p0, t + w / Math.sin(p0)), Q(p1, t + w / Math.sin(p1)), Q(p1, t - w / Math.sin(p1))], nrm(sub(cen, Q((p0 + p1) / 2, t))), hr.marble, 0);
      }
    }
    for (const frac of [0.25, 0.5, 0.75]) {
      const p = pa * frac, dp = 0.004;
      for (let i = 0; i < NA; i++) {
        const t0 = (i / NA) * 2 * Math.PI, t1 = ((i + 1) / NA) * 2 * Math.PI;
        S.decal([Q(p - dp, t0), Q(p - dp, t1), Q(p + dp, t1), Q(p + dp, t0)], nrm(sub(cen, Q(p, (t0 + t1) / 2))), hr.marble, 0);
      }
    }
    // crosswire and ring
    const zw = top + 3, wr = 1.6;
    S.box(C[0] - Rw, C[1] - wr, zw, C[0] + Rw, C[1] + wr, zw + 2 * wr, { mat: hr.stone, recv: false });
    S.box(C[0] - wr, C[1] - Rw, zw, C[0] + wr, C[1] + Rw, zw + 2 * wr, { mat: hr.stone, recv: false });
    S.box(C[0] - 9, C[1] - 9, zw - 1, C[0] + 9, C[1] + 9, zw + 5, { mat: hr.stone, recv: false });
    return { S, cam, L: sunRel(cam, 38, 48) };
  };

  // Partition walls — a decision tree as a courtyard split by ever-lower walls (root split tallest)
  SCENES.partition = (hr) => {
    const cam = CAM({ az: 0, s: 0.8, ox: 318, el: 36 });
    const S = new Scene(); ground(S, hr, cam); S.E = frame(cam, -24);
    const t = 14, cap = 5;
    const wallY = (x, y0, y1, h) => { S.box(x - t / 2, y0, 0, x + t / 2, y1, h, { mat: hr.stone }); S.box(x - t / 2 - 1.5, y0, h, x + t / 2 + 1.5, y1, h + cap, { mat: hr.marble }); };
    const wallX = (y, x0, x1, h) => { S.box(x0, y - t / 2, 0, x1, y + t / 2, h, { mat: hr.stone }); S.box(x0, y - t / 2 - 1.5, h, x1, y + t / 2 + 1.5, h + cap, { mat: hr.marble }); };
    const X0 = -300, X1 = 300, Y0 = 200, Y1 = 700, H = [290, 170, 80];
    // low curb around the feature space
    const c = 22;
    S.box(X0 - t, Y0 - t, 0, X1 + t, Y0, c, { mat: hr.stone }); S.box(X0 - t, Y1, 0, X1 + t, Y1 + t, c, { mat: hr.stone });
    S.box(X0 - t, Y0, 0, X0, Y1, c, { mat: hr.stone }); S.box(X1, Y0, 0, X1 + t, Y1, c, { mat: hr.stone });
    const xr = -30; wallY(xr, Y0, Y1, H[0]);
    const yl = 480, yr = 390; wallX(yl, X0, xr - t / 2, H[1]); wallX(yr, xr + t / 2, X1, H[1]);
    wallY(-180, Y0, yl - t / 2, H[2]); wallY(-130, yl + t / 2, Y1, H[2]); wallY(150, Y0, yr - t / 2, H[2]); wallY(100, yr + t / 2, Y1, H[2]);
    // leaves: one block per cell, two classes
    const cells = [[X0, -180, Y0, yl, 1], [-180, xr, Y0, yl, 0], [X0, -130, yl, Y1, 0], [-130, xr, yl, Y1, 1], [xr, 150, Y0, yr, 0], [150, X1, Y0, yr, 1], [xr, 100, yr, Y1, 1], [100, X1, yr, Y1, 0]];
    for (const [a, b, cc, d, k] of cells) { const x = (a + b) / 2, y = (cc + d) / 2, r = 24; S.box(x - r, y - r, 0, x + r, y + r, 2 * r, { mat: k ? hr.marble : hr.stone }); }
    return { S, cam, L: sunRel(cam, 22, 44) };
  };

  // Three ways to fold the same climb — a straight flight, a switchback, a spiral
  SCENES.folds = (hr) => {
    const cam = CAM({ az: 0, s: 1.22, ox: 372 });
    const S = new Scene(); ground(S, hr, cam); S.E = frame(cam, -16);
    const H = 270, n = 18, rs = H / n, th = 12;
    // straight flight
    const sx0 = -380, run = 14, sy0 = 150, sy1 = 196;
    for (let i = 0; i < n; i++) S.box(sx0 + i * run, sy0, 0, sx0 + (i + 1) * run, sy1, (i + 1) * rs, { mat: hr.stone });
    S.box(sx0 + n * run - 0.01, sy0, 0, sx0 + n * run + 24, sy1, H, { mat: hr.stone });
    // switchback: spine wall with flights alternating on either side
    const bx0 = -70, bx1 = 20, by0 = 130, by1 = 230, ym = (by0 + by1) / 2, sp = 8;
    S.box(bx0 + 22, ym - sp / 2, 0, bx1 - 22, ym + sp / 2, H, { mat: hr.stone });
    const per = 6, fl = n / per, frun = (bx1 - bx0 - 44) / per;
    for (let f = 0; f < fl; f++) {
      const dir = f % 2 ? -1 : 1, ya = f % 2 ? ym + sp / 2 : by0, yb = f % 2 ? by1 : ym - sp / 2, zb = f * per * rs;
      for (let k = 0; k < per; k++) {
        const z = (f * per + k + 1) * rs; const xs = dir > 0 ? bx0 + 22 + k * frun : bx1 - 22 - (k + 1) * frun;
        S.box(xs, ya, zb, xs + frun, yb, z, { mat: hr.stone });
      }
      const zl = (f + 1) * per * rs, xl = dir > 0 ? bx1 - 22 : bx0;
      S.box(xl, by0, zb, xl + 22, by1, zl, { mat: hr.stone });
    }
    // spiral: central column and wedge treads
    const cx = 170, cy = 180, r0 = 12, r1 = 66, seg = 16;
    const colPts = []; for (let i = 0; i < 16; i++) { const a = i / 16 * 2 * Math.PI; colPts.push(S.W(cx + r0 * Math.cos(a), cy + r0 * Math.sin(a), 0)); }
    S.extrude(colPts, [0, 0, H + 18], { mat: hr.stone });
    for (let k = 0; k < n; k++) {
      const a0 = -Math.PI / 2 + k * 2 * Math.PI / seg, a1 = a0 + 2 * Math.PI / seg, z = (k + 1) * rs;
      const q = [S.W(cx + r0 * Math.cos(a0), cy + r0 * Math.sin(a0), z - th), S.W(cx + r1 * Math.cos(a0), cy + r1 * Math.sin(a0), z - th), S.W(cx + r1 * Math.cos(a1), cy + r1 * Math.sin(a1), z - th), S.W(cx + r0 * Math.cos(a1), cy + r0 * Math.sin(a1), z - th)];
      S.extrude(q, [0, 0, th], { mat: hr.stone });
    }
    // the common height: a marble datum line on all three
    return { S, cam };
  };

  // Charlie and the Intelligence Factory — each room of the factory, cut open by the section plane.
  // A shared frame (same room, same cut) with one light-instrument inside per room.
  function roomScene(hr, o) {
    const cam = CAM({ az: 0, s: o.s || 1, ox: 360, el: o.el || 26 });
    const S = new Scene(); S.E = frame(cam, 0); ground(S, hr, cam);
    const cm = cutOr(S, hr, hr.stone);
    const X = 262, T = 28, Y1 = 470, Hr = 300, R = Hr + T;
    S.box(-X - T, 0, 0, -X, Y1 + T, R, { mat: cm });
    S.box(X, 0, 0, X + T, Y1 + T, R, { mat: cm });
    S.box(-X, Y1, 0, X, Y1 + T, Hr, { mat: cm });
    // roof with openings: grid decomposition around the holes
    const holes = o.holes || [];
    const xs = [-X, X], ys = [0, Y1];
    for (const [a, b, c, d] of holes) xs.push(a, b), ys.push(c, d);
    const ux = [...new Set(xs)].sort((a, b) => a - b), uy = [...new Set(ys)].sort((a, b) => a - b);
    for (let i = 0; i < ux.length - 1; i++) for (let j = 0; j < uy.length - 1; j++) {
      const cx = (ux[i] + ux[i + 1]) / 2, cy = (uy[j] + uy[j + 1]) / 2;
      if (holes.some(([a, b, c, d]) => cx > a && cx < b && cy > c && cy < d)) continue;
      S.box(ux[i], uy[j], Hr, ux[i + 1], uy[j + 1], R, { mat: cm });
    }
    S.box(-X - T - 3, 0, R, X + T + 3, Y1 + T + 3, R + 6, { mat: (n, pts) => (dot(n, S.E[1]) < -0.99 && pts.every(p => Math.abs(dot(p, S.E[1])) < 1e-6)) ? hr.cut : hr.marble });
    if (o.inside) o.inside(S, { X, Y1, Hr });
    return { S, cam, L: sunRel(cam, o.theta == null ? 40 : o.theta, o.alt || 62) };
  }
  SCENES.roomLanguage = (hr) => roomScene(hr, {
    holes: Array.from({ length: 9 }, (_, i) => [-230 + i * 54, -230 + i * 54 + 16, 150, 330]),
    inside: (S, r) => { for (let i = 0; i < 13; i++) { const x = -234 + i * 37; S.box(x, 250, 0, x + 24, 274, 24, { mat: hr.marble }); } },
    theta: 70, alt: 64,
  });
  SCENES.roomVision = (hr) => roomScene(hr, {
    holes: (() => { const h = []; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) h.push([-150 + i * 76, -150 + i * 76 + 50, 110 + j * 64, 110 + j * 64 + 40]); return h; })(),
    theta: 60, alt: 66,
  });
  SCENES.roomSound = (hr) => roomScene(hr, {
    holes: (() => { const amp = [30, 70, 120, 90, 150, 60, 110, 170, 80, 40, 100, 55]; return amp.map((a, i) => [-228 + i * 38, -228 + i * 38 + 14, 250 - a / 2, 250 + a / 2]); })(),
    theta: 70, alt: 64,
  });
  SCENES.roomReason = (hr) => roomScene(hr, {
    holes: [[118, 214, 180, 290]],
    inside: (S, r) => {
      const n = 9, run = 34, rise = 28;
      for (let i = 0; i < n; i++) S.box(-230 + i * run, 200, 0, -230 + (i + 1) * run, 330, (i + 1) * rise, { mat: hr.stone });
    },
    theta: 55, alt: 58,
  });

  // ---------- books ----------
  const BOOKS = [
    { slug: 'mathematical-foundations-for-ml', title: ['Mathematical', 'Foundations for', 'Machine Learning'], level: 'beginner', capsules: 43, hours: 10, scene: 'samrat', fig: 'After the Samrat Yantra, Jaipur, 1734' },
    { slug: 'neural-networks-from-scratch', title: ['Neural Networks', 'from Scratch'], level: 'beginner', capsules: 33, hours: 7, scene: 'baori', fig: 'After Chand Baori' },
    { slug: 'ai-context-engineering', title: ['AI Context', 'Engineering'], level: 'intermediate', capsules: 43, hours: 10, scene: 'aperture', fig: 'A wall with one window' },
    { slug: 'build-llms-from-scratch', title: ['Build Large Language', 'Models (LLMs)', 'from Scratch'], level: 'intermediate', capsules: 20, hours: 6, scene: 'stair', fig: 'Each step rests on all before it' },
    { slug: '5d-parallelism', title: ['5D Parallelism', 'for Large Model', 'Training'], level: 'advanced', capsules: 40, hours: 9, scene: 'field', fig: 'One instrument, replicated' },
    { slug: 'pi-vs-hermes-vs-codex', title: ['Pi vs Hermes vs Codex:', 'Context Compaction', 'and Memory'], level: 'advanced', capsules: 9, hours: 1, scene: 'folds', fig: 'Three ways to fold one climb' },
    { slug: 'transformers-from-scratch', title: ['Transformers:', 'Theory, Intuition, and', 'Building from Scratch'], level: 'intermediate', capsules: 20, hours: 5, scene: 'jaiprakash', fig: 'After the Jai Prakash Yantra, Jaipur' },
    { slug: 'decision-trees-from-scratch', title: ['Build Decision Trees', 'from Scratch'], level: 'beginner', capsules: 23, hours: 5, scene: 'partition', fig: 'A court split by ever-lower walls' },
    { slug: 'charlie-language-room', series: 'Charlie and the Intelligence Factory', no: 'I', title: ['Charlie and the', 'Language Room'], sub: 'Language — Inference Engineering', level: 'advanced', capsules: 22, hours: 5, scene: 'roomLanguage', fig: 'Room I · light in a sequence' },
    { slug: 'charlie-vision-room', series: 'Charlie and the Intelligence Factory', no: 'II', title: ['Charlie and the', 'Vision Room'], sub: 'Vision — Vision Transformers', level: 'intermediate', capsules: 20, hours: 6, scene: 'roomVision', fig: 'Room II · light in patches' },
    { slug: 'charlie-sound-room', series: 'Charlie and the Intelligence Factory', no: 'III', title: ['Charlie and the', 'Sound Room'], sub: 'Audio — Voice Agents', level: 'intermediate', capsules: 20, hours: 6, scene: 'roomSound', fig: 'Room III · light as a waveform' },
    { slug: 'charlie-reasoning-room', series: 'Charlie and the Intelligence Factory', no: 'IV', title: ['Charlie and the', 'Reasoning Room'], sub: 'Reason — Reinforcement Learning, from bandits to reasoning models', level: 'advanced', capsules: 21, hours: 6, scene: 'roomReason', fig: 'Room IV · a climb toward the light' },
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
    const stats = b.soon ? 'Coming soon' : `${b.capsules} capsules · ${b.hours} ${b.hours === 1 ? 'hour' : 'hours'}`;
    el.innerHTML = `<svg class="art" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="${hr.sky}"/>${art}${extra}<rect x="0" y="806" width="${W}" height="${H - 806}" fill="${hr.cut.flat}"/></svg>
      <div class="head">
        ${b.series ? `<div class="series"><span class="no">${b.no}</span>${b.series}</div>` : ''}
        <h2 class="title" style="font-size:${b.size || 68}px">${b.title.join('<br>')}</h2>
        ${b.sub ? `<p class="sub">${b.sub}</p>` : ''}
      </div>
      <div class="band">
        <div class="row r1"><span class="imp">${mark('#F4EADC')}<b>Vizuara</b> Books</span><span class="lvl">${levelGlyph(hr.n, '#F4EADC')}${hr.label}</span></div>
        <div class="row r2"><span>${stats}</span><span class="fig">${b.fig}</span></div>
      </div>`;
    return el;
  }

  window.JANTAR = { BOOKS, build, HOURS };
})();
