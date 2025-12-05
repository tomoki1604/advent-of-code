import { input } from './input.js';

const testInput = ['3-5\n10-14\n16-20\n12-18', '1\n5\n8\n11\n17\n32\n'];
const INPUT = input; // testInput or input (actual puzzle input)

// Prepping the input here
let freshIdsRanges = INPUT[0]
  .split('\n')
  .map((range) => [
    parseInt(range.split('-')[0]),
    parseInt(range.split('-')[1]),
  ]); // -> [[3-5], [10-14], ...]
let idsToCheck = INPUT[1].split('\n').map((n) => parseInt(n)); // -> [1, 5, ...]

let freshIdsCounter = 0;

for (let id of idsToCheck) {
  id = parseInt(id);
  for (let range of freshIdsRanges) {
    const [left, right] = range;

    if (left <= id && id <= right) {
      freshIdsCounter++;
      break;
    }
  }
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

let totalFreshIds = 0;
for (let i of optimizeRanges(freshIdsRanges)) {
  totalFreshIds += i[1] - i[0] + 1;
}

// Solution output
console.log(optimizeRanges(freshIdsRanges));
console.log(freshIdsCounter);
console.log(totalFreshIds);
