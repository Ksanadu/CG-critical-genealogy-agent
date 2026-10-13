import { spawn } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9335;
// NOTE: deliberately NO ?debug in the URL - we test the replaceState trick.
const TARGET = 'https://starcraft-shooter-2026.pages.dev/';

const BOOT = `
(function(){
  var orig = RegExp.prototype.test;
  RegExp.prototype.test = function(s){
    try{
      if (typeof s === 'string' && s === location.hostname && this.source &&
          this.source.indexOf('localhost') !== -1 && this.source.indexOf('192') !== -1) {
        window.__gateBypassed = (window.__gateBypassed||0)+1;
        return true;
      }
    }catch(e){}
    return orig.call(this, s);
  };
  try{
    if (!new URLSearchParams(location.search).has('debug')) {
      var u = new URL(location.href); u.searchParams.set('debug','');
      history.replaceState(null, '', u.pathname + u.search + u.hash);
      window.__paramPatched = location.search;
    }
  }catch(e){ window.__paramPatchErr = String(e); }
})();
`;

const profile = mkdtempSync(join(tmpdir(), 'ashfall3-'));
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
const ev = async expr => { const r = await S('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true }); return r.result?.result?.value ?? ('EXC:' + (r.result?.exceptionDetails?.text ?? JSON.stringify(r.result?.exceptionDetails?.exception?.description||''))); };

for (let i = 0; i < 90; i++) { await sleep(1000); if (await ev(`typeof window.__battle`) === 'object') break; }
await sleep(2500);

console.log('=== PARAM PATCH (no ?debug in URL) ===');
console.log(await ev(`JSON.stringify({patched:window.__paramPatched, err:window.__paramPatchErr, search:location.search, debugBattle:typeof window.__debugBattle, debugScene:typeof window.__debugScene, gate:window.__gateBypassed, perf:(document.getElementById('performance')||{}).className})`));

console.log('\n=== KEY METHOD SOURCE ===');
console.log(await ev(`(function(){
  var L=window.__debugBattle; if(!L) return 'no-handle';
  var p=Object.getPrototypeOf(L);
  var want=['health','damageUnit','damageEnemy','damageBoss','spawnEnemy','addMarines','addTank','addSupport','advanceResearch','gainXp','applyChoice','selectGate','continueEndless','usePower','recordKill','launchWave','retreat','start','endlessGateOptions','heroicHealth','damageScale'];
  return want.map(function(n){
    var f=p[n]; if(typeof f!=='function') return n+': <'+typeof f+'>';
    return n+' :: '+f.toString().replace(/\\s+/g,' ').slice(0,300);
  }).join('\\n');
})()`));

console.log('\n=== LIVE METHOD OVERRIDE TEST (invincibility-style) ===');
console.log(await ev(`(function(){
  var b=[...document.querySelectorAll('button')].find(x=>!x.disabled&&/部署/.test(x.textContent));
  b&&b.click(); window.__t=1; return b?'deployed':'no-btn';
})()`));
await sleep(5000);
console.log(await ev(`(function(){
  var L=window.__debugBattle;
  var r={state:L.state, health:L.health(), leakDamage:L.leakDamage, losses:L.losses, escaped:L.escaped};
  // override instance-level damage hook
  var origDamageUnit = L.damageUnit.bind(L);
  L.__origDamageUnit = origDamageUnit;
  L.damageUnit = function(){ return false; };
  r.overrode = 'damageUnit';
  r.afterOverrideHealth = L.health();
  r.healthIsFn = typeof L.health;
  r.protoHealthSrc = Object.getPrototypeOf(L).health.toString().replace(/\\s+/g,' ').slice(0,200);
  return JSON.stringify(r);
})()`));
await sleep(3000);
console.log('after 3s of blocked damage:', await ev(`(function(){var L=window.__debugBattle;return JSON.stringify({state:L.state,health:L.health(),losses:L.losses,leakDamage:L.leakDamage,time:+L.time.toFixed(1)})})()`));

ws.close(); chrome.kill();
