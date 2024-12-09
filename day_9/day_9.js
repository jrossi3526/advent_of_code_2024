const fs = require("node:fs");

const DISK_MAP = fs.readFileSync("day_9/day_9_input.txt", "utf8");
// const DISK_MAP = "2333133121414131402";
const FREE_SPACE_TOKEN = ".";

console.time("Part 1");
// represent data as index #s and .
const diskBlocks = Array.from(DISK_MAP).flatMap((ele, idx) => {
  // if even idx, represents a file
  if (idx % 2 == 0) {
    return Array(Number(ele)).fill(idx / 2);
  }
  // if odd idx, represents free space
  return Array(Number(ele)).fill(FREE_SPACE_TOKEN);
});

let lastIndex = -1;
for (let i = diskBlocks.length - 1; i >= 0; i--) {
  if (diskBlocks[i] === FREE_SPACE_TOKEN) {
    // if free space, do nothing
    continue;
  }

  const firstFreeSpaceIdx = diskBlocks.indexOf(FREE_SPACE_TOKEN, lastIndex + 1);
  lastIndex = firstFreeSpaceIdx;
  if (firstFreeSpaceIdx > i) {
    // if no digits or if last digit is before current idx, file block is ordered
    break;
  }

  // else, swap free space and last file block
  [diskBlocks[i], diskBlocks[firstFreeSpaceIdx]] = [
    FREE_SPACE_TOKEN,
    diskBlocks[i],
  ];
}

// calculate the checksum by adding up the result of multiplying each of these blocks' position with the file ID number it contains

const checksum = diskBlocks
  .slice(0, diskBlocks.indexOf(FREE_SPACE_TOKEN))
  .reduce((acc, cur, idx) => {
    return idx * cur + acc;
  }, 0);
console.timeEnd("Part 1");

console.log("checksum", checksum);
