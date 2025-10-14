import { startDurations, endDurations, calculatePaymentIntroOutroPractice } from "../helper";

export const OnRoundStart = (game, round) => {
  // if unscored 
  // const unscoredTasks = game.get("unscored");
  // unscoredTasks.push(round.get("anonName"));
  // game.set("unscored", unscoredTasks);

  // if scored
  // const scoredTasks = game.get("scored");
  // scoredTasks.push(round.get("anonName"));
  // game.set("scored", scoredTasks);
};

export const OnStageStart = (game, round, stage) => {
  startDurations(stage);
};

export const OnStageEnd = (game, round, stage) => {
  if (stage.get('constants').calculateScore) {
      // calculate score 
      // calculate payment
  } else {
    game.players.forEach((player) => {
      calculatePaymentIntroOutroPractice(player, stage);
    });
}

  endDurations(stage);
};

export const OnRoundEnd = (game, round) => {
  
};
