import { checkConstraint, calculateScore } from "./helper";
import { startDurations, endDurations, setNormalizedScoreForAllPlayers, 
  calculatePaymentIntroOutroPractice, calculatePaymentStage } from "../helper";

export const OnRoundStart = (game, round) => {
  const scoredTasks = game.get("scored");
  scoredTasks.push(round.get("name"));
  game.set("scored", scoredTasks);
};

export const OnStageStart = (game, round, stage) => {
  const { students, constraints, maxPossibleScore } = stage.get("constants");

  stage.set("maxPossibleScore", maxPossibleScore);

  students.forEach((student) => stage.set(`student-${student}-room`, -1));
  constraints.forEach((constraint) => checkConstraint(stage, constraint));

  game.players.forEach((player) => {
    player.stage.set("approved", false);
    player.stage.set("scoreArr", []);
    player.stage.set("score", 0)
  });

  startDurations(stage);
};

export const OnStageEnd = (game, round, stage) => {
  const { students, payoff, constraints } = stage.get("constants");
  let gainedScore = calculateScore(stage, students, payoff, constraints);
  if (stage.get('constants').calculateScore) {
    setNormalizedScoreForAllPlayers(game, stage, gainedScore);

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