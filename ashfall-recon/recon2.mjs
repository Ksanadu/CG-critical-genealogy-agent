import fs from 'node:fs';
const src = ['game-DBHnnZI4.js', 'battle-ui-C33BOuNm.js'].map(f => fs.readFileSync(f, 'utf8')).join('\n@@\n');

function ctx(re, before, after, limit = 8, label = '') {
  console.log('\n##### ' + label + ' #####');
  const g = new RegExp(re.source, 'g');
  let m, n = 0;
  while ((m = g.exec(src)) && n++ < limit) {
    console.log('--- @' + m.index + ' ---');
    console.log(src.slice(Math.max(0, m.index - before), m.index + m[0].length + after));
  }
}

ctx(/window\.__battle\s*=\s*Object\.freeze\(/, 100, 1200, 2, 'BATTLE_PUBLIC_API');
ctx(/function Bt\s*\(\)\s*\{/, 400, 900, 2, 'DEBUG_GATE');
ctx(/__debugBattle\s*=\s*L/, 900, 300, 3, 'DEBUG_GATE_SITE');
ctx(/(?:snapshot)\s*\(\)\s*\{\s*return/, 200, 900, 5, 'SNAPSHOT_IMPL');
