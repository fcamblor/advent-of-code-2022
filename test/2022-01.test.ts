
import {D01_INPUT, D01_Q1_SAMPLE} from "./2022-01.inputs";
import {D01_elfMaxCalories, D01_extractElfFood} from "../src/2022-01";


test("D01_extractElfFood", () => {
    expect(D01_extractElfFood(D01_Q1_SAMPLE)).toEqual([
        [1000, 2000, 3000],
        [4000],
        [5000, 6000],
        [7000, 8000, 9000],
        [10000]
    ])
})

test("Q1 Sample", () => {
    expect(D01_elfMaxCalories(D01_Q1_SAMPLE)).toEqual(24000);
})

test("Q1 Input", () => {
    expect(D01_elfMaxCalories(D01_INPUT)).toEqual(69693);
})
/*
test("Q2 Sample ", () => {
    expect(`an imported sample ${D01_Q2_SAMPLE} from 2022-01.inputs.ts which is then processed by src/2022-01.ts functions`).toEqual(`an expected result from 2022-01.inputs.ts`);
})

test("Q2 Input ", () => {
    expect(`an imported sample ${D01_INPUT} from 2022-01.inputs.ts which is then processed by src/2022-01.ts functions`).toEqual(`an expected result from 2022-01.inputs.ts`);
})
*/

