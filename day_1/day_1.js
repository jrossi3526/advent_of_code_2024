const fs = require("node:fs");

const locations = fs.readFileSync("day_1/day_1_input.txt", "utf8");

const [list1, list2] = [...Array(2).keys()].map((i) =>
  locations
    .split(`\n`)
    .map((line) => line.split(/\s+/g).map(Number)[i])
    .sort()
);

const diff = list1.reduce((acc, cur, i) => acc + Math.abs(cur - list2[i]), 0);

console.log("total distance:", diff);
