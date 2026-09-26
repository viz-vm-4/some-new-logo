const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const { execFileSync } = require('child_process');
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const CACHE='/home/user/some-new-logo/tools/.netcache';
function curlFetch(url, ua){const key=crypto.createHash('sha1').update(url+'|'+ua).digest('hex');const body=path.join(CACHE,key+'.body'),hdr=path.join(CACHE,key+'.hdr');
 if(!fs.existsSync(body)){const tmp=`${body}.${process.pid}.${Date.now()}`;execFileSync('curl',['-sS','-L','--max-time','60','-A',ua,'-D',tmp+'.hdr','-o',tmp,url]);fs.renameSync(tmp+'.hdr',hdr);fs.renameSync(tmp,body);}
 const h=fs.readFileSync(hdr,'utf8');const last=h.trim().split(/\r?\n\r?\n/).pop();const ct=(last.match(/^content-type:\s*(.+)$/im)||[0,'application/octet-stream'])[1].trim();return {contentType:ct,body:fs.readFileSync(body)};}
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1600,height:1200}});
 p.on('console', m=>console.log('[console]', m.type(), m.text()));
 await p.route(/^https?:\/\//,async r=>{try{const x=curlFetch(r.request().url(),r.request().headers()['user-agent']||'Mozilla/5.0 Chrome/140');await r.fulfill({status:200,contentType:x.contentType,body:x.body,headers:{'access-control-allow-origin':'*'}});}catch(e){await r.abort();}});
 await p.goto('file:///home/user/some-new-logo/covers/16-wit/index.html',{waitUntil:'networkidle'});
 await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(500);
 const code = process.argv[2];
 console.log(JSON.stringify(await p.evaluate(code), null, 1));
 await b.close();})();
