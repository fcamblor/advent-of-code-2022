
// TODO: Fill into this file utility functions to display stuff into the spreadsheet
// ... or simply function that are going to be tested into corresponding ../test/2022-02.test.ts file

export const D02_ROUND_OUTCOMES: {[key in `${'A'|'B'|'C'} ${'X'|'Y'|'Z'}`]: {shapeScore: number, outcomeScore: number}} = {
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

export function D02_totalScoreOf(value: string): number {
    const rounds = value.split("\n") as Array<keyof typeof D02_ROUND_OUTCOMES>;
    return rounds.reduce((total, round) =>
        total + D02_ROUND_OUTCOMES[round].shapeScore + D02_ROUND_OUTCOMES[round].outcomeScore,
        0
    );
}
