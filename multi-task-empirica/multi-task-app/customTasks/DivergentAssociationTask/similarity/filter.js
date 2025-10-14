const fs = require("fs");
const readline = require("readline");

const words = {};

readLines("./words-common.txt", function (line) {
  words[line] = true;
});

var output = fs.createWriteStream("glove.txt", {
  flags: "as+",
});

readLines("./glove.42B.300d.txt", function (line) {
  const parts = line.split(" ");
  if (words[parts[0]]) {
    output.write(line);
    output.write("\n");
  }
});

function readLines(fileName, cb) {
  var lineReader = readline.createInterface({
    input: fs.createReadStream(fileName),
  });

  lineReader.on("line", function (line) {
    cb(line);
  });
}
