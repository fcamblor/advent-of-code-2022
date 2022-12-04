
// TODO: Fill into this file utility functions to display stuff into the spreadsheet
// ... or simply function that are going to be tested into corresponding ../test/2022-04.test.ts file

import type {Ranged} from "./utils";

export function D04_parseRanges(str: string): Array<Ranged<number>[]> {
    return str.split("\n")
        .map(line =>
            line.split(",").map(rangeStr => {
                const [low, up] = rangeStr.split("-");
                return {lowerBound: `included:${Number(low)}`, upperBound: `included:${Number(up)}`};
            })
        )
}
