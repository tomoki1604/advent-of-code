import fs from 'fs';
const INPUT = fs
  .readFileSync('input.txt', 'utf-8')
  .split('\n')
  .filter((line) => line.trim() !== '');

function partTwo(input) {
  let total = 0;

  const widths = getChunksWidths(input.at(-1)); // -> ex. [ 3, 3, 3, 2 ]
  widths[widths.length - 1] += 1; // -> ex. [ 3, 3, 3, 3]
  const operations = input.at(-1).trim().split(/\s+/); // -> ex. ['*', '+', '*', '+']

  let startPoint = 0;
  for (let chunk = 0; chunk < widths.length; chunk++) {
    let sum = 0;
    let mult = 1;

    for (let i = startPoint; i < startPoint + widths[chunk]; i++) {
      let number = '';

      for (let j = 0; j < input.length - 1; j++) {
        number += input[j][i];
      }

      if (operations[chunk] === '+') {
        sum += Number(number); // somthing like parseInt()
      } else if (operations[chunk] === '*') {
        mult *= Number(number);
      }
    }
    startPoint += widths[chunk] + 1;

    if (operations[chunk] === '+') {
      total += sum;
    } else if (operations[chunk] === '*') {
      total += mult;
    }
  }

  console.log('Part Two: ', total);
}

function getChunksWidths(opsList) {
  const widthsList = [];

  let opsCounter = 0;
  let widthCounter = 0;

  for (let i = 0; i < opsList.length; i++) {
    if (opsList[i] === '*' || opsList[i] === '+') {
      if (opsCounter === 1) {
        widthsList.push(widthCounter - 1);
        opsCounter = 0;
        widthCounter = 0;
      }
      opsCounter++;
    }
    widthCounter++;
  }

  if (opsCounter === 1) {
    widthsList.push(widthCounter - 1);
  }

  return widthsList;
}

function partOne(input) {
  input = input.map((str) => str.trim().split(/\s+/));
  let total = 0;

  for (let i = 0; i < input[0].length; i++) {
    const tempList = [];
    for (let j = 0; j < input.length; j++) {
      tempList.push(input[j][i]);
    }
    total += calculateColumn(tempList);
  }

  console.log('Part One: ', total);
}

function calculateColumn(columnValues) {
  let sumResult = 0;
  let multResult = 1;
  let operation = columnValues.at(-1);

  if (operation === '+') {
    for (let i = 0; i < columnValues.length - 1; i++) {
      sumResult += parseInt(columnValues[i]);
    }
    return sumResult;
  } else if (operation === '*') {
    for (let i = 0; i < columnValues.length - 1; i++) {
      multResult *= parseInt(columnValues[i]);
    }
    return multResult;
  }
}

partOne(INPUT);
partTwo(INPUT);
