export const checkWin = (sides) => {
  return sides.every(side => side == 1);
}

export const calculateScore = (movesTaken, maxPossibleScore, sides) => {
  // This function assumes the game is won - movesTaken >= fewestMoves && movesTaken != 0
  return Math.round((((1 / (movesTaken)) * 1000) / maxPossibleScore) * 100)
}

export const calcCapacity = (onBoat) => {
  let capacity = 0;
  onBoat.forEach((character) => {
    if (character !== null) {
      capacity++;
    }
  })

  return capacity;
}

export const emptyBoat = (boatSize, config, stage) => {
  config.onBoat = Array(boatSize).fill(null)
  stage.set("wgc-config", config)
}

export const endConditions = (checkArray, stage, player, config, game) => {
  const { boatSide, sides, moves } = config

  const lost = checkArray.some((character) => character === true)
  if (lost) {
    config.status = 1
    stage.set("wgc-config", config)
  }

  if (stage.get("constants").calculateScore && checkWin(sides)) {
    const scoreArr = stage.get("scoreArr");
    const newScore = calculateScore(moves, stage.get("constants").maxPossibleScore)

    // removes reduncancy to prevent glitching
    if (scoreArr[scoreArr.length - 1] != newScore) {
      scoreArr.push(newScore);
      stage.set("scoreArr", scoreArr);
    }

    game.players.forEach(curPlayer => curPlayer.stage.set("score", Math.max(...scoreArr)));

    config.status = 2
    stage.set("wgc-config", config)
  } else if (checkWin(sides)) {
    config.status = 2
    stage.set("wgc-config", config)
  }
}

export const setCharacter = (character, stage) => {
  const config = stage.get("wgc-config")

  const empty = config.onBoat.every((character) => character === null)

  if (empty) {
    config.onBoat[0] = character
  } else {
    config.onBoat[config.onBoat.length - 1] = character
  }

  stage.set("wgc-config", config)
}
