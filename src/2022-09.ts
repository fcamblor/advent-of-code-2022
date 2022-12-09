
// TODO: Fill into this file utility functions to display stuff into the spreadsheet
// ... or simply function that are going to be tested into corresponding ../test/2022-09.test.ts file

import {cartesian2, Ranged} from "./utils";

type D09_DIRECTION = 'R'|'D'|'L'|'U'
type D09_MOVE_OPERATION = {
    direction: D09_DIRECTION;
    value: number;
}

type D09_Position = {x: number, y: number};

export class D09Grid {
    private hashedVisitedTailPositions = new Set<string>();
    private visitedTailPositions = [] as D09_Position[];
    private hashedVisitedHeadPositions = new Set<string>();
    private visitedHeadPositions = [] as D09_Position[];
    private head: D09_Position;
    private tail: D09_Position;

    private gridSnapshots: string[] = [];

    constructor(private readonly startingPos: D09_Position = {x:0,y:0}, private readonly trackGridSnapshots: boolean = false) {
        this.head = {...startingPos};
        this.tail = {...startingPos};
        this.maybeRecordCurrentTailPosition();
    }

    move(op: D09_MOVE_OPERATION) {
        Ranged.included(0, op.value-1)
            .values()
            .forEach(idx => {
                this.move1(op.direction)
            });
    }
    private move1(direction: D09_DIRECTION) {
        const oldHeadPosition = {...this.head}
        // Moving head
        switch(direction) {
            case 'R': this.head.x++; break;
            case 'L': this.head.x--; break;
            case 'U': this.head.y++; break;
            case 'D': this.head.y--; break;
        }

        // Moving tail
        switch(`${this.tail.x - oldHeadPosition.x}_${this.tail.y - oldHeadPosition.y}_${direction}`) {
            // H=T => T shouldn't move | eg: start= -H=T-- | move:R | end= -TH-
            case '0_0_R':case '0_0_L':case '0_0_U':case '0_0_D': break;
            // H moves to T => T shouldn't move | eg: start= -HT- | move:R | end= --H=T-
            case '-1_0_L': case '0_-1_D': case '1_0_R': case '0_1_U': break;
            // H moves to the opposite direction than T, with T on the same row/col => T should take the same direction than H
            // eg: start= TH-- | move:R |  -TH-
            case '-1_0_R': case '1_0_L': this.tail.x += this.head.x - oldHeadPosition.x; break;
            case '0_-1_U': case '0_1_D': this.tail.y += this.head.y - oldHeadPosition.y; break;
            // H moves to the opposite direction than T, with T on a different row/col => T should follow H
            // eg:  start | move: R | end
            //     -H-    |         | -TH
            //     T--    |         | ---
            case '-1_-1_R': case '-1_1_R': case '1_-1_L': case '1_1_L': this.tail.x += this.head.x - oldHeadPosition.x; this.tail.y = this.head.y; break;
            case '-1_-1_U': case '1_-1_U': case '1_1_D': case '-1_1_D': this.tail.y += this.head.y - oldHeadPosition.y; this.tail.x = this.head.x; break;
            // H moves in an orthogonal direction than T => T doesn't move
            // eg:  start | move: R | end
            //     -H--   |         | --H-
            //     -T--   |         | -T--
            case '0_-1_R': case '0_1_R': case '0_-1_L': case '0_1_L': break;
            case '-1_0_D': case '1_0_D': case '-1_0_U': case '1_0_U': break;
            // Same than above, but with T in diagonal => T doesn't move
            // eg:  start | move: R | end
            //     -H--   |         | --H-
            //     --T-   |         | --T-
            case '1_-1_R': case '1_1_R': case '-1_-1_L': case '-1_1_L': break;
            case '-1_-1_D': case '1_-1_D': case '-1_1_U': case '1_1_U': break;
        }
        this.maybeRecordCurrentTailPosition();

        if(this.trackGridSnapshots) {
            this.gridSnapshots.push(this.show());
        }
    }

    private maybeRecordCurrentTailPosition() {
        if(!this.hashedVisitedTailPositions.has(`${this.tail.x}_${this.tail.y}`)) {
            this.hashedVisitedTailPositions.add(`${this.tail.x}_${this.tail.y}`)
            this.visitedTailPositions.push({...this.tail});
        }
        if(!this.hashedVisitedHeadPositions.has(`${this.head.x}_${this.head.y}`)) {
            this.hashedVisitedHeadPositions.add(`${this.head.x}_${this.head.y}`)
            this.visitedHeadPositions.push({...this.head});
        }
    }

    public uniqueVisitedTailPositionsCount() {
        return this.visitedTailPositions.length;
    }

    public show(dimensions?: {minX: number, maxX: number, minY: number, maxY: number}): string {
        const allVisitedPositions = this.visitedTailPositions.concat(this.visitedHeadPositions);
        const minX = dimensions?.minX || Math.min(...allVisitedPositions.map(p => p.x))
        const maxX = dimensions?.maxX || Math.max(...allVisitedPositions.map(p => p.x))
        const minY = dimensions?.minY || Math.min(...allVisitedPositions.map(p => p.y))
        const maxY = dimensions?.maxY || Math.max(...allVisitedPositions.map(p => p.y))
        const height = maxY - minY;

        const strMatrix: string[][] = []
        cartesian2(
            Ranged.included(minX, maxX).values(),
            Ranged.included(minY, maxY).values(),
        ).map(([x, y]) => {
            strMatrix[height+minY - y] = strMatrix[height+minY - y] || [];

            let displayedValue: string;
            switch(`${x}_${y}`){
                case `${this.startingPos.x}_${this.startingPos.y}`: displayedValue='s';break;
                case `${this.head.x}_${this.head.y}`: displayedValue='H';break;
                case `${this.tail.x}_${this.tail.y}`: displayedValue='T';break;
                default:
                    if(this.hashedVisitedTailPositions.has(`${x}_${y}`)) {
                        displayedValue = '#';
                    } else {
                        displayedValue = '.';
                    }
            }
            strMatrix[height+minY - y][x - minX] = displayedValue;
        });

        const displayedStr = strMatrix.map(rowCells => rowCells.join("")).join("\n");
        return displayedStr;
    }

    public getGridSnapshots(){
        return this.gridSnapshots;
    }
}

export function D09_parseInput(input: string): D09_MOVE_OPERATION[] {
    return input.split("\n").map(line => {
        const [direction, strValue] = line.split(" ");
        return {
            direction: direction as D09_DIRECTION,
            value: Number(strValue)
        };
    })
}

export function D09_parseThenRunOps(input: string, debugGridSnapshots: boolean): D09Grid {
    const ops = D09_parseInput(input);
    const grid = new D09Grid({x:0, y:0}, debugGridSnapshots);

    ops.forEach((op, idx) => {
        grid.move(op);
    });
    return grid;
}
