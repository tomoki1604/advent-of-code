import fs from 'fs';

const INPUT_FILES = {
  input: './inputs/input.txt',
  test: './inputs/test-input.txt',
};
const { ids, ranges } = parseInput(INPUT_FILES.input);

const partOne = countIdsInRanges(ids, ranges);
const optimizedRanges = optimizeRanges(ranges);
const partTwo = countTotalRangeSize(optimizedRanges);

console.log('New optimized ranges:', optimizedRanges);
console.log('Part One:', partOne);
console.log('Part Two:', partTwo);

/* HELPERS */

function parseInput(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8').trim();
  const [rangesBlock, idsBlock] = content.split(/\r?\n\r?\n/);

  const ranges = rangesBlock
    .split('\n')
    .map((line) => line.split('-').map(Number));

  const ids = idsBlock.split('\n').map(Number);

  return { ids, ranges };
}

function countTotalRangeSize(ranges) {
  let total = 0;

  for (const [start, end] of ranges) {
    total += end - start + 1;
  }

  return total;
}

function countIdsInRanges(ids, ranges) {
  let counter = 0;

  for (const id of ids) {
    for (const range of ranges) {
      const [left, right] = range;

      if (left <= id && id <= right) {
        counter++;
        break;
      }
    }
  }

  return counter;
}

function optimizeRanges(ranges) {
  ranges.sort((a, b) => a[0] - b[0]);
  let newRanges = [];
  let foundPlace = false;

  for (let i = 0; i < ranges.length; i++) {
    for (let j = i + 1; j < ranges.length; j++) {
      if (ranges[i][1] >= ranges[j][0] && ranges[i][1] <= ranges[j][1]) {
        newRanges.push([ranges[i][0], ranges[j][1]]);
        i++;
        foundPlace = true;
        break;
      } else if (ranges[i][0] <= ranges[j][0] && ranges[i][1] >= ranges[j][1]) {
        newRanges.push(ranges[i]);
        i++;
        foundPlace = true;
        break;
      }
    }
    if (!foundPlace) newRanges.push(ranges[i]);
    foundPlace = false;
  }

  if (ranges.length === newRanges.length) {
    return newRanges;
  }

  return optimizeRanges(newRanges);
}
