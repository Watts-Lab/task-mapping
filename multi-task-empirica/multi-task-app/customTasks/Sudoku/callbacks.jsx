import { startDurations, endDurations, calculatePaymentIntroOutroPractice, calculatePaymentStage } from "../helper";
import { calculateScore, getEditableCellID } from "./helper/helper";


export const OnRoundStart = (game, round) => {
  const scoredTasks = game.get("scored");
  scoredTasks.push(round.get("name"));
  game.set("scored", scoredTasks);
};

export const OnStageStart = (game, round, stage) => {
  stage.set("maxPossibleScore", 100);
  stage.set("currBoardData", stage.get("constants").initBoardData);
  game.players.forEach((player) => player.set("approved", false));
  game.players.forEach((player, i) => {
    player.stage.set("scoreArr", []);
    //player.stage.set("score", 50)
  });
  
  const editableCellID = getEditableCellID(stage.get("constants").initBoardData);
  stage.set("editableCellID", editableCellID);

  startDurations(stage);
};

export const OnStageEnd = (game, round, stage) => {
  if (stage.get('constants').calculateScore) {
    const finalGrid = stage.get("currBoardData");
    const startGrid = stage.get("constants").initBoardData;
    const solution = stage.get("constants").solution;

    const score = calculateScore(startGrid, finalGrid, solution, stage.get("maxPossibleScore"));

    game.players.forEach((player, i) => {
      player.stage.set("score", score);
      player.set("score", player.get("score") + score);

      calculatePaymentStage(game, player, stage, round);
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
