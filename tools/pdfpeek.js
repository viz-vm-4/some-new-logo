#!/usr/bin/env node
// Rasterise page 1 of one or more PDFs to PNG with pdf.js, to check what a printer would get,
// and compare it with the cover's JPG render (renders/<slug>.jpg next to renders/pdf/<slug>.pdf).
//   node tools/pdfpeek.js <file.pdf> [more.pdf ...] [--out-dir dir] [--scale 1]
// Previews go to tools/.peek/<direction>/ unless --out-dir is given.
// Prints the mean per-channel difference (0-255) against the JPG; above ~6 means the PDF
// doesn't match what the screen render shows.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args.splice(i, 2)[1] : d; };
const outDir = opt('--out-dir', null);
const scale = parseFloat(opt('--scale', '1'));
const files = args.filter((a) => a.endsWith('.pdf'));
if (!files.length) { console.error('usage: node tools/pdfpeek.js <file.pdf> ... [--out-dir dir] [--scale 1]'); process.exit(1); }

const PDFJS = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/';
const cacheDir = path.join(__dirname, '.netcache');
fs.mkdirSync(cacheDir, { recursive: true });
function lib(name) {
  const p = path.join(cacheDir, 'pdfjs-' + name);
  if (!fs.existsSync(p)) execFileSync('curl', ['-sS', '-L', '-o', p, PDFJS + name]);
  return fs.readFileSync(p, 'utf8');
}

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const page = await browser.newPage();
  await page.setContent('<canvas id="c"></canvas>');
  await page.addScriptTag({ content: lib('pdf.min.js') });
  const worker = lib('pdf.worker.min.js');
  for (const f of files) {
    const data = fs.readFileSync(f).toString('base64');
    const jpgPath = path.join(path.dirname(f), '..', path.basename(f, '.pdf') + '.jpg');
    const jpg = fs.existsSync(jpgPath) ? fs.readFileSync(jpgPath).toString('base64') : null;
    const info = await page.evaluate(async ({ data, worker, scale, jpg }) => {
      pdfjsLib.GlobalWorkerOptions.workerSrc = URL.createObjectURL(new Blob([worker], { type: 'text/javascript' }));
      const bytes = Uint8Array.from(atob(data), (c) => c.charCodeAt(0));
      const doc = await pdfjsLib.getDocument({ data: bytes }).promise;
      const pg = await doc.getPage(1);
      const vp = pg.getViewport({ scale: scale * 96 / 72 });
      const c = document.getElementById('c');
      c.width = Math.round(vp.width); c.height = Math.round(vp.height);
      await pg.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise;
      let diff = null;
      if (jpg) {
        const img = new Image(); img.src = 'data:image/jpeg;base64,' + jpg; await img.decode();
        const W = 360, H = 444, a = document.createElement('canvas'), b = document.createElement('canvas');
        a.width = b.width = W; a.height = b.height = H;
        a.getContext('2d').drawImage(c, 0, 0, W, H); b.getContext('2d').drawImage(img, 0, 0, W, H);
        const da = a.getContext('2d').getImageData(0, 0, W, H).data, db = b.getContext('2d').getImageData(0, 0, W, H).data;
        let sum = 0; for (let i = 0; i < da.length; i += 4) sum += Math.abs(da[i] - db[i]) + Math.abs(da[i + 1] - db[i + 1]) + Math.abs(da[i + 2] - db[i + 2]);
        diff = sum / (W * H * 3);
      }
      return { pages: doc.numPages, w: pg.view[2], h: pg.view[3], diff };
    }, { data, worker, scale, jpg });
    // default: tools/.peek/<direction>/ (git-ignored), so previews never land in a renders folder
    const dest = outDir || path.join(__dirname, '.peek', path.basename(path.resolve(path.dirname(f), '..', '..')));
    fs.mkdirSync(dest, { recursive: true });
    const out = path.join(dest, path.basename(f, '.pdf') + '.pdfpeek.png');
    await (await page.$('#c')).screenshot({ path: out });
    const sizeOk = Math.abs(info.w - 540) < 0.5 && Math.abs(info.h - 666) < 0.5;
    const diffOk = info.diff === null || info.diff < 6;
    const d = info.diff === null ? 'no jpg' : `diff ${info.diff.toFixed(1)}`;
    console.log(`${sizeOk && diffOk && info.pages === 1 ? 'ok ' : '!! '} ${path.basename(f)}  ${info.pages} page(s)  ${(info.w / 72).toFixed(3)} x ${(info.h / 72).toFixed(3)} in  ${d}  -> ${out}`);
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
