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

// bu 定义：尝试多种写法
for (const pat of [',bu=', ';bu=', 'function bu', 'bu', 'growCard', 'cardCap']) {
  i = -1; n = 0;
  while ((i = s.indexOf(pat, i + 1)) !== -1 && n < 3) {
    n++;
    // 只显示看起来像定义的
    const ctx = s.slice(Math.max(0, i - 120), i + 260);
    if (/bu\s*=|function\s+bu/.test(ctx)) slice('DEF ' + pat + ' #' + n, i, 160, 420);
  }
}

// .modules 用法
i = -1; n = 0;
while ((i = s.indexOf('.modules', i + 1)) !== -1 && n < 14) {
  n++;
  slice('modules #' + n, i, 200, 300);
}

// G 模块表（找 cap: 定义）
i = -1; n = 0;
while ((i = s.indexOf('cap:', i + 1)) !== -1 && n < 10) {
  n++;
  slice('cap: #' + n, i, 400, 500);
}

fs.writeFileSync('D:/CG/ashfall-recon/out8.txt', out.join('\n'), 'utf8');
console.log('len', out.join('\n').length, 'hits', n);
