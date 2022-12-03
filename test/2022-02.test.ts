
import {D02_INPUT, D02_Q1_SAMPLE} from "./2022-02.inputs";
import {D02_Q1ROUND_OUTCOMES, D02_totalScoreOf} from "../src/2022-02";


test("D02_roundOf", () => {
    expect(D02_Q1ROUND_OUTCOMES[`A Y`]).toEqual({shapeScore: 2, outcomeScore: 6});
    expect(D02_Q1ROUND_OUTCOMES[`B X`]).toEqual({shapeScore: 1, outcomeScore: 0});
    expect(D02_Q1ROUND_OUTCOMES[`C Z`]).toEqual({shapeScore: 3, outcomeScore: 3});
})
test("Q1 Sample", () => {
    expect(D02_totalScoreOf(D02_Q1_SAMPLE)).toEqual(15);
})

test("Q1 Input", () => {
    expect(D02_totalScoreOf(D02_INPUT)).toEqual(12535);
})

/*
test("Q2 Sample ", () => {
    expect(`an imported sample ${D02_Q2_SAMPLE} from 2022-02.inputs.ts which is then processed by src/2022-02.ts functions`).toEqual(`an expected result from 2022-02.inputs.ts`);
})

test("Q2 Input ", () => {
    expect(`an imported sample ${D02_INPUT} from 2022-02.inputs.ts which is then processed by src/2022-02.ts functions`).toEqual(`an expected result from 2022-02.inputs.ts`);
})
*/

