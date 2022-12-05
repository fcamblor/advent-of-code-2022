
import {D05_INPUT, D05_Q1_SAMPLE, D05_Q2_SAMPLE} from "./2022-05.inputs";
import {
    D05_printStacks, D05_processInput, D05_processProcedure, D05_readInput,
    D05ReadProcedures,
    D05ReadStackIdsCount,
    D05ReadStartingStacks
} from "../src/2022-05";
// import {D05_superFunctionForQ1, D05_superFunctionForQ2} from "../src/2022-05";

test("stack sizes", () => {
    expect(D05ReadStackIdsCount(` 1   2   3 `)).toEqual(3);
})

test(`reading starting stacks SAMPLE`, () => {
    expect(D05ReadStartingStacks(3, `
    [D]    
[N] [C]    
[Z] [M] [P]`.split("\n").slice(1))).toEqual([
        [],
        "ZN".split(""),
        "MCD".split(""),
        "P".split(""),
    ])
})

test(`reading starting stacks INPUT`, () => {
    expect(D05ReadStartingStacks(9, `
        [F] [Q]         [Q]        
[B]     [Q] [V] [D]     [S]        
[S] [P] [T] [R] [M]     [D]        
[J] [V] [W] [M] [F]     [J]     [J]
[Z] [G] [S] [W] [N] [D] [R]     [T]
[V] [M] [B] [G] [S] [C] [T] [V] [S]
[D] [S] [L] [J] [L] [G] [G] [F] [R]
[G] [Z] [C] [H] [C] [R] [H] [P] [D]`.split("\n").slice(1))).toEqual([
        [],
        "GDVZJSB".split(""),
        "ZSMGVP".split(""),
        "CLBSWTQF".split(""),
        "HJGWMRVQ".split(""),
        "CLSNFMD".split(""),
        "RGCD".split(""),
        "HGTRJDSQ".split(""),
        "PFV".split(""),
        "DRSTJ".split(""),
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

test(`printing stacks`, () => {
    expect(D05_printStacks(D05_readInput(D05_Q1_SAMPLE).startingStacks)).toEqual(`
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 `.split("\n").slice(1).join("\n"))
})

test(`Executing one procedure`, () => {
    const statement = D05_readInput(D05_Q1_SAMPLE);
    D05_processProcedure(statement.startingStacks, statement.procedures[0]);
    expect(D05_printStacks(statement.startingStacks)).toEqual(`
[D]        
[N] [C]    
[Z] [M] [P]
 1   2   3 `.split("\n").slice(1).join("\n"))
})

test("Q1 Sample", () => {
    expect(D05_processInput(D05_Q1_SAMPLE)).toEqual("CMZ");
})

test("Q1 Input", () => {
    expect(D05_processInput(D05_INPUT)).toEqual("WCZTHTMPS");
})
/*
test("Q2 Sample", () => {
    expect(D05_superFunctionForQ2(D05_Q2_SAMPLE)).toEqual(42);
})

test("Q2 Input", () => {
    expect(D05_superFunctionForQ2(D05_INPUT)).toEqual(42);
})

*/

