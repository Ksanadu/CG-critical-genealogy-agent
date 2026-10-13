import { spawn } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9336;
const TARGET = 'https://starcraft-shooter-2026.pages.dev/';

const BOOT = `
(function(){
  var orig = RegExp.prototype.test;
  RegExp.prototype.test = function(s){
    try{
      if (typeof s === 'string' && s === location.hostname && this.source &&
          this.source.indexOf('localhost') !== -1 && this.source.indexOf('192') !== -1) {
        window.__gateBypassed = (window.__gateBypassed||0)+1; return true;
      }
    }catch(e){}
    return orig.call(this, s);
  };
  try{
    if(!new URLSearchParams(location.search).has('debug')){
      var u=new URL(location.href); u.searchParams.set('debug','');
      history.replaceState(null,'',u.pathname+u.search+u.hash);
    }
  }catch(e){}
})();
`;

const profile = mkdtempSync(join(tmpdir(), 'ashfall4-'));
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
  '--no-first-run', '--no-default-browser-check', '--enable-unsafe-swiftshader', '--use-angle=swiftshader',
  '--window-size=1280,800', 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let info;
for (let i = 0; i < 40; i++) { try { const r = await fetch(`http://127.0.0.1:${PORT}/json/version`); if (r.ok) { info = await r.json(); break; } } catch {} await sleep(250); }
const ws = new WebSocket(info.webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
let seq = 0; const pending = new Map();
ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } };
const send = (method, params = {}, sid) => { const id = ++seq; return new Promise(res => { pending.set(id, res); ws.send(JSON.stringify({ id, method, params, ...(sid ? { sessionId: sid } : {}) })); }); };
const { result: { targetId } } = await send('Target.createTarget', { url: 'about:blank' });
const { result: { sessionId } } = await send('Target.attachToTarget', { targetId, flatten: true });
const S = (m, p) => send(m, p, sessionId);
await S('Page.enable'); await S('Runtime.enable');
await S('Page.addScriptToEvaluateOnNewDocument', { source: BOOT });
await S('Page.navigate', { url: TARGET });
const ev = async expr => {
  const r = await S('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
  const res = r.result;
  if (res?.exceptionDetails) return 'EXC: ' + (res.exceptionDetails.exception?.description || res.exceptionDetails.text || '?').slice(0, 400);
  return res?.result?.value ?? null;
};

for (let i = 0; i < 90; i++) { await sleep(1000); if (await ev(`typeof window.__battle`) === 'object') break; }
await sleep(2500);

console.log('=== A. DESCRIPTOR MAP ===');
console.log(await ev(`(function(){
  var L=window.__debugBattle; if(!L) return 'no-handle';
  var p=Object.getPrototypeOf(L), out={getters:[],methods:[]};
  for(var n of Object.getOwnPropertyNames(p)){
    var d=Object.getOwnPropertyDescriptor(p,n);
    if(d.get) out.getters.push(n);
    else if(typeof d.value==='function' && !['constructor'].includes(n)) out.methods.push(n);
  }
  var fieldsNonFn = Object.fromEntries(Object.entries(L).filter(([k,v])=>typeof v!=='object'&&typeof v!=='function').slice(0,80));
  return JSON.stringify({getters:out.getters, methodCount:out.methods.length, scalars:fieldsNonFn, alliesType:typeof L.allies, alliesLen:L.allies&&L.allies.length});
})()`));

console.log('\n=== B. TARGETED SOURCE ===');
console.log(await ev(`(function(){
  var L=window.__debugBattle, p=Object.getPrototypeOf(L);
  var want=['damageUnit','damageEnemy','damageBoss','spawnEnemy','addMarines','addTank','advanceResearch','gainXp','continueEndless','launchWave','recordKill'];
  var out=[];
  for(var n of want){ var f=p[n]; out.push(n+' => '+(typeof f==='function'? f.toString().replace(/\\s+/g,' ').slice(0,260) : '<'+typeof f+'>')); }
  var hd=Object.getOwnPropertyDescriptor(p,'health');
  out.push('health descriptor => '+(hd.get? 'GETTER: '+hd.get.toString().replace(/\\s+/g,' ').slice(0,260) : 'value:'+typeof hd.value));
  var ad=Object.getOwnPropertyDescriptor(p,'allies');
  out.push('allies descriptor => '+(ad.get? 'GETTER: '+ad.get.toString().replace(/\\s+/g,' ').slice(0,200) : 'value:'+typeof ad.value));
  return out.join('\\n');
})()`));

console.log('\n=== C. ENTER BATTLE + BASELINE ===');
await ev(`(function(){var b=[...document.querySelectorAll('button')].find(x=>!x.disabled&&/部署/.test(x.textContent));b&&b.click();return !!b})()`);
await sleep(7000);
console.log(await ev(`(function(){var L=window.__debugBattle;return JSON.stringify({state:L.state,health:L.health,leakDamage:L.leakDamage,losses:L.losses,escaped:L.escaped,time:+L.time.toFixed(1),enemies:L.enemies.length,allies:L.allies.length,kills:L.kills,tampered:L.tampered})})()`));

console.log('\n=== D. FREEZE TEST: leakDamage pinned to 0 for 8s ===');
await ev(`(function(){var L=window.__debugBattle; window.__pin=setInterval(function(){ try{L.leakDamage=0;}catch(e){} },50); return 'pinned'})()`);
await sleep(8000);
console.log('pinned:', await ev(`(function(){var L=window.__debugBattle;return JSON.stringify({state:L.state,health:L.health,leakDamage:L.leakDamage,losses:L.losses,time:+L.time.toFixed(1)})})()`));
await ev(`clearInterval(window.__pin)`);

console.log('\n=== E. ENEMY PURGE + SCALAR WRITES ===');
console.log(await ev(`(function(){
  var L=window.__debugBattle;
  var e=L.enemies.length;
  for(var i=0;i<L.enemies.length;i++){ L.enemies[i].hp=0; L.enemies[i].dead=true; }
  var r={enemiesBefore:e, enemiesAfter:L.enemies.length, killsBefore:L.kills};
  L.kills = 7777; L.researchLevel = 12; L.xp = 9999; L.piercing = 5; L.weaponLevel = 9;
  r.killsSet=L.kills; r.researchLevel=L.researchLevel; r.piercing=L.piercing; r.weaponLevel=L.weaponLevel;
  return JSON.stringify(r);
})()`));
await sleep(2000);
console.log('post:', await ev(`(function(){var L=window.__debugBattle;return JSON.stringify({enemies:L.enemies.length,kills:L.kills,state:L.state,tampered:L.tampered})})()`));

console.log('\n=== F. VICTORY TRIGGER ===');
console.log(await ev(`(function(){var L=window.__debugBattle; L.state='victory'; return 'state='+L.state})()`));
await sleep(2500);
console.log(await ev(`(function(){var L=window.__debugBattle;return JSON.stringify({state:L.state,kills:L.kills,layer:L.endless?L.endless.layer:null})})()`));

ws.close(); chrome.kill();
