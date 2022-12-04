export type MatrixCoord = { x: number, y: number };


export class Arrays {
    static intersect<T>(arr1: T[], arr2: T[]): T[] {
        return arr1.filter(elem1 => arr2.includes(elem1));
    }

    // Not sure if I can make a better signature with only a spread argument,
    // but with enforcement of an array of length >= 1
    static intersectAcross<T>(first: T[], ...arrays: T[][]): T[] {
        return arrays.reduce((intersections, array) => {
            return Arrays.intersect(intersections, array);
        }, first);
    }

    static unique<T>(arr: T[]): T[] {
        return [...new Set(arr)];
    }
}

export type Comparable = number;
export class Ranged<T extends Comparable> {
    constructor(
        public readonly lowerBound: T, public readonly lowerIncluded: boolean = true,
        public readonly upperBound: T, public readonly upperIncluded: boolean = true,
    ) {
        if(this.firstLowerValue > this.firstLowerValue) {
            throw new Error(`Invalid range: [${this.firstLowerValue}, ${this.firstUpperValue}]`)
        }
    }

    get firstLowerValue(){ return this.firstBoundedValue('lower', this.lowerBound, this.lowerIncluded); }
    get firstUpperValue(){ return this.firstBoundedValue('upper', this.upperBound, this.upperIncluded); }

    includes(other: Ranged<T>): boolean {
        return this.firstLowerValue <= other.firstLowerValue
            && this.firstUpperValue >= other.firstUpperValue;
    }

    private firstBoundedValue(boundType: 'lower'|'upper', value: T, included: boolean): number {
        return included
            ?value
            :boundType==='lower'?value+1:value-1;
    }

    static countFullOverlaps<T extends Comparable>(rangeds: Array<Ranged<T>>): Array<{ranged: Ranged<T>, includes: Ranged<T>}> {
        let overlaps: Array<{ranged: Ranged<T>, includes: Ranged<T>}> = [];
        for(let i=0; i<rangeds.length; i++) {
            for(let j=0; j<rangeds.length; j++) {
                if(i!==j && rangeds[i].includes(rangeds[j])){
                    overlaps.push({ranged: rangeds[i], includes: rangeds[j] })
                }
            }
        }
        return overlaps;
    }
}


export function assert(value: unknown, errorMessage?: string): asserts value {
    if(!value) {
        throw new Error(`Assertion failed !${errorMessage?` ${errorMessage}`:''}`)
    }
}

export function extractColumnBasedValues<A1>(...arrays: [GSheetCells]): [ A1[] ];
export function extractColumnBasedValues<A1,A2>(...arrays: [GSheetCells,GSheetCells]): [ A1[], A2[] ];
export function extractColumnBasedValues<A1,A2,A3>(...arrays: [GSheetCells,GSheetCells,GSheetCells]): [ A1[], A2[], A3[] ];
export function extractColumnBasedValues<A1,A2,A3,A4>(...arrays: [GSheetCells,GSheetCells,GSheetCells,GSheetCells]): [ A1[], A2[], A3[], A4[] ];
export function extractColumnBasedValues<A1,A2,A3,A4,A5>(...arrays: [GSheetCells,GSheetCells,GSheetCells,GSheetCells,GSheetCells]): [ A1[], A2[], A3[], A4[], A5[] ];
export function extractColumnBasedValues<A1,A2,A3,A4,A5,A6>(...arrays: [GSheetCells,GSheetCells,GSheetCells,GSheetCells,GSheetCells,GSheetCells]): [ A1[], A2[], A3[], A4[], A5[], A6[] ];
// google spreadsheet returns 2D values. this function aims at "flattening" 1-column 2D array
// extractColumnBasedValues([ ["a"], ["b"], ["c"] ], [ [1], [2], [3] ]) => [ ["a","b","c"], [1,2,3] ]
// Note that if 3 consecutive empty cells are found, cells are ignored (that's useful when we don't want to specifically target last row in cells selector)
// extractColumnBasedValues([ [""], ["a"], [""], ["b"], ["c"], [""], [""], [""], [""] ]) => [ ["","a","","b","c"] ]
export function extractColumnBasedValues(...valuesArray: GSheetCells[]): any[][] {
    return valuesArray.map(cells =>
        // Considering that we should ignore rows once we reach 3 consecutive empty cells
        cells.filter((row, idx) => ((row[0] !== undefined && row[0] !== "") || (cells[idx+1] !== undefined && cells[idx+1][0] !== "") || (cells[idx+2] !== undefined && cells[idx+2][0] !== "")))
             .map(row => row[0])
    );
}

