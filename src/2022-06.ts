
// TODO: Fill into this file utility functions to display stuff into the spreadsheet
// ... or simply function that are going to be tested into corresponding ../test/2022-06.test.ts file

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

export function D06_findFirstNonConsecutive(str: string, consecutiveThreshold: number = 4): number {
    const buff = str.substring(0, consecutiveThreshold).split("");
    let offset = consecutiveThreshold;
    while(D06ContainsTwiceSameLetter(buff.join(""))) {
        buff.push(str[offset]);
        buff.shift();
        offset++;
    }
    return offset;
}
