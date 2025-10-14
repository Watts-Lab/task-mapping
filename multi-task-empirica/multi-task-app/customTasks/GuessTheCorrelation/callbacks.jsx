import { startDurations, endDurations, setNormalizedScoreForAllPlayers } from "../helper"

export const OnRoundStart = (game, round) => {
  round.set("bonusRate", 1)
}

export const OnStageStart = (game, round, stage) => {
  stage.set("maxPossibleScore", stage.get("constants").maxPossibleScore)

  game.players.forEach((player, i) => {
    player.stage.set("scoreArr", [])
  })

  startDurations(stage)
}

export const OnStageEnd = (game, round, stage) => {
  if (stage.get("constants").calculateScore) {
    let normed = 0;
    if (stage.get("guessed") === null) {
      normed = 1;
    } else {
      normed = Math.abs(stage.get("guessed") - stage.get("constants").correlation)
    }
    if (normed < 0.025) {
      setNormalizedScoreForAllPlayers(game, stage, 100)
    } else {
      setNormalizedScoreForAllPlayers(game, stage, 100 - Number(normed) * 100)
    }
    stage.set("value", undefined);
  }

  endDurations(stage)
}

export const OnRoundEnd = (game, round) => {}
