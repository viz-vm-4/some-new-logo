/* Jantar covers: palettes, scenes, assembly */
(function () {
  const { Scene, camera, render, nrm, mix, add, sub, mul, dot, cross, D } = J;
  const W = 720, H = 888, PL = 748; // plinth (section) line
  const CUTLINE = '#F4EADC';          // marble line drawn along every section cut

  // ---------- the three hours ----------
  const STONE = { hi: '#F1BF9C', lo: '#DD8460', sh: '#8A3124', shUp: '#99392B', g: 0.9, course: 22 };
  const HOURS = {
    beginner: {
      label: 'Beginner', hour: 'Morning', n: 1, light: [32, 54],
      sky: '#EFE6D7', ink: '#26140E', sub: '#7A3A28',
      stone: STONE,
      ground: { flat: '#EFE6D7', sh: '#BE9B85', shUp: '#BE9B85' },
      marble: { hi: '#FFFBF4', lo: '#F5EDE2', sh: '#C39A8A', shUp: '#CBA596' },
      water: { flat: '#6F8580', sh: '#4E625E' },
      cut: { flat: '#5B1D18', cut: true },
    },
    intermediate: {
      label: 'Intermediate', hour: 'Noon', n: 2, light: [16, 38],
      sky: '#D9A546', ink: '#26140E', sub: '#5B2616',
      stone: STONE,
      ground: { flat: '#D9A546', sh: '#A26C27', shUp: '#A26C27' },
      marble: { hi: '#FFFBF5', lo: '#F2E8DB', sh: '#BF9A86', shUp: '#C8A492' },
      water: { flat: '#35423E', sh: '#2A3431' },
      cut: { flat: '#5B1D18', cut: true },
    },
    advanced: {
      label: 'Advanced', hour: 'Evening', n: 3, light: [-36, 15],
      sky: '#1E2046', ink: '#F6EDE0', sub: '#E3A57E',
      stone: { hi: '#FFC994', lo: '#E58454', sh: '#733040', shUp: '#7E3847', g: 0.75, course: 22, courseCol: '#12051a', courseOp: 0.22 },
      ground: { flat: '#1E2046', sh: '#0B0C22', shUp: '#0B0C22' },
      marble: { hi: '#FFE6CE', lo: '#F4C5A3', sh: '#7B4A55', shUp: '#86525C' },
      water: { flat: '#141633', sh: '#0E0F24' },
      cut: { flat: '#5B1D18', cut: true },
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
    const cam = CAM({ az: 36, s: 0.68, ox: 286 });
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
    return { S, cam, L: sunRel(cam, 152, 46) };
  };

  // Stepwell block (after Chand Baori, Abhaneri): a stepped pit sunk in a stone block that stands on
  // the ground, sectioned at its near face so the stepped V shows in poché. Terraces are layers, each
  // edged in marble; paired flights on every riser join each layer to the next.
  SCENES.baori = (hr) => {
    const cam = CAM({ az: 0, s: 0.9, ox: 344, el: 28 });
    const S = new Scene(); ground(S, hr, cam); S.E = frame(cam, 20);
    const cutL = (m) => (n, pts) => (dot(n, S.E[1]) < -0.99 && pts.every(p => Math.abs(dot(p, S.E[1]) - Y0) < 1e-6)) ? hr.cut : m;
    const Y0 = 60, X = 300, D = 470, Hp = 300, n = 5, h = 56, g = 42, Zw = 20;
    const sm = cutL(hr.stone);
    // outer block ring (level 0 = rim) and terraces
    const lv = (i) => ({ a0: -X + i * g, a1: X - i * g, b1: Y0 + D - i * g, zt: Hp - i * h });
    for (let i = 0; i < n; i++) {
      const A = lv(i);
      S.box(A.a0, A.b1 - g, 0, A.a1, A.b1, A.zt, { mat: sm });
      S.box(A.a0, Y0, 0, A.a0 + g, A.b1 - g, A.zt, { mat: sm });
      S.box(A.a1 - g, Y0, 0, A.a1, A.b1 - g, A.zt, { mat: sm });
    }
    const B = lv(n);
    S.box(B.a0, Y0, 0, B.a1, B.b1, Zw - 6, { mat: sm });
    S.box(B.a0, Y0, Zw - 6, B.a1, B.b1, Zw, { mat: cutL(hr.water), cast: false });
    // marble lips: thin strips along the inner edge of every terrace (back and both sides)
    for (let i = 1; i <= n; i++) {
      const A = lv(i), z = Hp - (i - 1) * h, P = lv(i - 1), w = 5;
      S.box(A.a0 - 0.5, A.b1 - 0.01, z, A.a1 + 0.5, A.b1 + w, z + 2.5, { mat: hr.marble, cast: false });
      S.box(A.a0 - w, Y0 + 0.01, z, A.a0 + 0.01, A.b1 + w, z + 2.5, { mat: hr.marble, cast: false });
      S.box(A.a1 - 0.01, Y0 + 0.01, z, A.a1 + w, A.b1 + w, z + 2.5, { mat: hr.marble, cast: false });
    }
    // flights: pairs of stairs meeting at a landing on every riser (back and sides), offset level to level
    const m = 5, rs = h / m, run = 9, pd = 18, span = 2 * m * run + 12;
    for (let i = 1; i < n; i++) {
      const A = lv(i), zb = A.zt, off = (i % 2) * span / 2;
      // back riser (faces -y), flights run along x
      for (let x = A.a0 + 10 + off; x + span - 10 <= A.a1 - 10; x += span) {
        for (let j = 0; j < m; j++) {
          S.box(x + j * run, A.b1 - pd, zb, x + (j + 1) * run, A.b1, zb + (j + 1) * rs, { mat: hr.stone });
          S.box(x + 12 + (2 * m - 1 - j) * run, A.b1 - pd, zb, x + 12 + (2 * m - j) * run, A.b1, zb + (j + 1) * rs, { mat: hr.stone });
        }
        S.box(x + m * run, A.b1 - pd, zb, x + m * run + 12, A.b1, zb + h, { mat: hr.stone });
      }
      // left riser (faces +x), flights run along y
      for (let y = Y0 + 16 + off; y + span - 10 <= A.b1 - 16; y += span) {
        for (let j = 0; j < m; j++) {
          S.box(A.a0, y + j * run, zb, A.a0 + pd, y + (j + 1) * run, zb + (j + 1) * rs, { mat: hr.stone });
          S.box(A.a0, y + 12 + (2 * m - 1 - j) * run, zb, A.a0 + pd, y + 12 + (2 * m - j) * run, zb + (j + 1) * rs, { mat: hr.stone });
        }
        S.box(A.a0, y + m * run, zb, A.a0 + pd, y + m * run + 12, zb + h, { mat: hr.stone });
      }
    }
    return { S, cam, L: sunRel(cam, 28, 40) };
  };

  // A wall with one window — the context window. Sun behind the wall; light falls through onto a row of tokens.
  SCENES.aperture = (hr) => {
    const cam = CAM({ az: 0, s: 1, ox: 360 });
    const S = new Scene(); ground(S, hr, cam); S.E = frame(cam, -14);
    const y0 = 420, t = 44, X0 = -330, X1 = 380, Hh = 308, wx0 = -30, wx1 = 110, wz0 = 132, wz1 = 264;
    const st = hr.stone;
    // courses of 22: horizontal joints hide the seams between the four blocks of the wall
    S.box(X0, y0, 0, X1, y0 + t, wz0, { mat: st });
    S.box(X0, y0, wz1, X1, y0 + t, Hh, { mat: st });
    S.box(X0, y0, wz0, wx0, y0 + t, wz1, { mat: st });
    S.box(wx1, y0, wz0, X1, y0 + t, wz1, { mat: st });
    S.box(X0 - 4, y0 - 4, Hh, X1 + 4, y0 + t + 4, Hh + 8, { mat: hr.marble });
    // the token row: pitch and phase set so that exactly four tokens stand wholly in the light
    // (tops lit for x in [-87, 37] at this sun); a token is marble in light, sandstone in shade
    const tok = { hi: hr.marble.hi, lo: hr.marble.lo, sh: hr.stone.sh, shUp: hr.stone.shUp };
    for (let k = -9; k <= 10; k++) { const x = -85 + 33 * k; S.box(x, 168, 0, x + 22, 190, 22, { mat: tok }); }
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

  // Field of gnomons, split five ways: rows replicate the instrument (data); each gnomon is cut
  // crosswise into stages (pipeline) and lengthwise into two leaves (tensor); one row carries
  // differently shaped instruments (experts); a marble sequence line under every row is broken
  // into equal lengths, one per column (sequence / context).
  SCENES.field = (hr) => {
    const cam = CAM({ az: 0, s: 0.92, ox: 400 });
    const S = new Scene(); ground(S, hr, cam); S.E = frame(cam, -22);
    const L0 = 104, H0 = 96, T = 36, gap = 10, leafGap = 7, stages = 3;
    const wedge = (x, y, len, ht, thick) => {
      // one gnomon: `stages` crosswise segments x 2 lengthwise leaves
      const seg = (len - (stages - 1) * gap) / stages, lt = (thick - leafGap) / 2;
      for (let k = 0; k < stages; k++) {
        const xa = x + k * (seg + gap), xb = xa + seg;
        const za = ht * (1 - (xa - x) / len), zb = ht * (1 - (xb - x) / len);
        for (const yy of [y, y + lt + leafGap]) {
          const base = [S.W(xa, yy, 0), S.W(xb, yy, 0), S.W(xb, yy, zb), S.W(xa, yy, za)];
          S.extrude(base, mul(S.E[1], lt), { mat: hr.stone });
        }
      }
    };
    const experts = [[104, 96], [80, 132], [128, 70], [96, 112], [116, 84]];
    for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) {
      const x = -420 + c * 150, y = 215 + r * 145;
      const [len, ht] = r === 2 ? experts[c] : [L0, H0];
      wedge(x, y, len, ht, T);
    }
    for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) {
      const y = 215 + r * 145 - 28, x = -440 + c * 150;
      S.box(x, y, 0, x + 136, y + 7, 1.5, { mat: hr.marble, cast: false });
    }
    return { S, cam };
  };

  // Jali screen — tiles of light (coming soon: upper rows still to be built)
  SCENES.jali = (hr) => {
    const cam = CAM({ az: 0, s: 0.94, ox: 372 });
    const S = new Scene(); ground(S, hr, cam); S.E = frame(cam, -10);
    const nx = 7, nz = 7, hs = 38, bw = 12, t = 16, x0 = -190, y0 = 300, built = 5;
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
    for (const [a, b, cc, d, k] of cells) { const x = (a + b) / 2, y = (cc + d) / 2, r = 24; S.box(x - r, y - r, 0, x + r, y + r, 2 * r, { mat: k ? hr.marble : { flat: hr.cut.flat, sh: '#3E1210', shUp: '#3E1210' } }); }
    return { S, cam, L: sunRel(cam, 22, 44) };
  };

  // Three ways to fold the same climb: a switchback, a helix and a stair wound round a square core.
  // Same height, same footprint, same marble cap: three folds side by side, not a ranking.
  SCENES.folds = (hr) => {
    const cam = CAM({ az: 0, s: 0.98, ox: 360 });
    const S = new Scene(); ground(S, hr, cam); S.E = frame(cam, 0);
    const H = 270, n = 18, rs = H / n, F = 150, yc = 200, st = hr.stone, SP = 212;
    const cap = (cx, cy, w) => S.box(cx - w / 2, cy - w / 2, H, cx + w / 2, cy + w / 2, H + 5, { mat: hr.marble });
    const tread = (pts2, z, th) => S.extrude(pts2.map(([x, y]) => S.W(x, y, z - th)), [0, 0, th], { mat: st });
    const place = (x, turn) => { S.E = frame(cam, turn); S.O = add(mul(cam.rh, x), mul(cam.f, yc)); };
    // 1 · switchback: two lanes and an open well, half-landings at the ends, four corner posts
    place(-SP, -32);
    { const cx = 0, yc = 0, x0 = cx - F / 2, x1 = cx + F / 2, y0 = yc - F / 2, y1 = yc + F / 2, lw = 22, per = 6, frun = (F - 2 * lw) / per;
      for (const [px, py] of [[x0, y0], [x1 - 10, y0], [x0, y1 - 10], [x1 - 10, y1 - 10]]) S.box(px, py, 0, px + 10, py + 10, H, { mat: st });
      for (let f = 0; f < n / per; f++) {
        const dir = f % 2 ? -1 : 1, ya = f % 2 ? y1 - 60 : y0, yb = f % 2 ? y1 : y0 + 60, zb = f * per * rs;
        for (let k = 0; k < per; k++) {
          const z = zb + (k + 1) * rs, xa = dir > 0 ? x0 + lw + k * frun : x1 - lw - (k + 1) * frun;
          S.box(xa, ya, Math.max(0, z - 26), xa + frun, yb, z, { mat: st });
        }
        const zl = (f + 1) * per * rs, xl = dir > 0 ? x1 - lw : x0;
        S.box(xl, y0, zl - 14, xl + lw, y1, zl, { mat: st });
      }
      cap(x1 - lw / 2, yc, lw + 6);
    }
    // 2 · helix: a column carried to the top landing, wedge treads overlapping about 30% in plan
    place(0, 0);
    { const cx = 0, yc = 0, r0 = 16, r1 = 74, stepA = 25 * D, span = 36 * D;
      const col = []; for (let i = 0; i < 20; i++) { const a = i / 20 * 2 * Math.PI; col.push(S.W(cx + r0 * Math.cos(a), yc + r0 * Math.sin(a), 0)); }
      S.extrude(col, [0, 0, H], { mat: st });
      for (let k = 0; k < n; k++) {
        const a0 = Math.PI * 0.35 + k * stepA, a1 = a0 + span, z = (k + 1) * rs, pts = [];
        for (let j = 0; j <= 3; j++) { const a = a0 + (a1 - a0) * j / 3; pts.push([cx + r1 * Math.cos(a), yc + r1 * Math.sin(a)]); }
        pts.push([cx + r0 * Math.cos(a1), yc + r0 * Math.sin(a1)], [cx + r0 * Math.cos(a0), yc + r0 * Math.sin(a0)]);
        tread(pts, z, 18);
      }
      const aT = Math.PI * 0.35 + n * stepA, top = [];
      for (let j = 0; j <= 6; j++) { const a = aT + (100 * D) * j / 6; top.push([cx + r1 * Math.cos(a), yc + r1 * Math.sin(a)]); }
      top.push([cx, yc]); tread(top, H, 14);
      cap(cx, yc, 36);
    }
    // 3 · stair wound round a square core: four flights per turn, corner landings, cantilevered
    place(SP, -38);
    { const cx = 0, yc = 0, c = 25, w = 50, per = 4, run = (2 * c) / per;
      S.box(cx - c, yc - c, 0, cx + c, yc + c, H, { mat: st });
      let z = 0, k = 0;
      const sides = [[1, 0], [0, 1], [-1, 0], [0, -1]];
      for (let f = 0; k < n; f++) {
        const [dx, dy] = sides[f % 4];
        for (let j = 0; j < per && k < n; j++, k++) {
          z += rs; const t0 = -c + j * run, t1 = t0 + run;
          let r;
          if (dx === 1) r = [cx + t0, yc - c - w, cx + t1, yc - c];          // front side, rising to +x
          else if (dy === 1) r = [cx + c, yc + t0, cx + c + w, yc + t1];      // right side, rising to +y
          else if (dx === -1) r = [cx - t1, yc + c, cx - t0, yc + c + w];     // back side, rising to -x
          else r = [cx - c - w, yc - t1, cx - c, yc - t0];                    // left side, rising to -y
          S.box(r[0], r[1], z - 22, r[2], r[3], z, { mat: st });
        }
        const corners = [[cx + c, yc - c - w], [cx + c, yc + c], [cx - c - w, yc + c], [cx - c - w, yc - c - w]];
        const [lx, ly] = corners[f % 4];
        S.box(lx, ly, z - 16, lx + w, ly + w, z, { mat: st });
      }
      cap(cx, yc, 2 * c);
    }
    S.E = frame(cam, 0); S.O = [0, 0, 0];
    // a dashed datum at the common height
    const extra = (cam) => svgLine(cam, add(mul(cam.rh, -SP - 110), add(mul(cam.f, yc), [0, 0, H + 5])), add(mul(cam.rh, SP + 110), add(mul(cam.f, yc), [0, 0, H + 5])), `stroke="${hr.marble.hi}" stroke-width="1.2" stroke-dasharray="6 5" stroke-opacity=".85"`);
    return { S, cam, L: sunRel(cam, -18, 26), extra };
  };

  // Charlie and the Intelligence Factory — each room of the factory is one tall chamber, cut open by
  // the section plane (the poché frame is the sub-series mark); the roof is pierced in a pattern
  // that belongs to the room, and the sun draws that pattern on the chamber's back wall.
  function roomScene(hr, o) {
    const cam = CAM({ az: 0, s: 0.8, ox: 372, el: 26 });
    const S = new Scene(); ground(S, hr, cam);
    const b = 18; S.E = frame(cam, b); S.O = add(mul(cam.f, 90), mul(cam.rh, -10));
    const X = 190, T = 34, Y1 = 250, Hr = 370, R = Hr + 12;
    const onCut = (pts) => pts.every(p => Math.abs(dot(sub(p, S.O), S.E[1])) < 1e-6);
    const cm = (n, pts) => (dot(n, S.E[1]) < -0.99 && onCut(pts)) ? hr.cut : hr.stone;
    // three walls; the near wall is cut away and its section drawn in poché
    S.box(-X - T, 0, 0, -X, Y1 + T, R, { mat: cm });
    S.box(X, 0, 0, X + T, Y1 + T, R, { mat: cm });
    S.box(-X, Y1, 0, X, Y1 + T, R, { mat: cm });
    // the cut-away near wall still casts its shadow (the drawing convention for a lit section)
    S.box(-X, -T, 0, X, 0, R, { mat: hr.stone, hide: true, noTrim: true });
    // roof slab between the walls, pierced in the room's own pattern
    const holes = o.holes || [];
    const xs = [-X, X], ys = [0, Y1];
    for (const [a, bb, c, d] of holes) xs.push(a, bb), ys.push(c, d);
    const ux = [...new Set(xs)].sort((a, c) => a - c), uy = [...new Set(ys)].sort((a, c) => a - c);
    for (let i = 0; i < ux.length - 1; i++) for (let j = 0; j < uy.length - 1; j++) {
      const cx = (ux[i] + ux[i + 1]) / 2, cy = (uy[j] + uy[j + 1]) / 2;
      if (holes.some(([a, bb, c, d]) => cx > a && cx < bb && cy > c && cy < d)) continue;
      S.box(ux[i], uy[j], Hr, ux[i + 1], uy[j + 1], R, { mat: cm });
    }
    // marble coping on the three standing walls
    S.box(-X - T - 3, 0, R, -X + 3, Y1 + T + 3, R + 6, { mat: (n, pts) => (dot(n, S.E[1]) < -0.99 && onCut(pts)) ? hr.cut : hr.marble });
    S.box(X - 3, 0, R, X + T + 3, Y1 + T + 3, R + 6, { mat: (n, pts) => (dot(n, S.E[1]) < -0.99 && onCut(pts)) ? hr.cut : hr.marble });
    S.box(-X + 3, Y1 - 3, R, X - 3, Y1 + T + 3, R + 6, { mat: hr.marble });
    if (o.inside) o.inside(S, { X, Y1, Hr });
    const al = (o.alt || 50) * D, sx = o.sx == null ? 0 : o.sx;
    const L = nrm(add(add(mul(S.E[0], sx), mul(S.E[1], -Math.cos(al))), [0, 0, Math.sin(al)]));
    S.E = frame(cam, 0); S.O = [0, 0, 0];
    return { S, cam, L };
  }
  SCENES.roomLanguage = (hr) => roomScene(hr, {
    holes: Array.from({ length: 7 }, (_, i) => [-130 + i * 46, -130 + i * 46 + 14, 10, 146]),
  });
  SCENES.roomVision = (hr) => roomScene(hr, {
    holes: (() => { const h = []; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) h.push([-104 + i * 70, -104 + i * 70 + 30, 6 + j * 36, 6 + j * 36 + 30]); return h; })(),
  });
  SCENES.roomSound = (hr) => roomScene(hr, {
    holes: (() => { const amp = [30, 80, 140, 100, 180, 70, 130, 60, 110, 40]; return amp.map((a, i) => [-138 + i * 32, -138 + i * 32 + 13, 76 - a / 2.6, 76 + a / 2.6]); })(),
  });
  SCENES.roomReason = (hr) => roomScene(hr, {
    holes: [[40, 150, 20, 100]],
    inside: (S, r) => {
      const n = 11, run = 30, rise = 26;
      for (let i = 0; i < n; i++) S.box(-190 + i * run, 130, 0, -190 + (i + 1) * run, 250, (i + 1) * rise, { mat: hr.stone });
    },
  });

  // ---------- books ----------
  const BOOKS = [
    { slug: 'mathematical-foundations-for-ml', title: ['Mathematical', 'Foundations for', 'Machine Learning'], level: 'beginner', capsules: 43, hours: 10, scene: 'samrat', fig: 'After the Samrat Yantra, Jaipur, 1734' },
    { slug: 'neural-networks-from-scratch', title: ['Neural Networks', 'from Scratch'], level: 'beginner', capsules: 33, hours: 7, scene: 'baori', fig: 'After Chand Baori' },
    { slug: 'ai-context-engineering', title: ['AI Context', 'Engineering'], level: 'intermediate', capsules: 43, hours: 10, scene: 'aperture', fig: 'A wall with one window' },
    { slug: 'build-llms-from-scratch', title: ['Build Large Language', 'Models (LLMs)', 'from Scratch'], level: 'intermediate', capsules: 20, hours: 6, scene: 'stair', fig: 'Each step rests on all before it' },
    { slug: '5d-parallelism', title: ['5D Parallelism for', 'Large Model Training'], level: 'advanced', capsules: 40, hours: 9, scene: 'field', fig: 'One instrument, split five ways' },
    { slug: 'pi-vs-hermes-vs-codex', title: ['Pi vs Hermes vs Codex:', 'Context Compaction', 'and Memory'], level: 'advanced', capsules: 9, hours: 1, scene: 'folds', fig: 'Three ways to fold one climb' },
    { slug: 'transformers-from-scratch', title: ['Transformers:', 'Theory, Intuition, and', 'Building from Scratch'], level: 'intermediate', capsules: 20, hours: 5, scene: 'jaiprakash', fig: 'After the Jai Prakash Yantra, Jaipur' },
    { slug: 'decision-trees-from-scratch', title: ['Build Decision Trees', 'from Scratch'], level: 'beginner', capsules: 23, hours: 5, scene: 'partition', fig: 'A court split by ever-lower walls' },
    { slug: 'charlie-language-room', series: 'Charlie and the Intelligence Factory', no: 'I', title: ['Charlie and the', 'Language Room'], sub: 'Language — Inference Engineering', level: 'advanced', capsules: 22, hours: 5, scene: 'roomLanguage', fig: 'Room I · light in a sequence' },
    { slug: 'charlie-vision-room', series: 'Charlie and the Intelligence Factory', no: 'II', title: ['Charlie and the', 'Vision Room'], sub: 'Vision — Vision Transformers', level: 'intermediate', capsules: 20, hours: 6, scene: 'roomVision', fig: 'Room II · light in patches' },
    { slug: 'charlie-sound-room', series: 'Charlie and the Intelligence Factory', no: 'III', title: ['Charlie and the', 'Sound Room'], sub: 'Audio — Voice Agents', level: 'intermediate', capsules: 20, hours: 6, scene: 'roomSound', fig: 'Room III · light as a waveform' },
    { slug: 'charlie-reasoning-room', series: 'Charlie and the Intelligence Factory', no: 'IV', title: ['Charlie and the', 'Reasoning Room'], sub: 'Reason — Reinforcement Learning,<br>from bandits to reasoning models', level: 'advanced', capsules: 21, hours: 6, scene: 'roomReason', fig: 'Room IV · a climb toward the light' },
    { slug: 'kernel-engineering', title: ['Kernel', 'Engineering'], sub: 'From silicon to speculative decoding —<br>GPU kernels for modern LLMs', level: 'advanced', soon: true, scene: 'jali', fig: 'A jali, five rows laid' },
  ];

  // ---------- marks ----------
  function mark(col) { // Vizuara stepwell mark: an inverted stepped V
    const r = [[0, 26], [4.5, 18], [9, 10], [13.5, 2]];
    return `<svg class="mk" width="26" height="18" viewBox="0 0 26 18"><path fill="${col}" d="${r.map(([y, w]) => `M${(26 - w) / 2} ${y}h${w}v4.5h-${w}z`).join('')}"/></svg>`;
  }
  function levelGlyph(n, col, dim) { // the mark's stepped-well profile; one, two or three terraces lit
    const rows = [[0, 30], [7, 20], [14, 10]];
    return `<svg class="lv" width="30" height="19" viewBox="0 0 30 19">${rows.map(([y, w], i) => `<rect x="${(30 - w) / 2}" y="${y}" width="${w}" height="4.6" fill="${i < n ? col : (dim || '#8C4A3E')}"/>`).join('')}</svg>`;
  }

  function build(b) {
    const hr = HOURS[b.level];
    const t0 = performance.now();
    const sc = SCENES[b.scene](hr);
    const L = sc.L || sunRel(sc.cam, hr.light[0], hr.light[1]);
    const art = render(sc.S, sc.cam, L, { cutLine: CUTLINE, cutFill: hr.cut.flat });
    const extra = sc.extra ? sc.extra(sc.cam) : '';
    const el = document.createElement('div');
    el.className = 'cover lv-' + b.level; el.dataset.slug = b.slug;
    el.style.setProperty('--sky', hr.sky); el.style.setProperty('--ink', hr.ink); el.style.setProperty('--sub', hr.sub);
    const stats = b.soon ? 'Coming soon' : `${b.capsules} capsules · ${b.hours} ${b.hours === 1 ? 'hour' : 'hours'}`;
    el.innerHTML = `<svg class="art" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="${hr.sky}"/>${art}${extra}<rect x="0" y="806" width="${W}" height="${H - 806}" fill="${hr.cut.flat}"/><rect width="${W}" height="${H}" fill="url(#grainP)" opacity="${hr.grain || 0.22}"/></svg>
      <div class="head">
        ${b.series ? `<div class="series"><span class="no">${b.no}</span>${b.series}</div>` : ''}
        <h2 class="title" style="font-size:${b.size || (b.title.length >= 3 || b.series ? 68 : 80)}px">${b.title.join('<br>')}</h2>
        ${b.sub ? `<p class="sub">${b.sub}</p>` : ''}
      </div>
      <div class="band">
        <div class="row r1"><span class="imp">${mark('#F4EADC')}<b>Vizuara</b> Books</span><span class="lvl">${levelGlyph(hr.n, '#F4EADC')}${hr.label}</span></div>
        <div class="row r2"><span>${stats}</span><span class="fig">${b.fig}</span></div>
      </div>`;
    return el;
  }

  // full print wrap: back (720) + spine + front (720); the drawing runs continuously across all three
  function buildWrap(b, spine, back) {
    const hr = HOURS[b.level], WW = 2 * W + spine, off = W + spine;
    const sc = SCENES[b.scene](hr);
    const L = sc.L || sunRel(sc.cam, hr.light[0], hr.light[1]);
    const cam = Object.assign({}, sc.cam, { P: (p) => { const q = sc.cam.P(p); return [q[0] + off, q[1]]; } });
    const art = render(sc.S, cam, L, { cutLine: CUTLINE, cutFill: hr.cut.flat });
    const extra = sc.extra ? sc.extra(cam) : '';
    const el = document.createElement('div');
    el.className = 'wrap lv-' + b.level; el.dataset.slug = b.slug + '-wrap';
    el.style.setProperty('--sky', hr.sky); el.style.setProperty('--ink', hr.ink); el.style.width = WW + 'px';
    const stats = `${b.capsules} capsules · ${b.hours} hours`;
    el.innerHTML = `<svg class="art" width="${WW}" height="${H}" viewBox="0 0 ${WW} ${H}"><rect width="${WW}" height="${H}" fill="${hr.sky}"/>${art}${extra}<rect x="0" y="806" width="${WW}" height="${H - 806}" fill="${hr.cut.flat}"/><rect width="${WW}" height="${H}" fill="url(#grainP)" opacity="${hr.grain || 0.22}"/>
      <line x1="${W}" y1="0" x2="${W}" y2="${H}" stroke="${hr.ink}" stroke-opacity=".18" stroke-dasharray="3 5"/><line x1="${off}" y1="0" x2="${off}" y2="${H}" stroke="${hr.ink}" stroke-opacity=".18" stroke-dasharray="3 5"/></svg>
      <div class="back">
        <div class="kicker">${mark(hr.ink)}<span><b>Vizuara</b> Books · ${hr.label}</span></div>
        ${back}
      </div>
      <div class="spine" style="left:${W}px;width:${spine}px"><span class="sp-lv">${levelGlyph(hr.n, hr.ink, mix(hr.sky, hr.ink, 0.28))}</span><span class="sp-t">${b.title.join(' ')}</span><span class="sp-mk">${mark('#F4EADC')}</span></div>
      <div class="front" style="left:${off}px">
        <div class="head"><h2 class="title" style="font-size:${b.size || (b.title.length >= 3 ? 68 : 80)}px">${b.title.join('<br>')}</h2></div>
        <div class="band">
          <div class="row r1"><span class="imp">${mark('#F4EADC')}<b>Vizuara</b> Books</span><span class="lvl">${levelGlyph(hr.n, '#F4EADC')}${hr.label}</span></div>
          <div class="row r2"><span>${stats}</span><span class="fig">${b.fig}</span></div>
        </div>
      </div>
      <div class="bband"><div class="row r1"><span class="imp">books.vizuara.ai</span></div><div class="row r2"><span>${stats}</span></div><div class="isbn">ISBN / barcode</div></div>`;
    return el;
  }

  window.JANTAR = { BOOKS, build, buildWrap, HOURS };
})();
