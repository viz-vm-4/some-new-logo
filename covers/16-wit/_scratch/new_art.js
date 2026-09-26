// ---- shared: positively-oriented polygon path, so several shapes can live in ONE path without seams
const orient = (pts) => { let a=0; for(let i=0;i<pts.length;i++){const p=pts[i],q=pts[(i+1)%pts.length]; a+=p[0]*q[1]-q[0]*p[1];} return a<0 ? pts.slice().reverse() : pts; };
const pp = (pts) => 'M'+orient(pts).map(p=>f(p[0])+' '+f(p[1])).join(' L')+' Z ';
const rp = (x,y,w,h) => pp([[x,y],[x+w,y],[x+w,y+h],[x,y+h]]);
const quadPts = (a,c,b,n=10) => Array.from({length:n+1},(_,i)=>{const t=i/n,u=1-t;return [u*u*a[0]+2*u*t*c[0]+t*t*b[0], u*u*a[1]+2*u*t*c[1]+t*t*b[1]];});

ART['mathematical-foundations-for-ml'] = () => {
  const out = [];
  const tri = [[88,292],[360,150],[632,292]];
  const inn = insetTri(tri,[7,36,20]);
  out.push(`<path d="${poly(tri)} ${poly(inn)}" fill="${C.red}" fill-rule="evenodd"/>`);
  // four Didone Π's. Each Π (lintel, beak serifs, stems, brackets, feet) is part of ONE path, overlapping by 1px: no seams.
  const W=120, gap=12, x0 = 360 - (4*W+3*gap)/2, y0 = 304, H = 216;
  let d = '';
  for(let i=0;i<4;i++){
    const x = x0 + i*(W+gap), yb = y0+H-8;
    d += rp(x, y0, W, 16) + rp(x, y0+15, 5, 15) + rp(x+W-5, y0+15, 5, 15);
    d += rp(x+17, y0+15, 27, H-22) + rp(x+W-44, y0+15, 27, H-22);
    d += rp(x+6, yb, 49, 8) + rp(x+W-55, yb, 49, 8);
    [[x+17,-1],[x+44,1],[x+W-44,-1],[x+W-17,1]].forEach(([sx,dir])=>{
      const q = quadPts([sx+dir*-1, yb-12],[sx+dir*-1, yb],[sx+dir*12, yb]);
      d += pp([...q, [sx+dir*12, yb+1], [sx-dir*1, yb+1]]);
    });
  }
  out.push(`<path d="${d}" fill="${C.ink}" fill-rule="nonzero"/>`);
  // three steps, one path
  const steps = [['CALCULUS',548],['PROBABILITY & STATISTICS',602],['LINEAR ALGEBRA',656]];
  out.push(`<path d="${steps.map(([t,w],i)=>rp(360-w/2, 528+i*21, w, i<2?22:21)).join('')}" fill="${C.ink}"/>`);
  steps.forEach(([t,w],i)=>{
    const y = 528 + i*21;
    out.push(`<text x="360" y="${y+15}" text-anchor="middle" font-family="Albert Sans" font-weight="700" font-size="11" letter-spacing="2.4" fill="${C.paper}">${t.replace('&','&amp;')}</text>`);
  });
  return out.join('');
};

