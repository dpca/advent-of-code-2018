/*
--- Part Two ---

Amidst the chaos, you notice that exactly one claim doesn't overlap by even a single square inch of fabric with any other claim. If you can somehow draw attention to it, maybe the Elves will be able to make Santa's suit after all!

For example, in the claims above, only claim 3 is intact after all claims are made.

What is the ID of the only claim that doesn't overlap?
*/

import {
  addClaimsToFabric,
  Claim,
  claimPositions,
  getClaims,
  makeFabric,
} from './part1';

function findSingleClaim(): Claim {
  const claims = getClaims();
  const fabric = makeFabric();
  addClaimsToFabric(fabric, claims);

  return claims.find((claim) =>
    claimPositions(claim).every(({ x, y }) => fabric[x][y] === 1)
  );
}

if (require.main === module) {
  const claim = findSingleClaim();
  if (claim) {
    console.log(`Claim ID: ${claim.id}`);
  } else {
    console.log('No claim found :(');
  }
}
