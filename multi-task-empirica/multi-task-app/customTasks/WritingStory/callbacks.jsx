import {
  startDurations,
  endDurations,
  calculatePaymentIntroOutroPractice,
  calculatePaymentStage,
} from '../helper';
import {buildPadId, saveEtherpadStage} from '/customTasks/Etherpad';

export const OnRoundStart = (game, round) => {
  const unscoredTasks = game.get('unscored');
  round.set('name', 'Writing Story');
  unscoredTasks.push(round.get('anonName'));
  game.set('unscored', unscoredTasks);
};

export const OnStageStart = (game, round, stage) => {
  stage.set('etherpadData', {}); // initializes object to store etherpadData

  stage.set('sandboxWordList', []);
  stage.set('finalWordList', []);
  stage.set('scoreIncrement', 0);

  stage.set('maxPossibleScore', 100);

  game.players.forEach(player => {
    player.set('approved', false);
    // Initialize intermediate score
    player.stage.set('scoreFeedback', 0);
    player.stage.set("score", "offline")
  });

  const etherpadData = {};
  _.range(stage.get('constants').numEtherpads).forEach(i => {
    etherpadData[buildPadId(stage.gameId, stage.displayName, i)] = '';
  });

  stage.set('etherpadData', etherpadData); // initializes object to store etherpadData

  startDurations(stage);
};

export const OnStageEnd = (game, round, stage) => {
  if (stage.get('constants').calculateScore) {
    game.players.forEach(player => {
      player.set('score', player.get('score'));
      calculatePaymentStage(game, player, stage, round);
    });
  } else {
    game.players.forEach(player => {
      calculatePaymentIntroOutroPractice(player, stage);
    });
  }

  saveEtherpadStage(stage);

  endDurations(stage);
};

export const OnRoundEnd = (game, round) => {};
