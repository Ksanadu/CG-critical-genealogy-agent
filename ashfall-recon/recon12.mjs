import fs from 'node:fs';
import path from 'node:path';

const DIR = 'D:/CG/ashfall-recon';
const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.js'));
const out = [];
const P = (...a) => out.push(a.join(' '));

for (const f of files) {
  const p = path.join(DIR, f);
  const s = fs.readFileSync(p, 'utf8');
  const apis = new Set();
  for (const m of s.matchAll(/\/api\/[A-Za-z0-9_\-/$.{}]*/g)) apis.add(m[0]);
  const keys = new Set();
  for (const m of s.matchAll(/sc-shooter-[a-z0-9\-]*/g)) keys.add(m[0]);
  P(`\n===== ${f}  (${s.length} B) =====`);
  P('  /api/  ->', apis.size ? [...apis].join(' | ') : '(none)');
  P('  storage->', keys.size ? [...keys].join(' ') : '(none)');
}

// game.js 的 import 头部
const g = fs.readFileSync(path.join(DIR, 'game-DBHnnZI4.js'), 'utf8');
P('\n===== game.js 开头 import =====');
P(g.slice(0, 1200));

// 找 Ne / Ft 的 import 绑定
for (const name of ['Ne', 'Ft', 'Oa', 'ze', 'Da', 'Ta']) {
  const hits = [];
  for (const m of g.matchAll(new RegExp(`[,{]\\s*${name}\\s+as\\s+([A-Za-z0-9_$]+)`, 'g'))) hits.push(m[0]);
  P(`  import-binding ${name}: ${hits.length ? hits.join(' , ') : '(none)'}`);
}

// 排行榜相关标识符出现次数
P('\n===== 标识符计数（game.js）=====');
for (const name of ['Ne(', 'Ft', 'outbox', 'Outbox', 'leaderboard', 'board/', 'runs', 'submit']) {
  const n = g.split(name).length - 1;
  P(`  ${name.padEnd(14)} x${n}`);
}

fs.writeFileSync(path.join(DIR, 'out12.txt'), out.join('\n'), 'utf8');
console.log('len', out.join('\n').length);
