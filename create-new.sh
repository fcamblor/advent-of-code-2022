#!/bin/bash

year=${2:-`date '+%Y'`}
day=${1:-`date '+%d'`}

cat > "src/$year-$day.ts" << ENDOFFILE

// TODO: Fill into this file utility functions to display stuff into the spreadsheet
// ... or simply function that are going to be tested into corresponding ../test/$year-$day.test.ts file

export function D${day}_parseInput(input: string) {
    return 42
}

ENDOFFILE

cat > "test/$year-$day.test.ts" << ENDOFFILE

import {D${day}_INPUT, D${day}_Q1_SAMPLE} from "./$year-$day.inputs";
// import {D${day}_superFunctionForQ1, D${day}_superFunctionForQ2} from "../src/$year-$day";

/*
[{
    name: "Q1 Sample",
    sample: D${day}_Q1_SAMPLE,
    expectation: 42
}, {
    name: "Q1 Input",
    sample: D${day}_INPUT,
    expectation: 42
}].forEach(descriptor => {
  test(descriptor.name, () => {
      expect(D${day}_parseInput(descriptor.sample)).toEqual(descriptor.expectation);
  })
});

[{
   name: "Q2 Sample",
   sample: D${day}_Q1_SAMPLE,
   expectation: 42
}, {
   name: "Q2 Input",
   sample: D${day}_INPUT,
   expectation: 42
}].forEach(descriptor => {
  test(descriptor.name, () => {
      expect(D${day}_parseInput(descriptor.sample)).toEqual(descriptor.expectation);
  })
});

*/

ENDOFFILE

cat > "test/$year-$day.inputs.ts" << ENDOFFILE

export const D${day}_Q1_SAMPLE = \`
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
