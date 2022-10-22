"use strict";

const os = require("os");
const fsP = require("fs/promises");
/**
 * Consider sums of a three-measurement sliding window.
 * How many sums are larger than the previous sum?
 */
function sonarSweepSlideWindow(nums, range) {
  let currSum= 0;
  let prevSum = 0;
  let increaseCount = 0;
  //find the sum of the first window (length of range)
  for (let i = 0; i < range; i++) {
    currSum += Number(nums[i]);
  }
  // starting after the first sum, compute the rest
  for (let i = range; i < nums.length; i++) {
    //last currSum becomes previous
    prevSum = currSum;
    // current window adds new element and chops off left
    currSum += Number(nums[i]) - Number(nums[i-range]);
    if (currSum > prevSum) increaseCount++;
  }

  return increaseCount;
}

/**
 * Takes file path and encoding as input;
 * `encoding` defaults to standard text: `utf8`.
 * Logs error and exits process if error.
 * Otherwise, returns content of file.
 */
 async function readFile(filePath, encoding = "utf8") {
  try {
    return await fsP.readFile(filePath, encoding);
  } catch (err) {
    console.error(`Couldn't read from: ${filePath}`);
    process.exit(1);
  }
}

/**
 * Given string input
 * Returns an array containing each non-empty line of file.
 */
function getLinesFromString(string) {
  // Using the EOL constant from the node os module // to identify the
  // correct end-of-line (EOL) character
  return (
    string
      .split(os.EOL)
      .filter(u => u !== "")
  );
}

/** calling the function*/
async function getResult(){
  //can aslo use (process.argv[2] instead of specific file name and call
  //`node SonarSweep.js text-file-name` in terminal)
  const input = await readFile("sonarSweepInput.txt");
  let result = sonarSweepSlideWindow(getLinesFromString(input),3);
  console.log(result);
  return result;
}

getResult();