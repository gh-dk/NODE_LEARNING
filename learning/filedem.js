const fs = require("node:fs");
const { open } = require("node:fs/promises");

const fd = new File([], "./Files/Mangeshkar.txt");

console.log("___________________");

async function readData() {
  const fd = await open("./Files/Mangeshkar.txt");
  let array = new Buffer.alloc(50); // 50 bytes
  fd.read(array, 0, 15, 3)
    .then((object) => {
      console.log(object.bytesRead);
      console.log(object.buffer.toString());
    })
    .catch((errr) => console.log(errr))
    .finally(() => {});
}
readData();
