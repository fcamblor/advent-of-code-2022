
import {D08_INPUT, D08_Q1_SAMPLE} from "./2022-08.inputs";
import {
    D08_countVisibleTrees, D08_findBestTreeScenicScores,
    D08_isTreePositionVisible,
    D08_parseInput,
    D08_scenicScoreOf
} from "../src/2022-08";

test("Q1 tree visibility tests", () => {
    const grid = D08_parseInput(D08_Q1_SAMPLE)
    expect(D08_isTreePositionVisible(grid, [1,1])).toEqual(true)
    expect(D08_isTreePositionVisible(grid, [1,2])).toEqual(true)
    expect(D08_isTreePositionVisible(grid, [1,3])).toEqual(false)
    expect(D08_isTreePositionVisible(grid, [2,1])).toEqual(true)
    expect(D08_isTreePositionVisible(grid, [2,2])).toEqual(false)
    expect(D08_isTreePositionVisible(grid, [2,3])).toEqual(true)
    expect(D08_isTreePositionVisible(grid, [3,1])).toEqual(false)
    expect(D08_isTreePositionVisible(grid, [3,2])).toEqual(true)
    expect(D08_isTreePositionVisible(grid, [3,3])).toEqual(false)
})

test("Q1 Sample", () => {
    expect(D08_countVisibleTrees(D08_parseInput(D08_Q1_SAMPLE))).toEqual(21);
})

test("Q1 Input", () => {
    expect(D08_countVisibleTrees(D08_parseInput(D08_INPUT))).toEqual(1698);
})

test("tree scenic scores", () => {
    const grid = D08_parseInput(D08_Q1_SAMPLE)
    expect(D08_scenicScoreOf(grid, [1, 2])).toEqual({
        treeHeight: 5,
        total: 4,
        upScore: 1,
        leftScore: 1,
        rightScore: 2,
        downScore: 2
    })
    expect(D08_scenicScoreOf(grid, [3, 2])).toEqual({
        treeHeight: 5,
        total: 8,
        upScore: 2,
        leftScore: 2,
        rightScore: 2,
        downScore: 1
    })
})
test("Q2 Sample", () => {
    expect(D08_findBestTreeScenicScores(D08_parseInput(D08_Q1_SAMPLE))).toEqual({
        coords: [3,2],
        score: {
            treeHeight: 5,
            total: 8,
            upScore: 2,
            leftScore: 2,
            rightScore: 2,
            downScore: 1
        }
    });
})

test("Q2 Input", () => {
    expect(D08_findBestTreeScenicScores(D08_parseInput(D08_INPUT))).toEqual({
        coords: [14,49],
        score: {
            treeHeight: 8,
            total: 672280,
            upScore: 14,
            leftScore: 49,
            rightScore: 49,
            downScore: 20,
        }
    });
})

