const seedrandom = require('seedrandom');

// Fisher-Yates Algo for shuffling
// export function shuffle(gamesarray) {
//   for (var i = 0; i < gamesarray.length - 1; i++) {
//     var j = i + Math.floor(Math.random() * (gamesarray.length - i));

//     var temp = gamesarray[j];
//     gamesarray[j] = gamesarray[i];
//     gamesarray[i] = temp;
//   }
//   return gamesarray;
// }

// also Fisher-Yates but with seeded randomness to randomly determine what games each batch should play
export function gameSelectionShuffle(gamesarray, seed) {
  for (var i = 0; i < gamesarray.length - 1; i++) {
    var rng = seedrandom(seed);
    var j = i + Math.floor(rng() * (gamesarray.length - i)); // modified to be random w/ seed

    var temp = gamesarray[j];
    gamesarray[j] = gamesarray[i];
    gamesarray[i] = temp;
    seed = seed + 1;  // increments seed by one st. random number generated in next iteration is different
  }

  return gamesarray;
}

export function createTasks(gameConfiguration, treatment) {
  let gameConf = gameConfiguration;
  if (treatment.unitsSeed && treatment.randomizeTask) {
    gameConf = gameSelectionShuffle(JSON.parse(JSON.stringify(gameConf)), treatment.unitsSeed);
  }

  if (treatment.numberOfRounds) {
    gameConf = gameConf.slice(0, treatment.numberOfRounds);
  }
  
  if (treatment.unitsSeed && treatment.randomizeTask) {
    gameConf = gameSelectionShuffle(JSON.parse(JSON.stringify(gameConf)), treatment.unitsSeed);
  }

  if (treatment.subUnits) {
    const gameSize = Math.floor(gameConf.length / treatment.subUnits);
    const subunitsList = [];
    if (gameSize != 0) {
      for (let i = 0; i < gameConf.length; i += gameSize) {
        const subUnitElem = gameConf.slice(i, i + gameSize);
        subunitsList.push(subUnitElem)
      }
    } 
    if (treatment.unitsIndex && treatment.unitsIndex >= 0 && treatment.unitsIndex < treatment.subUnits) {
      gameConf = subunitsList[treatment.unitsIndex]
    } else {
      gameConf = subunitsList[0]
    }
  }

  return gameConf;
}

export function check(condition, message, shouldThrow = true) {
  if (condition) {
    console.error(`
    
    ${message}

`);
    if (shouldThrow) {
      throw `Failed to init Game (see reason above)`;
    }
  }
}
