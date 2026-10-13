import fs from 'node:fs';

const F = 'D:/CG/ashfall-recon/battle-ui-C33BOuNm.js';
const s = fs.readFileSync(F, 'utf8');
const out = [];
const P = (...a) => out.push(a.join(' '));
function slice(label, idx, before, after) {
  P('\n########## ' + label + ' @' + idx + ' ##########');
  P(s.slice(Math.max(0, idx - before), idx + after));
}
let i, n;

for (const pat of ['/api/scores', '/api/results', 'sc-shooter-outbox', 'sc-shooter-board-copy']) {
  i = -1; n = 0;
  while ((i = s.indexOf(pat, i + 1)) !== -1 && n < 3) { n++; slice(pat + ' #' + n, i, 1400, 1400); }
}

// battle-ui 里所有 fetch / 网络调用点
i = -1; n = 0;
while ((i = s.indexOf('fetch(', i + 1)) !== -1 && n < 8) { n++; slice('fetch #' + n, i, 500, 700); }

// 导出表：定位 b / Q
i = -1; n = 0;
while ((i = s.indexOf('export{', i + 1)) !== -1 && n < 4) { n++; slice('export #' + n, i, 50, 900); }

fs.writeFileSync('D:/CG/ashfall-recon/out13.txt', out.join('\n'), 'utf8');
console.log('len', out.join('\n').length);
