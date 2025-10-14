import {
  startDurations,
  endDurations,
  calculatePaymentIntroOutroPractice,
  calculatePaymentStage,
} from '../helper';

export const OnRoundStart = (game, round) => {
  const unscoredTasks = game.get('unscored');
  unscoredTasks.push(round.get('anonName'));
  game.set('unscored', unscoredTasks);
};

export const OnStageStart = (game, round, stage) => {
  stage.set('sandboxWordList', []);
  stage.set('finalWordList', []);
  stage.set('scoreIncrement', 0);
  stage.set('scroll', false);
  stage.set('colorFilter', 'None');
  stage.set('hornFilter', 'None');
  stage.set('bodyFilter', 'None');
  stage.set('filteredAnimals', stage.get('constants').animals);
  stage.set(
    'clicked',
    stage
      .get('constants')
      .questions.filter(q => q.name != 'animal')
      .map(q => q.answers.map(a => false))
  );

  stage.set('maxPossibleScore', 100);

  game.players.forEach(player => {
    // Initialize intermediate score
    player.stage.set('scoreFeedback', 0);
  });

  startDurations(stage);
};

export const OnStageEnd = (game, round, stage) => {
  const constants = stage.get('constants');
  if (constants.calculateScore) {
    let score = 0;
    let playerAnswers = stage.get('answers');
    let correctAnswers = constants.stimulus.map(image => image.answer);
    let questions = constants.questions;

    score =
      (playerAnswers
        .map((answer, i) =>
          questions.map(
            question => correctAnswers[i][question.name] == answer[question.name] // generates true or false for each question answered
          )
        )
        .flat() // generates a single long list of response correctness
        .reduce((a, b) => a + b) / //counts the true answers
        (questions.length * correctAnswers.length)) * // takes the mean assuming participant observed all questions for all stimuli
      100; // scales to 100.

    game.players.forEach(player => {
      player.set('score', player.get('score') + score);
      calculatePaymentStage(game, player, stage, round);
    });
  } else {
    game.players.forEach(player => {
      calculatePaymentIntroOutroPractice(player, stage);
    });
  }

  endDurations(stage);
};

export const OnRoundEnd = (game, round) => {};
