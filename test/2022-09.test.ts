
import {D09_INPUT, D09_Q1_SAMPLE} from "./2022-09.inputs";
import {D09_parseInput, D09_parseThenRunOps} from "../src/2022-09";
// import {D09_superFunctionForQ1, D09_superFunctionForQ2} from "../src/2022-09";

[
  {name: "Q1 Sample", sample: D09_Q1_SAMPLE, expectation: 13},
  {name: "Q1 Input", sample: D09_INPUT, expectation: 5874}
].forEach(descriptor => {
  test(descriptor.name, () => {
      let grid = D09_parseThenRunOps(descriptor.sample, false);
      // console.log(grid.show());
      expect(grid.uniqueVisitedTailPositionsCount()).toEqual(descriptor.expectation);
  })
});

/*
[
  {name: "Q2 Sample", sample: D09_Q1_SAMPLE, expectation: 42},
  {name: "Q2 Input", sample: D09_INPUT, expectation: 42}
].forEach(descriptor => {
  test(descriptor.name, () => {
      expect(D09_parseInput(descriptor.sample)).toEqual(descriptor.expectation);
  })
});

*/

