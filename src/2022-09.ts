
// TODO: Fill into this file utility functions to display stuff into the spreadsheet
// ... or simply function that are going to be tested into corresponding ../test/2022-09.test.ts file

import {cartesian2, Ranged} from "./utils";
import {match, P} from "ts-pattern";

// R=Right,D=Down,L=Left,U=Up,DL=DownLeft,etc.
type D09_DIRECTION = 'R'|'D'|'L'|'U'|'DL'|'DR'|'UL'|'UR'|'STILL'
type D09_MOVE_OPERATION = {
    direction: D09_DIRECTION;
    value: number;
}

type D09_Position = {x: number, y: number};

export class D09Snake {
    private hashedVisitedTailPositions = new Set<string>();
    private visitedTailPositions = [] as D09_Position[];
    private hashedVisitedHeadPositions = new Set<string>();
    private visitedHeadPositions = [] as D09_Position[];
    private bodyFromHeadToTail: D09_Position[];

    private gridSnapshots: string[] = [];

    constructor(private readonly startingPos: D09_Position = {x:0,y:0}, private readonly length: number = 2, private readonly trackGridSnapshots: boolean = false) {
        this.bodyFromHeadToTail = Array(length).fill(-1).map(_ => ({...startingPos}));
        this.maybeRecordCurrentTailPosition();
    }

    get tail(): D09_Position { return this.bodyFromHeadToTail[this.bodyFromHeadToTail.length-1]; }
    get head(): D09_Position { return this.bodyFromHeadToTail[0]; }

