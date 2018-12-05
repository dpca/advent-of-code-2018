import * as fs from 'fs';
import * as path from 'path';

export function getInputData() {
  const inputFile = path.join(__dirname, 'input.txt');
  const inputData = fs
    .readFileSync(inputFile)
    .toString()
    .split('\n');
  // Remove last line which is null
  inputData.pop();
  return inputData;
}

export function changeFrequency(frequency: number, line: string) {
  const value = Number(line.slice(1));
  if (line.startsWith('+')) {
    return frequency + value;
  }
  return frequency - value;
}
