import { setNormalizedScoreForAllPlayers } from "../helper";
import { numIntersect } from "./helper/helper";
import { startDurations, endDurations, calculatePaymentStage, calculatePaymentIntroOutroPractice } from "../helper";

// nine dots has no stage randomization 
export const OnRoundStart = (game, round) => {
  const scoredTasks = game.get("scored");
  scoredTasks.push(round.get("name"));
  game.set("scored", scoredTasks);
};

export const OnStageStart = (game, round, stage) => {
  stage.set("numPoints", 0);
  stage.set("maxPossibleScore", stage.get("constants").maxPossibleScore);

  for (const player of game.players) {
    player.stage.set("approved", false);
  }

  game.players.forEach((player, i) => {
    player.stage.set("scoreArr", []);
  });
  
  startDurations(stage); 
};

export const OnStageEnd = (game, round, stage) => {
  const { dots, dotRadius, lineWidth } = stage.get("constants");

  const lines = [];
  for (let i = 1; i < stage.get("numPoints"); i++) {
    lines.push([stage.get(`point-${i - 1}`), stage.get(`point-${i}`)]);
  }

  if (stage.get('constants').calculateScore) {
    const score = numIntersect(dots, dotRadius, lines, lineWidth);
    setNormalizedScoreForAllPlayers(game, stage, score, round.get("bonusRate"));
    game.players.forEach((player) => {
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
