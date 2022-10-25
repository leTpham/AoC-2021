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

  const chosen = data.shift().split(",");
  let chosenNums = chosen.map(str => Number(str));
  while (data.length > 0) {
    let board = data.splice(0, 5);

    board = board.map(line => line = line.trim().split(/\s+/)); //split by one or more spaces
    boards.push(board);

  }

  console.log("CHOSEN In nums", chosenNums);
  // console.log("boards", boards);

  let winNum;
  let remain = 0;
  for (let j = 0; j < boards.length; j++) {
    for (let k = 0; k < 5; k++) {
      // for (let i = 0; i < 5; i++) {
      //   if (Number(boards[j][k]) === chosenNums[i]) boards[j][k] = '*';
      // }
      // for (let l = 5; l < 11; l++) {
      //   if (Number(boards[j][k]) === chosenNums[l]) boards[j][k] = '*';
      // }
      // if (Number(boards[j][k]) === chosenNums[11]) boards[j][k] = '*';

      // if (boards[j][k].every(el => el === "*")) {
      //   winNum = chosenNums[11];
      //   remain = boards
      //   .filter(el => el !== "*")
      //   .reduce((prev, curr) => Number(prev) + Number(curr));
      // }
      for (let i = 0; i < 5; i++) {
        //TODO: foreach is not working here so using for loop for now
        for (let m = 0; m < boards[j][k].length; m++){
          if (Number(boards[j][k][m])=== chosenNums[i]) {
            boards[j][k][m] = "*";
          }
        }
      }
    }

    // console.log("product", winNum * remain);
    // console.log("winnum", winNum);
    // console.log("remain", remain);
  }
  console.log("BOARDS AFTER",boards);
  return winNum * remain;

}


winBoard();