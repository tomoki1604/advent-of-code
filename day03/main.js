import fs from 'fs';

const INPUT_FILES = {
  input: './inputs/input.txt',
  test: './inputs/test-input.txt',
};
const DIGITS = 12; // 2 digits for Part One, 12 for Part Two

const joltageRatings = readLines(INPUT_FILES.input);

console.log('Total joltage = ', calculateTotalJoltage(joltageRatings));

/* HELPERS */

function readLines(filePath) {
  return fs.readFileSync(filePath, 'utf-8').trim().split('\n');
}

function calculateTotalJoltage(ratings) {
  let totalJoltage = 0;

  for (const rating of ratings) {
    const maxNumber = getMaxNumber(rating);
    totalJoltage += Number(maxNumber);
  }

  return totalJoltage;
}

function getMaxNumber(rating) {
  let result = '';
  let startSlice = 0;
  let endSlice = rating.length - (DIGITS - 1);

  while (result.length < DIGITS) {
    const slice = rating.slice(startSlice, endSlice);
    const [maxDigit, maxIndex] = findMaxDigit(slice);

    result += maxDigit;
    startSlice += maxIndex + 1;
    endSlice += 1;
  }

  return result;
}

function findMaxDigit(str) {
  let maxDigit = null;
  let maxDigitIndex = 0;

  for (let i = 0; i < str.length; i++) {
    const digit = Number(str[i]);

    if (digit > maxDigit) {
      maxDigit = digit;
      maxDigitIndex = i;
    }
  }

  return [maxDigit, maxDigitIndex];
}
