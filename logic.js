/**
 * Computes living or dead state for a single cell
 * @param {Array<number>} grid - The grid to mutate.
 * @param {number} pos - The position of the cell for which to compute next generation.
 * @returns {boolean} Whether the cell is alive in the next generation.
 */
function nextGeneration(grid, pos) {
    const alive = grid[pos];
    const width = Math.sqrt(grid.length);
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
        neighbours += grid[top];
        if (x > 0) {
            neighbours += grid[topLeft];
        }
        if (x < width - 1) {
            neighbours += grid[topRight];
        }
    }

    if (x > 0) {
        neighbours += grid[left];
    }
    
    if (x < width - 1) {
        neighbours += grid[right];
    }

    if (pos < grid.length - width) {
        neighbours += grid[bottom];

        if (x > 0) {
            neighbours += grid[bottomLeft];
        }

        if (x < width - 1) {
            neighbours += grid[bottomRight];
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

/**
 * Iterate entire grid by one generation.
 * @param {Array<number>} prev - The grid from which to compute the next generation.
 * @returns {Array<number>} A new grid representing the next generation.
 */
export function tick(prev) {
    const grid = Array(prev.length).fill(0);
    for (let i = 0; i < prev.length; i++) {
        grid[i] = +nextGeneration(prev, i);
    }

    return grid;
}
