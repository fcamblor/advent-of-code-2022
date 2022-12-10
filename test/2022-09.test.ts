
import {
    D09_INPUT,
    D09_Q1_GRID_EXPECTATIONS,
    D09_Q1_SAMPLE,
    D09_Q2_GRID_EXPECTATIONS, D09_Q2_SAMPLE
} from "./2022-09.inputs";
import {D09_parseInput, D09_parseThenRunOps, D09Snake} from "../src/2022-09";
import {Ranged} from "../src/utils";

[
  {name: "Q1 Sample", sample: D09_Q1_SAMPLE, expectation: 13},
  {name: "Q1 Input", sample: D09_INPUT, expectation: 5874}
].forEach(descriptor => {
  test(descriptor.name, () => {
      let grid = D09_parseThenRunOps(descriptor.sample, false);
      expect(grid.uniqueVisitedTailPositionsCount()).toEqual(descriptor.expectation);
  })
});

[
    {
        name: "Q1 sample intermediate steps",
        sample: D09_Q1_SAMPLE,
        expectations: D09_Q1_GRID_EXPECTATIONS,
        snakeSize: 2,
        dimensions: {minX: 0, maxX: 5, minY: 0, maxY: 4}
    }, {
        name: "Q2 sample intermediate steps",
        sample: D09_Q2_SAMPLE,
        snakeSize: 10,
        expectations: D09_Q2_GRID_EXPECTATIONS,
        dimensions: {minX: -11, maxX: 14, minY: -5, maxY: 15}
    }
].forEach(descriptor => {
    Ranged.includedExcluded(0, descriptor.expectations.length).values().forEach(expectationIndex => {
        const ops = D09_parseInput(descriptor.sample);
        test(`${descriptor.name} [${expectationIndex}]`, () => {
            const snake = new D09Snake({x:0, y:0}, descriptor.snakeSize, false);

            Ranged.includedExcluded(0, expectationIndex).values().forEach(opIndex => {
                snake.move(ops[opIndex])
            })
            expect(snake.show(descriptor.dimensions)).toEqual(descriptor.expectations[expectationIndex])
        })
    })
});

[
  {name: "Q2 Sample1", sample: D09_Q1_SAMPLE, expectation: 1},
  {name: "Q2 Sample2", sample: D09_Q2_SAMPLE, expectation: 36},
  {name: "Q2 Input", sample: D09_INPUT, expectation: 2467}
].forEach(descriptor => {
  test(descriptor.name, () => {
      const ops = D09_parseInput(descriptor.sample);
      const snake = new D09Snake({x:0, y:0}, 10, false);

      ops.forEach(op => snake.move(op));
      expect(snake.uniqueVisitedTailPositionsCount()).toEqual(descriptor.expectation)
  })
});

