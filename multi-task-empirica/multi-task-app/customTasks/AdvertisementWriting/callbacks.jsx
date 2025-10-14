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
    game.players.forEach((player) => {
      player.set("score", player.get("score"));
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
