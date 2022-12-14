
import {D03_INPUT, D03_Q1_SAMPLE} from "./2022-03.inputs";
import {
    D03_compartimentize, D03_extractGroupsOf3From, D03_findSimilarInGroups,
    D03_findSimilarInHalves, D03_prioritiesSumInGroups,
    D03_prioritiesSumOf,
    D03_priorityOf
} from "../src/2022-03";
import {Arrays} from "../src/utils";

test("D03_compartimentize", () => {
    expect(D03_compartimentize(`vJrwpWtwJgWrhcsFMMfFFhFp`)).toEqual([`vJrwpWtwJgWr`, `hcsFMMfFFhFp`])
})

test("D03_findSimilarInHalves", () => {
    expect(D03_findSimilarInHalves(`vJrwpWtwJgWrhcsFMMfFFhFp`)).toEqual(`p`)
})

test(`D03_priorityOf`, () => {
    expect(D03_priorityOf('a')).toEqual(1)
    expect(D03_priorityOf('b')).toEqual(2)
    expect(D03_priorityOf('z')).toEqual(26)
    expect(D03_priorityOf('A')).toEqual(27)
    expect(D03_priorityOf('B')).toEqual(28)
    expect(D03_priorityOf('Z')).toEqual(52)
})

test("Q1 Sample", () => {
    expect(D03_prioritiesSumOf(D03_Q1_SAMPLE.split("\n"))).toEqual(157);
})

test("Q1 Input", () => {
    expect(D03_prioritiesSumOf(D03_INPUT.split("\n"))).toEqual(7597);
})

test(`D03_extractGroupsOf3From`, () => {
    const groups = D03_extractGroupsOf3From(D03_Q1_SAMPLE.split("\n"));
    expect(groups).toEqual([
        [`vJrwpWtwJgWrhcsFMMfFFhFp`, `jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL`, `PmmdzqPrVvPwwTWBwg`],
        [`wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn`, `ttgJtRGJQctTZtZT`, `CrZsJsPPZsGzwwsLwLmpwMDw`],
    ])
})

test('D03_findSimilarInGroups', () => {
    expect(D03_findSimilarInGroups(
        [`vJrwpWtwJgWrhcsFMMfFFhFp`, `jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL`, `PmmdzqPrVvPwwTWBwg`])
    ).toEqual('r')
    expect(D03_findSimilarInGroups(
        [`wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn`, `ttgJtRGJQctTZtZT`, `CrZsJsPPZsGzwwsLwLmpwMDw`])
    ).toEqual('Z')
})

test("Q2 Sample", () => {
    expect(D03_prioritiesSumInGroups(D03_Q1_SAMPLE.split("\n"))).toEqual(70);
})

test("Q2 Input", () => {
    expect(D03_prioritiesSumInGroups(D03_INPUT.split("\n"))).toEqual(2607);
})
