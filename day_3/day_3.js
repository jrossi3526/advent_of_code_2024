const fs = require("node:fs");

// Scan the corrupted memory for uncorrupted mul instructions. What do you get if you add up all of the results of the multiplications?

const data = fs.readFileSync("day_3/day_3_input.txt", "utf8");

const uncorruptRegex = /mul\([0-9]+[,][0-9]+[)]/g;
const uncorrupted = data
  .match(uncorruptRegex)
  .map((mul) => mul.slice(4).slice(0, -1).split(","))
  .reduce((acc, cur) => acc + Math.imul(cur[0], cur[1]), 0);

console.log("total:", uncorrupted);