import { Meteor } from "meteor/meteor";
const events = require("events");
const readline = require("readline");
const fs = require("fs");
const zlib = require("zlib");
const fetch = require("node-fetch");

// Add extra logging
let debugSimilarity = true;

// Preload dataset into memory on startup.
let preload = !Meteor.isDevelopment;

const gloveURL = "https://empirica-multitask.s3.amazonaws.com/glove.txt.gz";
let gloveFile;

function gloveInfoDev() {
  console.warn(`
  
  The Divergent Association task requires a GloVe file for the scoring to function.
  
  You can download the file from: "${gloveURL}"
  and place it in the ./private folder.
  
  `);
}

try {
  gloveFile = Assets.absoluteFilePath("glove.txt.gz");
} catch (error) {
  // nop
}

const gloveModel =
  Meteor.isDevelopment && gloveFile && fs.existsSync(gloveFile)
    ? gloveFile
    : gloveURL;

async function loadDict(model) {
  const vectors = {};

  console.info("Loading similarity from:", model);

  console.time("similarity: loaded");

  let fileStream;

  if (model.startsWith("http")) {
    const response = await fetch(model);

    if (!response.ok) {
      throw new Error(
        `similarity: unexpected response from model URL ${response.statusText}`
      );
    }

    fileStream = response.body;
  } else {
    fileStream = fs.createReadStream(model);
  }

  fileStream = fileStream.pipe(zlib.createUnzip());

  await readLines(fileStream, function (line) {
    const parts = line.split(" ");
    const word = parts[0];
    const vector = parts.splice(1).map((s) => parseFloat(s));
    vectors[word] = vector;
  });

  console.timeEnd("similarity: loaded");

  return vectors;
}

let globalVectors;

let loading = null;
async function loadOnce() {
  // Ensure no double loading
  if (loading) {
    await loading;
  }

  if (!globalVectors) {
    loading = true;
    let resolve;
    loading = new Promise((r) => {
      resolve = r;
    });
    globalVectors = await loadDict(gloveModel);
    resolve(true);
  }

  return globalVectors;
}

if (preload) {
  loadOnce();
}

async function readLines(stream, cb) {
  let lineReader = readline.createInterface({
    input: stream,
  });

  lineReader.on("line", function (line) {
    cb(line);
  });

  await events.once(lineReader, "close");
}

export default async function similarity(words) {
  if (Meteor.isDevelopment) {
    gloveInfoDev();
    // return;
  }

  const vectors = await loadOnce();

  if (debugSimilarity) {
    console.time("similarity: calculation");
  }

  try {
    let uniques = [];
    for (let i = 0; i < words.length; i++) {
      const valid = validate(vectors, words[i]);
      if (valid !== undefined && !uniques.includes(valid)) {
        uniques.push(valid);
      }
    }

    // if (uniques.length >= min) {
    //   uniques = uniques.slice(0, min);
    // } else {
    //   throw `similarity: insufficient words, expected ${min}, got: ${uniques.length}`;
    // }

    let distances = [];
    for (let x = 0; x < uniques.length - 1; x++) {
      for (let y = x + 1; y < uniques.length; y++) {
        const dist = distance(vectors[uniques[x]], vectors[uniques[y]]);
        const distPercent = Math.round(dist * 10000) / 100;

        if (debugSimilarity) {
          console.debug(
            `distance between "${uniques[x]}" and "${uniques[y]}" is ${distPercent}`
          );
        }
        distances.push(dist);
      }
    }

    let sum = 0;
    for (let i = 0; i < distances.length; i++) {
      sum += distances[i];
    }

    const dist = (sum / distances.length) * 100;

    // return dist;

    // NOTE(np): I think we should reduce precision, because that many
    // decimals does not make much sense in this context. I could be mistaken,
    // feel free to remove this rounding...

    return Math.round(dist * 100) / 100;
  } catch (error) {
    throw error;
  } finally {
    if (debugSimilarity) {
      console.timeEnd("similarity: calculation");
    }
  }
}

function distance(A, B) {
  let dotproduct = 0;
  let mA = 0;
  let mB = 0;

  for (let i = 0; i < A.length; i++) {
    dotproduct += A[i] * B[i];
    mA += A[i] * A[i];
    mB += B[i] * B[i];
  }

  mA = Math.sqrt(mA);
  mB = Math.sqrt(mB);

  return dotproduct / (mA * mB);
}

function validate(vectors, word) {
  const clean = word
    .replace(/[^\w\s]|_/g, "")
    .replace(/\s+/g, "")
    .toLowerCase();

  if (clean.length <= 1) {
    console.warn(`"${clean}" is too short`);
    return;
  }

  if (clean in vectors) {
    return word;
  }

  console.warn(`"${clean}" was not found in dictonary`);
}

// # Strip unwanted characters
// clean = re.sub(r"[^a-zA-Z- ]+", "", word).strip().lower()
// if len(clean) <= 1:
//     return None # Word too short

// # Generate candidates for possible compound words
// # "valid" -> ["valid"]
// # "cul de sac" -> ["cul-de-sac", "culdesac"]
// # "top-hat" -> ["top-hat", "tophat"]
// candidates = []
// if " " in clean:
//     candidates.append(re.sub(r" +", "-", clean))
//     candidates.append(re.sub(r" +", "", clean))
// else:
//     candidates.append(clean)
//     if "-" in clean:
//         candidates.append(re.sub(r"-+", "", clean))
// for cand in candidates:
//     if cand in self.vectors:
//         return cand # Return first word that is in model
// return None # Could not find valid word

// //
// // Testing
// //

// (async function () {
//   const examples = [
//     [
//       "hello",
//       "floor",
//       "car",
//       "tree",
//       "bamboo",
//       "bling",
//       "baobab",
//       "banana",
//       "binge",
//       "ten",
//     ],
//     [
//       "one",
//       "two",
//       "three",
//       "four",
//       "five",
//       "six",
//       "sevent",
//       "eight",
//       "nine",
//       "ten",
//     ],
//     [
//       "rocket",
//       "tree",
//       "soil",
//       "window",
//       "person",
//       "roof",
//       "curtain",
//       "water",
//       "anger",
//       "brilliant",
//     ],
//   ];

//   for (const list of examples) {
//     try {
//       console.debug("result", await similarity(list));
//     } catch (error) {
//       console.debug(error);
//     }
//   }
// })();
