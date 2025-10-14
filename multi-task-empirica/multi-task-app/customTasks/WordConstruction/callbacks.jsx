import { startDurations, endDurations, calculatePaymentIntroOutroPractice, calculatePaymentStage } from "../helper";

export const OnRoundStart = (game, round) => {
  const scoredTasks = game.get("scored");
  scoredTasks.push(round.get("name"));
  game.set("scored", scoredTasks);
};

export const OnStageStart = (game, round, stage) => {
  game.players.forEach((player) => {
    player.stage.set("approved", false);
    player.stage.set("scoreArr", []);
    player.stage.set("score", 0);
  });

  const taskConstants = stage.get('constants');
  stage.set("maxScore", taskConstants.max_score)
  stage.set("wordsList", []);

  startDurations(stage);
};

export const OnStageEnd = (game, round, stage) => {
  if (stage.get('constants').calculateScore) {
    game.players.forEach((player) => {
      const normalizedScore = Math.round((100 * stage.get("wordsList").length) / stage.get("maxScore"));
      player.set("score", player.get("score") + normalizedScore);
      player.stage.set("score", normalizedScore);
      calculatePaymentStage(game, player, stage, round)
    });
  } else {
    game.players.forEach((player) => {
      calculatePaymentIntroOutroPractice(player, stage);
    });
  }
  endDurations(stage);
};

export const OnRoundEnd = (game, round) => {

};


