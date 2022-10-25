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
  for (let i = 0; i < boards.length; i++) {
    for (let j = 0; j < 5; j++) {
      for (let k = 0; k < 5; k++) {
        let up = 0;
        let start = 0;
        while (start < chosenNums.length - up) {
          for (let m = start; m < 5 + up; m++) {
            if (chosenNums[m] === Number(boards[i][j][k])) {
              boards[i][j][k] = "*";
            }
          }
          up++;
          start = start + 5 + up;
          console.log("UP", up, "START", start)

          }
        }
        if (boards[i][j].join("") === "*****") console.log("YAYYY");

      }

    }
    console.log("BOARDS AFTER", boards);
    console.log("result", winNum * remain);
    return winNum * remain;

  }


  winBoard();