// Babel, rebuilt honestly: seven identical blocks (a decoder is a stack of identical layers), an eighth on the hook.
ART['build-llms-from-scratch'] = () => {
  const out = [], base = 584, th = 50, jt = 4, W = 264, X = 360 - W/2;
  const glyphs = ['A','अ','λ','ط','言','Я','あ','Ω','क','ж','語','ه','e','ह','β','и'];
  let gi = 0;
  const block = (y, col, lettered) => {
    let s = rect(X, y, W, th, col);
    for(let k=0;k<5;k++){
      const ax = X + 19 + k*48, ay = y+9, aw = 26, ah = 34;
      s += P(`M${ax} ${ay+ah} V${ay+13} A13 13 0 0 1 ${ax+aw} ${ay+13} V${ay+ah} Z`, C.ink);
      if(lettered) s += `<text x="${ax+13}" y="${ay+29}" text-anchor="middle" font-family="Noto Sans, Noto Sans Devanagari, Noto Sans Arabic, Noto Sans JP" font-weight="700" font-size="14" fill="${C.paper}">${glyphs[gi++ % glyphs.length]}</text>`;
    }
    return s;
  };
  for(let i=0;i<7;i++) out.push(block(base - (i+1)*th - i*jt, C.paper, true));
  const topY = base - 7*th - 6*jt; // 210
  // climbing crane beside the tower
  const mx = X + W + 14;
  out.push(S(`M${mx} ${base} V36 M${mx+14} ${base} V36`, C.ink, 3.5));
  let z = ''; for(let y=base; y>40; y-=16) z += `M${mx} ${y} L${mx+14} ${Math.max(y-16,36)} `;
  out.push(S(z, C.ink, 2.4));
  out.push(S(`M214 50 H610 M214 36 H610`, C.ink, 3.5));
  let zj=''; for(let x=214; x<610; x+=16) zj += `M${x} 50 L${Math.min(x+16,610)} 36 `;
  out.push(S(zj, C.ink, 2.4));
  out.push(S(`M${mx+7} 36 L${mx+7} 10 L232 36 M${mx+7} 10 L596 36`, C.ink, 2.4));
  out.push(rect(566, 52, 42, 30, C.ink));
  out.push(rect(350, 50, 20, 10, C.ink));
  out.push(S(`M360 60 V84 M360 84 L${X+14} 112 M360 84 L${X+W-14} 112`, C.ink, 2.4));
  out.push(block(112, C.yellow, false));
  return out.join('');
};

ART['5d-parallelism'] = () => {
  const n=5, R=66, cx=360, cy=300, rot=-Math.PI/2;
  const dirs=[...Array(n)].map((_,k)=>{const a=rot+Math.PI*k/n;return [Math.cos(a),Math.sin(a)];});
  dirs[0] = dirs[0].map(v=>v*1.25); // stretch one axis so no two of the 32 GPUs coincide
  const V=[]; for(let i=0;i<32;i++){let x=0,y=0;for(let k=0;k<n;k++){const s=(i>>k)&1?1:-1;x+=s*dirs[k][0];y+=s*dirs[k][1];}V.push([cx+x*R,cy+y*R]);}
  const out=[];
  const AX = [C.paper, C.yellow, C.red, '#8FA3DA', '#8E877B'];
  const E=[]; for(let i=0;i<32;i++)for(let k=0;k<n;k++){const j=i^(1<<k);if(j>i)E.push([i,j,k]);}
  for(let k=0;k<n;k++) out.push(S(E.filter(e=>e[2]===k).map(([i,j])=>`M${f(V[i][0])} ${f(V[i][1])} L${f(V[j][0])} ${f(V[j][1])}`).join(' '), AX[k], 3.2));
  V.forEach(([x,y])=>{ out.push(rect(f(x-7),f(y-7),14,14, C.ink, `stroke="${C.paper}" stroke-width="2.6"`)); });
  // key: each swatch is drawn at its axis's real angle, so direction carries the mapping (survives greyscale)
  const names = ['data','tensor','pipeline','context','expert'];
  names.forEach((nm,k)=>{ const x = 124 + k*100, y = 570, a = Math.atan2(dirs[k][1], dirs[k][0]), L = 11;
    out.push(S(`M${f(x-Math.cos(a)*L)} ${f(y-Math.sin(a)*L)} L${f(x+Math.cos(a)*L)} ${f(y+Math.sin(a)*L)}`, AX[k], 4));
    out.push(`<text x="${x+18}" y="${y+4.5}" font-family="Albert Sans" font-weight="600" font-size="13" fill="${C.paper}">${nm}</text>`); });
  return out.join('');
};

