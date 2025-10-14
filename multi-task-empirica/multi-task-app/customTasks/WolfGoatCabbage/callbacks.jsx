import { setNormalizedScoreForAllPlayers, startDurations, endDurations, 
  calculatePaymentIntroOutroPractice, calculatePaymentStage } from "../helper"
import { checkWin } from "./api/api";

export const OnRoundStart = (game, round) => {
  const scoredTasks = game.get("scored");
  scoredTasks.push(round.get("name"));
  game.set("scored", scoredTasks);
}

export const OnStageStart = (game, round, stage) => {
  const { maxPossibleScore, instance } = stage.get("constants") 
  stage.set("maxPossibleScore", maxPossibleScore)
  stage.set("scoreArr", [])
  stage.set("score", 0)

  switch(instance) {
    case "zero":
      stage.set("wgc-config", {
        boatSide: "left",
        onBoat: [null],
        sides: [0, 0],
        status: 0,
        moves: 0 
      })
      break;
    case "one":
      stage.set("wgc-config", {
        boatSide: "left",
        onBoat: [null],
        sides: [0, 0, 0],
        status: 0,
        moves: 0 
      })
      break;
    case "two":
      stage.set("wgc-config", {
        boatSide: "left",
        onBoat: [null, null],
        sides: [0, 0, 0],
        status: 0,
        moves: 0 
      })
      break;
    case "three":
      stage.set("wgc-config", {
        boatSide: "left",
        onBoat: [null, null],
        sides: [0, 0, 0, 0],
        status: 0,
        moves: 0,
      });
      break;
  }

  startDurations(stage)
}

export const OnStageEnd = (game, round, stage) => {
  if (stage.get("constants").calculateScore) {
    const scoreArray = stage.get("scoreArr")
    const maxPossibleScore = stage.get("maxPossibleScore")
    setNormalizedScoreForAllPlayers(game, stage, Number(Math.max(...scoreArray) / 100) * maxPossibleScore)

    game.players.forEach((player) => {
      calculatePaymentStage(game, player, stage, round)
    }); 
  } else {
    game.players.forEach((player) => {
      calculatePaymentIntroOutroPractice(player, stage);
    });
  }

  endDurations(stage)
}

export const OnRoundEnd = (game, round) => {}

