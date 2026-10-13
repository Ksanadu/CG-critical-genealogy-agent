import fs from 'node:fs';

const F = 'D:/CG/ashfall-recon/game-DBHnnZI4.js';
const s = fs.readFileSync(F, 'utf8');
const out = [];
const P = (...a) => out.push(a.join(' '));
function slice(label, idx, before, after) {
  P('\n########## ' + label + ' @' + idx + ' ##########');
  P(s.slice(Math.max(0, idx - before), idx + after));
}
let i, n;

// 1) outbox / 提交队列
for (const pat of ['sc-shooter-outbox', 'outbox', 'sc-shooter-local-board', 'sc-shooter-runs']) {
  i = -1; n = 0;
  while ((i = s.indexOf(pat, i + 1)) !== -1 && n < 3) { n++; slice(pat + ' #' + n, i, 400, 900); }
}

// 2) 所有 fetch 调用点
i = -1; n = 0;
while ((i = s.indexOf('fetch(', i + 1)) !== -1 && n < 12) { n++; slice('fetch #' + n, i, 300, 400); }

// 3) 端点常量
for (const pat of ['/api', 'api/', 'https://', 'endpoint', 'leaderboard']) {
  i = -1; n = 0;
  while ((i = s.indexOf(pat, i + 1)) !== -1 && n < 4) { n++; slice(pat + ' #' + n, i, 300, 400); }
}

fs.writeFileSync('D:/CG/ashfall-recon/out10.txt', out.join('\n'), 'utf8');
console.log('len', out.join('\n').length);