// One press, every cell at once: a kernel is written once and launched over a whole grid of blocks.
ART['kernel-engineering'] = () => {
  const out = [], S0 = 250, y0 = 164, xl = 82, xr = 388, ins = 20, rib = 8, nC = 5;
  const cell = (S0 - 2*ins - (nC+1)*rib)/nC;
  // hinge and handles (behind the plates)
  [[196],[340]].forEach(([y])=>{ out.push(rect(xl+S0-8, y, xr-xl-S0+16, 26, C.paper)); out.push(circ(360, y+13, 5, C.ink)); });
  out.push(`<rect x="22" y="${y0+S0/2-21}" width="80" height="42" rx="21" fill="${C.red}"/>`);
  out.push(`<rect x="${xr+S0-20}" y="${y0+S0/2-21}" width="80" height="42" rx="21" fill="${C.red}"/>`);
  // casings
  out.push(`<rect x="${xl}" y="${y0}" width="${S0}" height="${S0}" rx="28" fill="${C.paper}"/>`);
  out.push(`<rect x="${xr}" y="${y0}" width="${S0}" height="${S0}" rx="28" fill="${C.paper}"/>`);
  // the lid: the mould — raised pegs (the kernel, written once)
  out.push(`<rect x="${xl+ins}" y="${y0+ins}" width="${S0-2*ins}" height="${S0-2*ins}" rx="10" fill="${C.ink}"/>`);
  // the base: the waffle — the same pattern, pressed into every cell at once
  out.push(`<rect x="${xr+ins}" y="${y0+ins}" width="${S0-2*ins}" height="${S0-2*ins}" rx="12" fill="${C.yellow}"/>`);
  for(let r=0;r<nC;r++) for(let c=0;c<nC;c++){
    const ox = ins + rib + c*(cell+rib), oy = ins + rib + r*(cell+rib);
    out.push(`<rect x="${f(xl+ox)}" y="${f(y0+oy)}" width="${f(cell)}" height="${f(cell)}" rx="3" fill="${C.tint}"/>`);
    const hot = (r===1 && c===3);
    out.push(`<rect x="${f(xr+ox)}" y="${f(y0+oy)}" width="${f(cell)}" height="${f(cell)}" rx="3" fill="${hot?C.red:C.ink}"/>`);
  }
  return out.join('');
};

