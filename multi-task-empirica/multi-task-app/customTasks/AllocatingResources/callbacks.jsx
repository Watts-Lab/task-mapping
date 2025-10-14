import {
  startDurations,
  endDurations,
  calculatePaymentIntroOutroPractice,
  calculatePaymentStage,
} from '../helper';
import {buildPadId, saveEtherpadStage} from '../Etherpad';

export const OnRoundStart = (game, round) => {
  const unscoredTasks = game.get('unscored');
  round.set('name', 'Allocating Resources');
  unscoredTasks.push(round.get('anonName'));
  game.set('unscored', unscoredTasks);
};

export const OnStageStart = (game, round, stage) => {
  stage.set('maxPossibleScore', 100);

  game.players.forEach(player => {
    player.stage.set('approved', false);
    player.stage.set('scoreFeedback', 0);
    player.stage.set('scoreArr', []);
    player.stage.set("score", "offline")
  });

  const projects = stage.get('constants').projects;

  const allocations = Array.from(projects, project => ({
    project: project.project,
    amountNeeded: project.amountNeeded,
    money: '',
    reason: '',
  }));

  stage.set('allocations', allocations);

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

export const OnRoundEnd = (game, round) => {
};
