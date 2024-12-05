const fs = require("node:fs");

/**
The first section specifies the page ordering rules, one per line. The first rule, 47|53, means that if an update includes both page number 47 and page number 53, then page number 47 must be printed at some point before page number 53. (47 doesn't necessarily need to be immediately before 53; other pages are allowed to be between them.)

The second section specifies the page numbers of each update. Because most safety manuals are different, the pages needed in the updates are different too. The first update, 75,47,61,53,29, means that the update consists of page numbers 75, 47, 61, 53, and 29.

Determine which updates are already in the correct order.

What do you get if you add up the middle page number from those correctly-ordered updates?
*/

const data = fs.readFileSync("day_5/day_5_input.txt", "utf8");


// create array of rules
// create 2D array of print orders

const [rules, updates] = data.split(/\n\n/).map((line, idx) =>
  line.split(/\n/).map((newLine) => {
    if (idx === 0) {
      return newLine.split("|");
    }

    return newLine.split(",");
  })
);

// filter out incorrectly ordered updates

// get middle page # of each correct update

// add together middle page numbers

const filterOutIncorrectUpdates = (update, idx, arr) => {
  // check update against rules
  // if adheres to rule, return true
  return rules.every(([rule1, rule2]) => {
    // for example, [ '61', '53' ] means if update contains both numbers, they must be in this order
    const firstPage = update.findIndex((ele) => ele == rule1);
    const secondPage = update.findIndex((ele) => ele == rule2);

    // one or both pages not in update
    if (firstPage === -1 || secondPage === -1) {
      return true;
    }

    return firstPage < secondPage;
  });
};

const filteredUpdates = updates.filter(filterOutIncorrectUpdates);

const summation = filteredUpdates.reduce(
  (acc, cur) => acc + Number(cur[Math.ceil(cur.length - 1) / 2]),
  0
);
console.log("summation", summation);
