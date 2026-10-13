import fs from 'node:fs';

const G = 'D:/CG/ashfall-recon/game-DBHnnZI4.js';
const B = 'D:/CG/ashfall-recon/battle-ui-C33BOuNm.js';
const g = fs.readFileSync(G, 'utf8');
const b = fs.readFileSync(B, 'utf8');
const out = [];
const P = (...a) => out.push(a.join(' '));
function slice(src, label, idx, before, after) {
  P('\n########## ' + label + ' @' + idx + ' ##########');
  P(src.slice(Math.max(0, idx - before), idx + after));
}
let i, n;

// battle-ui 完整 export 表 -> Su / Cu / bu / wu / yu 的导出名
const ex = b.slice(b.lastIndexOf('export{'));
for (const v of ['Su', 'Cu', 'bu', 'wu', 'yu', 'xu', 'du', 'pu']) {
  const m = ex.match(new RegExp(`(?:^|[,{])\\s*${v}\\s+as\\s+([A-Za-z0-9_$]+)`));
  P(`export ${v} -> ${m ? m[1] : '(not exported)'}`);
}

// game.js 里 Ft 的全部出现
i = -1; n = 0;
while ((i = g.indexOf('Ft', i + 1)) !== -1 && n < 25) {
  n++;
  const c = g.slice(Math.max(0, i - 120), i + 120);
  if (/await\s+Ft|\bFt\s*=|,\s*Ft\b|Ft\s*\)|Ft\b[^A-Za-z0-9_$]/.test(c)) slice(g, 'Ft #' + n, i, 260, 300);
}

// 结算 / 提交触发链
for (const pat of ['await Ft', 'Ne()', 'o({name', 'Outbox not sent', 'function Ir(', 'async function Ir(']) {
  i = -1; n = 0;
  while ((i = g.indexOf(pat, i + 1)) !== -1 && n < 3) { n++; slice(g, pat + ' #' + n, i, 800, 900); }
}

fs.writeFileSync('D:/CG/ashfall-recon/out15.txt', out.join('\n'), 'utf8');
console.log('len', out.join('\n').length);
