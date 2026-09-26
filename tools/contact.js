#!/usr/bin/env node
// Contact sheet: lay out every cover JPG in a renders folder at a fixed width (default 180px,
// roughly a library-grid thumbnail) and screenshot it at 1x, so you can judge covers the way
// they'll actually be seen small.
//
//   node tools/contact.js covers/<dir>/renders [--width 180] [--bg "#e8e8e4"] [--out file.png]
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (!args[0]) { console.error('usage: node tools/contact.js <renders-dir> [--width 180] [--bg #e8e8e4] [--out file.png]'); process.exit(1); }
const dir = path.resolve(args[0]);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const width = parseInt(opt('--width', '180'), 10);
const bg = opt('--bg', '#e8e8e4');
const out = path.resolve(opt('--out', path.join(dir, `_contact-${width}.png`)));
const imgs = fs.readdirSync(dir).filter((f) => f.endsWith('.jpg') && !f.startsWith('_')).sort();
if (!imgs.length) { console.error('no .jpg renders in ' + dir); process.exit(2); }

const html = `<!doctype html><meta charset="utf-8"><style>
  body{margin:0;padding:24px;background:${bg};font:11px/1.3 system-ui,sans-serif;color:#333}
  .g{display:grid;grid-template-columns:repeat(auto-fill,${width}px);gap:20px 16px}
  img{width:${width}px;height:auto;display:block;box-shadow:0 1px 3px rgba(0,0,0,.25)}
  p{margin:6px 0 0;width:${width}px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
</style><div class="g">${imgs.map((f) => `<figure style="margin:0"><img src="file://${path.join(dir, f)}"><p>${f.replace('.jpg', '')}</p></figure>`).join('')}</div>`;

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const cols = Math.min(imgs.length, Math.max(1, Math.floor(1400 / (width + 16))));
  const page = await browser.newPage({ viewport: { width: 48 + cols * (width + 16), height: 800 }, deviceScaleFactor: 1 });
  const tmp = path.join(dir, '._contact.html');
  fs.writeFileSync(tmp, html);
  await page.goto('file://' + tmp, { waitUntil: 'load' });
  await page.screenshot({ path: out, fullPage: true });
  fs.unlinkSync(tmp);
  await browser.close();
  console.log(`contact sheet (${imgs.length} covers @ ${width}px) -> ${out}`);
})().catch((e) => { console.error(e); process.exit(1); });
