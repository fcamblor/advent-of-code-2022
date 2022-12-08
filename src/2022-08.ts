
// TODO: Fill into this file utility functions to display stuff into the spreadsheet
// ... or simply function that are going to be tested into corresponding ../test/2022-08.test.ts file

import {cartesian2, combine, Ranged} from "./utils";

export function D08_parseInput(str: string): number[][] {
    return str.split("\n").map(line => line.split("").map(Number))
}

export function D08_isTreePositionVisible(grid: number[][], [i,j]: [ number, number ]): boolean {
    // Edge => visible by default
    if(i===0 || j===0 || i === grid.length-1 || j === grid[0].length-1) {
        return true
    }

    const treeHeight = grid[i][j]
    let testI, testJ;

    // up
    testI = i-1;
    while(testI >= 0 && grid[testI][j] < treeHeight) { testI--; }
    if(testI===-1){ return true; }

    // left
    testJ = j-1;
    while(testJ >= 0 && grid[i][testJ] < treeHeight) { testJ--; }
    if(testJ===-1){ return true; }

    // down
    testI = i+1;
    while(testI < grid.length && grid[testI][j] < treeHeight) { testI++; }
    if(testI===grid.length){ return true; }

    // right
    testJ = j+1;
    while(testJ < grid[0].length && grid[i][testJ] < treeHeight) { testJ++; }
    if(testJ===grid[0].length){ return true; }

    return false;
}

export function D08_countVisibleTrees(grid: number[][]): number {
    return cartesian2(
        Ranged.included(0, grid.length-1).values(),
        Ranged.included(0, grid[0].length-1).values(),
    ).reduce((total, [i,j]) => {
        return total + (D08_isTreePositionVisible(grid, [i,j])?1:0)
    }, 0)
}

type TreeScenicScore = { treeHeight: number, total: number, leftScore: number, rightScore: number, upScore: number, downScore: number };
export function D08_scenicScoreOf(grid: number[][], [i,j]: [number,number]): TreeScenicScore {
    const treeHeight = grid[i][j]

    let testI, testJ;
    testI = i-1;
    while(testI >= 0 && grid[testI][j] < treeHeight) { testI--; }
    const upScore = i-Math.max(testI,0);

    testJ = j-1;
    while(testJ >= 0 && grid[i][testJ] < treeHeight) { testJ--; }
    const leftScore = j-Math.max(testJ,0);

    testI = i+1;
    while(testI < grid.length && grid[testI][j] < treeHeight) { testI++; }
    const downScore = Math.min(grid.length-1, testI) - i;

    testJ = j+1;
    while(testJ < grid[0].length && grid[i][testJ] < treeHeight) { testJ++; }
    const rightScore = Math.min(grid[0].length-1, testJ) - j;

    return {
        total: leftScore * rightScore * upScore * downScore,
        treeHeight, leftScore, rightScore, upScore, downScore
    }
}

export function D08_findBestTreeScenicScores(grid: number[][]): {coords: [number,number], score: TreeScenicScore } {
    const treeScenicScores = cartesian2(
        Ranged.included(1, grid.length-1).values(),
        Ranged.included(1, grid[0].length-1).values(),
    ).map(([i,j]) => {
        return {coords: [i, j] as [number,number], score: D08_scenicScoreOf(grid, [i,j]) }
    }, 0)

    treeScenicScores.sort((tss1, tss2) => tss2.score.total - tss1.score.total)
    return treeScenicScores[0];
}
