import {startDurations, endDurations, calculatePaymentIntroOutroPractice, calculatePaymentStage } from "../helper";

export const OnRoundStart = (game, round) => {
  const scoredTasks = game.get("scored");
  scoredTasks.push(round.get("name"));
  game.set("scored", scoredTasks);

  game.players.forEach((player) => {
    player.set('score', 0);
});
};

export const OnStageStart = (game, round, stage) => {
  game.players.forEach((player) => {
    player.stage.set('approved', false);
    player.stage.set('scoreArr', []);
    player.stage.set('score', '0');
});

const taskConstants = stage.get('constants');
stage.set('maxScore', 100);
stage.set('displayFeedback', taskConstants.displayFeedback);

const wordsList = taskConstants.wordList;

const userInputList = Array.from(wordsList, singleWord => ({
  word: singleWord.word,
  letters: singleWord.letters,
  input: '',
}));

stage.set('userInputList', userInputList);

startDurations(stage);
};

export const OnStageEnd = (game, round, stage) => {
  if (stage.get('constants').calculateScore) {
    let score = 0;

    userInputList = stage.get('userInputList');
    for (singleInput of userInputList) {
      modInput = singleInput.input.toUpperCase();
      correctWord = singleInput.word;
      // console.log(modInput);
      // console.log(correctWord);
      modInput.includes(correctWord) && score++;
      // console.log(score);
    }
    score *= 12.5;
    game.players.forEach((player, i) => {
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
