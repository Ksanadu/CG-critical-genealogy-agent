import { spawn } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9341;
const TARGET = 'https://starcraft-shooter-2026.pages.dev/';
const userscript = readFileSync('D:\\CG\\ashfall-trainer.user.js', 'utf8').replace(/\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==\s*/, '');

const profile = mkdtempSync(join(tmpdir(), 'ashfall-v2-'));
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
  if(!b) return 'no-btn'; b.click(); return 'ok';
})()`);
const snap = async () => JSON.parse(await ev(`(function(){var L=window.__debugBattle;return JSON.stringify({state:L.state,t:+L.time.toFixed(1),kills:L.kills,losses:L.losses,allies:L.allies.length,enemies:L.enemies.length,hp:Math.round(L.health),tampered:L.tampered})})()`));

console.log('### A. 引导');
for (let i = 0; i < 90; i++) { await sleep(1000); if (await ev(`typeof window.__battle`) === 'object') break; }
await sleep(3000);
console.log(await ev(`JSON.stringify({search:location.search,debugBattle:typeof window.__debugBattle,panel:!!document.querySelector('[data-dsh-trainer]'),btns:document.querySelector('[data-dsh-trainer]').shadowRoot.querySelectorAll('button.act').length,presets:document.querySelectorAll('.dev-presets button').length})`));

console.log('\n### B. 进入战斗');
await ev(`(function(){var b=[...document.querySelectorAll('button')].find(x=>!x.disabled&&/部署/.test(x.textContent));b&&b.click();return !!b})()`);
await sleep(7000);
console.log(await snap());

console.log('\n### C. 免伤对照实验');
console.log('对照(未开) ->', await ev(`(function(){var L=window.__debugBattle,u=L.allies[0];var a=u.hp;L.damageUnit(u,5);return JSON.stringify({hp0:a,hp1:+u.hp.toFixed(2),blocked:a===u.hp})})()`));
console.log('click 全体免伤 ->', await click('全体免伤'));
await sleep(400);
console.log('开启后 ->', await ev(`(function(){var L=window.__debugBattle,u=L.allies[0];var a=u.hp;L.damageUnit(u,5);return JSON.stringify({own:L.hasOwnProperty('damageUnit'),hp0:a,hp1:+u.hp.toFixed(2),blocked:a===u.hp})})()`));
const s1 = await snap(); await sleep(7000); const s2 = await snap();
console.log('免伤 7s 前后 ->', JSON.stringify({losses: [s1.losses, s2.losses], allies: [s1.allies, s2.allies], kills: [s1.kills, s2.kills]}));
console.log('click 全体免伤(关) ->', await click('全体免伤'));
await sleep(300);
console.log(await ev(`JSON.stringify({own:window.__debugBattle.hasOwnProperty('damageUnit'),type:typeof window.__debugBattle.damageUnit})`));

console.log('\n### D. 秒杀倍率');
const k0 = (await snap()).kills;
console.log('click ×1000 ->', await click('×1000'), '| kills baseline', k0);
await sleep(6000);
const k1 = (await snap()).kills;
console.log('6s 后 kills:', k1, ' 增量', k1 - k0);

console.log('\n### E. 数值写入');
console.log('click 写入击杀 ->', await click('写入击杀'));
console.log('   kills =', await ev(`window.__debugBattle.kills`));
console.log('click 满武器 ->', await click('满武器'));
console.log('  ', await ev(`(function(){var L=window.__debugBattle;return JSON.stringify({weaponLevel:L.weaponLevel,piercing:L.piercing,armor:L.armor})})()`));
console.log('click 一键清场 ->', await click('一键清场'));
console.log('  ', await ev(`(function(){var L=window.__debugBattle;return JSON.stringify({enemies:L.enemies.length,alive:L.enemies.filter(e=>e.hp>0).length})})()`));
console.log('click 满编+满模块 ->', await click('满编 + 满模块'));
await sleep(1200);
console.log('  ', await ev(`(function(){var L=window.__debugBattle;return JSON.stringify({allies:L.allies.length,modules:Object.keys(L.modules).length,tampered:L.tampered})})()`));
console.log('click 判定胜利 ->', await click('判定胜利'), '| state =', await ev(`window.__debugBattle.state`));
console.log('click 进入无尽 ->', await click('进入无尽'), '|', await ev(`(function(){var L=window.__debugBattle;return JSON.stringify({state:L.state,endless:L.endless&&L.endless.layer})})()`));
console.log('click 跳层(50) ->', await click('跳层'), '|', await ev(`(function(){var L=window.__debugBattle;return JSON.stringify({layer:L.endless&&L.endless.layer})})()`));

console.log('\n### F. 键盘隔离 + 输入框');
console.log(await ev(`(function(){
  var h=document.querySelector('[data-dsh-trainer]').shadowRoot;
  var inp=h.getElementById('i-kills');
  inp.focus();
  return JSON.stringify({focused:h.activeElement===inp, before:inp.value});
})()`));
for (const ch of '12345') await S('Input.dispatchKeyEvent', { type: 'keyDown', text: ch, key: ch });
await S('Input.insertText', { text: '7' });
console.log('after typing ->', await ev(`(function(){var h=document.querySelector('[data-dsh-trainer]').shadowRoot;return JSON.stringify({v:h.getElementById('i-kills').value,active:h.activeElement.id})})()`));
console.log('游戏中 Ke 是否收到按键:', await ev(`(function(){ return 'n/a' })()`));

console.log('\n### G. 时间倍率（虚拟时钟测量）');
const probe = async (r) => {
  await ev(`(function(){var h=document.querySelector('[data-dsh-trainer]').shadowRoot;var s=h.getElementById('rate');s.value=${r};s.dispatchEvent(new Event('input',{bubbles:true}));return 1})()`);
  await sleep(150);
  await ev(`window.__p=null;(function p(ts){ if(!window.__p) window.__p={a:ts,b:ts,n:0}; window.__p.b=ts; window.__p.n++; if(window.__p.n<200) requestAnimationFrame(p); })();1`);
  await sleep(3000);
  return await ev(`JSON.stringify({virt:Math.round(window.__p.b-window.__p.a),frames:window.__p.n})`);
};
console.log('rate 1.0x ->', await probe(100));
console.log('rate 2.0x ->', await probe(200));
console.log('rate 0.5x ->', await probe(50));
await ev(`(function(){var h=document.querySelector('[data-dsh-trainer]').shadowRoot;var s=h.getElementById('rate');s.value=100;s.dispatchEvent(new Event('input',{bubbles:true}));return 1})()`);

console.log('\n### H. 面板状态 + 截图');
console.log(await ev(`(function(){var h=document.querySelector('[data-dsh-trainer]').shadowRoot;var o={};for(var id of ['s-state','s-time','s-kills','s-enemies','s-allies','s-health','s-tampered','s-gate'])o[id]=h.getElementById(id).textContent;return JSON.stringify(o)})()`));
const shot = await S('Page.captureScreenshot', { format: 'png' });
writeFileSync('D:\\CG\\ashfall-recon\\trainer-panel.png', Buffer.from(shot.result.data, 'base64'));
console.log('screenshot -> D:\\CG\\ashfall-recon\\trainer-panel.png');

ws.close(); chrome.kill();
