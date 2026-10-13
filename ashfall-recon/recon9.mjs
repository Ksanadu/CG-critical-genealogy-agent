import fs from 'node:fs';

const F = 'D:/CG/ashfall-recon/RoomEnvironment-CuqGRA18.js';
const s = fs.readFileSync(F, 'utf8');
const out = [];
const P = (...a) => out.push(a.join(' '));
function slice(label, idx, before, after) {
  P('\n########## ' + label + ' @' + idx + ' ##########');
  P(s.slice(Math.max(0, idx - before), idx + after));
}
let i, n;

// G 模块表：requires: 只应出现在这里
i = -1; n = 0;
while ((i = s.indexOf('requires:', i + 1)) !== -1 && n < 6) { n++; slice('requires #' + n, i, 500, 700); }

// Tu 定义
for (const pat of ['function Tu(', 'Tu=(', ',Tu=', 'Du=(', 'function Du(']) {
  i = s.indexOf(pat);
  if (i >= 0) slice('DEF ' + pat, i, 200, 460);
}
// Tu 的实际声明（可能是 var 序列）
i = s.indexOf('Tu=');
while (i !== -1 && !/[,;\s]Tu\s*=/.test(s.slice(Math.max(0, i - 2), i + 4))) i = s.indexOf('Tu=', i + 1);
if (i >= 0) slice('Tu= real', i, 300, 400);

// sandbox 面板按钮属性
for (const pat of ['data-max', 'data-card', 'data-add', 'data-clear']) {
  i = -1; n = 0;
  while ((i = s.indexOf(pat, i + 1)) !== -1 && n < 2) { n++; slice(pat, i, 400, 300); }
}

fs.writeFileSync('D:/CG/ashfall-recon/out9.txt', out.join('\n'), 'utf8');
console.log('len', out.join('\n').length);
