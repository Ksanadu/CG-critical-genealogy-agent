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

// Su / Cu / bu / wu 的实际调用点（提交成绩的触发处）
for (const pat of ['Su(', 'Cu(', 'wu(', 'bu(']) {
  i = -1; n = 0;
  while ((i = s.indexOf(pat, i + 1)) !== -1 && n < 6) {
    n++;
    // 只要不是定义本身
    const before = s.slice(Math.max(0, i - 90), i);
    if (/var (Su|Cu|wu|bu)\s*=$|function (Su|Cu|wu|bu)\($/.test(before)) continue;
    slice('CALL ' + pat + ' #' + n, i, 900, 900);
  }
}

// 身份 token / run key 生成
for (const pat of ['token', 'crypto.randomUUID', 'runKey', 'attempt']) {
  i = -1; n = 0;
  while ((i = s.indexOf(pat, i + 1)) !== -1 && n < 4) { n++; slice(pat + ' #' + n, i, 500, 500); }
}

// 名字校验 / 资格
for (const pat of ['nameMax', 'board.qualify', 'board.tampered', 'isSafeInteger']) {
  i = -1; n = 0;
  while ((i = s.indexOf(pat, i + 1)) !== -1 && n < 3) { n++; slice(pat + ' #' + n, i, 400, 600); }
}

fs.writeFileSync('D:/CG/ashfall-recon/out14.txt', out.join('\n'), 'utf8');
console.log('len', out.join('\n').length);
