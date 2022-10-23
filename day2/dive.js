"use strict";

const {readFile, getLinesFromString} = require ('../handleInput');

/** What do you get if you multiply
 * your final horizontal position by your final depth?
 * Given an array of strings, each string is a command of going
 * forward/up/down and the number of units.
 * Return the product of horizontal position and depth after the set of commands
 */

function depthTimesPos(commands) {
  let pos = 0;
  let depth = 0;
  for (let command of commands) {
    if (command.includes("forward")) pos += Number(command.slice(8));
    if (command.includes("up")) depth -= Number(command.slice(3));
    if (command.includes("down")) depth += Number(command.slice(5));
  }
  return pos * depth;
}

async function getResult(){
  //can aslo use (process.argv[2] instead of specific file name and call
  //`node SonarSweep.js text-file-name` in terminal)
  const input = await readFile("diveInput.txt");
  let result = depthTimesPos(getLinesFromString(input));
  console.log(result);
  return result;
}

getResult();