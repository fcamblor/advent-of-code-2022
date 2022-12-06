
import {D06_INPUT, D06_Q1_SAMPLES, D06_Q2_SAMPLE} from "./2022-06.inputs";
import {D06_findFirstNonConsecutive} from "../src/2022-06";
// import {D06_superFunctionForQ1, D06_superFunctionForQ2} from "../src/2022-06";


D06_Q1_SAMPLES.forEach(sample => {
    test(`Q1 Sample: ${sample.str}`, () => {
        expect(D06_findFirstNonConsecutive(sample.str)).toEqual(sample.expectedFirstMarker);
    })
})

test("Q1 Input", () => {
    expect(D06_findFirstNonConsecutive(D06_INPUT)).toEqual(1544);
})
/*
test("Q2 Sample", () => {
    expect(D06_superFunctionForQ2(D06_Q2_SAMPLE)).toEqual(42);
})

test("Q2 Input", () => {
    expect(D06_superFunctionForQ2(D06_INPUT)).toEqual(42);
})

*/

