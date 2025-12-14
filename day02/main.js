import fs from 'fs';

const INPUT_FILES = {
  input: './inputs/input.txt',
  test: './inputs/test-input.txt',
};

const STRING_RANGES = fs
  .readFileSync(INPUT_FILES.input, 'utf-8')
  .split(',')
  .map((s) => s.trim());

function accSillyPatterns() {
  let part1Sum = 0;
  let part2Sum = 0;

  for (const range of STRING_RANGES) {
    const [startID, endID] = range.split('-').map(Number);

    for (let id = startID; id <= endID; id++) {
      const str = id.toString();

      // PART 1 (left and right halves are equal)
      if (str.length % 2 === 0) {
        const half = str.length / 2;
        const left = str.slice(0, half);
        const right = str.slice(half);

        if (left === right) {
          part1Sum += id;
        }
      }

      // PART 2 (repeating pattern)
      const [hasPattern, times] = findPattern(str);
      if (hasPattern && times >= 2) {
        part2Sum += id;
      }
    }
  }

  console.log('Part 1:', part1Sum);
  console.log('Part 2:', part2Sum);
}

function findPattern(str) {
  const n = str.length;

  for (let len = 1; len <= n / 2; len++) {
    if (n % len !== 0) continue;

    const pattern = str.slice(0, len);
    const timesPatternRepeats = n / len;

    if (pattern.repeat(n / len) === str) {
      return [true, timesPatternRepeats];
    }
  }

  return [false, null, 0];
}

accSillyPatterns();