// ensureArraysHaveSameLength([ [1,2,3], [4,5,6] ]) => true
// ensureArraysHaveSameLength([ [1,2,3], [1,2] ]) => throws exception
export function ensureArraysHaveSameLength(arrays: any[]) {
    var arraysByLength = arrays.reduce((arraysByLength, arr, index) => {
        arraysByLength[""+arr.length] = arraysByLength[""+arr.length] || [];
        arraysByLength[""+arr.length].push({ index });
        return arraysByLength;
    }, {});

    if(Object.keys(arraysByLength).length !== 1) {
        throw new Error("Arrays with different lengths detected : "+JSON.stringify(arraysByLength));
    }

    return true;
}

// countLetterOccurencesInString("e", "frederic") => 2
export function countLetterOccurencesInString(letter: string[0], str: string) {
    return str.split('').filter(l => l === letter).length;
}

export function combine<A1,A2>(a1: A1[], a2: A2[]): [A1,A2][];
export function combine<A1,A2,A3>(a1: A1[], a2: A2[], a3: A3[]): [A1,A2,A3][];
export function combine<A1,A2,A3,A4>(a1: A1[], a2: A2[], a3: A3[], a4: A4[]): [A1,A2,A3,A4][];
export function combine<A1,A2,A3,A4,A5>(a1: A1[], a2: A2[], a3: A3[], a4: A4[], a5: A5[]): [A1,A2,A3,A4,A5][];
export function combine<A1,A2,A3,A4,A5,A6>(a1: A1[], a2: A2[], a3: A3[], a4: A4[], a5: A5[], a6: A6[]): [A1,A2,A3,A4,A5,A6][];
// combine([1,2,3], ["a","b","c"]) => [[1,"a"], [2, "b"], [3, "c"]]
export function combine(...arrays: any[]): any[][] {
    ensureArraysHaveSameLength(arrays);

    return arrays[0].map((_: any, idx: number) => arrays.map(arr => arr[idx]));
}

export function rotateMatrix<T>(m: T[][]): T[][] {
    if(!m.length){ return []; }
    const rotated = Array(m[0].length);
    for(var i=0; i<rotated.length; i++){
        rotated[i] = Array(m.length);
        for(var j=0; j<m.length; j++){
            rotated[i][j] = m[j][i];
        }
    }
    return rotated;
}

export function fact(x: number) {
    let result = 1;
    for(var i=2;i<=x; i++) {
        result *= i;
    }
    return result;
}

export function cnp(n: number, p: number) {
    return fact(n)/(fact(p)*fact(n-p));
}

export function matrixEquals<T extends number|string>(m1: T[][], m2: T[][]): {areEqual: boolean, reason?: string} {
    if(m1.length === 0 && m2.length === 0) {
        return { areEqual: true };
    }
    if(m1.length !== m2.length) {
        return { areEqual: false, reason: "first dimension size differ" };
    }
    if(m1[0].length !== m2[0].length) {
        return {areEqual: false, reason: "second dimension size differ" };
    }
    for(let y=0; y<m1.length; y++) {
        for(let x=0; x<m1[y].length; x++) {
            if(m1[y][x] !== m2[y][x]) {
                return { areEqual: false, reason: `difference found at [${y}][${x}] (m1[${y}][${x}]=${m1[y][x]}, m2[${y}][${x}]=${m2[y][x]})` };
            }
        }
    }
    return {areEqual: true};
}

export function inMatrixBound(matrix: any[][], coord: MatrixCoord) {
    return coord.y >= 0 && coord.y < matrix.length && coord.x >= 0 && matrix[0] && coord.x < matrix[0].length;
}

export function matrixGetOrUndefined<T>(matrix: T[][], coord: MatrixCoord): T|undefined {
    if(!inMatrixBound(matrix, coord)) {
        return undefined;
    }
    return matrix[coord.y][coord.x];
}

export function matrixSet<T>(matrix: T[][], coord: MatrixCoord, value: T) {
    matrix[coord.y][coord.x] = value;
}

export function iterateOverMatrix<T, U>(matrix: T[][], callback: (coord:MatrixCoord, value: T) => ({continue: false, returnedValue:U}|{ continue: true })): U|undefined {
    for(let y=0; y<matrix.length; y++) {
        for(let x=0; x<matrix[y].length; x++) {
            let result = callback({x,y}, matrix[y][x]);
            if(!result.continue) {
                return result.returnedValue;
            }
        }
    }
    return undefined;
}


// Thanks to https://stackoverflow.com/a/42531964/476345
export function combinations(array: number[], uselessFillingValue = -1) {
    return new Array(1 << array.length).fill(uselessFillingValue).map(
        (_, i) => array.filter((e2, j) => i & 1 << j));
}