// A mini model train on the training loop: every car sits on the rail and follows the curve.
ART['pretraining-mini-kimi-k3'] = () => {
  const out = [], cx = 360, cy = 318, RX = 288, RY = 128;
  const ties = [];
  for(let k=0;k<72;k++){ const a = k/72*2*Math.PI; const c=Math.cos(a), s=Math.sin(a);
    ties.push(`M${f(cx+c*244)} ${f(cy+s*96)} L${f(cx+c*296)} ${f(cy+s*134)}`); }
  out.push(S(ties.join(' '), C.tint, 5, 'stroke-linecap="butt"'));
  out.push(`<ellipse cx="${cx}" cy="${cy}" rx="252" ry="102" fill="none" stroke="${C.paper}" stroke-width="5"/>`);
  out.push(`<ellipse cx="${cx}" cy="${cy}" rx="${RX}" ry="${RY}" fill="none" stroke="${C.paper}" stroke-width="5"/>`);
  // arc-length table along the near (outer) rail, left to right
  const tab = []; let acc = 0, prev = null;
  for(let i=0;i<=2000;i++){ const t = Math.PI - Math.PI*i/2000; const p = [cx+RX*Math.cos(t), cy+RY*Math.sin(t) - 2.5];
    if(prev) acc += Math.hypot(p[0]-prev[0], p[1]-prev[1]); tab.push([acc, p]); prev = p; }
  const at = (s) => { let lo=0, hi=tab.length-1; while(hi-lo>1){const m=(lo+hi)>>1; if(tab[m][0]<s) lo=m; else hi=m;} return tab[hi][1]; };
  const mid = tab[1000][0];
  const wheel = (x,y,r=15) => circ(x, y, r, C.paper) + circ(x, y, 5, C.ink);
  const engine = `
    ${P('M-84 -44 L-110 -6 L-84 -6 Z', C.red)}
    ${rect(-80, -96, 118, 58, C.red)}${rect(6, -142, 72, 110, C.red)}
    ${rect(-2, -152, 88, 14, C.paper)}${rect(22, -126, 36, 34, C.ink)}
    ${rect(-62, -140, 26, 50, C.red)}${rect(-68, -148, 38, 12, C.paper)}
    <path d="M-26 -96 a18 18 0 0 1 36 0 z" fill="${C.yellow}"/>
    ${rect(-88, -44, 176, 12, C.ink)}
    ${wheel(-54,-15)}${wheel(-10,-15)}${wheel(46,-20,20)}
    ${circ(-40,-172,16,C.paper)}${circ(-10,-206,22,C.paper)}${circ(34,-240,28,C.paper)}`;
  const car = (col, top) => `${rect(-48,-84,96,52,col)}${top}${rect(-52,-38,104,10,C.ink)}${rect(-62,-54,16,6,C.paper)}${wheel(-26,-15)}${wheel(26,-15)}`;
  const cars = [[176, engine, 66], [96, car(C.yellow, rect(-48,-96,96,12,C.paper)), 26], [96, car(C.blue, [0,1,2].map(i=>rect(-36+i*26,-74,18,20,C.paper)).join('')), 26]];
  const total = cars.reduce((a,c)=>a+c[0],0) + 14*(cars.length-1);
  let s = mid - total/2;
  cars.forEach(([L, g, wb])=>{
    const p1 = at(s + L/2 - wb), p2 = at(s + L/2 + wb);
    const ang = Math.atan2(p2[1]-p1[1], p2[0]-p1[0])*180/Math.PI;
    out.push(`<g transform="translate(${f((p1[0]+p2[0])/2)} ${f((p1[1]+p2[1])/2)}) rotate(${f(ang)})">${g}</g>`);
    s += L + 14;
  });
  return out.join('');
};

// Carrot-and-stick retired (the idiom means a reward that is never reached). The word comes from here:
// Skinner's box. A pigeon pecks the lit key; a grain drops into the hopper. Agent, action, reward.
ART['reinforcement-learning'] = () => {
  const out = [], K = C.ink, Pa = C.paper;
  // the box wall, face-on
  out.push(rect(392, 70, 300, 516, K));
  // lit key (with its glow ring) and the hopper below it
  out.push(circ(470, 214, 38, C.yellow, `stroke="${Pa}" stroke-width="5"`));
  out.push(rect(424, 404, 150, 76, Pa));
  out.push(rect(436, 416, 126, 52, K));
  [[470,452],[488,458],[508,450],[528,456],[498,444]].forEach(([x,y])=> out.push(`<ellipse cx="${x}" cy="${y}" rx="8" ry="5.5" fill="${C.yellow}"/>`));
  out.push(rect(486, 340, 26, 64, Pa)); out.push(rect(492, 346, 14, 58, K));
  out.push(`<ellipse cx="499" cy="384" rx="8" ry="5.5" fill="${C.yellow}"/>`);
  // the pigeon: tail low-left, body and neck carrying the diagonal up to the key
  out.push(P('M84 520 L40 566 L62 582 L150 520 Z', K));
  out.push(P('M92 500 C120 420 236 344 330 300 C366 284 398 262 410 238 L446 254 C432 300 404 336 372 368 C320 420 240 486 170 516 C140 528 104 526 92 500 Z', Pa));
  out.push(P('M330 300 C352 290 386 266 404 236 L426 246 C412 290 386 322 356 348 C346 330 338 314 330 300 Z', C.blue));
  out.push(P('M150 474 C200 420 270 380 340 356 C310 400 250 452 180 494 Z', C.tint));
  out.push(S('M196 452 C230 424 262 404 294 390 M222 470 C256 442 288 422 318 408', K, 7, 'stroke-linecap="butt"'));
  out.push(circ(432, 228, 26, Pa));
  out.push(P('M452 214 L470 210 L456 228 Z', K));
  out.push(circ(436, 222, 7, C.red)); out.push(circ(436, 222, 3.4, K));
  out.push(S('M230 508 L220 576 M220 576 l-18 8 M220 576 l14 6 M262 494 L262 576 M262 576 l-16 8 M262 576 l16 6', K, 5));
  return out.join('');
};

