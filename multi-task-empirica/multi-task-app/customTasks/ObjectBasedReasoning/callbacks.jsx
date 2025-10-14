import { startDurations, endDurations, calculatePaymentIntroOutroPractice, calculatePaymentStage } from "../helper";

export const OnRoundStart = (game, round) => {
  const scoredTasks = game.get("scored");
  scoredTasks.push(round.get("name"));
  game.set("scored", scoredTasks);
};

export const OnStageStart = (game, round, stage) => {
  stage.set("submittedGame", false)
  stage.set("attempts", 0)
  stage.set("reset", true)
  stage.set("test", [])
  stage.set("mostRecent", null)
  stage.set("resetClicked", false)
  stage.set("maxPossibleScore", 100)

  startDurations(stage);
};

export const OnStageEnd = (game, round, stage) => {
  if (stage.get('constants').calculateScore) {
    game.players.forEach((player) => {
      var normalizedScore = 0
      if (stage.get("submittedGame")) {
        normalizedScore = Math.round((100 / stage.get("attempts")))
      }
      player.set("score", player.get("score") + normalizedScore)
      player.stage.set("score", normalizedScore)

      calculatePaymentStage(game, player, stage, round)
    })
  } else {
    game.players.forEach((player) => {
      calculatePaymentIntroOutroPractice(player, stage);
    });
}
  
  endDurations(stage);
};

export const OnRoundEnd = (game, round) => {
  
};
