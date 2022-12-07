
import {D07_INPUT, D07_Q1_SAMPLE, D07_Q2_SAMPLE} from "./2022-07.inputs";
import {
    D07_buildFSDisplay,
    D07_createFSFrom,
    D07_parseInput,
    D07_statsDirectories
} from "../src/2022-07";
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

test("Building filesystem", () => {
    let fs = D07_createFSFrom(D07_parseInput(D07_Q1_SAMPLE));
    expect(D07_buildFSDisplay(fs)).toEqual(`
- / (dir)
  - a (dir)
    - e (dir)
      - i (file, size=584)
    - f (file, size=29116)
    - g (file, size=2557)
    - h.lst (file, size=62596)
  - b.txt (file, size=14848514)
  - c.dat (file, size=8504156)
  - d (dir)
    - j (file, size=4060174)
    - d.log (file, size=8033020)
    - d.ext (file, size=5626152)
    - k (file, size=7214296)    
    `.trim())
})

test("Building dir sizes", () => {
    let fs = D07_createFSFrom(D07_parseInput(D07_Q1_SAMPLE));
    expect(D07_statsDirectories(fs)).toEqual([
        { "dirPath": "/a/e/", "size": 584 },
        { "dirPath": "/a/", "size": 94853 },
        { "dirPath": "/d/", "size": 24933642 },
        { "dirPath": "/", "size": 48381165 }
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

