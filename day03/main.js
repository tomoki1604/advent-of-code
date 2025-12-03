import { input } from './input.js';

const testInput = [
  '987654321111111',
  '811111111111119',
  '234234234234278',
  '818181911112111',
];
const DIGITS = 12; // 2 digits for Part One, 12 for Part Two

let totalJoltage = 0;

for (let item of input) {
  let maxNumber = '';

  let startSlice = 0;
  let endSlice = item.length - (DIGITS - 1);

  while (maxNumber.length !== DIGITS) {
    let slice = item.slice(startSlice, endSlice);
    let [maxDigit, maxIndex] = findMaxDigit(slice);

    maxNumber += maxDigit;

    startSlice += maxIndex + 1;
    endSlice += 1;
  }

  totalJoltage += parseInt(maxNumber);
  console.log(maxNumber);
}

console.log('Total joltage = ', totalJoltage);

function findMaxDigit(arr) {
  let maxDigit = null;
  let maxDigitIndex = 0;

  for (let i = 0; i < arr.length; i++) {
    if (parseInt(arr[i]) > maxDigit) {
      maxDigit = parseInt(arr[i]);
      maxDigitIndex = i;
    }
  }

  return [maxDigit, maxDigitIndex];
}
