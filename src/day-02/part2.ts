/*
--- Part Two ---

Confident that your list of box IDs is complete, you're ready to find the boxes full of prototype fabric.

The boxes will have IDs which differ by exactly one character at the same position in both strings. For example, given the following box IDs:

abcde
fghij
klmno
pqrst
fguij
axcye
wvxyz

The IDs abcde and axcye are close, but they differ by two characters (the second and fourth). However, the IDs fghij and fguij differ by exactly one character, the third (h and u). Those must be the correct boxes.

What letters are common between the two correct box IDs? (In the example above, this is found by removing the differing character from either ID, producing fgij.)
*/

import * as path from 'path';

import { getInputData } from '../lib';

function zip(...arrays) {
  return arrays[0].map((_, idx) => arrays.map((array) => array[idx]));
}

function hammingDistance(input1: string, input2: string): number {
  return zip(input1.split(''), input2.split('')).reduce(
    (distance, [in1, in2]) => {
      if (in1 === in2) {
        return distance;
      }
      return distance + 1;
    },
    0
  );
}

function getCommonLetters(): string {
  const inputData = getInputData(path.join(__dirname, 'input.txt'));

  let matches = null;
  inputData.some((line) => {
    const match = inputData.find((other) => hammingDistance(line, other) === 1);
    if (match) {
      matches = [line, match];
      return true;
    }
  });

  if (matches) {
    return zip(matches[0].split(''), matches[1].split('')).reduce(
      (str, [in1, in2]) => {
        if (in1 === in2) {
          return str + in1;
        }
        return str;
      },
      ''
    );
  }
}

console.log(`Common letters: ${getCommonLetters()}`);
