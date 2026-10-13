import fs from 'node:fs';

const files = ['game-DBHnnZI4.js', 'battle-ui-C33BOuNm.js'];
const src = files.map(f => fs.readFileSync(f, 'utf8')).join('\n@@FILE@@\n');

function grab(re, before = 40, after = 60, limit = 60) {
  const out = new Set();
  const g = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g');
  let m;
  while ((m = g.exec(src)) && out.size < limit) {
    const s = Math.max(0, m.index - before);
    out.add(src.slice(s, m.index + m[0].length + after).replace(/\n/g, '\\n'));
  }
  return [...out];
}

function show(title, re, before, after, limit) {
  console.log('\n===== ' + title + ' =====');
  for (const l of grab(re, before, after, limit)) console.log(l);
}

show('STORAGE_API', /(localStorage|indexedDB|sessionStorage)/, 40, 70, 40);
show('SC_SHOOTER_KEYS', /sc-shooter[A-Za-z0-9_-]{0,45}/, 10, 60, 30);
show('OUTBOX', /outbox/, 80, 120, 10);
show('WINDOW_ASSIGN', /window\.[A-Za-z_$][\w$]{2,30}\s*=[^=]/, 20, 40, 40);
console.log('\n===== FILES =====');
for (const f of files) console.log(f, fs.statSync(f).size);
