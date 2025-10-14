import { startDurations, endDurations, calculatePaymentIntroOutroPractice, calculatePaymentStage } from "../helper";
import {buildPadId, saveEtherpadStage} from '/customTasks/Etherpad';
import { calculateScore } from "./helper";

export const OnRoundStart = (game, round) => {
  const scoredTasks = game.get("scored");
  scoredTasks.push(round.get("name"));
  game.set("scored", scoredTasks);
};

export const OnStageStart = (game, round, stage) => {
  startDurations(stage);
  stage.set('etherpadData', {}); // initializes object to store etherpadData
  stage.set("grid", stage.get("constants").grid)
  stage.set("answers", stage.get("constants").answers)
  game.players.forEach((player) => {
    player.stage.set("approved", false);
    player.stage.set("score", 0);
  });

  const etherpadData = {};
  _.range(stage.get('constants').numEtherpads).forEach(i => {
    etherpadData[buildPadId(stage.gameId, stage.displayName, i)] = '';
  });

  stage.set('etherpadData', etherpadData); // initializes object to store etherpadData
};

export const OnStageEnd = (game, round, stage) => {
  if (stage.get('constants').calculateScore) {
    game.players.forEach((player) => {
      player.stage.set("score", calculateScore(stage.get("grid"), stage.get("answers")));
      player.set("score", player.get("score") + player.stage.get("score"));
      calculatePaymentStage(game, player, stage, round)
    });
  } else {
    game.players.forEach((player) => {
      calculatePaymentIntroOutroPractice(player, stage);
    });
  }
  saveEtherpadStage(stage);
  endDurations(stage);
};

export const OnRoundEnd = (game, round) => {
};
