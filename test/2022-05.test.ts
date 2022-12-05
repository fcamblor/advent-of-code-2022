
import {D05_INPUT, D05_Q1_SAMPLE, D05_Q2_SAMPLE} from "./2022-05.inputs";
import {D05ReadStackIdsCount, D05ReadStartingStacks} from "../src/2022-05";
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

