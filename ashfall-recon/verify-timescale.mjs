import { spawn } from 'node:child_process';
import { mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9342;
const userscript = readFileSync('D:\\CG\\ashfall-trainer.user.js', 'utf8').replace(/\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==\s*/, '');
const profile = mkdtempSync(join(tmpdir(), 'ashfall-ts-'));
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
  '--no-first-run', '--no-default-browser-check', '--enable-unsafe-swiftshader', '--use-angle=swiftshader',
  'about:blank'], { stdio: 'ignore' });
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

for (let i = 0; i < 90; i++) { await sleep(1000); if (await ev(`!!document.querySelector('[data-dsh-trainer]')?.shadowRoot`) === true) break; }
await sleep(2000);

// independent probe of the virtual clock our rAF hook produces
const measure = async (r) => {
  await ev(`(function(){var h=document.querySelector('[data-dsh-trainer]').shadowRoot;var s=h.getElementById('rate');s.value=${r};s.dispatchEvent(new Event('input',{bubbles:true}));return 1})()`);
  await sleep(200);
  await ev(`window.__p=null; window.__pReal0=performance.now();
    requestAnimationFrame(function p(ts){
      if(!window.__p) window.__p={a:ts,b:ts,n:0};
      window.__p.b=ts; window.__p.n++;
      if(window.__p.n<300) requestAnimationFrame(p); else window.__p.real1=performance.now();
    }); 1`);
  await sleep(3000);
  return JSON.parse(await ev(`JSON.stringify({
    virtMs: Math.round(window.__p.b-window.__p.a),
    realMs: Math.round((window.__p.real1||performance.now())-window.__pReal0),
    frames: window.__p.n
  })`));
};

console.log('rate 1.0x ->', JSON.stringify(await measure(100)));
console.log('rate 2.0x ->', JSON.stringify(await measure(200)));
console.log('rate 3.0x ->', JSON.stringify(await measure(300)));
console.log('rate 0.5x ->', JSON.stringify(await measure(50)));
console.log('rate 0.1x ->', JSON.stringify(await measure(10)));

// restore & confirm engine time actually tracks the virtual clock
await ev(`(function(){var h=document.querySelector('[data-dsh-trainer]').shadowRoot;var s=h.getElementById('rate');s.value=100;s.dispatchEvent(new Event('input',{bubbles:true}));return 1})()`);
console.log('\nrestored label ->', await ev(`document.querySelector('[data-dsh-trainer]').shadowRoot.getElementById('r-label').textContent`));
const t0 = await ev(`(function(){var b=[...document.querySelectorAll('button')].find(x=>!x.disabled&&/部署/.test(x.textContent));b&&b.click();return 1})()`);
await sleep(4000);
const g0 = await ev(`window.__debugBattle ? window.__debugBattle.time : null`);
await sleep(4000);
const g1 = await ev(`window.__debugBattle ? window.__debugBattle.time : null`);
console.log('game time delta over 4s wall (1x, low-fps headless):', g0 !== null ? (g1 - g0).toFixed(2) : 'n/a');

ws.close(); chrome.kill();
