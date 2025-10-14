import { setNormalizedScoreFromFeedbackScore } from "../helper";
//import similarity from "./similarity/similarity";
import { startDurations, endDurations, calculatePaymentIntroOutroPractice, calculatePaymentStage } from "../helper";

export const OnRoundStart = (game, round) => {
  round.set("similarityList", []);
  const unscoredTasks = game.get("unscored");
  unscoredTasks.push(round.get("anonName"));
  game.set("unscored", unscoredTasks);
};

export const OnStageStart = (game, round, stage) => {
  stage.set("sandboxWordList", [])
  stage.set("finalWordList", [])
  stage.set("scoreIncrement", 0)
  game.players.forEach((player) => {
    player.stage.set("score", "offline")
  })

  stage.set("maxPossibleScore", stage.get("constants").maxScore)
  startDurations(stage)
}

export const OnStageEnd = (game, round, stage) => {
  if (stage.get("constants").calculateScore) {
    game.players.forEach((player) => {
      player.set("score", player.get("score"));
      calculatePaymentStage(game, player, stage, round)
    });
  } else {
    game.players.forEach((player) => {
      calculatePaymentIntroOutroPractice(player, stage);
    });
  }

  const list = stage.get("finalWordList").map((w) => w.word)

  if (list.length === 0) {
    console.debug("DivergentAssociation: final word list is empty")
    return
  }

  // We don't need to score this live so this is unnecessary
  // + the similarity file was not loading properly
  // try {
  //   // TODO: shouldn't the score be linked to results of similarity test?
  //   similarity(list).then((sim) => {
  //     console.debug("DivergentAssociation: similarity = " + sim)
  //     stage.set("similarity", sim)
  //     round.set("similarityList", round.get("similarityList").concat(sim))
  //   })
  // } catch (error) {
  //   console.debug("DivergentAssociation similarity error:");
  //   console.debug(error);
  // }
  
  endDurations(stage);
};

export const OnRoundEnd = (game, round) => {}
