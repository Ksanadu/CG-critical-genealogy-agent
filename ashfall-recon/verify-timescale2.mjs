import { spawn } from 'node:child_process';
import { mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9343;
const userscript = readFileSync('D:\\CG\\ashfall-trainer.user.js', 'utf8').replace(/\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==\s*/, '');
const profile = mkdtempSync(join(tmpdir(), 'ashfall-ts2-'));
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
await S('Page.navigate', { url: 'https://starcraft-shooter-2026.pages.dev/' });
const ev = async expr => {
  const r = await S('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.result?.exceptionDetails) return 'EXC: ' + (r.result.exceptionDetails.exception?.description || '').slice(0, 200);
  return r.result?.result?.value ?? null;
};
const setRate = (r) => ev(`(function(){var h=document.querySelector('[data-dsh-trainer]').shadowRoot;var s=h.getElementById('rate');s.value=${r};s.dispatchEvent(new Event('input',{bubbles:true}));return h.getElementById('r-label').textContent})()`);
const click = (label) => ev(`(function(){var h=document.querySelector('[data-dsh-trainer]').shadowRoot;var b=[...h.shadowRoot.querySelectorAll('button.act')].find(x=>x.textContent.trim()===${JSON.stringify(label)});if(!b)return'no-btn';b.click();return'ok'})()`);

for (let i = 0; i < 90; i++) { await sleep(1000); if (await ev(`!!document.querySelector('[data-dsh-trainer]')?.shadowRoot`)) break; }
await sleep(2500);
await ev(`(function(){var b=[...document.querySelectorAll('button')].find(x=>!x.disabled&&/部署/.test(x.textContent));b&&b.click();return 1})()`);
await sleep(6000);

console.log('=== 严格同窗口：rAF 虚拟时钟 vs 真实时钟 ===');
const strict = async (r) => {
  console.log('  设定', await setRate(r));
  await sleep(250);
  await ev(`window.__m={ts:[],real:[],n:0};
    requestAnimationFrame(function f(ts){ window.__m.ts.push(ts); window.__m.real.push(performance.now()); window.__m.n++;
      if(window.__m.n<200) requestAnimationFrame(f); }); 1`);
  await sleep(4000);
  const o = JSON.parse(await ev(`(function(){var m=window.__m;var i=m.ts.length-1;return JSON.stringify({
    frames:m.n, virtSpan:Math.round(m.ts[i]-m.ts[0]), realSpan:Math.round(m.real[i]-m.real[0])})})()`));
  o.ratio = +(o.virtSpan / o.realSpan).toFixed(3);
  return o;
};
for (const [label, val] of [['1.0x', 100], ['2.0x', 200], ['3.0x', 300], ['0.5x', 50], ['0.1x', 10]]) {
  console.log(' ', label, JSON.stringify(await strict(val)));
}

console.log('\n=== 引擎内 L.time 推进速率（同墙钟 4s 窗口）===');
const engine = async (r) => {
  await setRate(r);
  await sleep(300);
  const t0 = await ev(`window.__debugBattle ? window.__debugBattle.time : null`);
  await sleep(4000);
  const t1 = await ev(`window.__debugBattle ? window.__debugBattle.time : null`);
  return t0 === null ? 'n/a' : +(t1 - t0).toFixed(2);
};
for (const [label, val] of [['1.0x', 100], ['2.0x', 200], ['0.5x', 50], ['0.1x', 10]]) {
  console.log(' ', label, '-> L.time 推进', await engine(val), 's / 4s 墙钟');
}
await setRate(100);

console.log('\n=== 收尾：关闭全部功能后状态 ===');
for (const b of ['全体免伤', '锁定满血', '防线无伤']) await click(b);
await sleep(500);
console.log(await ev(`(function(){var L=window.__debugBattle;return JSON.stringify({hasOwnDamageUnit:L.hasOwnProperty('damageUnit'),state:L.state,kills:L.kills,allies:L.allies.length,tampered:L.tampered,rate:document.querySelector('[data-dsh-trainer]').shadowRoot.getElementById('r-label').textContent})})()`));

ws.close(); chrome.kill();
