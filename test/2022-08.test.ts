
import {D08_INPUT, D08_Q1_SAMPLE, D08_Q2_SAMPLE} from "./2022-08.inputs";
import {D08_countVisibleTrees, D08_isTreePositionVisible, D08_parseInput} from "../src/2022-08";
// import {D08_superFunctionForQ1, D08_superFunctionForQ2} from "../src/2022-08";

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
/*
test("Q2 Sample", () => {
    expect(D08_superFunctionForQ2(D08_Q2_SAMPLE)).toEqual(42);
})

test("Q2 Input", () => {
    expect(D08_superFunctionForQ2(D08_INPUT)).toEqual(42);
})

*/

