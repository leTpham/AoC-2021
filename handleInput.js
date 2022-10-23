"use strict";

const os = require("os");
const fsP = require("fs/promises");

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

module.exports = {readFile, getLinesFromString}