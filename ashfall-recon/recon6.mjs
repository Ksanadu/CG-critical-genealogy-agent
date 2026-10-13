import fs from 'node:fs';

const F = 'D:/CG/ashfall-recon/RoomEnvironment-CuqGRA18.js';
const s = fs.readFileSync(F, 'utf8');
console.log('file len', s.length);

function slice(label, idx, before, after) {
  console.log('\n########## ' + label + ' @' + idx + ' ##########');
  console.log(s.slice(Math.max(0, idx - before), idx + after));
}

// 1) dev-presets 相关全部出现位置
let i = -1, n = 0;
while ((i = s.indexOf('dev-presets', i + 1)) !== -1 && n < 8) {
  n++;
  slice('dev-presets #' + n, i, 600, 1500);
}

// 2) data-preset
i = -1; n = 0;
while ((i = s.indexOf('data-preset', i + 1)) !== -1 && n < 4) {
  n++;
  slice('data-preset #' + n, i, 300, 700);
}

// 3) pendingLevelUps 全部出现
i = -1; n = 0;
while ((i = s.indexOf('pendingLevelUps', i + 1)) !== -1 && n < 12) {
  n++;
  slice('pendingLevelUps #' + n, i, 250, 400);
}
