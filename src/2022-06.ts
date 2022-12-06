
// TODO: Fill into this file utility functions to display stuff into the spreadsheet
// ... or simply function that are going to be tested into corresponding ../test/2022-06.test.ts file

const D06_CONSECUTIVE_THRESHOLD = 4;

function D06ContainsTwiceSameLetter(str: string) {
    const found = new Set();
    for(let i=0; i<str.length; i++) {
        if(found.has(str[i])) {
            return true;
        }
        found.add(str[i]);
    }
    return false;
}

export function D06_findFirstNonConsecutive(str: string): number {
    const buff = str.substring(0, D06_CONSECUTIVE_THRESHOLD).split("");
    let offset = D06_CONSECUTIVE_THRESHOLD;
    while(D06ContainsTwiceSameLetter(buff.join(""))) {
        buff.push(str[offset]);
        buff.shift();
        offset++;
    }
    return offset;
}
