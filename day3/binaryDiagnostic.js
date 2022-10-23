"use strict";

const { readFile, getLinesFromString } = require('../handleInput');

/**
 * You need to use the binary numbers in the diagnostic report to generate two new binary numbers
 * (called the gamma rate and the epsilon rate).
 * The power consumption can then be found by multiplying the gamma rate by the epsilon rate.
 *
 * Each bit in the gamma rate can be determined by finding the most common bit in the corresponding position of all numbers in the diagnostic report.
 * Each bit in the epsilon rate can be determined by finding the least common bit in the corresponding position of all numbers in the diagnostic report.
 */

function gammaTimeEpsilon(binaries) {
  let gamma = [];
  let epsilon = [];
  for (let i = 0; i < binaries[0].length; i++) {
    for (let binary of binaries) {
      let moreOne = 0;
      //if it's a one increment, if not (since it's a 0) decrement
      binary[i] === "1" ? moreOne++ : moreOne--;
      moreOne ? gamma[i] = 1 : gamma[i] = 0;
      moreOne ? epsilon[i] = 0 : gamma[i] = 1;
    }
  }
  let productInBinary = Number(gamma.join("")) * Number(epsilon.join(""));
  return binaryToDecimal(productInBinary);
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

async function getResult(){
  //can aslo use (process.argv[2] instead of specific file name and call
  //`node SonarSweep.js text-file-name` in terminal)
  const input = await readFile("binaryDiagnosticsInput.txt");
  let result = gammaTimeEpsilon(getLinesFromString(input));
  console.log(result);
  return result;
}

getResult();