const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const { execFileSync } = require('child_process');
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const CACHE='/home/user/some-new-logo/tools/.netcache';
function curlFetch(url, ua){const key=crypto.createHash('sha1').update(url+'|'+ua).digest('hex');const body=path.join(CACHE,key+'.body'),hdr=path.join(CACHE,key+'.hdr');
 if(!fs.existsSync(body)){const tmp=`${body}.${process.pid}.${Date.now()}`;execFileSync('curl',['-sS','-L','--max-time','60','-A',ua,'-D',tmp+'.hdr','-o',tmp,url]);fs.renameSync(tmp+'.hdr',hdr);fs.renameSync(tmp,body);}
 const h=fs.readFileSync(hdr,'utf8');const last=h.trim().split(/\r?\n\r?\n/).pop();const ct=(last.match(/^content-type:\s*(.+)$/im)||[0,'application/octet-stream'])[1].trim();return {contentType:ct,body:fs.readFileSync(body)};}
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage();
 await p.route(/^https?:\/\//,async r=>{try{const x=curlFetch(r.request().url(),r.request().headers()['user-agent']);await r.fulfill({status:200,contentType:x.contentType,body:x.body,headers:{'access-control-allow-origin':'*'}});}catch(e){await r.abort();}});
 const lines=JSON.parse(process.argv[2]);
 await p.setContent(`<link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@700&display=block" rel="stylesheet"><div id=m></div>`,{waitUntil:'networkidle'});
 await p.evaluate(()=>document.fonts.ready);
 const res=await p.evaluate((lines)=>lines.map(t=>{const s=document.createElement('span');s.style.cssText="font:700 56px 'Albert Sans';letter-spacing:-0.024em;white-space:nowrap;font-kerning:normal;font-feature-settings:'kern','ss01'";s.textContent=t;document.body.appendChild(s);return [t,Math.round(s.getBoundingClientRect().width)];}),lines);
 res.forEach(r=>console.log(r[1],r[0]));await b.close();})();
