import fs from 'fs';

const INPUT_FILES = {
  input: './inputs/input.txt',
  test: './inputs/test-input.txt',
};

const coords = parseCoords(INPUT_FILES.input);
const areas = getAllAreas(coords);

areas.sort((a, b) => b.area - a.area);

// Outputs max area and points which define the max area rectangle
console.log(areas[0]);

/* HELPERS */

function parseCoords(filePath) {
  return fs
    .readFileSync(filePath, 'utf-8')
    .trim()
    .split('\n')
    .map((line) => {
      const [x, y] = line.split(',').map(Number);
      return [x, y];
    });
}

function getAllAreas(coords) {
  const areas = [];

  for (let i = 0; i < coords.length; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      areas.push(createAreaObj(coords[i], coords[j]));
    }
  }

  return areas;
}

function createAreaObj(p1, p2) {
  return {
    p1,
    p2,
    area: calcInclusiveRectArea(p1, p2),
  };
}

function calcInclusiveRectArea(p1, p2) {
  const [x1, y1] = p1;
  const [x2, y2] = p2;

  // adding 1 because we work with an "inclusive grid"
  const length = Math.abs(x1 - x2) + 1;
  const width = Math.abs(y1 - y2) + 1;

  const area = length * width;
  return area;
}
