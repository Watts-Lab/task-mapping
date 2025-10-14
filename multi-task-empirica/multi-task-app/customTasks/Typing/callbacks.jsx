import {
  startDurations,
  endDurations,
  calculatePaymentIntroOutroPractice,
  calculatePaymentStage,
} from '../helper';
import {getOption, calculateScore} from './helper/helper';
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
  game.players.forEach((player) => player.stage.set("score", 0));
  stage.set("isDisagree", false);

  const etherpadData = {};

  _.range(stage.get('constants').numEtherpads).forEach(i => {
    etherpadData[buildPadId(stage.gameId, stage.displayName, i)] = {};
  });

  stage.set('etherpadData', etherpadData); // initializes object to store etherpadData
  // console.log(stage.get('etherpadData'));


  startDurations(stage);
};

export const OnStageEnd = (game, round, stage) => {
  if (stage.get('isDisagree') == true) {
    // find the options that most people choose
    const option = getOption(game.players);
    stage.set('option', option);
  }

  if (stage.get('constants').calculateScore) {
    
    saveEtherpadStage(stage)
    .then((value) => {
      const fullText = stage.get('constants').case;
      const etherpadData = value.get('etherpadData');
      const [padId, padInfo] = Object.entries(etherpadData)[0];
      const userInput = padInfo['text'];
      const lastEdited = padInfo['lastEdited'];

      const score = calculateScore(fullText, userInput);

      game.players.forEach((player, i) => {
        // player.stage.set("score", score);
        player.set("score", player.get("score") + score);
        
        // if no edits were made, lastEdited is undefined; only log if edits were made
        // use player.log instead of logAction because the `at` time needs to be set to lastEdited
        if (lastEdited) {
          player.log("action", {verb: "madeLastEdit", object: "etherpad", at: lastEdited }); 
        }
        calculatePaymentStage(game, player, stage, round);
        });
    })
    .catch((error) => {
      console.error(error);
    });
  } else {
    game.players.forEach(player => {
      calculatePaymentIntroOutroPractice(player, stage);
    });
  }


  endDurations(stage);
};

export const OnRoundEnd = (game, round) => {};
