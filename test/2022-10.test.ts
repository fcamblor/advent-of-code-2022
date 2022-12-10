
import {D10_INPUT, D10_Q1_SAMPLE1, D10_Q1_SAMPLE2} from "./2022-10.inputs";
import {
    D10_executeCycles,
    D10_parseInput
} from "../src/2022-10";

[
  {
      name: "Cycles for Q1 Sample1",
      sample: D10_Q1_SAMPLE1,
      expectations: [
          {offset: 1, expectedX: 1},
          {offset: 2, expectedX: 1},
          {offset: 3, expectedX: 1},
          {offset: 4, expectedX: 4},
          {offset: 5, expectedX: 4},
          {offset: 6, expectedX: -1},
      ]
  }, {
      name: "Cycles for Q1 Sample2",
      sample: D10_Q1_SAMPLE2,
      expectations: [
          {offset: 20, expectedX: 21},
          {offset: 60, expectedX: 19},
          {offset: 100, expectedX: 18},
          {offset: 140, expectedX: 21},
          {offset: 180, expectedX: 16},
          {offset: 220, expectedX: 18},
      ]
}
].forEach(descriptor => {
    descriptor.expectations.forEach(expectation => {
        test(`${descriptor.name} at offset ${expectation.offset}`, () => {
            const ops = D10_parseInput(descriptor.sample);
            const result = D10_executeCycles(ops, expectation.offset)
            expect(result.x).toEqual(expectation.expectedX);
        })
    })
});

[
  {
      name: "Q1 Sample2",
      sample: D10_Q1_SAMPLE2,
      expectation: 13140
  }, {
      name: "Q1 Input",
      sample: D10_INPUT,
      expectation: 14780
}
].forEach(descriptor => {
    test(`${descriptor.name}`, () => {
        const cycles = [20,60,100,140,180,220]
        const ops = D10_parseInput(descriptor.sample);
        const result = cycles
            .map(cycle => D10_executeCycles(ops, cycle).x*cycle)
            .reduce((total, val) => total + val, 0);
        expect(result).toEqual(descriptor.expectation);
    })
});

/*
[
  {name: "Q2 Sample", sample: D10_Q1_SAMPLE, expectation: 42},
  {name: "Q2 Input", sample: D10_INPUT, expectation: 42}
].forEach(descriptor => {
  test(descriptor.name, () => {
      expect(D10_parseInput(descriptor.sample)).toEqual(descriptor.expectation);
  })
});

*/

