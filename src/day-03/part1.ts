/*
--- Day 3: No Matter How You Slice It ---

The Elves managed to locate the chimney-squeeze prototype fabric for Santa's suit (thanks to someone who helpfully wrote its box IDs on the wall of the warehouse in the middle of the night). Unfortunately, anomalies are still affecting them - nobody can even agree on how to cut the fabric.

The whole piece of fabric they're working on is a very large square - at least 1000 inches on each side.

Each Elf has made a claim about which area of fabric would be ideal for Santa's suit. All claims have an ID and consist of a single rectangle with edges parallel to the edges of the fabric. Each claim's rectangle is defined as follows:

    The number of inches between the left edge of the fabric and the left edge of the rectangle.
    The number of inches between the top edge of the fabric and the top edge of the rectangle.
    The width of the rectangle in inches.
    The height of the rectangle in inches.

A claim like #123 @ 3,2: 5x4 means that claim ID 123 specifies a rectangle 3 inches from the left edge, 2 inches from the top edge, 5 inches wide, and 4 inches tall. Visually, it claims the square inches of fabric represented by # (and ignores the square inches of fabric represented by .) in the diagram below:

...........
...........
...#####...
...#####...
...#####...
...#####...
...........
...........
...........

The problem is that many of the claims overlap, causing two or more claims to cover part of the same areas. For example, consider the following claims:

#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2

Visually, these claim the following areas:

........
...2222.
...2222.
.11XX22.
.11XX22.
.111133.
.111133.
........

The four square inches marked with X are claimed by both 1 and 2. (Claim 3, while adjacent to the others, does not overlap either of them.)

If the Elves all proceed with their own plans, none of them will have enough fabric. How many square inches of fabric are within two or more claims?
*/

import * as path from 'path';

import { getInputData } from '../lib';

export type Claim = {
  id: number;
  left: number;
  top: number;
  width: number;
  height: number;
};

type Fabric = number[][];

const FABRIC_WIDTH = 1000;
const FABRIC_HEIGHT = 1000;

function parseInput(line: string): Claim {
  const match = line.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/);
  if (!match) {
    throw new Error(`Could not parse line ${line}`);
  }
  return {
    id: Number(match[1]),
    left: Number(match[2]),
    top: Number(match[3]),
    width: Number(match[4]),
    height: Number(match[5]),
  };
}

export function getClaims(): Claim[] {
  const inputData = getInputData(path.join(__dirname, 'input.txt'));
  return inputData.map(parseInput);
}

export function makeFabric(): Fabric {
  // 2D array of fabric
  return Array.from(Array(FABRIC_WIDTH), () => Array(FABRIC_HEIGHT).fill(0));
}

export function claimPositions(claim: Claim): { x: number; y: number }[] {
  const positions = [];
  [...Array(claim.width)].forEach((_, x) => {
    [...Array(claim.height)].forEach((_, y) => {
      positions.push({ x: claim.left + x, y: claim.top + y });
    });
  });
  return positions;
}

export function addClaimsToFabric(fabric: Fabric, claims: Claim[]): void {
  claims.forEach((claim) => {
    claimPositions(claim).forEach(({ x, y }) => {
      fabric[x][y] += 1;
    });
  });
}

function findOverlappingFabric(): number {
  const claims = getClaims();
  const fabric = makeFabric();
  addClaimsToFabric(fabric, claims);

  return fabric.reduce(
    (count, rows) =>
      count +
      rows.reduce((rowCount, position) => {
        // if a square of fabric has more than one claim, count it towards the total
        if (position > 1) {
          return rowCount + 1;
        }
        return rowCount;
      }, 0),
    0
  );
}

if (require.main === module) {
  console.log(
    `Square inches within two or more claims: ${findOverlappingFabric()}`
  );
}
