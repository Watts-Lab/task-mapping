import { startDurations, endDurations, calculatePaymentIntroOutroPractice, calculatePaymentStage } from "../helper";

export const OnRoundStart = (game, round) => {
  const unscoredTasks = game.get("unscored");
  unscoredTasks.push(round.get("anonName"));
  game.set("unscored", unscoredTasks);
};

export const OnStageStart = (game, round, stage) => {
  stage.set("sandboxWordList", []);
  stage.set("finalWordList", []);
  stage.set("scoreIncrement", 0);

  stage.set("maxPossibleScore", 100);

  game.players.forEach((player) => {
    // Initialize intermediate score
    player.stage.set("scoreFeedback", 0);
  });

  startDurations(stage);
};

export const OnStageEnd = (game, round, stage) => {
  if (stage.get('constants').calculateScore) {
    let percentError = 100
    if (stage.get("finalWordList").length > 0) {
      percentError = Math.round((100 * Math.abs(stage.get("finalWordList")[0].word - stage.get("constants").rating)) / stage.get("constants").rating);
    }
    normalizedScore = 100 - percentError
    //console.log(normalizedScore)
    game.players.forEach((player) => {
      player.set("score", player.get("score") + normalizedScore);
      player.stage.set("score", normalizedScore);

      calculatePaymentStage(game, player, stage, round); 
    });
  } else {
    game.players.forEach((player) => {
      calculatePaymentIntroOutroPractice(player, stage);
    });
  }
  
  endDurations(stage);
};

export const OnRoundEnd = (game, round) => {};
