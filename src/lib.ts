import * as fs from 'fs';
import * as path from 'path';

export function getInputData(inputFile: string): string[] {
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

export function objectValues<Val>(obj: { [key: string]: Val }): Val[] {
  return Object.keys(obj).map((key) => obj[key]);
}
