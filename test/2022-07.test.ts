
import {D07_INPUT, D07_Q1_SAMPLE, D07_Q2_SAMPLE} from "./2022-07.inputs";
import {D07_parseInput} from "../src/2022-07";
// import {D07_superFunctionForQ1, D07_superFunctionForQ2} from "../src/2022-07";

test("reading IO", () => {
    expect(D07_parseInput(D07_Q1_SAMPLE)).toEqual([
        {command: "cd /", output: []},
        {command: "ls", output: `
dir a
14848514 b.txt
8504156 c.dat
dir d
        `.trim().split("\n")},
        {command: "cd a", output: []},
        {command: "ls", output: `
dir e
29116 f
2557 g
62596 h.lst
        `.trim().split("\n")},
        {command: "cd e", output: []},
        {command: "ls", output: `
584 i
        `.trim().split("\n")},
        {command: "cd ..", output: []},
        {command: "cd ..", output: []},
        {command: "cd d", output: []},
        {command: "ls", output: `
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
        `.trim().split("\n")},
    ])
})

/*
test("Q1 Sample", () => {
    expect(D07_superFunctionForQ1(D07_Q1_SAMPLE)).toEqual(42);
})

test("Q1 Input", () => {
    expect(D07_superFunctionForQ1(D07_INPUT)).toEqual(42);
})

test("Q2 Sample", () => {
    expect(D07_superFunctionForQ2(D07_Q2_SAMPLE)).toEqual(42);
})

test("Q2 Input", () => {
    expect(D07_superFunctionForQ2(D07_INPUT)).toEqual(42);
})

*/