    move(op: D09_MOVE_OPERATION) {
        Ranged.includedExcluded(0, op.value)
            .values()
            .forEach(idx => {
                this.move1(op.direction)
            });
    }
    private move1(direction: D09_DIRECTION) {
        let nextMoveDirection: D09_DIRECTION = direction;
        this.bodyFromHeadToTail.forEach((currentElementPosition, currentElementIndex) => {
            const moveDirection = nextMoveDirection;
            const oldBodyElementPosition = {...currentElementPosition}

            // Moving current element
            const move = match(moveDirection)
                .with('STILL', () => ({x: 0,  y: 0  }))
                .with('R',    () => ({x: 1,  y: 0  }))
                .with('L',    () => ({x: -1, y: 0  }))
                .with('U',    () => ({x: 0,  y: 1  }))
                .with('D',    () => ({x: 0,  y: -1 }))
                .with('DL',   () => ({x: -1, y: -1 }))
                .with('DR',   () => ({x: 1,  y: -1 }))
                .with('UL',   () => ({x: -1, y: 1  }))
                .with('UR',   () => ({x: 1,  y: 1  }))
                .exhaustive()

            currentElementPosition.x += move.x;
            currentElementPosition.y += move.y;

            if(currentElementIndex+1 < this.bodyFromHeadToTail.length) {
                const nextBodyElement = this.bodyFromHeadToTail[currentElementIndex+1];

                // Determining move for next element
                nextMoveDirection = match([nextBodyElement.x - oldBodyElementPosition.x, nextBodyElement.y - oldBodyElementPosition.y, moveDirection] as const)
                    .with([P._, P._, 'STILL'], () => 'STILL')
                    // H=T => T shouldn't move | eg: start= -H=T-- | move:R | end= -TH-
                    .with([0,   0,   P._   ], () => 'STILL')
                    // H moves to T => T shouldn't move | eg: start= -HT- | move:R | end= --H=T-
                    .with([-1,  0,   'L'   ], () => 'STILL')
                    .with([1,   0,   'R'   ], () => 'STILL')
                    .with([0,  -1,   'D'   ], () => 'STILL')
                    .with([0,   1,   'U'   ], () => 'STILL')
                    // H moves to the opposite direction than T, with T on the same row/col => T should take the same direction than H
                    // eg: start= TH-- | move:R |  -TH-
                    .with([-1,  0,   'R'   ], () => 'R')
                    .with([1,   0,   'L'   ], () => 'L')
                    .with([0,   1,   'D'   ], () => 'D')
                    .with([0,  -1,   'U'   ], () => 'U')
                    // H moves to the opposite direction than T, with T on a different row/col => T should follow H
                    // eg:  start | move: R | end
                    //     -H-    |         | -TH
                    //     T--    |         | ---
                    .with([-1,  1,   P.union('D', 'R')   ], () => 'DR')
                    .with([-1, -1,   P.union('U', 'R')   ], () => 'UR')
                    .with([1,  -1,   P.union('U', 'L')   ], () => 'UL')
                    .with([1,  1,   P.union('D', 'L')   ], () => 'DL')
                    // H moves in an orthogonal direction than T => T doesn't move
                    // eg:  start | move: R | end
                    //     -H--   |         | --H-
                    //     -T--   |         | -T--
                    // + Same than above, but with T in diagonal => T doesn't move
                    // eg:  start | move: R | end
                    //     -H--   |         | --H-
                    //     --T-   |         | --T-
                    .with([P.union(0, 1),  P.union(-1, 1),   'R'   ], () => 'STILL')
                    .with([P.union(-1, 0),  P.union(-1, 1),   'L'   ], () => 'STILL')
                    .with([P.union(-1, 1),  P.union(-1, 0),   'D'   ], () => 'STILL')
                    .with([P.union(-1, 1),  P.union(0, 1),   'U'   ], () => 'STILL')

                    // H moves in diagonal direction, by keeping T around it => T doesn't move
                    // eg: start | move: UR | end
                    //    -----  |          | ---H-
                    //    --HT-  |          | ---T-
                    //    -----  |          | -----
                    // We will have the same behaviour on the upper right "corner" of T, eg :
                    //    --xx-
                    //    --xx-
                    //    -----
                    .with([P.union(0,1), P.union(0,1), 'UR'], () => 'STILL')
                    .with([P.union(0,-1), P.union(0,1), 'UL'], () => 'STILL')
                    .with([P.union(0,1), P.union(0,-1), 'DR'], () => 'STILL')
                    .with([P.union(0,-1), P.union(0,-1), 'DL'], () => 'STILL')

                    // H moves in diagonal on opposite directions than T => T will follow x/y axis than H
                    // eg: start | move: UR | end
                    //    -----  |          | ---H-
                    //    --H--  |          | --T--
                    //    -T---  |          | -----
                    // or :
                    //    -T---  |          | --TH-
                    //    --H--  |          | -----
                    //    -----  |          | -----
                    // or :
                    //    -----  |          | ---H-
                    //    --H--  |          | ---T-
                    //    ---T-  |          | -----
                    .with([-1, 1, 'UR'], () => 'R')
                    .with([-1, -1, 'UR'], () => 'UR')
                    .with([1, -1, 'UR'], () => 'U')
                    .with([1, 1, 'UL'], () => 'L')
                    .with([1, -1, 'UL'], () => 'UL')
                    .with([-1, -1, 'UL'], () => 'U')
                    .with([-1, -1, 'DR'], () => 'R')
                    .with([-1, 1, 'DR'], () => 'DR')
                    .with([1, 1, 'DR'], () => 'D')
                    .with([-1, 1, 'DL'], () => 'D')
                    .with([1, 1, 'DL'], () => 'DL')
                    .with([1, -1, 'DL'], () => 'L')

                    // H moves in diagonal with 2 remaining positions than T
                    // eg: start | move: UR | end
                    //    -----  |          | --TH-
                    //    -TH--  |          | -----
                    //    -----  |          | -----
                    // or :
                    //    -----  |          | ---H-
                    //    --H--  |          | ---T-
                    //    --T--  |          | -----
                    .with([-1, 0, 'UR'], () => 'UR')
                    .with([0, -1, 'UR'], () => 'UR')
                    .with([1, 0, 'UL'], () => 'UL')
                    .with([0, -1, 'UL'], () => 'UL')
                    .with([-1, 0, 'DR'], () => 'DR')
                    .with([0, 1, 'DR'], () => 'DR')
                    .with([1, 0, 'DL'], () => 'DL')
                    .with([0, 1, 'DL'], () => 'DL')

                    .run() as D09_DIRECTION;
            }
        })

        // Moving tail
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

            const displayedValue = match([x, y] as const)
                .with([this.startingPos.x, this.startingPos.y], () => 's')
                .with([this.head.x, this.head.y], () => 'H')
                .otherwise(([x,y]) => {
                    const index = this.bodyFromHeadToTail.findIndex((bodyElem) => bodyElem.x === x && bodyElem.y === y)
                    if(index !== -1) {
                        return ''+index;
                    }

                    if(this.hashedVisitedTailPositions.has(`${x}_${y}`)) {
                        return '#';
                    } else {
                        return '.';
                    }
                });
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

export function D09_parseThenRunOps(input: string, debugGridSnapshots: boolean): D09Snake {
    const ops = D09_parseInput(input);
    const snake = new D09Snake({x:0, y:0}, 2, debugGridSnapshots);

    ops.forEach((op, idx) => {
        snake.move(op);
    });
    return snake;
}
