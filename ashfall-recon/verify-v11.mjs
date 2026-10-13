import { spawn } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9345;
const TARGET = 'https://starcraft-shooter-2026.pages.dev/';
const userscript = readFileSync('D:\\CG\\ashfall-trainer.user.js', 'utf8')
  .replace(/\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==\s*/, '');

const profile = mkdtempSync(join(tmpdir(), 'ashfall-v11-'));
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
  '--no-first-run', '--no-default-browser-check', '--enable-unsafe-swiftshader', '--use-angle=swiftshader',
  '--window-size=1280,860', 'about:blank'], { stdio: 'ignore' });
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
await S('Page.addScriptToEvaluateOnNewDocument', { source: userscript });
await S('Page.navigate', { url: TARGET });

const ev = async expr => {
  const r = await S('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
  const res = r.result;
  if (res?.exceptionDetails) return 'EXC: ' + (res.exceptionDetails.exception?.description || res.exceptionDetails.text || '?').slice(0, 300);
  return res?.result?.value ?? null;
};
const click = (label) => ev(`(function(){
  var h=document.querySelector('[data-dsh-trainer]'); if(!h||!h.shadowRoot) return 'no-panel';
  var b=[...h.shadowRoot.querySelectorAll('button.act')].find(x=>x.textContent.trim()===${JSON.stringify(label)});
  if(!b) return 'no-btn:'+[...h.shadowRoot.querySelectorAll('button.act')].map(x=>x.textContent.trim()).join('/');
  b.click(); return 'ok';
})()`);
const tip = () => ev(`(function(){var h=document.querySelector('[data-dsh-trainer]');return h.shadowRoot.getElementById('tip').textContent})()`);
// 关键快照：等级 / 时间 / 击杀 是否被重置
const core = () => ev(`(function(){var L=window.__debugBattle;
  return JSON.stringify({state:L.state,t:+L.time.toFixed(1),lv:L.researchLevel,pend:L.pendingLevelUps,kills:L.kills,
    allies:L.allies.length,mods:Object.keys(L.modules).length,wl:L.weaponLevel,pierce:L.piercing,
    modsSum:Object.values(L.modules).reduce((a,b)=>a+b,0),tampered:L.tampered})})()`);

console.log('### A. 引导');
for (let i = 0; i < 90; i++) { await sleep(1000); if (await ev(`typeof window.__battle`) === 'object') break; }
await sleep(2500);
console.log(await ev(`JSON.stringify({debug:typeof window.__debugBattle,panel:!!document.querySelector('[data-dsh-trainer]'),gateOpen:!!document.querySelector('.dev-presets'),stripts:document.querySelectorAll('.dev-strip button').length})`));

console.log('\n### B. 进入战斗');
await ev(`(function(){var b=[...document.querySelectorAll('button')].find(x=>!x.disabled&&/部署/.test(x.textContent));b&&b.click();return !!b})()`);
await sleep(9000);
console.log(await core());
console.log('roster 结构 ->', await ev(`(function(){var L=window.__debugBattle;return JSON.stringify({roster:L.roster,baseRosterType:Array.isArray(L.baseRoster)?'array':typeof L.baseRoster,baseRoster:L.baseRoster})})()`));

console.log('\n### C. 满编+满模块 —— 是否重开局（核心回归）');
const before = JSON.parse(await core());
console.log('BEFORE ->', JSON.stringify(before));
console.log('click ->', await click('满编 + 满模块'));
await sleep(2500);
const after = JSON.parse(await core());
console.log('AFTER  ->', JSON.stringify(after));
console.log('tip    ->', await tip());
const verdict = {
  timeNotReset: after.t >= before.t,
  levelNotReset: after.lv >= before.lv,
  killsNotReset: after.kills >= before.kills,
  alliedUp: after.allies > before.allies,
  modsUp: after.modsSum > before.modsSum,
  sandboxHidden: await ev(`(function(){var s=document.getElementById('sandbox');return s? s.classList.contains('hidden'):'no-sandbox'})()`),
};
console.log('PASS/FAIL ->', JSON.stringify(verdict));

console.log('\n### C2. 部队构成 / 健康值 NaN 诊断');
console.log('单位分布 ->', await ev(`(function(){var L=window.__debugBattle;var c={};for(var u of L.allies)c[u.kind]=(c[u.kind]||0)+1;return JSON.stringify(c)})()`));
console.log('health 探针 ->', await ev(`(function(){var L=window.__debugBattle;
  var bad=L.allies.filter(u=>!u.maxHp||!isFinite(u.hp/u.maxHp));
  return JSON.stringify({health:L.health,isNaN:Number.isNaN(L.health),total:L.allies.length,bad:bad.length,
    badKinds:[...new Set(bad.map(u=>u.kind))],
    sample:bad.slice(0,3).map(u=>({kind:u.kind,hp:u.hp,maxHp:u.maxHp,merc:u.merc??null}))})})()`));
console.log('二次满编（验证是否已真满级）->');
const m1 = JSON.parse(await core());
console.log('click ->', await click('满编 + 满模块'));
await sleep(2000);
const m2 = JSON.parse(await core());
console.log('modsSum', m1.modsSum, '->', m2.modsSum, '| mods', m1.mods, '->', m2.mods, '| allies', m1.allies, '->', m2.allies);
console.log('health 探针2 ->', await ev(`(function(){var L=window.__debugBattle;return JSON.stringify({health:L.health,isNaN:Number.isNaN(L.health),allies:L.allies.length})})()`));

console.log('\n### D. 击杀上限 9999999');
console.log('输入框 ->', await ev(`(function(){var h=document.querySelector('[data-dsh-trainer]').shadowRoot;var i=h.getElementById('i-kills');return JSON.stringify({value:i.value,max:i.max,min:i.min})})()`));
console.log('click 写入击杀 ->', await click('写入击杀'));
console.log('kills =', await ev(`window.__debugBattle.kills`), '| tip:', await tip());

console.log('\n### E. 写入等级 / 等级 +1');
console.log('i-res 值 ->', await ev(`(function(){var h=document.querySelector('[data-dsh-trainer]').shadowRoot;return h.getElementById('i-res').value})()`));
console.log('click 写入等级 ->', await click('写入等级'), '| tip:', await tip());
await sleep(1200);
console.log('  ', await ev(`(function(){var L=window.__debugBattle;return JSON.stringify({lv:L.researchLevel,pend:L.pendingLevelUps,state:L.state})})()`));
const lv0 = await ev(`window.__debugBattle.researchLevel`);
console.log('click 等级 +1 ->', await click('等级 +1'), '| tip:', await tip());
await sleep(1000);
console.log('  lv:', lv0, '->', await ev(`window.__debugBattle.researchLevel`));

console.log('\n### F. 其余按钮');
console.log('click 满武器 ->', await click('满武器'), '| tip:', await tip());
console.log('  ', await ev(`(function(){var L=window.__debugBattle;return JSON.stringify({wl:L.weaponLevel,pierce:L.piercing,armor:L.armor})})()`));
console.log('click 一键清场 ->', await click('一键清场'), '| tip:', await tip());
console.log('click 投放 BOSS ->', await click('投放 BOSS'), '| tip:', await tip());
console.log('  ', await ev(`(function(){var L=window.__debugBattle;return JSON.stringify({hasBoss:!!L.boss,hp:L.boss&&L.boss.hp})})()`));
console.log('click 补兵 ->', await click('补兵'), '| tip:', await tip());
console.log('click 召唤伙伴 ->', await click('召唤伙伴'), '| tip:', await tip());
console.log('click +9999 XP ->', await click('+9999 XP'), '| tip:', await tip());
console.log('click 判定胜利 ->', await click('判定胜利'), '| state:', await ev(`window.__debugBattle.state`));
console.log('click 进入无尽 ->', await click('进入无尽'), '|', await ev(`(function(){var L=window.__debugBattle;return JSON.stringify({state:L.state,layer:L.endless&&L.endless.layer})})()`));
console.log('click 跳层 ->', await click('跳层'), '|', await ev(`(function(){var L=window.__debugBattle;return JSON.stringify({layer:L.endless&&L.endless.layer,time:+L.time.toFixed(1)})})()`));

console.log('\n### G. 最终状态 + 截图');
console.log(await core());
const st = await ev(`(function(){var h=document.querySelector('[data-dsh-trainer]').shadowRoot;var o={};for(var id of ['s-state','s-time','s-kills','s-enemies','s-allies','s-health','s-tampered','s-gate'])o[id]=h.getElementById(id).textContent;return JSON.stringify(o)})()`);
console.log('状态栏 ->', st);
const shot = await S('Page.captureScreenshot', { format: 'png' });
writeFileSync('D:\\CG\\ashfall-recon\\trainer-panel-v11.png', Buffer.from(shot.result.data, 'base64'));
console.log('screenshot -> D:\\CG\\ashfall-recon\\trainer-panel-v11.png');

ws.close(); chrome.kill();
