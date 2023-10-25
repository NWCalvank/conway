/*
[0,1,2,3,4]
[5,6,7,8,9]
*/

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

    for (i = 0; i < grid2.length; i++) {
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
    for ([input, expected, {width}] of tests) {
        const res = tick(input, width);
        const passed = compare(res, expected);
        if (passed) {
            console.info("PASS");
        }
    }


}


function nextGeneration(grid, pos, width) {
    const alive = grid[pos];
    const row = Math.floor(pos / width);
    const x = pos - width * row;

    const topLeft = width * (row - 1) + (x - 1)
    const top = width * (row - 1) + x
    const topRight = width * (row - 1) + (x + 1);
    const left = width * row + (x - 1)
    const right = width * row + (x + 1)
    const bottomLeft = width * (row + 1) + (x - 1)
    const bottom = width * (row + 1) + x
    const bottomRight = width * (row + 1) + (x + 1)

    let neighbours = 0;

    if (row >= 1) {
        neighbours += grid[top] || 0;
        if (x > 0) {
            neighbours += grid[topLeft] || 0;
        }
        if (x < width - 1) {
            neighbours += grid[topRight] || 0;
        }
    }

    if (x > 0) {
        neighbours += grid[left] || 0;
    }
    
    if (x < width - 1) {
        neighbours += grid[right] || 0;
    }

    if (pos < grid.length - width) {
        neighbours += grid[bottom] || 0;

        if (x > 0) {
            neighbours += grid[bottomLeft] || 0;
        }

        if (x < width - 1) {
            neighbours += grid[bottomRight] || 0;
        }
    }
    
    if (!alive) {
        // Birth: Dead -> Live if 3 neighbours
        return neighbours === 3;
    }

    // Survive: Live -> Live if 2-3 neighbours
    // Death: Live -> Dead if < 3 neighbours
    return [2, 3].includes(neighbours);
}

function tick(prev, width) {
    const grid = Array(prev.length).fill(0);
    for (i in prev) {
        grid[i] = nextGeneration(prev, i, width) ? 1 : 0;
    }

    return grid;
}

test();
