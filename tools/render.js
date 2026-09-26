#!/usr/bin/env node
// Render every `.cover[data-slug]` element in an HTML file to PNG (2x), JPG (1x) and,
// optionally, a vector PDF at exact trim size (7.5in x 9.25in = 720 x 888 CSS px).
//
//   node tools/render.js <file.html> [--out <dir>] [--pdf] [--pdf-only] [--only slug1,slug2] [--sheet]
//
// The sandbox browser can't verify the egress proxy's TLS certificate, so every
// http(s) request the page makes (Google Fonts, jsDelivr, cdnjs) is fetched with curl
// (which trusts the proxy CA) and handed back to the browser. Responses are cached.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const args = process.argv.slice(2);
if (!args[0]) { console.error('usage: node tools/render.js <file.html> [--out dir] [--pdf] [--only a,b] [--sheet]'); process.exit(1); }
const file = path.resolve(args[0]);
const opt = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : null; };
const outDir = path.resolve(opt('--out') || path.join(path.dirname(file), 'renders'));
const pdfOnly = args.includes('--pdf-only');
const wantPdf = pdfOnly || args.includes('--pdf');
const wantSheet = args.includes('--sheet');
const only = opt('--only') ? opt('--only').split(',') : null;
const CACHE = path.join(__dirname, '.netcache');
fs.mkdirSync(CACHE, { recursive: true });
fs.mkdirSync(outDir, { recursive: true });

function curlFetch(url, ua) {
  const key = crypto.createHash('sha1').update(url + '|' + ua).digest('hex');
  const body = path.join(CACHE, key + '.body'), hdr = path.join(CACHE, key + '.hdr');
  if (!fs.existsSync(body)) {
    // several renders may run at once: download to temp names, then rename into place
    const tmp = `${body}.${process.pid}.${Date.now()}`;
    execFileSync('curl', ['-sS', '-L', '--max-time', '60', '-A', ua, '-D', tmp + '.hdr', '-o', tmp, url]);
    fs.renameSync(tmp + '.hdr', hdr);
    fs.renameSync(tmp, body);
  }
  const headers = fs.readFileSync(hdr, 'utf8');
  const blocks = headers.trim().split(/\r?\n\r?\n/);
  const last = blocks[blocks.length - 1];
  const status = parseInt((last.match(/^HTTP\/[\d.]+ (\d+)/) || [0, 200])[1], 10);
  const ct = (last.match(/^content-type:\s*(.+)$/im) || [0, 'application/octet-stream'])[1].trim();
  return { status, contentType: ct, body: fs.readFileSync(body) };
}

