
// TODO: Fill into this file utility functions to display stuff into the spreadsheet
// ... or simply function that are going to be tested into corresponding ../test/2022-10.test.ts file

import {match} from "ts-pattern";

export type D10_OP = {type:'noop',cycles:1}|{type:'addx',val:number,cycles:2}

export function D10_parseInput(input: string): D10_OP[] {
    return input.split("\n").map(line => {
        const [type, valStr] = line.split(" ");
        return match(type)
            .with('noop', (type) => ({type,cycles:1} as const))
            .with('addx', (type) => ({type, val: Number(valStr), cycles:2} as const))
            .run();
    })
}

export function D10_getOperationsAtCPUOffset(ops: D10_OP[], cpuOffset: number): D10_OP[] {
    let i=0, cpuCycles = 0;
    while(i<ops.length && cpuCycles+ops[i].cycles<cpuOffset){
        cpuCycles+= ops[i].cycles;
        i++;
    }
    return ops.slice(0, i);
}

export function D10_executeOps(ops: D10_OP[]): number {
    return ops.reduce((x, op) =>
        x + match(op)
             .with({type: 'addx'}, (op) => op.val)
             .otherwise(() => 0)
        , 1);
}
