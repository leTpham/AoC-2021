"use strict";

const {readFile, getLinesFromString} = require ('../handleInput')

/** How many measurements are larger than the previous measurement?
 * Given an array of numbers,
 * return the amount of time a number increases from the one before it */
function sonarSweep(nums) {
  let increasedTimes = 0;
  for (let i = 0; i < nums.length; i++) {
    if (Number(nums[i]) < Number(nums[i+1])) increasedTimes++;
  }
  return increasedTimes;
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