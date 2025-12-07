export function countPathes(tachyonManifold) {
  const ROWS = tachyonManifold.length;
  const COLUMNS = tachyonManifold[0].length;

  let prevCounts = new Array(COLUMNS).fill(0); // -> [0, 0, 0, ...]
  for (let col = 0; col < COLUMNS; col++) {
    const ch = tachyonManifold[0][col];
    if (ch === '|' || ch === 'S') prevCounts[col] = 1;
  }

  for (let row = 1; row < ROWS; row++) {
    const nextCounts = new Array(COLUMNS).fill(0);

    for (let col = 0; col < COLUMNS; col++) {
      const count = prevCounts[col];
      if (count === 0) continue;

      if (tachyonManifold[row][col] === '^') {
        const left = col - 1;
        const right = col + 1;
        if (left >= 0) nextCounts[left] += count;
        if (right < COLUMNS) nextCounts[right] += count;
      } else {
        nextCounts[col] += count;
      }
    }

    prevCounts = nextCounts;
  }

  let total = 0;
  for (let c = 0; c < COLUMNS; c++) {
    total += prevCounts[c];
  }

  console.log('Total paths:', total);
}
