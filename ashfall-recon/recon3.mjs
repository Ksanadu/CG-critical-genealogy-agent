import fs from 'node:fs';
const src = ['game-DBHnnZI4.js', 'battle-ui-C33BOuNm.js'].map(f => fs.readFileSync(f, 'utf8')).join('\n@@\n');

function ctx(re, before, after, limit = 6, label = '') {
  console.log('\n##### ' + label + ' #####');
  const g = new RegExp(re.source, 'g');
  let m, n = 0;
  while ((m = g.exec(src)) && n++ < limit) {
    console.log('--- @' + m.index + ' ---');
    console.log(src.slice(Math.max(0, m.index - before), m.index + m[0].length + after).replace(/\n/g, '⏎'));
  }
}

ctx(/(?:var|let|const|,)\s*Bt\s*=/g, 0, 320, 4, 'BT_DEF');
ctx(/(?:var|let|const|,)\s*Gm\s*=/g, 0, 400, 4, 'GM_DEF');
ctx(/(?:var|let|const|,)\s*Km\s*=/g, 0, 400, 4, 'KM_DEF');
ctx(/(?:var|let|const|,)\s*Wm\s*=/g, 0, 400, 4, 'WM_DEF');
ctx(/Zr\s*=\s*\(?[a-z]?\)?\s*=>\s*\{/, 0, 700, 4, 'SEARCH_PARSER_Zr');
ctx(/function Zr\s*\(/, 0, 700, 3, 'SEARCH_PARSER_FN');
