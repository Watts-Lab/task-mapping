import { startDurations, endDurations, setNormalizedScoreFromFeedbackScore, 
  calculatePaymentIntroOutroPractice, calculatePaymentStage } from "../helper";

export const OnRoundStart = (game, round) => {
  const scoredTasks = game.get("scored");
  scoredTasks.push(round.get("name"));
  game.set("scored", scoredTasks);
};

export const OnStageStart = (game, round, stage) => {
  console.log(stage.get('constants'))
  const { condition, lists, pointsAwarded } = stage.get('constants')

  const totalWords = lists.reduce((acc, list) => acc + list.words.length, 0);
  stage.set("maxPossibleScore", pointsAwarded * totalWords);

  const recalledWords = Array.from(lists, (list) => ({
    target: list.target,
    words: [],
  }));

  for (const player of game.players) {
    if (condition !== "see") {
      player.stage.set("recalledWords", recalledWords);
    }

    player.stage.set("step", 1);
    player.stage.set("wordsMissed", 0);
    player.stage.set("scoreFeedback", 0);

    player.stage.set("score", 0);
  }

  if (condition === "see") {
    stage.set("recalledWords", recalledWords);
  }

  // stage.set("score", 0);

  startDurations(stage);
};

export const OnStageEnd = (game, round, stage) => {

  // console.log("test: ");
  // console.log(stage.get('recalledWords')[0].words);
  // console.log("test2:");
  // console.log(stage.get('constants').lists[0].words);

  if (stage.get('constants').calculateScore) {
    game.players.forEach((player, i) => {
      let score = 0;
      let total = 0;

      for(let i = 0; i < stage.get('constants').lists.length; i++)
      {
        let recall = stage.get('recalledWords')[i].words;
        let display = stage.get('constants').lists[i].words;
        total += display.length;

        for(let j = 0; j < recall.length; j++)
        {
          let recallWord = recall[j].word;
          if(display.includes(recallWord))
          {
            score++;
          }
        }
      }
      // console.log(score);
      // console.log(total);
      score = Math.round((score * 100)/total);

      player.set("score", player.get("score") + score);
      player.stage.set("score", score);
      // setNormalizedScoreFromFeedbackScore(player, stage, round.get("bonusRate"));

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
