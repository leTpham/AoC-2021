"use strict";

const { readFile, getLinesFromString } = require('../handleInput');

/** To find oxygen generator rating, determine the most common value (0 or 1)
 * in the current bit position, and keep only numbers with that bit in that position.
 * If 0 and 1 are equally common, keep values with a 1 in the position being considered.
 * To find CO2 scrubber rating, determine the least common value (0 or 1)
 * in the current bit position, and keep only numbers with that bit in that position.
 * If 0 and 1 are equally common, keep values with a 0 in the position being considered
 */


function oxygenTimeCO2(binaries) {
  //base case: only one number left
  let oxygen = JSON.parse(JSON.stringify(binaries));
  let carbon = JSON.parse(JSON.stringify(binaries));

  let i = 0;
  while (oxygen.length > 1) {
    let moreOne = 0;
    for (let oxy of oxygen) {
      //if it's a one increment, if not (since it's a 0) decrement
      oxy[i] === "1" ? moreOne++ : moreOne--;
    }
    moreOne >= 0
      ? oxygen = oxygen.filter(oxy => oxy[i] === "1")
      : oxygen = oxygen.filter(oxy => oxy[i] === "0");
    i++;
  }

  let j = 0;
  while (carbon.length > 1) {
    let moreOne = 0;
    for (let car of carbon) {
      //if it's a one increment, if not (since it's a 0) decrement
      car[j] === "1" ? moreOne++ : moreOne--;
    }
    moreOne >= 0
      ? carbon = carbon.filter(car => car[j] === "0")
      : carbon = carbon.filter(car => car[j] === "1");
    j++;
  }
  return binaryToDecimal(Number(oxygen.join(""))) * binaryToDecimal(Number(carbon.join("")));

}

/** given a binary number, returns it in decimal */
function binaryToDecimal(binary) {
  let binaryInString = binary.toString();
  let decimal = 0;
  for (let i = binaryInString.length - 1; i >= 0; i--) {
    decimal += 2 ** (binaryInString.length - 1 - i) * binaryInString[i];
  }
  return decimal;
}

async function getResult() {
  //can aslo use (process.argv[2] instead of specific file name and call
  //`node SonarSweep.js text-file-name` in terminal)
  const input = await readFile("binaryDiagnosticsInput.txt");
  let result = oxygenTimeCO2(getLinesFromString(input));
  console.log(result);
  return result;
}

getResult();
