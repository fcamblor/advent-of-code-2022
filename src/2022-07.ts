
// TODO: Fill into this file utility functions to display stuff into the spreadsheet
// ... or simply function that are going to be tested into corresponding ../test/2022-07.test.ts file

import {assert} from "./utils";

export type D07_EXECUTION = {command: string, output: string[] }
export type D07_FILE = { type: 'file', name: string, size: number }
export type D07_DIRECTORY = { type: 'dir', nodes: (D07_DIRECTORY|D07_FILE)[] } &
    ({ parent: D07_DIRECTORY, name: string }|{ parent: null, name: '/' })

export type D07_DIRSTAT = {dirPath: string, size: number};

export function D07_parseInput(input: string): D07_EXECUTION[] {
    return input.substring("$ ".length).split("\n$ ").map(inputOutput => {
        const lines = inputOutput.split("\n")
        return {command: lines[0], output: lines.slice(1)}
    })
}

export function D07_createFSFrom(execs: D07_EXECUTION[]): D07_DIRECTORY {
    assert(execs.length > 0)
    assert(execs[0].command === 'cd /')

    execs = execs.slice(1)
    const rootDir: D07_DIRECTORY = { type: 'dir', nodes: [], parent: null, name: "/" };
    let currentDir = rootDir;
    execs.forEach(exec => {
        if(exec.command === 'ls') {
            exec.output.forEach((outputLine, index) => {
                if(outputLine.startsWith("dir ")) {
                    currentDir.nodes.push({
                        type: 'dir',
                        nodes: [],
                        parent: currentDir,
                        name: outputLine.substring("dir ".length)
                    });
                } else {
                    const [sizeStr, filename] = outputLine.split(" ");
                    currentDir.nodes.push({type: 'file', name: filename, size: Number(sizeStr) })
                }
            })
        } else if(exec.command.startsWith("cd ")) {
            const dirName = exec.command.substring("cd ".length);
            if(dirName === '..') {
                assert(currentDir.parent !== null)
                currentDir = currentDir.parent
            } else {
                const existingSubdir = currentDir.nodes.find(node => node.type==='dir' && node.name === dirName)
                assert(existingSubdir && existingSubdir.type==='dir' && existingSubdir.parent !== null)
                // @ts-ignore don't know how to workaround this ts-ignore 🤔
                currentDir = existingSubdir
            }
        }
    })

    return rootDir;
}

export function D07_buildFSDisplay(rootDir: D07_DIRECTORY, indent: string = ""): string {
    const outputLines = [`${indent}- ${rootDir.name} (dir)`]
        .concat(rootDir.nodes.map(node => {
            if(node.type === 'file') {
                return `${indent}  - ${node.name} (file, size=${node.size})`
            } else {
                return D07_buildFSDisplay(node, indent+"  ")
            }
        }))

    const output = outputLines.join("\n")
    return output;
}

export function D07_statsDirectories(dir: D07_DIRECTORY, path: string = "/"): D07_DIRSTAT[] {
    const dirStats: D07_DIRSTAT[] = [];

    let dirSize = 0;
    dir.nodes.forEach(node => {
        if(node.type === 'file') {
            dirSize += node.size;
        } else {
            const subDirStats = D07_statsDirectories(node, `${path}${node.name}/`)
            dirStats.push(...subDirStats)
            // By convention, last dir stat is the agglomerated size for node
            dirSize += subDirStats[subDirStats.length-1].size
        }
    })

    dirStats.push({ dirPath: path, size: dirSize });

    return dirStats;
}

export function D07_sumDirectoriesGreaterThan(rootDir: D07_DIRECTORY, maxSizeThreshold: number): number {
    return D07_statsDirectories(rootDir)
        .filter(dirStat => dirStat.size <= maxSizeThreshold)
        .reduce((total, dirStat) => total+dirStat.size, 0);
}
