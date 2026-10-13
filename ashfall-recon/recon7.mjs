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

// A) Iu 全部预设定义：搜 dev.squad / dev.boss / dev.pet / dev.tools / dev.sandbox
for (const key of ['dev.squad', 'dev.boss', 'dev.pet', 'dev.tools', 'dev.sandbox', 'dev.endless']) {
  i = s.indexOf(key);
  P('\n=== search ' + key + ' -> ' + i);
  if (i >= 0) slice(key, i, 1200, 400);
}

// B) 宿主实例 Lu / 调用点
i = -1; n = 0;
while ((i = s.indexOf('Lu({', i + 1)) !== -1 && n < 3) { n++; slice('Lu({ #' + n, i, 400, 900); }

// C) 模块等级设置函数（bu 语义）
for (const pat of ['function bu(', 'bu=function', 'setModuleLevel', 'moduleLevel']) {
  i = s.indexOf(pat);
  P('\n=== search ' + pat + ' -> ' + i);
  if (i >= 0) slice(pat, i, 300, 900);
}

// D) spawn boss / adoptPet 相关
for (const pat of ['Ou=', 'function Ou(', 'adoptPet(']) {
  i = s.indexOf(pat);
  P('\n=== search ' + pat + ' -> ' + i);
  if (i >= 0) slice(pat, i, 200, 700);
}

fs.writeFileSync('D:/CG/ashfall-recon/out7.txt', out.join('\n'), 'utf8');
console.log('written', out.join('\n').length);
