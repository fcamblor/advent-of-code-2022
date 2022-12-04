
// TODO: Fill into this file utility functions to display stuff into the spreadsheet
// ... or simply function that are going to be tested into corresponding ../test/2022-04.test.ts file


import {Ranged} from "./utils";

export function D04_parseRanges(str: string): Array<Ranged<number>[]> {
    return str.split("\n")
        .map(line =>
            line.split(",").map(rangeStr => {
                const [low, up] = rangeStr.split("-");
                return new Ranged(Number(low), true, Number(up), true);
            })
        )
}

export function D04_countFullSectionsOverlaps(sectionGroups: Array<Ranged<number>[]>): number {
    return sectionGroups.reduce((total, sectionGroup) => {
        return total + (Ranged.countFullOverlaps(sectionGroup).length?1:0);
    }, 0)
}

export function D04_countSectionsOverlaps(sectionGroups: Array<Ranged<number>[]>): number {
    return sectionGroups.reduce((total, sectionGroup) => {
        const overlapsCount = Ranged.countOverlaps(sectionGroup).length;
        return total + (overlapsCount?1:0);
    }, 0)
}
