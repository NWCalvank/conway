import { tick } from "./logic.js";

test();

function test() {
  console.info("Running tests...");

  // prettier-ignore
  const tests = [
    [[0], [0]],
    [[1], [0]],
    [[0,0
     ,0,0],
     [0,0
     ,0,0]],
    [[1,1
     ,0,1],
     [1,1
     ,1,1]],
    [[0,0,0
     ,0,1,0
     ,0,0,0],
     [0,0,0
     ,0,0,0
     ,0,0,0]],
    [[0,1,0
     ,0,1,1
     ,0,0,0],
     [0,1,1
     ,0,1,1
     ,0,0,0]],
    [[0,1,0
     ,1,1,1
     ,1,0,0],
     [1,1,1
     ,1,0,1
     ,1,0,0]],
    [[0,1,0,0
     ,0,0,0,1
     ,1,1,1,1
     ,1,0,1,0],
     [0,0,0,0
     ,1,0,0,1
     ,1,0,0,1
     ,1,0,1,1]],
  ];

  for (let [input, expected] of tests) {
    const res = tick(input);
    const passed = compare(res, expected);
    if (passed) {
      console.info("PASS");
    }
  }
}

/**
 * Compare expected to actual
 * @param {Array<number>} grid1 - The actual grid.
 * @param {Array<number>} grid2 - The expected grid.
 */
function compare(grid1, grid2) {
  const sameLength = grid1.length === grid2.length;
  if (!sameLength) {
    console.assert(sameLength, "Lengths don't match: %o", {
      got: grid1.length,
      exp: grid2.length,
    });
    return false;
  }

  for (let i = 0; i < grid2.length; i++) {
    const same = grid1[i] === grid2[i];
    if (!same) {
      console.assert(same, "Grids don't match: %o", { got: grid1, exp: grid2 });
      return false;
    }
  }
  return true;
}
