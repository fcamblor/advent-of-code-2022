
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

export function D05ReadStartingStacks(stacksCount: number, stackLines: string[]): Array<string[]> {
    const startingReversedStacks = Array(stacksCount+1).fill(0).map(_ => [] as string[]);
    stackLines.map(stackLineStr => {
        for(let i=0; i<stacksCount; i++) {
            const crate = stackLineStr[i*"[?] ".length + "[".length];
            if(crate !== ' ') {
                startingReversedStacks[i+1].push(crate);
            }
        }
    })
    return startingReversedStacks.map(reversedStack => reversedStack.reverse());
}
