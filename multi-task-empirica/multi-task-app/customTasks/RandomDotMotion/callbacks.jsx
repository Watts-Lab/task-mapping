
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
stage.set('startOfGame', true);
stage.set('speed', taskConstants.dotSpeed);
stage.set('corrDotPercent', taskConstants.corrDotPercent);
stage.set('corrAngle', taskConstants.corrAngle);
stage.set('seed', taskConstants.seed);
stage.set('approved', false);

const angleAnswers = new Array(game.players.length).fill('');
stage.set('angleAns', angleAnswers);

idList =  game.playerIds;
stage.set('idList', idList); 

const avg = '';
stage.set('average', avg); 

startDurations(stage);
};

export const OnStageEnd = (game, round, stage) => {
  if (stage.get('constants').calculateScore) {
    let score = 0;

    const playerAvg = stage.get('average');
    console.log('This is what player has:' + playerAvg);

    corrAnswer = stage.get('corrAngle');
    console.log('This is what should be:' + corrAnswer);

    if (playerAvg == '') {
      return;
    }

    let difference = Math.abs(corrAnswer - playerAvg);

    if (difference > 180) {
      difference = 360 - difference; 
    }

    console.log('This is the difference!:' + difference);

    const diffProcessed = 180 - difference; 
    const scoreLong = diffProcessed / 1.8; 
    score = parseFloat(scoreLong.toFixed(1));

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
