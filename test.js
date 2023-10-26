import { tick } from './index.js';

test();

function test() {
    const tests = [
        [[0], [0], {width: 1}],
        [[1], [0], {width: 1}],
        [[0,0
         ,0,0],
         [0,0
         ,0,0], {width: 2}],
        [[1,1
         ,0,1],
         [1,1
         ,1,1], {width: 2}],
        [[0,0,0
         ,0,1,0
         ,0,0,0],
         [0,0,0
         ,0,0,0
         ,0,0,0], {width: 3}],
        [[0,1,0
         ,0,1,1
         ,0,0,0],
         [0,1,1
         ,0,1,1
         ,0,0,0], {width: 3}],
        [[0,1,0
         ,1,1,1
         ,1,0,0],
         [1,1,1
         ,1,0,1
         ,1,0,0], {width: 3}],
        [[0,1,0,0
         ,0,0,0,1
         ,1,1,1,1
         ,1,0,1,0],
         [0,0,0,0
         ,1,0,0,1
         ,1,0,0,1
         ,1,0,1,1], {width: 4}],
    ];
    for (let [input, expected, {width}] of tests) {
        const res = tick(input, width);
        const passed = compare(res, expected);
        if (passed) {
            console.info("PASS");
        }
    }


}

function compare(grid1, grid2) {
    const sameLength = grid1.length === grid2.length;
    if (!sameLength) {
        console.assert(
            sameLength,
            "Lengths don't match: %o",
            {got: grid1.length, exp: grid2.length}
        );
        return false;
    }

    for (let i = 0; i < grid2.length; i++) {
        const same = grid1[i] === grid2[i]
        if (!same) {
            console.assert(
                same,
                "Grids don't match: %o",
                {got: grid1, exp: grid2}
            );
            return false;
        }
    }
    return true;
}
