import {extractColumnBasedValues, readLineGroups, rotateMatrix} from "./utils";

function SPLIT_EMPTY_LINES_VERTICALLY(value: string) {
    return rotateMatrix([ readLineGroups(value) ]);
}

function JS_SPLIT(cells: GSheetCells, regexParam1: string, regexParam2?: string) {
    const [ values ] = extractColumnBasedValues<string>(cells);
    return values.map(v => v.split(new RegExp(regexParam1, regexParam2)));
}

function CONVERT_HHMM_DURATION_TO_MINUTES(cells: GSheetCells) {
    return cells.map(line => line.map(cell => hhmmToMinutes(cell)))
}

function CONVERT_MINUTES_TO_HHMM_DURATION(cells: GSheetCells) {
    return cells.map(line => line.map(cell => minutesToHHMM(Number(cell))))
}

function hhmmToMinutes(hhmm: string) {
    let match = /^(\d+)h(\d+)m$/gi.exec(hhmm)
    if(match === null) {
        match = /^(\d+)m$/gi.exec(hhmm)
        if(match === null) {
            return undefined;
        } else if(match.length === 2) {
            return Number(match[1]);
        } else {
            return "???";
        }
    } else if(match.length === 3) {
        return Number(match[1]) * 60 + Number(match[2]);
    } else {
        return "????";
    }
}

function minutesToHHMM(minutes: number) {
    const days = Math.floor(minutes / (60*24));
    const hours = Math.floor( (minutes - (days * 60 * 24)) / 60);
    const mins = minutes - (days * 60 * 24) - (hours * 60);
    let str = "";
    if(days !== 0) {
        str += ((days<10)?"0":"")+days+"d";
    }
    str += ((hours<10)?"0":"")+hours+"h";
    str += ((mins<10)?"0":"")+mins+"m";
    return str;
}