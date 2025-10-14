import { startDurations, endDurations, calculatePaymentIntroOutroPractice, calculatePaymentStage } from "../helper";

export const OnRoundStart = (game, round) => {
  // if unscored 
  // const unscoredTasks = game.get("unscored");
  // unscoredTasks.push(round.get("anonName"));
  // game.set("unscored", unscoredTasks);

  // if scored
  const scoredTasks = game.get("scored");
  scoredTasks.push(round.get("name"));
  game.set("scored", scoredTasks);
};

export const OnStageStart = (game, round, stage) => {
    game.players.forEach((player) => {
        player.stage.set("approved", false);
        player.stage.set("stepApproved", false);
        player.stage.set("audioError", false);

        player.stage.set("scoreArr", []);
        player.stage.set("score", 0);
      });

    stage.set("wordsList", []);
    stage.set("lastWords", "");
    stage.set("listAnswers", stage.get('constants').listAnswers)
    stage.set("wordAnswer", stage.get('constants').wordAnswer)

    stage.set('needAudioReset', true);
    stage.set('needTypeReset', true);
    stage.set('needLeftReset', true);

    stage.set("step", 0);
  
    startDurations(stage);
};

export const OnStageEnd = (game, round, stage) => {
  if (stage.get('constants').calculateScore) {
    game.players.forEach((player) => {
        const isLastWordCorrect = stage.get("lastWords")===stage.get('constants').wordAnswer;
        let listScore = 0;
        let finalAnswers = stage.get("wordsList");

        for (let i = 0; i < stage.get('constants').listAnswers.length; i++) {
          for (let j = 0; j < stage.get("wordsList").length; j++) {
            if (stage.get("wordsList")[j].word === stage.get('constants').listAnswers[i]) {
              listScore += 1;
              finalAnswers = finalAnswers.filter((answer) => answer.word !== stage.get('constants').listAnswers[i]);
              break;
            }
          }
          for (let j = 0; j < stage.get("wordsList").length; j++) {
            if (stage.get("wordsList")[j].word === stage.get('constants').wordAnswer) {
              finalAnswers = finalAnswers.filter((answer) => answer.word !== stage.get('constants').wordAnswer);
              break;
            }
          }
        }

        listScore = listScore - finalAnswers.length;
        const normalizedScore = Math.round((100 * listScore) / stage.get('constants').listAnswers.length);
        const roundScore = isLastWordCorrect ? normalizedScore : 0;

        player.set("score", player.get("score") + roundScore);
        player.stage.set("score", roundScore);

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
