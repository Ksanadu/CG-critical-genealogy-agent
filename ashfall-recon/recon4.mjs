import fs from 'node:fs';
const src = ['game-DBHnnZI4.js', 'battle-ui-C33BOuNm.js'].map(f => fs.readFileSync(f, 'utf8')).join('\n@@\n');

function hits(re, before, after, limit, label) {
  console.log('\n##### ' + label + ' #####');
  const g = new RegExp(re.source, 'g');
  let m, n = 0;
  while ((m = g.exec(src)) && n++ < limit) {
    console.log('--- @' + m.index + ' ---');
    console.log(src.slice(Math.max(0, m.index - before), m.index + m[0].length + after).replace(/\n/g, '⏎'));
  }
}

hits(/\bBt\b/, 100, 160, 14, 'ALL_BT_REFS');
hits(/function\s+Bt|\bBt\s*=\s*(?:function|\()/, 0, 500, 6, 'BT_DECL');
hits(/\bEt\s*=\s*(?:function|\()|function\s+Et\s*\(/, 0, 600, 4, 'CMD_CHANNEL_Et');
hits(/\bXr\s*=\s*(?:function|\()|function\s+Xr\s*\(/, 0, 300, 3, 'SQUAD_PARSER_Xr');
hits(/(?:var|let|const)\s+Yr\s*=/, 0, 500, 3, 'ENEMY_LIST_Yr');
