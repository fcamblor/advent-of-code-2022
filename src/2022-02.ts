
// TODO: Fill into this file utility functions to display stuff into the spreadsheet
// ... or simply function that are going to be tested into corresponding ../test/2022-02.test.ts file

type D02RoundOutcomes = {[key in `${'A'|'B'|'C'} ${'X'|'Y'|'Z'}`]: {shapeScore: number, outcomeScore: number}};
export const D02_Q1ROUND_OUTCOMES: D02RoundOutcomes = {
    "A X": {shapeScore: 1, outcomeScore: 3},
    "A Y": {shapeScore: 2, outcomeScore: 6},
    "A Z": {shapeScore: 3, outcomeScore: 0},
    "B X": {shapeScore: 1, outcomeScore: 0},
    "B Y": {shapeScore: 2, outcomeScore: 3},
    "B Z": {shapeScore: 3, outcomeScore: 6},
    "C X": {shapeScore: 1, outcomeScore: 6},
    "C Y": {shapeScore: 2, outcomeScore: 0},
    "C Z": {shapeScore: 3, outcomeScore: 3},
} as const;
export const D02_Q2ROUND_OUTCOMES: D02RoundOutcomes = {
    "A X": {shapeScore: 3, outcomeScore: 0},
    "A Y": {shapeScore: 1, outcomeScore: 3},
    "A Z": {shapeScore: 2, outcomeScore: 6},
    "B X": {shapeScore: 1, outcomeScore: 0},
    "B Y": {shapeScore: 2, outcomeScore: 3},
    "B Z": {shapeScore: 3, outcomeScore: 6},
    "C X": {shapeScore: 2, outcomeScore: 0},
    "C Y": {shapeScore: 3, outcomeScore: 3},
    "C Z": {shapeScore: 1, outcomeScore: 6},
} as const;

export function D02_totalScoreOf(value: string, roundOutcomes: D02RoundOutcomes = D02_Q1ROUND_OUTCOMES): number {
    const rounds = value.split("\n") as Array<keyof D02RoundOutcomes>;
    return rounds.reduce((total, round) =>
        total + roundOutcomes[round].shapeScore + roundOutcomes[round].outcomeScore,
        0
    );
}