export function readCharMatrix<T extends string>(str: string): T[][] {
    return str.split("\n").map(line => line.split('') as T[]);
}

export function readLines(str: string): string[] {
    return str.split(/\r?\n/);
}
export function readLineGroups(str: string): string[] {
    return str.split(/\r?\n\r?\n/);
}

export function reduceTimes<T>(times: number, reducer: (accumulator: T, loopIndex: number, loopInfos: {isFirst: boolean, isLast: boolean}) => T, accumulatorInit: T) {
    return reduceRange(0, times-1, reducer, accumulatorInit);
}

export function reduceRange<T>(start: number, endIncluded: number, reducer: (accumulator: T, loopIndex: number, loopInfos: {isFirst: boolean, isLast: boolean}) => T, accumulatorInit: T) {
    let accumulator = accumulatorInit;
    for(let i=start; i<=endIncluded; i++) {
        accumulator = reducer(accumulator, i, { isFirst: i===start, isLast: i===endIncluded });
    }
    return accumulator;
}

export function bitsToNumber(bits: ("0"|"1")[]): number {
    return parseInt(bits.join(""), 2);
}
export function numberToBits(num: number): ("0"|"1")[] {
    return (num >>> 0).toString(2).split("") as ("0"|"1")[];
}

export function padLeft<T>(arr: T[], padding: number, paddingValue: T) {
    return Array(padding - arr.length).fill(paddingValue).concat(arr);
}

export function cartesian2<A1,A2>(...arrays: [A1[], A2[]]): [A1,A2][];
export function cartesian2<A1,A2,A3>(...arrays: [ A1[], A2[], A3[] ]): [A1,A2,A3][];
export function cartesian2<A1,A2,A3,A4>(...arrays: [ A1[], A2[], A3[], A4[] ]): [A1,A2,A3,A4][];
export function cartesian2<A1,A2,A3,A4,A5>(...arrays: [ A1[], A2[], A3[], A4[], A5[] ]): [A1,A2,A3,A4,A5][];
export function cartesian2<A1,A2,A3,A4,A5,A6>(...arrays: [ A1[], A2[], A3[], A4[], A5[], A6[] ]): [A1,A2,A3,A4,A5,A6][];
export function cartesian2(...arrays: any[]): any[][] {
    return cartesian(arrays);
}
// source : https://stackoverflow.com/a/36234242/476345
export function cartesian(...arrays: any[][]): any[][] {
    return arrays.reduce((a,b) => {
        return a.map((x: any) => {
            return b.map((y: any) => {
                return x.concat([y]);
            })
        }).reduce(
            (a,b) => a.concat(b),
            []
        )
    }, [ [] ]);
}

export function fill2DMatrix<T>(startingMatrix: Map<string, {x:number,y:number,v:T}>, matrixToConcat: Map<string, {x:number,y:number,v:T}>, atOffset: {x:number,y:number}): void {
    Array.from(matrixToConcat.values()).reduce((newMatrix, value) => {
        newMatrix.set(`${atOffset.x + value.x}_${atOffset.y + value.y}`, { x: atOffset.x + value.x, y: atOffset.y + value.y, v: value.v });
        return newMatrix;
    }, startingMatrix);
}

export function fillAroundMatrix<T>(matrix: Map<String, {x:number,y:number,v:T}>, fillingValue: T): void {
    const maxY = Math.max(...Array.from(matrix.values()).map(c => c.y))+1;
    const maxX = Math.max(...Array.from(matrix.values()).map(c => c.x))+1;

    Array.from(matrix.entries()).forEach(([key, value]) => {
        if(value.x === 0 || value.y === 0) {
            matrix.delete(key);
        }
        matrix.set(`${value.x+1}_${value.y+1}`, {x: value.x+1, y: value.y+1, v: value.v});
    });
    for(let x=0; x<maxX+2; x++) {
        matrix.set(`${x}_0`, { x, y:0, v: fillingValue});
        matrix.set(`${x}_${maxY+1}`, { x, y:maxY+1, v: fillingValue});
    }
    for(let y=0; y<maxY+2; y++) {
        matrix.set(`0_${y}`, { x:0, y, v: fillingValue});
        matrix.set(`${maxX+1}_${y}`, { x:maxX+1, y, v: fillingValue});
    }
}

