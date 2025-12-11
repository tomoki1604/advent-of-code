import fs from 'fs';

const filesMap = {
  0: './inputs/input.txt',
  1: './inputs/test-input.txt',
  2: './inputs/test-input-svr.txt',
};
const INPUT = fs.readFileSync(filesMap[0], 'utf-8').trim().split('\n');

// A dictionary with device labels as keys and device outputs as values
const deviceDict = new Map();
for (let str of INPUT) {
  deviceDict.set(str.slice(0, 3), str.slice(4).trim().split(' '));
}

const memory = new Map();

function countPathes(entry_key, flags = [false, false], visited = new Set()) {
  const key = `${entry_key}|${flags[0]}|${flags[1]}`;

  if (memory.has(key)) {
    return memory.get(key);
  }

  if (visited.has(entry_key)) {
    return { ok: 0, bad: 0 };
  }

  const newVisited = new Set(visited);
  newVisited.add(entry_key);

  let ok = 0;
  let bad = 0;

  for (let device of deviceDict.get(entry_key)) {
    let newFlags = [...flags];

    if (device === 'fft') newFlags[0] = true;
    else if (device === 'dac') newFlags[1] = true;

    if (device === 'out') {
      if (newFlags[0] && newFlags[1]) bad++;
      else ok++;
      continue;
    }

    const sub = countPathes(device, newFlags, newVisited);
    ok += sub.ok;
    bad += sub.bad;
  }

  const result = { ok, bad };
  memory.set(key, result);
  return result;
}

// Output
console.log('number of pathes =', countPathes('you'));
