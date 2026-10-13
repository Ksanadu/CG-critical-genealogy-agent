import fs from 'node:fs';
const g = fs.readFileSync('game-DBHnnZI4.js', 'utf8');
const b = fs.readFileSync('battle-ui-C33BOuNm.js', 'utf8');

function decls(src, name, tag) {
  const re = new RegExp('[,;{(]\\s*' + name + '\\s*=\\s*\\[[^\\]]{0,240}\\]', 'g');
  const out = [...src.matchAll(re)].slice(0, 4).map(m => tag + ' ' + m[0]);
  console.log(out.length ? out.join('\n') : tag + ' <not found>');
}
console.log('##### Kr (keyboard event list?) #####');
decls(g, 'Kr', 'GAME:'); decls(b, 'Kr', 'BU:');

function evTypes(src, tag) {
  const counts = {};
  for (const m of src.matchAll(/addEventListener\(\s*[`'"]([a-zA-Z]+)[`'"]/g)) counts[m[1]] = (counts[m[1]] || 0) + 1;
  console.log('\n##### ' + tag + ' #####');
  console.log(Object.entries(counts).sort((a, c) => c[1] - a[1]).map(([k, v]) => k + '×' + v).join('  '));
}
evTypes(g, 'game.js listeners');
evTypes(b, 'battle-ui listeners');

console.log('\n##### window-level listeners in game.js #####');
for (const m of g.matchAll(/window\.addEventListener\([^)]{0,80}\)/g)) console.log(m[0]);
console.log('\n##### key handling / Ke #####');
for (const m of [...g.matchAll(/.{140}Ke\.has.{0,60}/g)].slice(0, 3)) console.log('---\n' + m[0]);
