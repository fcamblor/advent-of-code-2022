
import {D06_INPUT, D06_Q1_SAMPLES, D06_Q2_SAMPLES} from "./2022-06.inputs";
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

D06_Q2_SAMPLES.forEach(sample => {
    test(`Q2 Sample: ${sample.str}`, () => {
        expect(D06_findFirstNonConsecutive(sample.str, 14)).toEqual(sample.expectedFirstMarker);
    })
})

test("Q2 Input", () => {
    expect(D06_findFirstNonConsecutive(D06_INPUT, 14)).toEqual(2145);
})

