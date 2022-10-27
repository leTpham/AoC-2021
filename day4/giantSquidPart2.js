
"use strict";

const { readFile, getLinesFromString } = require('../handleInput');

/** get input file as one array, first element is the numbers that are called,
 * every new element is one new line on a board -> 5 next elements make up a board
 */
async function getInput() {
  const input = await readFile("inputExample.txt");
  let result = getLinesFromString(input);
  return result;
}

async function winBoard() {
  const data = await getInput();
  const boards = [];
  let win;
  let remain = [];
  let remainSum;

  const chosen = data.shift().split(",");
  let chosenNums = chosen.map(str => Number(str));
  while (data.length > 0) {
    let board = data.splice(0, 5);

    board = board.map(line => line = line.trim().split(/\s+/)); //split by one or more spaces
    boards.push(board);
  }

  //iterate through each random chosen number

  for (let r = 0; r < chosenNums.length; r++) {
    //iterate through each board
    for (let b = 0; b < boards.length; b++) {

      //iterate through each line of a board
      for (let l = 0; l < boards[0].length; l++) {

        //iterate through each number in a line of a board
        for (let n = 0; n < boards[0][0].length; n++) {

          //if line are all asterisks,
          if (boards[b][l].join(" ") === "* * * * *") {
            win = chosenNums[r];
            boards[b].forEach(line => line.forEach(el => {
              if (el !== "*") remain.push(el)
            }));
            remainSum = remain.reduce((prev, curr) => Number(prev) + Number(curr));
            console.log(remainSum * win)
            return remainSum * win;
          }
          else {
            if (Number(boards[b][l][n]) === chosenNums[r]) {
              boards[b][l][n] = "*";
            }
          }
        }
      }
    }
  }
}


winBoard();