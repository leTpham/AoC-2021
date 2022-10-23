"use strict";

const {readFile, getLinesFromString} = require ('../handleInput')

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

async function getResult(){
  //can aslo use (process.argv[2] instead of specific file name and call
  //`node SonarSweep.js text-file-name` in terminal)
  const input = await readFile("sonarSweepInput.txt");
  let result = sonarSweepSlideWindow(getLinesFromString(input), 3);
  console.log(result);
  return result;
}

getResult();