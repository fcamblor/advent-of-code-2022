
// TODO: Fill into this file utility functions to display stuff into the spreadsheet
// ... or simply function that are going to be tested into corresponding ../test/2022-03.test.ts file

import {Arrays, assert} from "./utils";

export function D03_compartimentize(str: string): [string,string] {
    return [ str.substring(0, str.length/2), str.substring(str.length/2) ];
}

export function D03_findSimilarInHalves(str: string): string {
    const compartiments = D03_compartimentize(str)
    const commonItems = Arrays.intersect(
        Arrays.unique(compartiments[0].split("")),
        Arrays.unique(compartiments[1].split(""))
    );

    assert(commonItems.length === 1);

    return commonItems[0];
}

export function D03_priorityOf(char: string): number {
    if(char >= 'a' && char <= 'z') {
        return char.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
    }
    if(char >= 'A' && char <= 'Z') {
        return char.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
    }
    throw new Error(`Invalid char passed to D03_priorityOf(): ${char}`)
}

export function D03_prioritiesSumOf(values: string[]): number {
    return values.reduce((total, value) => {
        const similar = D03_findSimilarInHalves(value);
        const priority = D03_priorityOf(similar);
        return total + priority;
    }, 0)
}

export function D03_extractGroupsOf3From(values: string[]): [string,string,string][] {
    const results: [string,string,string][] = [];
    for(let i=0; i<values.length; i+=3) {
        results.push([ values[i], values[i+1], values[i+2] ])
    }
    return results;
}

export function D03_findSimilarInGroups(groups: [string,string,string]): string {
    const chars = groups.map(line => Arrays.unique(line.split("")))
    const intersections = Arrays.intersectAcross(chars[0], ...chars.slice(1));

    assert(intersections.length === 1);

    return intersections[0][0];
}
