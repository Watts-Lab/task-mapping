import { calScore } from "./helper/helper";
import { startDurations, endDurations, calculatePaymentIntroOutroPractice, calculatePaymentStage } from "../helper";

export const OnRoundStart = (game, round) => {
  const scoredTasks = game.get("scored");
  scoredTasks.push(round.get("name"));
  game.set("scored", scoredTasks);
};

export const OnStageStart = (game, round, stage) => {
  const taskConstants = stage.get('constants');

  stage.set("maxPossibleScore", taskConstants.maxPossibleScore);

  if (taskConstants.collaboration) {
    stage.set("edges", []);
  }

  for (const player of game.players) {
    player.set("moving", -1);

    if (!taskConstants.collaboration) {
      player.set("edges", []);
    }

    player.stage.set("approved", false);
  }

  game.players.forEach((player, i) => {
    player.stage.set("scoreArr", []); 
  }); 
  startDurations(stage);
}

export const OnStageEnd = (game, round, stage) => {
  if (stage.get('constants').calculateScore) {
    if (stage.get('constants').collaboration) {
      const score = calScore(stage.get("edges"), stage.get('constants'));
      const normalizedScore = Math.round((100 * score) / stage.get("maxPossibleScore"));
      for (const player of game.players) {
        player.stage.set("score", normalizedScore);
        player.set("score", player.get("score") + normalizedScore);
        player.set("adjustedScore", player.get("adjustedScore") + Math.round(round.get("bonusRate") * normalizedScore));

        calculatePaymentStage(game, player, stage, round); 
      }
      return;
    }
  
    // If not collaborative
  
    const record = {};
    for (const player of game.players) {
      record[player._id] = player.get("edges");
  
      const score = calScore(player.get("edges"), stage.get('constants'));
      const normalizedScore = Math.round((100 * score) / stage.get("maxPossibleScore"));
  
      player.stage.set("score", normalizedScore);
      player.set("score", player.get("score") + normalizedScore);
      player.set("adjustedScore", player.get("adjustedScore") + Math.round(round.get("bonusRate") * normalizedScore));
      calculatePaymentStage(game, player, stage, round); 
    }
  
    stage.set("record", record);
  } else {
    game.players.forEach((player) => {
      calculatePaymentIntroOutroPractice(player, stage);
    });
  }

  endDurations(stage);
};

export const OnRoundEnd = (game, round) => {};
