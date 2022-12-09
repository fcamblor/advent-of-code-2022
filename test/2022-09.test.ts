
import {
    D09_INPUT,
    D09_Q1_GRID_EXPECTATIONS,
    D09_Q1_SAMPLE,
} from "./2022-09.inputs";
import {D09_parseInput, D09_parseThenRunOps, D09Grid} from "../src/2022-09";
import {Ranged} from "../src/utils";

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

[
    {
        name: "Q1 sample intermediate steps",
        sample: D09_Q1_SAMPLE,
        expectations: D09_Q1_GRID_EXPECTATIONS,
        dimensions: {minX: 0, maxX: 5, minY: 0, maxY: 4}
    }
].forEach(descriptor => {
    Ranged.included(0, descriptor.expectations.length-1).values().forEach(expectationIndex => {
        const ops = D09_parseInput(descriptor.sample);
        test(`${descriptor.name} [${expectationIndex}]`, () => {
            const grid = new D09Grid({x:0, y:0}, false);

            Ranged.included(0, expectationIndex-1).values().forEach(opIndex => {
                grid.move(ops[opIndex])
            })
            expect(grid.show(descriptor.dimensions)).toEqual(descriptor.expectations[expectationIndex])
        })
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

