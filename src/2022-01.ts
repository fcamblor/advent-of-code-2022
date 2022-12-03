
// TODO: Fill into this file utility functions to display stuff into the spreadsheet
// ... or simply function that are going to be tested into corresponding ../test/2022-01.test.ts file

export function D01_extractElfFood(str: string): Array<number[]> {
    return str.split("\n\n").map(elfValues => elfValues.split("\n").map(Number));
}

export function D01_elfTotalCalories(calories: number[]): number {
    return calories.reduce((tot, calorie) => tot+calorie, 0)
}

export function D01_elfMaxCalories(str: string): number {
    const elfFood = D01_extractElfFood(str);
    return Math.max(...elfFood.map(D01_elfTotalCalories))
}
