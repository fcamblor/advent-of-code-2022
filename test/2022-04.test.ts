
import {D04_INPUT, D04_Q1_SAMPLE} from "./2022-04.inputs";
import {
    D04_countFullSectionsOverlaps, D04_countSectionsOverlaps,
    D04_parseRanges
} from "../src/2022-04";
// import {D04_superFunctionForQ1, D04_superFunctionForQ2} from "../src/2022-04";

test("input parsing", () => {
    expect(D04_parseRanges(`2-4,6-8`)).toEqual([
        [
            {lowerBound: 2, lowerIncluded: true , upperBound: 4, upperIncluded: true },
            {lowerBound: 6, lowerIncluded: true , upperBound: 8, upperIncluded: true },
        ]
    ])
})

test("Q1 Sample", () => {
    expect(D04_countFullSectionsOverlaps(D04_parseRanges(D04_Q1_SAMPLE))).toEqual(2);
})

test("Q1 Input", () => {
    expect(D04_countFullSectionsOverlaps(D04_parseRanges(D04_INPUT))).toEqual(450);
})

test("17-76,16-77", () => {
    expect(D04_countSectionsOverlaps(D04_parseRanges(`17-76,16-77`))).toEqual(1)
})

test("Q2 Sample", () => {
    expect(D04_countSectionsOverlaps(D04_parseRanges(D04_Q1_SAMPLE))).toEqual(4);
})

test("Q2 Input", () => {
    expect(D04_countSectionsOverlaps(D04_parseRanges(D04_INPUT))).toEqual(837);
})