// I. Language: tokens leave the machine one at a time; the next one is still coming out of the slot.
ART['charlie-language-room'] = () => {
  const out = [belt(C.paper, C.ink), ticket('I', C.yellow, C.ink)];
  // the emerging token is drawn first, so the machine covers its back half
  out.push(`<rect x="424" y="${500-66}" width="60" height="66" rx="6" fill="${C.yellow}"/>`);
  out.push(rect(452, 250, 224, 250, C.red));
  out.push(rect(440, 236, 248, 22, C.red));
  out.push(rect(452, 420, 20, 80, C.ink));
  out.push(circ(580, 340, 58, C.paper));
  const tk=[]; for(let k=0;k<=10;k++){ const a = Math.PI*(0.8 + 1.4*k/10); tk.push(`M${f(580+Math.cos(a)*44)} ${f(340+Math.sin(a)*44)} L${f(580+Math.cos(a)*52)} ${f(340+Math.sin(a)*52)}`); }
  out.push(S(tk.join(' '), C.ink, 3.4));
  const na = Math.PI*(0.8+1.4*0.92);
  out.push(S(`M580 340 L${f(580+Math.cos(na)*46)} ${f(340+Math.sin(na)*46)}`, C.red, 5));
  out.push(circ(580,340,7,C.ink));
  out.push(`<text x="580" y="378" text-anchor="middle" font-family="Albert Sans" font-weight="700" font-size="11" letter-spacing="1" fill="${C.ink}">TOK/S</text>`);
  out.push(rect(622, 176, 30, 62, C.red));
  out.push(circ(612, 150, 16, C.paper) + circ(584, 118, 22, C.paper));
  // tokens: a leading space is drawn as a small ⎵ bracket (not a font glyph)
  const toks = [['Char',92,false],['lie',58,false],['and',90,true],['the',84,true]];
  let x = 424 - 14 - toks.reduce((a,t)=>a+t[1],0) - 14*(toks.length-1);
  toks.forEach(([t,w,sp])=>{
    out.push(`<rect x="${x}" y="${500-66}" width="${w}" height="66" rx="6" fill="${C.yellow}"/>`);
    const tw = {Char:58, lie:34, and:48, the:42}[t], gw = tw + (sp?17:0), gx = x + (w-gw)/2;
    if(sp) out.push(S(`M${f(gx+1.5)} ${500-40} V${500-33.5} H${f(gx+12.5)} V${500-40}`, C.ink, 3, 'stroke-linecap="butt" stroke-linejoin="miter"'));
    out.push(`<text x="${f(gx+(sp?17:0))}" y="${500-24}" font-family="Albert Sans" font-weight="700" font-size="26" letter-spacing="-0.5" fill="${C.ink}">${t}</text>`);
    x += w + 14;
  });
  return out.join('');
};

// III. Sound: a horn speaks a waveform down the line (mirrored bars, so it reads as sound, not a chart).
ART['charlie-sound-room'] = () => {
  const out = [belt(C.ink, C.red), ticket('III', C.yellow, C.ink)];
  const cyW = 330;
  out.push(rect(46, 440, 104, 60, C.ink));
  out.push(P(`M104 452 L104 486 C170 486 236 474 300 ${cyW+128} L300 ${cyW-128} C250 ${cyW-60} 190 440 104 452 Z`, C.yellow));
  out.push(`<ellipse cx="300" cy="${cyW}" rx="32" ry="132" fill="${C.yellow}"/>`);
  out.push(`<ellipse cx="306" cy="${cyW}" rx="21" ry="112" fill="${C.ink}"/>`);
  const H = [14,30,62,110,86,150,120,58,24,40,138,190,150,96,120,70,34,18];
  H.forEach((h,i)=>{ out.push(`<rect x="${352 + i*19}" y="${cyW-h/2}" width="12" height="${h}" rx="6" fill="${C.paper}"/>`); });
  return out.join('');
};

