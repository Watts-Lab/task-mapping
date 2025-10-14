import Empirica from "meteor/empirica:core";
import { TaskCallBacks } from "../customTasks/gameConfiguration";
import { avatarNames, nameToAvatar } from "../customTasks/avatars";
import { offlineKickout } from "../customTasks/gameConfiguration";
// onGameStart is triggered opnce per game before the game starts, and before
// the first onRoundStart. It receives the game and list of all the players in
// the game.
Empirica.onGameStart((game) => {
  game.set("justStarted", true); // I use this to play the sound on the UI when the game starts

  const avatars = _.shuffle(avatarNames);
  const playerIds = game.players.map((player) => player._id);
  game.players.forEach((player, i) => {
    let avatar = nameToAvatar[avatars.pop()];
    player.set("avatar", avatar);
    player.set("score", 0);
    player.set("adjustedScore", 0);
    player.set("playerIds", playerIds);
    player.set("totalPayment", 0);
    player.set("unscoredTasksMaxPayment", 0);
  });

  game.set("unscored", []);
  game.set("scored", []);
});

// onRoundStart is triggered before each round starts, and before onStageStart.
// It receives the same options as onGameStart, and the round that is starting.
Empirica.onRoundStart((game, round) => {
  const task_type = round.get("type");
  TaskCallBacks[task_type]["OnRoundStart"](game, round);
});

// onStageStart is triggered before each stage starts.
// It receives the same options as onRoundStart, and the stage that is starting.
Empirica.onStageStart((game, round, stage) => {
  const task_type = stage.get("type");
  const stage_type = stage.get("stage_type");
  stage.set("idledPlayers", [])
  if (stage_type === "game") {
    TaskCallBacks[task_type]["OnStageStart"](game, round, stage);
  }
});

// onStageEnd is triggered after each stage.
// It receives the same options as onRoundEnd, and the stage that just ended.
Empirica.onStageEnd((game, round, stage) => {
  const task_type = stage.get("type");
  const stage_type = stage.get("stage_type");
  if (stage_type === "game") {
    TaskCallBacks[task_type]["OnStageEnd"](game, round, stage);
  }
  const date = new Date().valueOf();
  game.players.forEach((player) => {
    if (player.get("lastTick") < date - (offlineKickout * 1000)) {
      player.set("leftGameOffline", true)
      //player.exit("offline")
      console.log(player.id + " would be offline. lastTick:" + player.get("lastTick") + ", date: " + date);
    }
  })
  console.log(stage.get("idledPlayers"))
});

// onRoundEnd is triggered after each round.
// It receives the same options as onGameEnd, and the round that just ended.
Empirica.onRoundEnd((game, round) => {
  const task_type = round.get("type");
  TaskCallBacks[task_type]["OnRoundEnd"](game, round);
});

// onGameEnd is triggered whe the game ends.
// It receives the same options as onGameStart.
Empirica.onGameEnd((game) => {
  // const basePay = game.treatment.basePay;
  // const convRate = game.treatment.conversionRate;
  // game.players.forEach((player) => {
  //   const payOut = basePay + (player.get("adjustedScore") / 100) * convRate;
  //   player.set("payOut", payOut.toFixed(2));
  // });
});

Empirica.onSet((game) => {
  let submitStatus = [];
  game.players.forEach((player) => {
    submitStatus.push(player.get(game.currentStageId) === "ready");
  });
  if (submitStatus.every(Boolean)) {
    game.players.forEach((player) => {
      player.stage.submit();
    });
  }
});

// ===========================================================================
// => onSet, onAppend and onChange ==========================================
// ===========================================================================

// onSet, onAppend and onChange are called on every single update made by all
// players in each game, so they can rapidly become quite expensive and have
// the potential to slow down the app. Use wisely.
//
// It is very useful to be able to react to each update a user makes. Try
// nontheless to limit the amount of computations and database saves (.set)
// done in these callbacks. You can also try to limit the amount of calls to
// set() and append() you make (avoid calling them on a continuous drag of a
// slider for example) and inside these callbacks use the `key` argument at the
// very beginning of the callback to filter out which keys your need to run
// logic against.
//
// If you are not using these callbacks, comment them out so the system does
// not call them for nothing.

// // onSet is called when the experiment code call the .set() method
// // on games, rounds, stages, players, playerRounds or playerStages.
// Empirica.onSet((
//   game,
//   round,
//   stage,
//   player, // Player who made the change
//   target, // Object on which the change was made (eg. player.set() => player)
//   targetType, // Type of object on which the change was made (eg. player.set() => "player")
//   key, // Key of changed value (e.g. player.set("score", 1) => "score")
//   value, // New value
//   prevValue // Previous value
// ) => {
//   // // Example filtering
//   // if (key !== "value") {
//   //   return;
//   // }
// });

// // onAppend is called when the experiment code call the `.append()` method
// // on games, rounds, stages, players, playerRounds or playerStages.
// Empirica.onAppend((
//   game,
//   round,
//   stage,
//   player, // Player who made the change
//   target, // Object on which the change was made (eg. player.set() => player)
//   targetType, // Type of object on which the change was made (eg. player.set() => "player")
//   key, // Key of changed value (e.g. player.set("score", 1) => "score")
//   value, // New value
//   prevValue // Previous value
// ) => {
//   // Note: `value` is the single last value (e.g 0.2), while `prevValue` will
//   //       be an array of the previsous valued (e.g. [0.3, 0.4, 0.65]).
// });

// // onChange is called when the experiment code call the `.set()` or the
// // `.append()` method on games, rounds, stages, players, playerRounds or
// // playerStages.
// Empirica.onChange((
//   game,
//   round,
//   stage,
//   player, // Player who made the change
//   target, // Object on which the change was made (eg. player.set() => player)
//   targetType, // Type of object on which the change was made (eg. player.set() => "player")
//   key, // Key of changed value (e.g. player.set("score", 1) => "score")
//   value, // New value
//   prevValue, // Previous value
//   isAppend // True if the change was an append, false if it was a set
// ) => {
//   // `onChange` is useful to run server-side logic for any user interaction.
//   // Note the extra isAppend boolean that will allow to differenciate sets and
//   // appends.
//    Game.set("lastChangeAt", new Date().toString())
// });

// // onSubmit is called when the player submits a stage.
// Empirica.onSubmit((
//   game,
//   round,
//   stage,
//   player // Player who submitted
// ) => {
// });
