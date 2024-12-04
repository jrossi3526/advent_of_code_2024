const fs = require("node:fs");

// The levels are either all increasing or all decreasing.
// Any two adjacent levels differ by at least one and at most three.

// const data = `7 6 4 2 1
// 1 2 7 8 9
// 9 7 6 2 1
// 1 3 2 4 5
// 8 6 4 4 1
// 1 3 6 7 9`;

const data = fs.readFileSync("day_2/day_2_input.txt", "utf8");

const levels = data.split(`\n`).map((line) => line.split(/\s+/g).map(Number));

const safeLevels = levels.reduce((acc, cur, i) => {
  const meetsCriteria = (currentValue, idx, arr) => {
    if (idx === 0) return true;

    const incr = arr[0] < arr[1];

    const diff = currentValue - arr[idx - 1];

    // if incr, diff should be positive
    // if decreasing, diff should be negative

    return (
      ((incr && diff > 0) || (!incr && diff) < 0) &&
      Math.abs(diff) > 0 &&
      Math.abs(diff) < 4
    );
  };

  return cur.every(meetsCriteria) ? ++acc : acc;
}, 0);

console.log("# of safe levels:", safeLevels);