// Pressed: the stem is too tall for the page, so it is folded back in one crease under the top edge;
// petals splayed flat and overlapping. The mirrored tint on the facing page is the memory.
ART['pi-vs-hermes-vs-codex'] = () => {
  const out = [];
  out.push(P('M360 150 C300 124 170 118 84 128 L84 560 C170 550 300 552 360 578 Z', C.paper));
  out.push(P('M360 150 C420 124 550 118 636 128 L636 560 C550 550 420 552 360 578 Z', C.paper));
  out.push(S('M360 150 V578', C.tint, 3));
  out.push(S('M84 566 C170 556 300 558 360 584 C420 558 550 556 636 566', C.paper, 2.4));
  out.push(S('M84 572 C170 562 300 564 360 590 C420 564 550 562 636 572', C.paper, 2.4));
  const flower = (stem, petal, centre, leaf, sep) => {
    const g=[];
    g.push(S('M444 540 C448 420 470 260 496 150 L566 296', stem, 5, 'stroke-linejoin="miter"'));
    g.push(P('M456 446 C420 438 398 410 392 378 C426 386 450 408 456 446 Z', leaf));
    g.push(P('M466 360 C500 344 528 348 548 366 C520 378 492 376 466 360 Z', leaf));
    for(let k=0;k<6;k++){ const a = k*60 + 14;
      g.push(`<ellipse cx="0" cy="-40" rx="30" ry="44" transform="translate(572 308) rotate(${a})" fill="${petal}" ${sep?`stroke="${sep}" stroke-width="3"`:''}/>`); }
    g.push(circ(572,308,18,centre));
    return g.join('');
  };
  out.push(`<g transform="translate(720 0) scale(-1 1)">${flower(C.tint, C.tint, C.tint, C.tint, null)}</g>`);
  out.push(flower(C.ink, C.red, C.yellow, C.ink, C.paper));
  return out.join('');
};

