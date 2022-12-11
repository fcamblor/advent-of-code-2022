
// TODO: Fill into this file utility functions to display stuff into the spreadsheet
// ... or simply function that are going to be tested into corresponding ../test/2022-10.test.ts file

import {match} from "ts-pattern";
import {assert, Ranged} from "./utils";

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

function D10_operate(x: number, op: D10_OP): number {
    return x + match(op)
        .with({type: 'addx'}, (op) => op.val)
        .otherwise(() => 0)
}

export function D10_executeOps(ops: D10_OP[]): number {
    return ops.reduce((x, op) => D10_operate(x, op), 1)
}

export function D10_executeCycles(ops: D10_OP[], cyclesCount: number, onCycleDone: (cycleOffset: number, x: number) => void = () => null) {
    return Ranged.includedExcluded(1, cyclesCount).values().reduce(({ ops, opIndex, consumedCPUCylesOnOp, x, executedOps }, cycleOffset) => {
        const currentOp = ops[opIndex];
        assert(currentOp, `Operations overflow detected: opIndex=${opIndex} and length=${ops.length} !`)

        onCycleDone(cycleOffset-1, x);

        consumedCPUCylesOnOp++;

        if(currentOp.cycles === consumedCPUCylesOnOp) {
            x = D10_operate(x, currentOp)
            executedOps.push(currentOp);

            opIndex++;
            consumedCPUCylesOnOp = 0;
        }

        return { ops, opIndex, consumedCPUCylesOnOp, x, executedOps };
    }, { ops, opIndex: 0, consumedCPUCylesOnOp: 0, x: 1, executedOps: [] } as { ops: D10_OP[], opIndex: 0, consumedCPUCylesOnOp: number, x: number, executedOps: D10_OP[] })
}

export function D10_drawCRT(size: {width: number, height: number}, ops: D10_OP[]): string {
    const crt: string[] = [];
    D10_executeCycles(ops, size.width*size.height+1, (cycleOffset, x) => {
        const lineOffset = cycleOffset % size.width;
        if(lineOffset === 0 && cycleOffset !== 0) {
            crt.push("\n")
        }

        if(Math.max(0, x-1) <= lineOffset && lineOffset <= Math.min(x+1, size.width)) {
            crt.push("#")
        } else {
            crt.push(".")
        }
    })
    return crt.join("");
}
