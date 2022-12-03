
import {D02_INPUT, D02_Q1_SAMPLE} from "./2022-02.inputs";
import {D02_Q1ROUND_OUTCOMES, D02_Q2ROUND_OUTCOMES, D02_totalScoreOf} from "../src/2022-02";


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

test("Q2 Sample", () => {
    expect(D02_totalScoreOf(D02_Q1_SAMPLE, D02_Q2ROUND_OUTCOMES)).toEqual(12);
})

test("Q2 Input", () => {
    expect(D02_totalScoreOf(D02_INPUT, D02_Q2ROUND_OUTCOMES)).toEqual(15457);
})
