import { countPathes } from './countPathes.js';
import fs from 'fs';

const INPUT = fs
  .readFileSync('./inputs/input.txt', 'utf-8')
  .split('\n')
  .filter((row) => row.trim() !== '');

runTeleporter(INPUT);

function runTeleporter(input) {
  const tachyonManifold = input.map((row) => [...row]);

  let totalSplits = 0;
  for (let row = 1; row < tachyonManifold.length; row++) {
    // SPLITTERS
    const splittersIndexes = tachyonManifold[row].reduce((indexes, ch, i) => {
      if (ch === '^') indexes.push(i);
      return indexes;
    }, []);
    totalSplits += splittersIndexes.length;

    for (let i = 0; i < splittersIndexes.length; i++) {
      if (tachyonManifold[row - 1][splittersIndexes[i]] !== '|') {
        totalSplits--;
        continue;
      }
      tachyonManifold[row][splittersIndexes[i] - 1] = '|';
      tachyonManifold[row][splittersIndexes[i] + 1] = '|';
    }

    // BEAMS
    const beamsIndexes = tachyonManifold[row - 1].reduce((indexes, ch, i) => {
      if (ch === '|' || ch === 'S') indexes.push(i);
      return indexes;
    }, []);

    for (let i = 0; i < beamsIndexes.length; i++) {
      if (tachyonManifold[row][beamsIndexes[i]] === '^') continue;
      tachyonManifold[row][beamsIndexes[i]] = '|';
    }
  }

  // displayPretty(tachyonManifold);
  console.log('Total splits:', totalSplits);

  countPathes(tachyonManifold);
}

function displayPretty(tachyonManifold) {
  console.log(tachyonManifold.map((ch) => ch.join('')).join('\n'));
}
