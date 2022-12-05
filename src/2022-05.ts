
// TODO: Fill into this file utility functions to display stuff into the spreadsheet
// ... or simply function that are going to be tested into corresponding ../test/2022-05.test.ts file

import {D05_Q1_SAMPLE} from "../test/2022-05.inputs";

export type D05Procedure = { numberOfCratesMoved: number, fromStack: number, toStack: number };
export type D05Stacks = Array<string[]>;
export type D05Statements = {
    startingStacks: D05Stacks,
    procedures: D05Procedure[]
}

export function D05ReadStackIdsCount(line: string): number {
    return line.split(" ").filter(v => !!v).length;
}

export function D05ReadStartingStacks(stacksCount: number, stackLines: string[]): D05Stacks {
    const startingReversedStacks = Array(stacksCount+1).fill(0).map(_ => [] as string[]);
    stackLines.map(stackLineStr => {
        for(let i=0; i<stacksCount; i++) {
            const crate = stackLineStr[i*"[?] ".length + "[".length];
            if(crate && crate !== ' ') {
                startingReversedStacks[i+1].push(crate);
            }
        }
    })
    return startingReversedStacks.map(reversedStack => reversedStack.reverse());
}

export function D05ReadProcedures(procedureStr: string): D05Procedure[] {
    return procedureStr.split("\n").map(line => {
        const [_1, numberOfCratesMoved, _2, fromStack, _3, toStack ] = line.split(" ").map(Number);
        return {numberOfCratesMoved, fromStack, toStack };
    })
}

export function D05_readInput(input: string): D05Statements {
    const [startingStacksStr, procedureStr] = input.split("\n\n") as [string,string];

    const [stackIds, ...reversedStackLines] = startingStacksStr.split("\n").reverse() as string[];
    const stacksCount = D05ReadStackIdsCount(stackIds);

    const startingStacks = D05ReadStartingStacks(stacksCount, reversedStackLines.reverse());
    const procedures = D05ReadProcedures(procedureStr);

    return {startingStacks, procedures};
}

export function D05_printStacks(stacks: D05Stacks) {
    const maxStackSize = Math.max(...stacks.map(items => items.length));
    const out = Array(maxStackSize)
        .fill(-1)
        .map((_, height) => {
            return Array(stacks.length)
                .fill(0)
                .map((_,stackIdx) => {
                    const crate: string|undefined = stacks[stackIdx][maxStackSize-1-height];
                    return crate?`[${crate}]`:`   `;
                }).slice(1).join(" ")
        }).concat(
            Array(stacks.length)
                .fill(0)
                .map((_,idx) => ` ${idx} `)
                .slice(1).join(" ")
        ).join("\n");
    console.log(out);
    return out;
}

export function D05_processProcedure(stacks: D05Stacks, procedure: D05Procedure, crateMoverModel: '9000'|'9001' = '9000'): void {
    const cratesToAdd = [];
    for(var i=0; i<procedure.numberOfCratesMoved; i++) {
        const crate = stacks[procedure.fromStack].pop()
        if(!crate) {
            throw new Error("Trying to pick crate from an empty stack !")
        }
        cratesToAdd.push(crate);
    }

    if(crateMoverModel === '9001') {
        cratesToAdd.reverse();
    }

    stacks[procedure.toStack].push(...cratesToAdd);
}

export function D05GetTopCrates(stacks: D05Stacks): string {
    return stacks.slice(1).map(stack => stack[stack.length-1]).join("")
}

export function D05_processInput(input: string, crateMoverModel: '9000'|'9001' = '9000') {
    const statement = D05_readInput(input);
    const stacks = statement.startingStacks;
    statement.procedures.forEach(procedure => D05_processProcedure(stacks, procedure, crateMoverModel));
    return D05GetTopCrates(stacks);
}
