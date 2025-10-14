import { Meteor } from "meteor/meteor";
import { startDurations, endDurations, calculatePaymentIntroOutroPractice, calculatePaymentStage } from "../helper";
import { createMap } from "./helper";

const fs = require('fs');

export const OnRoundStart = (game, round) => {
  const scoredTasks = game.get("scored");
  scoredTasks.push(round.get("anonName"));
  game.set("scored", scoredTasks);
};

export const OnStageStart = (game, round, stage) => {
  const taskConstants = stage.get('constants');
  const seed = taskConstants.functionSeed;

  const startingGrid = taskConstants.startingGrid;

  startDurations(stage);

  stage.set("currXCoord", null); 
  stage.set("currYCoord", null);
  
  stage.set("previousCoords", [])
  stage.set("previousCoordsSet", [])

  stage.set("scoreGrid", startingGrid);
  stage.set("wildcatWellsCurrentRound", 1);

  game.players.forEach((player) => {
    player.stage.set("score", 0);
  });

  stage.set("fakeStageStartTime", stage.get("startTimeAt"));
};

export const OnStageEnd = (game, round, stage) => {
  if (stage.get('constants').calculateScore) {
    game.players.forEach((player) => {
      player.set("score", player.get("score") + player.stage.get("score"));
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
