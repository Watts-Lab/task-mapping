import { payPerHour } from "./gameConfiguration";

export function setNormalizedScoreFromFeedbackScore(player, stage) {
  const stageScore = player.stage.get("scoreFeedback");
  // removes decimal 
  const normalizedScore = Math.round((100 * stageScore) / stage.get("maxPossibleScore"));
  player.stage.set("score", normalizedScore);
  player.set("score", player.get("score") + normalizedScore);
 }

export function setNormalizedScoreForAllPlayers(game, stage, score) {
  // removes decimal 
  let normalizedScore = Math.round((100 * score) / stage.get("maxPossibleScore"));
  if (normalizedScore < 0) {
    normalizedScore = 0;
  }
  for (const player of game.players) {
    player.stage.set("score", normalizedScore);
    player.set("score", player.get("score") + normalizedScore);
  }
}

export function setScore(player, stage, newScore) {
  player.stage.set("scoreFeedback", newScore);

  const newScoreArr = player.stage.get("scoreArr") || [];
  newScoreArr.push(newScore);
  player.stage.set("scoreArr", newScoreArr);
}

export function increaseScore(player, stage, score = null, presentCalc = true) {
  const prev = player.stage.get("scoreFeedback");
  const increment = score == null ? stage.get("scoreIncrement") : score;
  const newScore = prev + increment;
  player.stage.set("scoreFeedback", newScore);

  const newScoreArr = player.stage.get("scoreArr") || [];
  if (presentCalc) {
    newScoreArr.push(newScore);
  } else {
    newScoreArr.push("add"); 
  }
  player.stage.set("scoreArr", newScoreArr);
}

export function decreaseScore(player, stage, score = null, presentCalc = true) {
  const prev = player.stage.get("scoreFeedback");
  //console.log(prev); 
  const increment = score == null ? stage.get("scoreIncrement") : score;
  //console.log(increment);
  const newScore = prev - increment;
  //console.log(newScore);
  player.stage.set("scoreFeedback", newScore);

  const newScoreArr = player.stage.get("scoreArr") || [];
  if (presentCalc) {
    newScoreArr.push(newScore);
  } else {
    newScoreArr.push("remove"); 
  }
  player.stage.set("scoreArr", newScoreArr);
  //console.log(player.stage.get("scoreArr"));
}

export function getNeighbors(structure, playerCount, player) {
  const neighbors = [];
  if (structure === "-1") {
    for (let i = 1; i <= playerCount; i++) {
      if (i !== player.get("index")) neighbors.push(String(i));
    }
    return neighbors;
  }

  let network = structure.split(",");

  network.forEach((n) => {
    const connection = n.split("-");
    const playerIndex = player.get("index");

    if (playerIndex === parseInt(connection[0])) {
      neighbors.push(connection[1].trim());
    } else if (playerIndex === parseInt(connection[1])) {
      neighbors.push(connection[0].trim());
    }
  });

  return _.uniq(neighbors, true);
}

export function getChatGroups(chatGroupsTreatment, player) {
  const groups = [];

  if (chatGroupsTreatment === "-1") {
    return ["A"];
  }

  let chatGroups = chatGroupsTreatment.split(",");

  chatGroups.forEach((g) => {
    const connection = g.split("-");

    if (player.get("index") !== parseInt(connection[0])) {
      return;
    }

    groups.push(connection[1]);
  });

  return groups.sort();
}

export function getAlters(
  initial_network,
  player,
  playerIndex,
  playerIds,
  alterCount
) {
  // Using the initial network structure to create the network, otherwise, a random network
  let alterIds = _.sample(_.without(playerIds, player._id), alterCount);

  return alterIds;
}

// all in milliseconds 
// times are all in milliseconds since jan 1, 1970
export function startDurations(stage) {
  let start = new Date().getTime(); 
  stage.set("startTimeAt", start); 
  //console.log("start time: " + stage.get("startTimeAt"));
  let setDuration = stage.durationInSeconds * 1000; 
  //console.log("stage duration: " + stage.durationInSeconds)
  stage.set("defaultStageLength", setDuration);
  //console.log("default stage length: ", stage.get("defaultStageLength"));
  stage.set("defaultEndTimeAt", start + setDuration); 
  //console.log("default end time: " + stage.get("defaultEndTimeAt"));
}

export function endDurations(stage) {
  let end = new Date().getTime(); 
  stage.set("endTimeAt", end); 
  //console.log("end time: " + stage.get("endTimeAt"));
  let realDuration = stage.get("endTimeAt") - stage.get("startTimeAt"); 
  stage.set("stageLength", realDuration); 
  //console.log("stage length: " + stage.get("stageLength"));
}

export function calculatePaymentStage(game, player, stage, round) {
  const pay_possible = payPerHour * (stage.durationInSeconds / 3600)
  player.stage.set("maxPossiblePay", pay_possible); 

  if (game.get("unscored").includes(round.get("anonName"))) {
    player.stage.set("payEarned", 0);
    player.set("unscoredTasksMaxPayment", player.get("unscoredTasksMaxPayment") + pay_possible);
  } else {
    let payEarned = (player.stage.get("score") / stage.get("maxPossibleScore")) * pay_possible;
    if (isNaN(payEarned)) { payEarned = 0 }
    player.stage.set("payEarned", payEarned);
  }
  player.set("totalPayment", player.get("totalPayment") + player.stage.get("payEarned"));
}

export function calculatePaymentIntroOutroPractice(player, stage) {
  const pay_possible = payPerHour * (stage.durationInSeconds / 3600)
  player.stage.set("maxPossiblePay", pay_possible); 
  player.stage.set("payEarned", pay_possible);
  player.set("totalPayment", player.get("totalPayment") + player.stage.get("payEarned"));
}