export function matrixToStr<T>(matr: Map<string, {x:number,y:number,v:T}>): string {
    let str = "";
    const maxY = Math.max(...Array.from(matr.values()).map(c => c.y)) + 1;
    const maxX = Math.max(...Array.from(matr.values()).map(c => c.x)) + 1;

    for(let y=0; y<maxY; y++){
        for(let x=0; x<maxX; x++){
            let cell = matr.get(`${x}_${y}`);
            str += cell===undefined?"?":cell.v;
        }
        str+="\n";
    }

    return str;
}

export function mapCreateIfAbsent<K,T>(map: Map<K,T>, key: K, initValue: T): T {
    if(!map.has(key)) {
        map.set(key, initValue);
    }
    return map.get(key)!;
}

export function findMapped<T,U>(arr: T[], mapper: (value: T, index: number) => U, predicate: (value: U, index: number) => boolean): U|undefined {
    for(let i=0; i<arr.length; i++) {
        const mapped = mapper(arr[i], i);
        if(predicate(mapped, i)) {
            return mapped;
        }
    }
    return undefined;
}

export type Squarred2DMatrixEntry<T> = {x:number,y:number,v:T};
export class Squarred2DMatrix<T> {
    public readonly size: number;
    public readonly valByCoord: Map<string, Squarred2DMatrixEntry<T>>;
    constructor(public readonly values: Squarred2DMatrixEntry<T>[]) {
        this.valByCoord = values.reduce((valByCoord, val) => {
            valByCoord.set(Squarred2DMatrix.coordsToKey(val), val);
            return valByCoord;
        }, new Map<string, Squarred2DMatrixEntry<T>>());

        const maxX = Math.max(...this.values.map(({x, ..._}) => x));
        const maxY = Math.max(...this.values.map(({y, ..._}) => y));
        if(maxX !== maxY) {
            throw new Error(`Unexpected matrix values : this is not a square ! maxX=${maxX}, maxY=${maxY}`);
        }
        this.size = maxX + 1;
    }

    public extractRow(rowNum: number) {
        return this.values.filter(({y, ..._}) => y === rowNum).sort((e1, e2) => e1.x - e2.x);
    }
    public extractCol(colNum: number) {
        return this.values.filter(({x, ..._}) => x === colNum).sort((e1, e2) => e1.y - e2.y);
    }

    public rotateClockwise() {
        return this.flipMajorDiagonal().flipY();
    }

    public flipX() {
        const flippedEntries = [] as Squarred2DMatrixEntry<T>[];
        for(let x=0; x<this.size; x++) {
            for(let y=0; y<this.size; y++) {
                let originalTileEntry = this.entryAt({x,y});
                flippedEntries.push({ x: x, y: this.size - y - 1, v: originalTileEntry!.v });
            }
        }
        return new Squarred2DMatrix<T>(flippedEntries);
    }

    public flipY() {
        const flippedEntries = [] as Squarred2DMatrixEntry<T>[];
        for(let x=0; x<this.size; x++) {
            for(let y=0; y<this.size; y++) {
                let originalTileEntry = this.entryAt({x,y});
                flippedEntries.push({ x: this.size - x - 1, y: y, v: originalTileEntry!.v });
            }
        }
        return new Squarred2DMatrix<T>(flippedEntries);
    }

    public flipXY() {
        return this.flipX().flipY();
    }

    public flipMajorDiagonal() {
        const flippedEntries = [] as Squarred2DMatrixEntry<T>[];
        for(let x=0; x<this.size; x++) {
            for(let y=0; y<this.size; y++) {
                let originalTileEntry = this.entryAt({x,y});
                flippedEntries.push({ x: y, y: x, v: originalTileEntry!.v });
            }
        }
        return new Squarred2DMatrix<T>(flippedEntries);
    }

    public subtractBorders() {
        const subtractedEntries = [] as Squarred2DMatrixEntry<T>[];
        for(let x=1; x<this.size-1; x++) {
            for(let y=1; y<this.size-1; y++) {
                let originalTileEntry = this.entryAt({x,y});
                subtractedEntries.push({ x: x-1, y: y-1, v: originalTileEntry!.v });
            }
        }
        return new Squarred2DMatrix(subtractedEntries);
    }

    public entryAt({x,y}: {x:number, y:number}): Squarred2DMatrixEntry<T>|undefined {
        return this.valByCoord.get(Squarred2DMatrix.coordsToKey({x,y}));
    }

    public toString() {
        return matrixToStr(this.valByCoord);
    }

    public static coordsToKey({x,y}: {x: number, y: number}) {
        return `${x}_${y}`;
    }