// A cover laid out at a fractional y (e.g. under a caption with a non-integer line-height)
// screenshots as 720x889 with a sliver of page background. Nudge it onto whole pixels first.
async function snapped(el, shoot) {
  const b = await el.boundingBox();
  const dx = Math.round(b.x) - b.x, dy = Math.round(b.y) - b.y;
  const nudge = Math.abs(dx) > 0.001 || Math.abs(dy) > 0.001;
  if (nudge) await el.evaluate((e, d) => { e.dataset.prevTranslate = e.style.translate; e.style.translate = `${d[0]}px ${d[1]}px`; }, [dx, dy]);
  try { await shoot(); } finally {
    if (nudge) await el.evaluate((e) => { e.style.translate = e.dataset.prevTranslate || ''; delete e.dataset.prevTranslate; });
  }
}

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const ctx = await browser.newContext({ viewport: { width: 1600, height: 1200 }, deviceScaleFactor: 2 });
  await ctx.route(/^https?:\/\//, async (route) => {
    const req = route.request();
    try {
      const r = curlFetch(req.url(), req.headers()['user-agent'] || 'Mozilla/5.0 Chrome/140');
      await route.fulfill({ status: r.status, contentType: r.contentType, body: r.body,
        headers: { 'access-control-allow-origin': '*' } });
    } catch (e) { console.warn('fetch failed:', req.url(), e.message); await route.abort(); }
  });
  const page = await ctx.newPage();
  page.on('console', (m) => { if (m.type() === 'error') console.warn('[page error]', m.text()); });
  page.on('pageerror', (e) => console.warn('[page exception]', e.message));
  await page.goto('file://' + file, { waitUntil: 'networkidle', timeout: 120000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(800);

  const slugs = await page.$$eval('.cover[data-slug]', (els) => els.map((e) => e.dataset.slug));
  if (!slugs.length) { console.error('No .cover[data-slug] elements found.'); process.exit(2); }
  const done = [];
  for (const slug of slugs) {
    if (only && !only.includes(slug)) continue;
    if (pdfOnly) { done.push(slug); continue; }
    const el = await page.$(`.cover[data-slug="${slug}"]`);
    const box = await el.boundingBox();
    if (Math.round(box.width) !== 720 || Math.round(box.height) !== 888)
      console.warn(`! ${slug}: cover box is ${box.width}x${box.height}, expected 720x888`);
    await el.scrollIntoViewIfNeeded();
    await snapped(el, () => el.screenshot({ path: path.join(outDir, `${slug}.png`) }));
    done.push(slug);
  }
  // 1x JPGs for the gallery
  const ctx1 = await browser.newContext({ viewport: { width: 1600, height: 1200 }, deviceScaleFactor: 1 });
  await ctx1.route(/^https?:\/\//, async (route) => {
    const req = route.request();
    try { const r = curlFetch(req.url(), req.headers()['user-agent'] || 'Mozilla/5.0 Chrome/140');
      await route.fulfill({ status: r.status, contentType: r.contentType, body: r.body, headers: { 'access-control-allow-origin': '*' } });
    } catch (e) { await route.abort(); }
  });
  const p1 = await ctx1.newPage();
  await p1.goto('file://' + file, { waitUntil: 'networkidle', timeout: 120000 });
  await p1.evaluate(() => document.fonts.ready); await p1.waitForTimeout(800);
  for (const slug of pdfOnly ? [] : done) {
    const el = await p1.$(`.cover[data-slug="${slug}"]`);
    await el.scrollIntoViewIfNeeded();
    await snapped(el, () => el.screenshot({ path: path.join(outDir, `${slug}.jpg`), type: 'jpeg', quality: 90 }));
  }
  if (!only && !pdfOnly) {
    // Print wraps (back + spine + front), if the page has any: renders/_wrap.jpg, _wrap-2.jpg, ...
    for (const f of fs.readdirSync(outDir)) if (/^_wrap(-\d+)?\.jpg$/.test(f)) fs.unlinkSync(path.join(outDir, f));
    const wraps = await p1.$$('.wrap');
    for (let i = 0; i < wraps.length; i++) {
      await wraps[i].scrollIntoViewIfNeeded();
      const name = i ? `_wrap-${i + 1}.jpg` : '_wrap.jpg';
      await snapped(wraps[i], () => wraps[i].screenshot({ path: path.join(outDir, name), type: 'jpeg', quality: 88 }));
    }
    if (wraps.length) console.log(`Rendered ${wraps.length} print wrap(s)`);
  }
  if (wantSheet) await page.screenshot({ path: path.join(outDir, `_sheet.png`), fullPage: true });
  if (wantPdf) {
    fs.mkdirSync(path.join(outDir, 'pdf'), { recursive: true });
    for (const slug of done) {
      // Pages that build their covers with heavy JS can occasionally lose their execution
      // context mid-load on a busy machine; retry a couple of times before giving up.
      for (let attempt = 1; ; attempt++) {
        let pp;
        try {
          pp = await ctx1.newPage();
          await pp.goto('file://' + file, { waitUntil: 'networkidle', timeout: 120000 });
          await pp.evaluate(() => document.fonts.ready);
          await pp.emulateMedia({ media: 'print' });
          // Isolate the cover in normal flow at the page origin. Everything else is display:none and
          // every ancestor collapses to a plain 720px block, so the printed document is exactly one
          // trim-sized page. (If the document stays wider than the page, Chrome shrinks the whole
          // printout to fit and the cover comes out at a fraction of its size.)
          const box = await pp.evaluate((slug) => {
            const el = document.querySelector(`.cover[data-slug="${slug}"]`);
            const set = (n, props) => { for (const [k, v] of Object.entries(props)) n.style.setProperty(k, v, 'important'); };
            for (let node = el; node.parentElement; node = node.parentElement) {
              const parent = node.parentElement;
              for (const sib of parent.children) if (sib !== node) set(sib, { display: 'none' });
              set(parent, { display: 'block', position: 'static', width: '720px', 'min-width': '0', 'max-width': 'none',
                height: 'auto', 'min-height': '0', margin: '0', padding: '0', border: '0', transform: 'none',
                float: 'none', overflow: 'visible', 'box-shadow': 'none', background: 'none' });
            }
            const pos = getComputedStyle(el).position;
            set(el, { margin: '0', transform: 'none', float: 'none', ...(pos === 'absolute' || pos === 'fixed' || pos === 'sticky' ? { position: 'relative', inset: 'auto' } : {}) });
            const r = el.getBoundingClientRect();
            return { x: r.x, y: r.y, w: r.width, h: r.height, docW: document.body.scrollWidth, docH: document.body.scrollHeight };
          }, slug);
          if (Math.round(box.x) !== 0 || Math.round(box.y) !== 0 || Math.round(box.w) !== 720 || Math.round(box.h) !== 888 || box.docW > 721 || box.docH > 889)
            console.warn(`! ${slug}: PDF layout off — cover at ${box.x},${box.y} ${box.w}x${box.h}, document ${box.docW}x${box.docH}`);
          await pp.addStyleTag({ content: `@page { size: 7.5in 9.25in; margin: 0; }` });
          await pp.waitForTimeout(300);
          await pp.pdf({ path: path.join(outDir, 'pdf', `${slug}.pdf`), width: '7.5in', height: '9.25in', printBackground: true, pageRanges: '1', margin: { top: 0, right: 0, bottom: 0, left: 0 } });
          await pp.close();
          break;
        } catch (e) {
          if (pp) await pp.close().catch(() => {});
          if (attempt >= 3) throw e;
          console.warn(`! ${slug}: PDF attempt ${attempt} failed (${String(e.message).split('\n')[0]}), retrying`);
        }
      }
    }
  }
  if (!only && !pdfOnly) {
    // A full render: drop leftovers from covers that no longer exist on the page (renamed slugs).
    const stale = [];
    for (const [dir, ext] of [[outDir, '.jpg'], [outDir, '.png'], [path.join(outDir, 'pdf'), '.pdf']]) {
      if (!fs.existsSync(dir)) continue;
      for (const f of fs.readdirSync(dir)) {
        if (!f.endsWith(ext) || f.startsWith('_') || f.includes('.pdfpeek')) continue;
        if (!slugs.includes(f.slice(0, -ext.length))) { fs.unlinkSync(path.join(dir, f)); stale.push(f); }
      }
    }
    if (stale.length) console.log(`Removed stale renders: ${stale.join(', ')}`);
  }
  console.log(`Rendered ${done.length} cover(s) -> ${outDir}\n  ` + done.join('\n  '));
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
