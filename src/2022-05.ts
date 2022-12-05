
// TODO: Fill into this file utility functions to display stuff into the spreadsheet
// ... or simply function that are going to be tested into corresponding ../test/2022-05.test.ts file

export type D05Operation = { numberOfCratesMoved: number, fromStack: number, toStack: number };
export type D05Statements = {
    startingStacks: Array<string[]>,
    operations: D05Operation[]
}

export function D05ReadStackIdsCount(line: string): number {
    return line.split(" ").filter(v => !!v).length;
}