// What's in the python? The skin itself swells around a table; its corners push into the outline.
ART['python-for-data-science'] = () => {
  const out = [], ink = C.ink;
  const segs = [
    [[70,514],[150,516],[226,478],[234,420]],
    [[234,420],[240,372],[246,344],[270,344]],
    [[270,344],[336.7,344],[403.3,344],[470,344]],
    [[470,344],[520,344],[530,392],[556,424]],
    [[556,424],[586,460],[640,446],[646,386]],
    [[646,386],[650,340],[626,300],[604,272]]];
  const bez = (s,t) => { const u=1-t; return [0,1].map(i=>u*u*u*s[0][i]+3*u*u*t*s[1][i]+3*u*t*t*s[2][i]+t*t*t*s[3][i]); };
  const pts = []; segs.forEach((sg,si)=>{ for(let i=(si?1:0);i<=60;i++) pts.push({p:bez(sg,i/60), straight: si===2}); });
  let acc = 0; pts.forEach((q,i)=>{ if(i) acc += Math.hypot(q.p[0]-pts[i-1].p[0], q.p[1]-pts[i-1].p[1]); q.s = acc; });
  const sm = (a,b,x) => { const t=Math.min(1,Math.max(0,(x-a)/(b-a))); return t*t*(3-2*t); };
  const gs = (x,c,w) => Math.exp(-((x-c)/w)**2);
  const W = (q) => { let w = 3 + 41*sm(0,120,q.s);
    if(q.straight){ const x=q.p[0]; w += 84*sm(270,308,x)*(1-sm(432,470,x)) + 14*(gs(x,312,8)+gs(x,428,8)); }
    return w; };
  const L=[], R=[];
  pts.forEach((q,i)=>{ const a = pts[Math.max(0,i-1)].p, b = pts[Math.min(pts.length-1,i+1)].p;
    let tx=b[0]-a[0], ty=b[1]-a[1]; const l=Math.hypot(tx,ty); tx/=l; ty/=l; const w=W(q)/2;
    L.push([q.p[0]-ty*w, q.p[1]+tx*w]); R.push([q.p[0]+ty*w, q.p[1]-tx*w]); });
  out.push(`<path d="M${L.map(p=>f(p[0])+' '+f(p[1])).join(' L')} L${R.reverse().map(p=>f(p[0])+' '+f(p[1])).join(' L')} Z" fill="${ink}"/>`);
  // the table, seen through the skin (no frame: the skin is the frame)
  const gx0=302, gx1=438, gy0=292, gy1=396, hy=313;
  out.push(rect(gx0, gy0, gx1-gx0, hy-gy0, C.paper));
  const cols = [1,2,3].map(k=>gx0+(gx1-gx0)*k/4);
  cols.forEach(x=>{ out.push(S(`M${x} ${gy0} V${hy}`, ink, 3, 'stroke-linecap="butt"')); out.push(S(`M${x} ${hy} V${gy1}`, C.paper, 3, 'stroke-linecap="butt"')); });
  [1,2,3].forEach(r=>{ const y = hy + (gy1-hy)*r/4; out.push(S(`M${gx0} ${f(y)} H${gx1}`, C.paper, 3, 'stroke-linecap="butt"')); });
  out.push(`<g transform="translate(604 262) rotate(-58)">
     <path d="M-30 -24 C-4 -34 40 -30 62 -12 C72 -4 72 6 62 12 C40 28 -4 32 -30 22 Z" fill="${ink}"/>
     ${circ(22,-11,7.5,C.paper)}${circ(24,-11,3.6,ink)}
     ${S('M68 0 L104 0 L118 -10 M104 0 L118 10', C.red, 4.5)}
   </g>`);
  return out.join('');
};

// Serving, batched. The black sleeve vanishes into the black ground: a short white glove, a cuff, and a thumb over the tray's edge.
ART['inference-engineering'] = () => {
  const out = [], ty = 356, hx = 372, hy = ty + 14;
  out.push(`<g transform="translate(${hx} ${hy})">
    <path d="M-104 12 C-106 3 -100 0 -90 0 L50 0 C66 0 76 12 74 30 L72 82 L16 82 L16 58 C16 46 10 38 -2 36 L-86 30 C-98 28 -104 20 -104 12 Z" fill="${C.paper}"/>
    <path d="M-104 10 H-80 M-103 20 H-82" stroke="${C.ink}" stroke-width="3" stroke-linecap="round"/>
    <path d="M-58 31 l7 -8 M-34 34 l7 -8" stroke="${C.ink}" stroke-width="3" stroke-linecap="round"/>
    <rect x="8" y="80" width="74" height="30" fill="${C.paper}"/>
    ${circ(45,95,5.5,C.ink)}
  </g>`);
  out.push(`<rect x="96" y="${ty}" width="540" height="14" rx="7" fill="${C.yellow}"/>`);
  const cl = [[150,46,C.paper],[248,34,C.red],[348,60,C.paper],[462,40,C.paper],[554,52,C.red]];
  cl.forEach(([x,r,col])=>{
    out.push(`<path d="M${x-r} ${ty} A${r} ${r*1.02} 0 0 1 ${x+r} ${ty} Z" fill="${col}"/>`);
    out.push(rect(x-r-6, ty-6, 2*r+12, 7, col));
    out.push(circ(x, ty - r*1.02 - 5, Math.max(6, r*0.14), col));
  });
  // thumb, in front of the tray's front edge
  out.push(`<g transform="translate(${hx} ${hy})"><path d="M-50 4 C-54 -10 -50 -28 -38 -32 C-26 -34 -22 -22 -24 -8 L-22 6 Z" fill="${C.paper}" stroke="${C.ink}" stroke-width="3" stroke-linejoin="round"/></g>`);
  return out.join('');
};
