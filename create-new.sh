#!/bin/bash

year=$(date '+%Y')
day=$(date '+%d')

cat > "src/$year-$day.ts" << ENDOFFILE

// TODO: Fill into this file utility functions to display stuff into the spreadsheet
// ... or simply function that are going to be tested into corresponding ../test/$year-$day.test.ts file

ENDOFFILE

cat > "test/$year-$day.test.ts" << ENDOFFILE

import {D${day}_INPUT, D${day}_Q1_SAMPLE, D${day}_Q2_SAMPLE} from "./$year-$day.inputs";

/*
test("Q1 Sample", () => {
    expect(\`an imported sample \${D${day}_Q1_SAMPLE} from $year-${day}.inputs.ts which is then processed by src/$year-${day}.ts functions\`).toEqual(\`an expected result from $year-${day}.inputs.ts\`);
})

test("Q1 Input", () => {
    expect(\`an imported sample \${D${day}_INPUT} from $year-${day}.inputs.ts which is then processed by src/$year-${day}.ts functions\`).toEqual(\`an expected result from $year-${day}.inputs.ts\`);
})

test("Q2 Sample ", () => {
    expect(\`an imported sample \${D${day}_Q2_SAMPLE} from $year-${day}.inputs.ts which is then processed by src/$year-${day}.ts functions\`).toEqual(\`an expected result from $year-${day}.inputs.ts\`);
})

test("Q2 Input ", () => {
    expect(\`an imported sample \${D${day}_INPUT} from $year-${day}.inputs.ts which is then processed by src/$year-${day}.ts functions\`).toEqual(\`an expected result from $year-${day}.inputs.ts\`);
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
