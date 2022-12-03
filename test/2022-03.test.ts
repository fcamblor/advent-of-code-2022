
import {D03_INPUT, D03_Q1_SAMPLE, D03_Q2_SAMPLE} from "./2022-03.inputs";
import {D03_compartimentize, D03_findSimilarInHalves, D03_priorityOf} from "../src/2022-03";

test("D03_compartimentize", () => {
    expect(D03_compartimentize(`vJrwpWtwJgWrhcsFMMfFFhFp`)).toEqual([`vJrwpWtwJgWr`, `hcsFMMfFFhFp`])
})

test("D03_findSimilarInHalves", () => {
    expect(D03_findSimilarInHalves(`vJrwpWtwJgWrhcsFMMfFFhFp`)).toEqual(`p`)
})

test(`D03_priorityOf`, () => {
    expect(D03_priorityOf('a')).toEqual(1)
    expect(D03_priorityOf('b')).toEqual(2)
    expect(D03_priorityOf('z')).toEqual(26)
    expect(D03_priorityOf('A')).toEqual(27)
    expect(D03_priorityOf('B')).toEqual(28)
    expect(D03_priorityOf('Z')).toEqual(52)
})

/*
test("Q1 Sample", () => {
    expect(`an imported sample ${D03_Q1_SAMPLE} from 2022-03.inputs.ts which is then processed by src/2022-03.ts functions`).toEqual(`an expected result from 2022-03.inputs.ts`);
})

test("Q1 Input", () => {
    expect(`an imported sample ${D03_INPUT} from 2022-03.inputs.ts which is then processed by src/2022-03.ts functions`).toEqual(`an expected result from 2022-03.inputs.ts`);
})

test("Q2 Sample ", () => {
    expect(`an imported sample ${D03_Q2_SAMPLE} from 2022-03.inputs.ts which is then processed by src/2022-03.ts functions`).toEqual(`an expected result from 2022-03.inputs.ts`);
})

test("Q2 Input ", () => {
    expect(`an imported sample ${D03_INPUT} from 2022-03.inputs.ts which is then processed by src/2022-03.ts functions`).toEqual(`an expected result from 2022-03.inputs.ts`);
})
*/