    private static readonly TRANSFORMATIONS_TO_APPLY: ( (matrix: Squarred2DMatrix<any>) => Squarred2DMatrix<any> )[] = [
        (tile) => tile.rotateClockwise(),
        (tile) => tile.rotateClockwise(),
        (tile) => tile.rotateClockwise(),
        (tile) => tile.rotateClockwise(),
        (tile) => tile.flipX(),
        (tile) => tile.rotateClockwise(),
        (tile) => tile.rotateClockwise(),
        (tile) => tile.rotateClockwise(),
        (tile) => tile.rotateClockwise(),
        (tile) => tile.flipX().flipY(), // Re-flippingX reinitializes state
        (tile) => tile.rotateClockwise(),
        (tile) => tile.rotateClockwise(),
        (tile) => tile.rotateClockwise(),
        (tile) => tile.rotateClockwise(),
        (tile) => tile.flipX(),
        (tile) => tile.rotateClockwise(),
        (tile) => tile.rotateClockwise(),
        (tile) => tile.rotateClockwise(),
    ];
    public applyEveryPossibleRotationsAndFlips<U>(continuePredicate: (matrix: Squarred2DMatrix<T>) => ({continue:true}|{continue:false,result:U})): U|undefined {
        let candidateMatrix: Squarred2DMatrix<T> = this;

        // console.log("Starting matrix : ")
        // console.log(candidateMatrix.toString());

        let i=0, continuePredicateOutcome = continuePredicate(candidateMatrix);
        while(continuePredicateOutcome.continue && i<Squarred2DMatrix.TRANSFORMATIONS_TO_APPLY.length) {
            candidateMatrix = Squarred2DMatrix.TRANSFORMATIONS_TO_APPLY[i](candidateMatrix);

            // console.log(`After transf[${i}] : ${Squarred2DMatrix.TRANSFORMATIONS_TO_APPLY[i].toString()}`);
            // console.log(candidateMatrix.toString());

            i++;
            continuePredicateOutcome = continuePredicate(candidateMatrix);
        }
        return continuePredicateOutcome.continue?undefined:continuePredicateOutcome.result;
    }
}

export class AoCLogger {
    protected buffer: string[] = [];
    private enabled = true;
    constructor() {
    }

    public append(str: string) {
        if(this.enabled) {
            this.buffer.push(str);
        }
        return this;
    }

    public appendIfEnabled(message: () => string) {
        if(this.enabled) {
            this.buffer.push(message());
        }
        return this;
    }

    public newLine() {
        this.append('');
        return this;
    }

    public disable() {
        this.enabled = false;
        return this;
    }

    public enable() {
        this.enabled = true;
        return this;
    }

    public toString(){
        return this.buffer.join("\n");
    }

    public outputLines() {
        return [ ...this.buffer ];
    }

    public print(){
        console.log(this.toString());
    }

    public printAndFlush() {
        if(this.enabled) {
            console.log(this.toString());
            this.buffer = [];
        }
        return this;
    }
}

export class AoCExponentialLogger extends AoCLogger {
    private nextLogValue: number;
    private lastLogTime: number;
    constructor(firstLogValue: number, private nextValue: (loggedValue: number) => number) {
        super();
        this.nextLogValue = firstLogValue;
        this.lastLogTime = Date.now();
    }

    printWithExponentialValue(currentValue: number, message: (timeElapsed: number) => string) {
        if(currentValue === this.nextLogValue) {
            console.log(message(Date.now() - this.lastLogTime));
            this.nextLogValue = this.nextValue(currentValue);
            this.lastLogTime = Date.now();
        }
    }

}

export class PerfLogger extends AoCLogger {
    private perProbeDurations: Map<string, {overallDuration: number, durations: number[]}>
    constructor() {
        super();
        this.perProbeDurations = new Map<string, {overallDuration: number; durations: number[]}>();
    }

    recordDurationOf<T>(probeName: string, statement: () => T): T {
        const start = Date.now();
        const result = statement();
        const duration = Date.now() - start;
        let probeDuration = mapCreateIfAbsent(this.perProbeDurations, probeName, { overallDuration: 0, durations: [] });
        probeDuration.overallDuration += duration;
        probeDuration.durations.push(duration);
        return result;
    }

    showStats(withMinMax: boolean = false) {
        console.log(Array.from(this.perProbeDurations.entries())
            .map(([probeName, durationStats]) => ({ probeName, ...durationStats }))
            .sort((r1, r2) => r2.overallDuration - r1.overallDuration)
            .map(result => {
                let str = `${result.probeName}: Overall=${result.overallDuration}ms (count=${result.durations.length}`;
                if(withMinMax) {
                    str += `, min=${Math.min(...result.durations)}, max=${Math.max(...result.durations)}`;
                }
                str += ")";
                return str;
            }).join("\n"))
    }
}
