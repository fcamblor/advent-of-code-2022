
import {D05_INPUT, D05_Q1_SAMPLE, D05_Q2_SAMPLE} from "./2022-05.inputs";
import {D05ReadProcedures, D05ReadStackIdsCount, D05ReadStartingStacks} from "../src/2022-05";
// import {D05_superFunctionForQ1, D05_superFunctionForQ2} from "../src/2022-05";

test("stack sizes", () => {
    expect(D05ReadStackIdsCount(` 1   2   3 `)).toEqual(3);
})

test(`reading starting stacks`, () => {
    expect(D05ReadStartingStacks(3, `    [D]    
[N] [C]    
[Z] [M] [P]`.split("\n"))).toEqual([
        [],
        ['Z','N'],
        ['M','C','D'],
        ['P']
    ])
})

test(`reading operations`, () => {
    expect(D05ReadProcedures(`
move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
    `.trim())).toEqual([
        {numberOfCratesMoved: 1, fromStack: 2, toStack: 1},
        {numberOfCratesMoved: 3, fromStack: 1, toStack: 3},
        {numberOfCratesMoved: 2, fromStack: 2, toStack: 1},
        {numberOfCratesMoved: 1, fromStack: 1, toStack: 2},
    ])
})

/*
test("Q1 Sample", () => {
    expect(D05_superFunctionForQ1(D05_Q1_SAMPLE)).toEqual(42);
})

test("Q1 Input", () => {
    expect(D05_superFunctionForQ1(D05_INPUT)).toEqual(42);
})

test("Q2 Sample", () => {
    expect(D05_superFunctionForQ2(D05_Q2_SAMPLE)).toEqual(42);
})

test("Q2 Input", () => {
    expect(D05_superFunctionForQ2(D05_INPUT)).toEqual(42);
})

*/

