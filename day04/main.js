import { input } from './input.js';

const testInput = [
  '..@@.@@@@.',
  '@@@.@.@.@@',
  '@@@@@.@.@@',
  '@.@@@@..@.',
  '@@.@@@@.@@',
  '.@@@@@@@.@',
  '.@.@.@.@@@',
  '@.@@@.@@@@',
  '.@@@@@@@@.',
  '@.@.@@@.@.',
];

const PART = 2; // 1 for Part One, 2 for Part Two
const INPUT = input; // testInput or input (actual puzzle input)

let totalRolls = 0;

function countTotalRolls(input) {
  const newInput = [];
  let accessibleRolls = 0;

  for (let i = 0; i < input.length; i++) {
    newInput[i] = '';
    for (let j = 0; j < input.length; j++) {
      if (input[i][j] === '@' && isAccessible([i, j], input)) {
        accessibleRolls++;
        newInput[i] += 'x';
      } else {
        newInput[i] += input[i][j];
      }
    }
  }

  if (accessibleRolls === 0) return; // stop

  totalRolls += accessibleRolls;
  if (PART !== 1) countTotalRolls(newInput);
}

function isAccessible([row, column], input) {
  let counter = 0;

  for (let i = -1; i <= 1; i++) {
    if (input[row + i] === undefined) continue;
    for (let j = -1; j <= 1; j++) {
      if (input[row + i][column + j] === '@') counter++;
    }
  }

  return counter <= 4 ? true : false;
}

console.time();
countTotalRolls(INPUT);
console.log('totalRolls = ', totalRolls);
console.timeEnd();
