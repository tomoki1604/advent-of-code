import fs from 'fs';

const INPUT_FILES = {
  input: './inputs/input.txt',
  test: './inputs/test-input.txt',
};

const PART = 2; // 1 for Part One, 2 for Part Two
const rollsGrid = readLines(INPUT_FILES.input);

const totalRolls = countTotalRolls(rollsGrid);
console.log('totalRolls = ', totalRolls);

/* HELPERS */

function readLines(filePath) {
  return fs.readFileSync(filePath, 'utf-8').trim().split('\n');
}

function countTotalRolls(grid) {
  const newGrid = [];
  let accessibleRolls = 0;

  for (let row = 0; row < grid.length; row++) {
    newGrid[row] = '';
    for (let column = 0; column < grid[row].length; column++) {
      if (isRollAccessible([row, column], grid)) {
        accessibleRolls++;
        newGrid[row] += 'x';
      } else {
        newGrid[row] += grid[row][column];
      }
    }
  }

  if (accessibleRolls === 0) return 0; // stop recursion

  const nextRolls = PART !== 1 ? countTotalRolls(newGrid) : 0;

  return accessibleRolls + nextRolls;
}

function isRollAccessible([row, column], grid) {
  // check is roll (@) even present
  if (grid[row][column] !== '@') return false;

  // count neighbors of a roll (@)
  return countNeighbors([row, column], grid) <= 4;
}

function countNeighbors([row, column], grid, target = '@') {
  let count = 0;

  for (let i = -1; i <= 1; i++) {
    if (!grid[row + i]) continue;
    for (let j = -1; j <= 1; j++) {
      if (grid[row + i][column + j] === target) count++;
    }
  }

  return count;
}
