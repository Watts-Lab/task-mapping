import { calculateScore } from "./helper/helper";
import { startDurations, endDurations, calculatePaymentStage, calculatePaymentIntroOutroPractice } from "../helper";

export const OnRoundStart = (game, round) => {
  const scoredTasks = game.get("scored");
  scoredTasks.push(round.get("name"));
  game.set("scored", scoredTasks);
};

export const OnStageStart = (game, round, stage) => {
  stage.set("maxPossibleScore", 100);
  stage.set("grid", stage.get("constants").startingGrid)
  game.players.forEach((player) => player.set("approved", false));
  game.players.forEach((player, i) => {
    player.stage.set("scoreArr", []); 
  });   
  startDurations(stage); 
};

export const OnStageEnd = (game, round, stage) => {
  if (stage.get('constants').calculateScore) {
    const finalGrid = stage.get("grid");
    const startGrid = stage.get('constants').startingGrid;
  
    const score = calculateScore(startGrid, finalGrid, stage.get("maxPossibleScore")); 
  
    game.players.forEach((player, i) => {
      player.stage.set("score", score);
      player.set("score", player.get("score") + score);

      // calculate new pay 
      calculatePaymentStage(game, player, stage, round);
    });
  } else {
    game.players.forEach((player, i) => {
      calculatePaymentIntroOutroPractice(player, stage);
    })
  }
  endDurations(stage);
};

export const OnRoundEnd = (game, round) => {};

