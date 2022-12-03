#!/bin/bash

year=${2:-`date '+%Y'`}
day=${1:-`date '+%d'`}

cat > "src/$year-$day.ts" << ENDOFFILE

// TODO: Fill into this file utility functions to display stuff into the spreadsheet
// ... or simply function that are going to be tested into corresponding ../test/$year-$day.test.ts file

ENDOFFILE

cat > "test/$year-$day.test.ts" << ENDOFFILE

import {D${day}_INPUT, D${day}_Q1_SAMPLE, D${day}_Q2_SAMPLE} from "./$year-$day.inputs";
// import {D${day}_superFunctionForQ1, D${day}_superFunctionForQ2} from "../src/$year-$day";

/*
test("Q1 Sample", () => {
    expect(D${day}_superFunctionForQ1(D${day}_Q1_SAMPLE)).toEqual(42);
})

test("Q1 Input", () => {
    expect(D${day}_superFunctionForQ1(D${day}_INPUT)).toEqual(42);
})

test("Q2 Sample", () => {
    expect(D${day}_superFunctionForQ2(D${day}_Q2_SAMPLE)).toEqual(42);
})

test("Q2 Input", () => {
    expect(D${day}_superFunctionForQ2(D${day}_INPUT)).toEqual(42);
})

*/

ENDOFFILE

cat > "test/$year-$day.inputs.ts" << ENDOFFILE

export const D${day}_Q1_SAMPLE = \`
blabla
blabla
\`.trim()

export const D${day}_Q2_SAMPLE = \`
blabla
blabla
\`.trim()

export const D${day}_INPUT = \`
blabla
blabla
blabla
blabla
blabla
blabla
blabla
blabla
blabla
\`.trim()

ENDOFFILE
