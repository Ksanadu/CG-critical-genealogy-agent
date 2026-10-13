import { spawn } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9334;
const TARGET = 'https://starcraft-shooter-2026.pages.dev/?debug';

const GATE_HOOK = `
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
})();
`;

const profile = mkdtempSync(join(tmpdir(), 'ashfall2-'));
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
  '--no-first-run', '--no-default-browser-check', '--enable-unsafe-swiftshader', '--use-angle=swiftshader',
  '--window-size=1280,800', 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));

let info;
for (let i = 0; i < 40; i++) { try { const r = await fetch(`http://127.0.0.1:${PORT}/json/version`); if (r.ok) { info = await r.json(); break; } } catch {} await sleep(250); }
const ws = new WebSocket(info.webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
let seq = 0; const pending = new Map();
ws.onmessage = ev => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } };
const send = (method, params = {}, sessionId) => { const id = ++seq; return new Promise(res => { pending.set(id, res); ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) })); }); };
const { result: { targetId } } = await send('Target.createTarget', { url: 'about:blank' });
const { result: { sessionId } } = await send('Target.attachToTarget', { targetId, flatten: true });
const S = (m, p) => send(m, p, sessionId);
await S('Page.enable'); await S('Runtime.enable');
await S('Page.addScriptToEvaluateOnNewDocument', { source: GATE_HOOK });
await S('Page.navigate', { url: TARGET });
const ev = async expr => { const r = await S('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true }); return r.result?.result?.value ?? ('EXC:' + (r.result?.exceptionDetails?.text ?? '?')); };

for (let i = 0; i < 90; i++) { await sleep(1000); if (await ev(`typeof window.__battle`) === 'object') break; }
await sleep(3000);

console.log('=== A. STATIC SURFACE ===');
console.log(await ev(`(function(){
  var L = window.__debugBattle, p = L ? Object.getPrototypeOf(L) : null;
  return JSON.stringify({
    gateBypassed: window.__gateBypassed,
    hasBattleHandle: typeof L,
    protoMethods: p ? Object.getOwnPropertyNames(p).slice(0,120) : null,
    instanceFields: L ? Object.keys(L).slice(0,120) : null,
    presets: [...document.querySelectorAll('.dev-presets button')].map(b=>b.dataset.preset),
    strip: [...document.querySelectorAll('.dev-strip button')].map(b=>b.textContent)
  });
})()`));

console.log('\n=== B. SNAPSHOT (idle) ===');
console.log((await ev(`JSON.stringify(window.__battle.snapshot())`)).slice(0, 2600));

// enter battle
console.log('\n=== C. ENTER BATTLE ===');
console.log(await ev(`(function(){
  var b=[...document.querySelectorAll('button')].find(x=>!x.disabled&&/部署/.test(x.textContent));
  if(!b) return 'no-deploy-button';
  b.click(); window.__deployClicked=1; return 'clicked:'+b.textContent.trim();
})()`));
await sleep(6000);
console.log(await ev(`(function(){var L=window.__debugBattle;return JSON.stringify({state:L.state,time:+L.time.toFixed(2),kills:L.kills,allies:L.allies?.length,enemies:L.enemies?.length,hp:L.hp,baseHp:L.baseHp,lives:L.lives,rosterKeys:L.roster?Object.keys(L.roster):null})})()`));

console.log('\n=== D. LIVE WRITE TEST ===');
console.log(await ev(`(function(){
  var L=window.__debugBattle; if(!L) return 'no-handle';
  var before = {kills:L.kills, state:L.state, tampered:L.tampered, allies:L.allies.length, enemies:L.enemies.length};
  L.kills = 4242;                                     // direct field write
  var r = {before:before, afterKills:L.kills};
  if (L.allies[0]) { var a=L.allies[0]; r.allie0={kind:a.kind, hp:a.hp, maxHp:a.maxHp, keys:Object.keys(a).slice(0,40)}; }
  if (L.enemies[0]) { var e=L.enemies[0]; r.enemy0={kind:e.kind, hp:e.hp, maxHp:e.maxHp, keys:Object.keys(e).slice(0,40)}; }
  return JSON.stringify(r);
})()`));

console.log('\n=== E. DEV PRESET: BOSS + SQUAD ===');
console.log(await ev(`(function(){
  var btns=[...document.querySelectorAll('.dev-presets button')];
  var boss=btns.find(b=>b.dataset.preset==='boss');
  var squad=btns.find(b=>b.dataset.preset==='squad');
  if(!boss) return 'no-boss-button:'+btns.length;
  squad&&squad.click(); boss.click();
  var L=window.__debugBattle;
  return JSON.stringify({boss:!!L.boss, bossHp:L.boss&&L.boss.maxHp, tampered:L.tampered, allies:L.allies.length, modules:JSON.stringify(L.modules).slice(0,200)});
})()`));
await sleep(2500);
console.log('post-preset:', await ev(`(function(){var L=window.__debugBattle;return JSON.stringify({state:L.state,kills:L.kills,allies:L.allies.length,enemies:L.enemies.length,boss:L.boss?{hp:L.boss.hp,maxHp:L.boss.maxHp}:null})})()`));

ws.close(); chrome.kill();
