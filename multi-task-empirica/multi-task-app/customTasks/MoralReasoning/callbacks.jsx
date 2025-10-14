import {
  startDurations,
  endDurations,
  calculatePaymentIntroOutroPractice,
  calculatePaymentStage,
} from '../helper';
import {getOption} from './helper/helper';
import {buildPadId, saveEtherpadStage} from '/customTasks/Etherpad';

export const OnRoundStart = (game, round) => {
  // if unscored
  const unscoredTasks = game.get('unscored');
  round.set('name', 'Moral Reasoning');
  unscoredTasks.push(round.get('anonName'));
  game.set('unscored', unscoredTasks);
};

export const OnStageStart = (game, round, stage) => {
  stage.set("case", stage.get("constants").case);
  game.players.forEach((player) => player.set("approved", false));
  game.players.forEach((player) => player.set("option", ""));
  game.players.forEach((player) => player.stage.set("score", "offline"));
  stage.set("isDisagree", false);

  const etherpadData = {};

  _.range(stage.get('constants').numEtherpads).forEach(i => {
    etherpadData[buildPadId(stage.gameId, stage.displayName, i)] = '';
  });

  stage.set('etherpadData', etherpadData); // initializes object to store etherpadData

  startDurations(stage);
};

export const OnStageEnd = (game, round, stage) => {
  if (stage.get('isDisagree') == true) {
    // find the options that most people choose
    const option = getOption(game.players);
    stage.set('option', option);
  }

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
