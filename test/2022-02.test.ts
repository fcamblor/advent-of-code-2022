
import {D02_INPUT, D02_Q1_SAMPLE} from "./2022-02.inputs";
import {D02_ROUND_OUTCOMES} from "../src/2022-02";


test("D02_roundOf", () => {
    expect(D02_ROUND_OUTCOMES[`A Y`]).toEqual({shapeScore: 2, outcomeScore: 6});
    expect(D02_ROUND_OUTCOMES[`B X`]).toEqual({shapeScore: 1, outcomeScore: 0});
    expect(D02_ROUND_OUTCOMES[`C Z`]).toEqual({shapeScore: 3, outcomeScore: 3});
})
/*
test("Q1 Sample", () => {
    expect(`an imported sample ${D02_Q1_SAMPLE} from 2022-02.inputs.ts which is then processed by src/2022-02.ts functions`).toEqual(`an expected result from 2022-02.inputs.ts`);
})

test("Q1 Input", () => {
    expect(`an imported sample ${D02_INPUT} from 2022-02.inputs.ts which is then processed by src/2022-02.ts functions`).toEqual(`an expected result from 2022-02.inputs.ts`);
})

test("Q2 Sample ", () => {
    expect(`an imported sample ${D02_Q2_SAMPLE} from 2022-02.inputs.ts which is then processed by src/2022-02.ts functions`).toEqual(`an expected result from 2022-02.inputs.ts`);
})

test("Q2 Input ", () => {
    expect(`an imported sample ${D02_INPUT} from 2022-02.inputs.ts which is then processed by src/2022-02.ts functions`).toEqual(`an expected result from 2022-02.inputs.ts`);
})
*/

