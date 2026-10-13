import { spawn } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9347;
const TARGET = 'https://starcraft-shooter-2026.pages.dev/';
const userscript = readFileSync('D:\\CG\\ashfall-trainer.user.js', 'utf8')
  .replace(/\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==\s*/, '');

const profile = mkdtempSync(join(tmpdir(), 'ashfall-spd-'));
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
const minState = () => ev(`JSON.stringify({name:Math.min.name,patched:Math.min.name==='patchedMin'})`);
// 走滑块（指数映射），把 rate 反算成滑块值
const toSlider = (r) => Math.round((1000 * Math.log(r / 0.1)) / Math.log(1000));
const setR = (r, label) => ev(`(function(){
  var h=document.querySelector('[data-dsh-trainer]').shadowRoot;
  ${label
    ? `var b=[...h.querySelectorAll('button.act')].find(x=>x.textContent.trim()===${JSON.stringify(label)}); if(!b) return 'no-btn'; b.click();`
    : `var s=h.getElementById('rate'); s.value=${toSlider(r)}; s.dispatchEvent(new Event('input',{bubbles:true}));`}
  return h.getElementById('r-label').textContent;
})()`);

// 直接测「游戏内时间推进 / 真实时间」，并给出每帧虚拟步进
const probe = async (ms = 4000) => {
  await ev(`(function(){
    window.__m={t0:window.__debugBattle.time,f0:0,t:performance.now()};
    (function f(){ window.__m.f0++; requestAnimationFrame(f); })();
    return 1})()`);
  await sleep(ms);
  return JSON.parse(await ev(`(function(){
    var m=window.__m,L=window.__debugBattle,now=performance.now();
    var wall=(now-m.t)/1000, dt=L.time-m.t0;
    return JSON.stringify({dt:+dt.toFixed(2),frames:m.f0,wall:+wall.toFixed(2),
      perFrame:+(dt/m.f0).toFixed(3), speed:+(dt/wall).toFixed(2)})})()`));
};

console.log('### A. 引导');
for (let i = 0; i < 90; i++) { await sleep(1000); if (await ev(`typeof window.__battle`) === 'object') break; }
await sleep(2500);
console.log(await ev(`JSON.stringify({debug:typeof window.__debugBattle,panel:!!document.querySelector('[data-dsh-trainer]')})`));

console.log('\n### B. 进入战斗');
await ev(`(function(){var b=[...document.querySelectorAll('button')].find(x=>!x.disabled&&/部署/.test(x.textContent));b&&b.click();return !!b})()`);
await sleep(9000);
console.log('Math.min 初始 ->', await minState());

console.log('\n### C. 倍率阶梯（每档 4s 实测）');
const rows = [];
for (const [r, ms] of [[1, 4000], [3, 4000], [10, 4000], [100, 3500], [0.5, 4000]]) {
  const lbl = await setR(r);
  await sleep(600);
  const p = await probe(ms);
  const st = JSON.parse(await minState());
  rows.push({ rate: r, label: lbl, ...p, minPatched: st.patched });
  console.log(`rate ${String(r).padStart(5)} | 实测 ${String(p.speed).padStart(7)}x | 每帧虚拟 ${String(p.perFrame).padStart(7)}s | 帧数 ${String(p.frames).padStart(4)} | dt ${p.dt}s / wall ${p.wall}s | Math.min=${st.name}`);
}

console.log('\n### D. 快捷档按钮');
for (const label of ['0.25x', '1x', '3x', '10x', '100x']) {
  const lbl = await setR(null, label);
  await sleep(300);
  console.log(`click ${label.padEnd(6)} -> label=${lbl} | slider=${await ev(`(function(){return document.querySelector('[data-dsh-trainer]').shadowRoot.getElementById('rate').value})()`)} | ${await minState()}`);
}

console.log('\n### E. 回到 1x 后 Math.min 是否还原');
console.log('click 1x ->', await setR(null, '1x'));
await sleep(400);
console.log('  ', await minState());
const p1 = await probe(3000);
console.log('  1x 实测 ->', JSON.stringify(p1));

console.log('\n### F. 状态栏 + 截图');
console.log(await ev(`(function(){var h=document.querySelector('[data-dsh-trainer]').shadowRoot;var o={};for(var id of ['s-state','s-time','s-kills','s-enemies','s-allies','s-health','s-tampered','s-gate','s-rt','s-unclamp'])o[id]=h.getElementById(id).textContent;return JSON.stringify(o)})()`));
// 停在 10x 让截图信息量更大
await setR(null, '10x');
await sleep(2500);
const shot = await S('Page.captureScreenshot', { format: 'png' });
writeFileSync('D:\\CG\\ashfall-recon\\trainer-speed.png', Buffer.from(shot.result.data, 'base64'));
console.log('screenshot -> D:\\CG\\ashfall-recon\\trainer-speed.png');

console.log('\n### G. 汇总');
console.log(JSON.stringify(rows, null, 1));

ws.close(); chrome.kill();
