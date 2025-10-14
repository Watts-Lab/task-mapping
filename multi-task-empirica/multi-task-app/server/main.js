import Empirica from "meteor/empirica:core";
import {
  GameConfiguration,
  TaskConfigs,
  showPracticeStage, 
  practiceStageDuration
} from "../customTasks/gameConfiguration";
import { getChatGroups, getNeighbors } from "../customTasks/helper";
import "./bots.js";
import "./callbacks.js";
import { check, createTasks, gameSelectionShuffle } from "./utils";
import { devTask } from "../dev";

// gameInit is where the structure of a game is defined.
// Just before every game starts, once all the players needed are ready, this
// function is called with the treatment and the list of players.
// You must then add rounds and stages to the game, depending on the treatment
// and the players. You can also get/set initial values on your game, players,
// rounds and stages (with get/set methods), that will be able to use later in
// the game.
Empirica.gameInit((game) => {
  const { treatment } = game;
  let gameConf = createTasks(GameConfiguration, treatment);

  game.set("round_count", gameConf.length);
  game.set("totalDuration", 0)

  for (const [current_round, item] of gameConf.entries()) {
    taskInit({ game, treatment, item, current_round });
  }

  // Chat Logic
  const { playerCount, networkStructure, chatGroups, chat } = treatment;

  check(
    playerCount > 1 && !networkStructure,
    "networkStructure must be set if in multi player!"
  );

  check(
    playerCount > 1 && chat && !chatGroups,
    "chatGroups must be set when chat is used!"
  );

  for (const [i, player] of game.players.entries()) {
    player.set("index", i + 1);

    if (playerCount <= 1) {
      continue;
    }

    player.set(
      "neighbors",
      getNeighbors(networkStructure, playerCount, player)
    );

    if (chat) {
      player.set("chatGroups", getChatGroups(chatGroups, player));
    }
  }
});

function taskInit({ game, treatment, item, current_round }) {
  const { randomizeInstance, longTermEngagement } = treatment;
  const taskClass = item["task_class"];
  const humanizeName = item["humanize"];
  const anonName = "Game " + (current_round + 1)

  let instanceList = item["instances"];
  let stageCount = 0;
  let introDuration = treatment.introDuration ?? 180;
  let stageDuration = treatment.stageDuration ?? 60;
  let outroDuration = treatment.outroDuration ?? 180;

  const round = game.addRound({
    data: {
      type: taskClass,
      name: humanizeName,
      anonName: anonName,
      current_round,
    },
  });

  if (item["duration"]) {
    stageDuration = item["duration"];
  }
  if (item["introDuration"]) {
    introDuration = item["introDuration"];
  }
  if (item["outroDuration"]) {
    outroDuration = item["outroDuration"];
  }

  if (item["intro"]) {
    stageCount = stageCount + 1;

    round.addStage({
      data: {
        type: taskClass,
        component_path: `../../customTasks/${taskClass}/intro/index`,
        stage_type: "intro",
        stage_count: stageCount,
        anonName: `${anonName} Intro`,
      },
      name: `${taskClass}_intro`,
      displayName: `${humanizeName} Intro`,
      durationInSeconds: introDuration,
    });
    
    let totalDuration = game.get("totalDuration")
    totalDuration += introDuration
    game.set("totalDuration", totalDuration)
  }

  if (showPracticeStage) {
    stageCount = stageCount + 1;
    const instance = item["practice_stage"]
    round.addStage({
      data: {
        type: taskClass,
        component_path: `../../customTasks/${taskClass}/game/index`,
        stage_type: "game",
        stage_config: "results",
        constants: TaskConfigs[taskClass][instance],
        stage_count: stageCount,
        anonName: `${anonName} Practice`,
      },
      name: `${taskClass}_practice`,
      displayName: `${humanizeName} Practice`,
      durationInSeconds: practiceStageDuration,
    });

    let totalDuration = game.get("totalDuration")
    totalDuration += practiceStageDuration
    game.set("totalDuration", totalDuration)
  }

  if (item["randomize_instance"] === true || randomizeInstance) {
    devTask && console.debug("Randomizing instances", item["humanize"]);
    instanceList = gameSelectionShuffle(item["instances"], treatment.unitsSeed);
  }

  for (let i = 0; i < instanceList.length; i++) {
    stageCount = stageCount + 1;

    const instance = instanceList[i];
    devTask && console.debug(`Adding ${taskClass}_${instance}`);

    // console.log(TaskConfigs[taskClass][instance])
    round.addStage({
      data: {
        type: taskClass,
        component_path: `../../customTasks/${taskClass}/game/index`,
        stage_type: "game",
        stage_config: "results",
        constants: TaskConfigs[taskClass][instance],
        stage_count: stageCount,
        anonName: `${anonName} Round ${i + 1}`,
      },
      name: `${taskClass}_${i + 1}`,
      displayName: `${humanizeName} Round ${i + 1}`,
      durationInSeconds: stageDuration,
    });

    let totalDuration = game.get("totalDuration")
    totalDuration += stageDuration
    game.set("totalDuration", totalDuration)
  }

  if (item["outro"]) {
    stageCount = stageCount + 1;

    round.addStage({
      data: {
        type: taskClass,
        component_path: `../../customTasks/${taskClass}/exit/index`,
        stage_type: "exit",
        stage_count: stageCount,
        anonName: `${anonName} Exit`,
      },
      name: `${taskClass}_exit`,
      displayName: `${humanizeName} Exit`,
      durationInSeconds: outroDuration,
    });
  }

  let totalDuration = game.get("totalDuration")
  totalDuration += outroDuration
  game.set("totalDuration", outroDuration)
}
