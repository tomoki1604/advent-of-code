import fs from 'fs';

const INPUT_FILES = {
  input: './inputs/input.txt',
  test: './inputs/test-input.txt',
};
const INPUT = fs.readFileSync(INPUT_FILES.input, 'utf-8').trim().split('\n');

const DIAL_SIZE = 100; // 0-99

const safe = {
  dial: 50,
  timesStoppedAtZero: 0,
  timesPassedZero: 0,

  rotateDial(direction, distance) {
    if (direction === 'R') {
      this.timesPassedZero += Math.floor((this.dial + distance) / DIAL_SIZE);

      this.dial = (this.dial + distance) % DIAL_SIZE;
    } else if (direction === 'L') {
      // Used % DIAL_SIZE to handle the case when this.dial === 0
      this.timesPassedZero += Math.floor(
        ((Math.abs(this.dial - DIAL_SIZE) % DIAL_SIZE) + distance) / DIAL_SIZE
      );

      this.dial = DIAL_SIZE + ((this.dial - distance) % DIAL_SIZE);
      this.dial %= DIAL_SIZE;
    }

    if (this.dial === 0) this.timesStoppedAtZero++;
  },
};

for (const line of INPUT) {
  const [direction, distance] = [line.slice(0, 1), Number(line.slice(1))];

  safe.rotateDial(direction, distance);
}

console.log(`timesStoppedAtZero: ${safe.timesStoppedAtZero}`);
console.log(`timesPassedZero: ${safe.timesPassedZero}`);
