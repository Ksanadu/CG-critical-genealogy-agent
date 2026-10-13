import { spawn } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9340;
const TARGET = 'https://starcraft-shooter-2026.pages.dev/';

// strip the UserScript header block -> raw injection body (equivalent to @grant none page context)
const userscript = readFileSync('D:\\CG\\ashfall-trainer.user.js', 'utf8').replace(/\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==\s*/, '');

const profile = mkdtempSync(join(tmpdir(), 'ashfall-v-'));
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
const clickTrainer = (label) => ev(`(function(){
  var h=document.querySelector('[data-dsh-trainer]'); if(!h||!h.shadowRoot) return 'no-panel';
  var b=[...h.shadowRoot.querySelectorAll('button.act')].find(x=>x.textContent.trim()===${JSON.stringify(label)});
  if(!b) return 'no-btn'; b.click(); return 'clicked';
})()`);

console.log('### A. 加载与门禁');
for (let i = 0; i < 90; i++) { await sleep(1000); if (await ev(`typeof window.__battle`) === 'object') break; }
await sleep(3000);
console.log(await ev(`JSON.stringify({
  urlSearch: location.search,
  debugBattle: typeof window.__debugBattle,
  debugScene: typeof window.__debugScene,
  panelHost: !!document.querySelector('[data-dsh-trainer]'),
  shadowRoot: !!document.querySelector('[data-dsh-trainer]')?.shadowRoot,
  trainerButtons: document.querySelector('[data-dsh-trainer]')?.shadowRoot?.querySelectorAll('button.act').length,
  devPresets: document.querySelectorAll('.dev-presets button').length
})`));

console.log('\n### B. 进入战斗');
await ev(`(function(){var b=[...document.querySelectorAll('button')].find(x=>!x.disabled&&/部署/.test(x.textContent));b&&b.click();return !!b})()`);
await sleep(7000);
console.log(await ev(`(function(){var L=window.__debugBattle;return JSON.stringify({state:L.state,time:+L.time.toFixed(1),kills:L.kills,allies:L.allies.length,enemies:L.enemies.length,health:Math.round(L.health),losses:L.losses,tampered:L.tampered})})()`));

console.log('\n### C. 免伤单元测试（对照）');
console.log(await ev(`(function(){
  var L=window.__debugBattle, u=L.allies[0];
  if(!u) return 'no-allies';
  var base=u.hp;
  L.damageUnit(u, 5);            // 对照组：应扣血
  var ctrl=u.hp;
  return JSON.stringify({hp0:base, afterRawDamage:+ctrl.toFixed(2), delta:+(base-ctrl).toFixed(2)});
})()`));
console.log('click 全体免伤 ->', await clickTrainer('全体免伤'));
await sleep(300);
console.log(await ev(`(function(){
  var L=window.__debugBattle, u=L.allies[0];
  var base=u.hp;
  L.damageUnit(u, 5);
  var after=u.hp;
  return JSON.stringify({isOverridden: L.hasOwnProperty('damageUnit'), hpBefore:+base.toFixed(2), afterDamage:+after.toFixed(2), blocked: base===after});
})()`));

console.log('\n### D. 8 秒免伤持续观察（对照组 + 8 秒）');
const t0 = await ev(`JSON.stringify({losses:window.__debugBattle.losses, allies:window.__debugBattle.allies.length, kills:window.__debugBattle.kills})`);
await sleep(8000);
const t1 = await ev(`JSON.stringify({losses:window.__debugBattle.losses, allies:window.__debugBattle.allies.length, kills:window.__debugBattle.kills})`);
console.log('t0:', t0, '\nt1:', t1);

console.log('\n### E. 关闭免伤 -> 再观察 6 秒');
await clickTrainer('全体免伤');
await sleep(300);
console.log(await ev(`JSON.stringify({hasOwn:window.__debugBattle.hasOwnProperty('damageUnit'), type:typeof window.__debugBattle.damageUnit})`));
await sleep(6000);
console.log('after off:', await ev(`JSON.stringify({losses:window.__debugBattle.losses,allies:window.__debugBattle.allies.length,kills:window.__debugBattle.kills,health:Math.round(window.__debugBattle.health)})`));

console.log('\n### F. 秒杀倍率 ×1000');
console.log('click ×1000 ->', await clickTrainer('×1000'));
await sleep(6000);
console.log('kills after 6s:', await ev(`JSON.stringify({kills:window.__debugBattle.kills,enemies:window.__debugBattle.enemies.length,state:window.__debugBattle.state})`));

console.log('\n### G. 写入击杀 / 满武器 / 清场');
console.log(await clickTrainer('写入击杀'));
console.log('->', await ev(`(function(){var L=window.__debugBattle;return JSON.stringify({kills:L.kills,recent:L.recentKills})})()`));
console.log(await clickTrainer('满武器'));
console.log('->', await ev(`(function(){var L=window.__debugBattle;return JSON.stringify({weaponLevel:L.weaponLevel,piercing:L.piercing,armor:L.armor})})()`));
console.log(await clickTrainer('一键清场'));
console.log('->', await ev(`(function(){var L=window.__debugBattle;return JSON.stringify({enemies:L.enemies.length, allDead:L.enemies.every(e=>e.hp<=0)})})()`));

console.log('\n### H. 时间倍率 2.5x');
await ev(`(function(){var h=document.querySelector('[data-dsh-trainer]').shadowRoot;var s=h.getElementById('rate');s.value=250;s.dispatchEvent(new Event('input',{bubbles:true}));return h.getElementById('r-label').textContent})()`).then(x => console.log('label:', x));
const g0 = await ev(`window.__debugBattle.time`);
await sleep(5000);
const g1 = await ev(`window.__debugBattle.time`);
console.log('game time delta over 5s wall:', (g1 - g0).toFixed(2) + 's  (1x would be ~5.0)');
await ev(`(function(){var h=document.querySelector('[data-dsh-trainer]').shadowRoot;var s=h.getElementById('rate');s.value=100;s.dispatchEvent(new Event('input',{bubbles:true}));return 1})()`);

console.log('\n### I. 面板状态与截图');
console.log(await ev(`(function(){var h=document.querySelector('[data-dsh-trainer]').shadowRoot;
  var o={}; for(var id of ['s-state','s-time','s-kills','s-enemies','s-allies','s-health','s-tampered','s-gate']) o[id]=h.getElementById(id).textContent;
  o.collapsed=h.getElementById('panel').classList.contains('collapsed');
  return JSON.stringify(o)})()`));

const shot = await S('Page.captureScreenshot', { format: 'png' });
writeFileSync('D:\\CG\\ashfall-recon\\trainer-panel.png', Buffer.from(shot.result.data, 'base64'));
console.log('screenshot saved');

ws.close(); chrome.kill();
