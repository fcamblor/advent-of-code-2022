
// TODO: Fill into this file utility functions to display stuff into the spreadsheet
// ... or simply function that are going to be tested into corresponding ../test/2022-03.test.ts file

export function D03_compartimentize(str: string): [string,string] {
    return [ str.substring(0, str.length/2), str.substring(str.length/2) ];
}
