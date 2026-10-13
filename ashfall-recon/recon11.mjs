import fs from 'node:fs';

const F = 'D:/CG/ashfall-recon/game-DBHnnZI4.js';
const s = fs.readFileSync(F, 'utf8');
const out = [];
const P = (...a) => out.push(a.join(' '));
function slice(label, idx, before, after) {
  P('\n########## ' + label + ' @' + idx + ' ##########');
  P(s.slice(Math.max(0, idx - before), idx + after));
}

// 1) 所有 /api 路径（模板串也要）
const apis = new Set();
for (const m of s.matchAll(/\/api\/[A-Za-z0-9_\-/$.{}]*/g)) apis.add(m[0]);
P('=== 全部 /api 路径 ===');
P([...apis].join('\n'));

// 2) 所有 sc-shooter-* 键
const keys = new Set();
for (const m of s.matchAll(/sc-shooter-[a-z0-9\-]*/g)) keys.add(m[0]);
P('\n=== 全部本地存储键 ===');
P([...keys].join('\n'));

// 3) outbox 入队/发送
let i, n;
for (const pat of ['function pt(', 'pt=', 'function ft(', 'ft=', 'function de(', 'de=']) {
  i = s.indexOf(pat);
  if (i >= 0) slice('DEF ' + pat, i, 150, 600);
}

// 4) 提交/排队关键调用点
for (const pat of ['Outbox not sent', 'board.tampered', 'qualify', 'submitted', 'localRank']) {
  i = s.indexOf(pat);
  if (i >= 0) slice('SITE ' + pat, i, 700, 500);
}

fs.writeFileSync('D:/CG/ashfall-recon/out11.txt', out.join('\n'), 'utf8');
console.log('len', out.join('\n').length);
