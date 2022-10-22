"use strict";

const os = require("os");
const fsP = require("fs/promises");

/** Given an array of numbers,
 * return the amount of time a number increases from the one before it */
function sonarSweep(nums) {
  let increasedTimes = 0;
  for (let i = 0; i < nums.length; i++) {
    if (Number(nums[i]) < Number(nums[i+1])) increasedTimes++;
  }
  return increasedTimes;
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

/** calling the function with  */
async function getResult(){
  //can aslo use (process.argv[2] instead of specific file name and call
  //`node SonarSweep.js text-file-name` in terminal)
  const input = await readFile("sonarSweepInput.txt");
  let result = sonarSweep(getLinesFromString(input));
  console.log(result);
  return result;
}

getResult();