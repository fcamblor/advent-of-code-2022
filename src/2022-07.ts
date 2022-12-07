
// TODO: Fill into this file utility functions to display stuff into the spreadsheet
// ... or simply function that are going to be tested into corresponding ../test/2022-07.test.ts file

type D07_IO = {command: string, output: string[] }

export function D07_parseInput(input: string) {
    return input.substring("$ ".length).split("\n$ ").map(inputOutput => {
        const lines = inputOutput.split("\n")
        return {command: lines[0], output: lines.slice(1)}
    })
}
