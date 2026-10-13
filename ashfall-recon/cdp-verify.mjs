// CDP verification: does hijacking the hostname regex gate unlock the game's dev handles?
import { spawn } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9333;
const TARGET = process.argv[2] || 'https://starcraft-shooter-2026.pages.dev/?debug';
const USE_HOOK = process.argv[3] !== 'nohook';

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

const profile = mkdtempSync(join(tmpdir(), 'ashfall-'));
const chrome = spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
  '--no-first-run', '--no-default-browser-check', '--disable-extensions',
  '--enable-unsafe-swiftshader', '--use-angle=swiftshader',
  '--window-size=1280,800', 'about:blank'
], { stdio: 'ignore' });

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function version() {
  for (let i = 0; i < 40; i++) {
    try { const r = await fetch(`http://127.0.0.1:${PORT}/json/version`); if (r.ok) return await r.json(); }
    catch {}
    await sleep(250);
  }
  throw new Error('chrome devtools not reachable');
}

const info = await version();
const ws = new WebSocket(info.webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

let seq = 0;
const pending = new Map();
ws.onmessage = ev => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
};
function send(method, params = {}, sessionId) {
  const id = ++seq;
  return new Promise(res => {
    pending.set(id, res);
    ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
  });
}

const { result: { targetId } } = await send('Target.createTarget', { url: 'about:blank' });
const { result: { sessionId } } = await send('Target.attachToTarget', { targetId, flatten: true });
const S = (m, p) => send(m, p, sessionId);

await S('Page.enable');
await S('Runtime.enable');
if (USE_HOOK) await S('Page.addScriptToEvaluateOnNewDocument', { source: GATE_HOOK });
await S('Page.navigate', { url: TARGET });

const evalJs = async (expr) => {
  const r = await S('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
  return r.result?.result?.value ?? r.result?.exceptionDetails?.text ?? null;
};

console.log('hook:', USE_HOOK, 'url:', TARGET);
let probe = null;
for (let i = 0; i < 60; i++) {
  await sleep(1000);
  probe = await evalJs(`JSON.stringify({
    gateBypassed: window.__gateBypassed||0,
    debugBattle: typeof window.__debugBattle,
    debugScene: typeof window.__debugScene,
    debugSound: typeof window.__debugSound,
    battle: typeof window.__battle,
    labHidden: document.getElementById('lab-link')?.hidden ?? 'no-el',
    perf: (document.getElementById('performance')||{}).className||'',
    presets: document.querySelectorAll('.dev-presets button').length,
    deployBar: !!document.querySelector('.deployment-controls'),
    loading: (document.getElementById('loading')||{}).className||''
  })`);
  const p = probe ? JSON.parse(probe) : {};
  if (p.debugBattle === 'object' || i === 59) { console.log('after', i + 1, 's:', probe); break; }
}

if (USE_HOOK) {
  const snap = await evalJs(`(function(){try{return JSON.stringify(window.__battle.snapshot()).slice(0,900)}catch(e){return 'ERR '+e.message}})()`);
  console.log('\nSNAPSHOT:', snap);
}

ws.close();
chrome.kill();
console.log('\n[profile]', profile);
