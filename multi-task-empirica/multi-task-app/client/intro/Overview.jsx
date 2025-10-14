import React, { Component } from "react";
import { GameConfiguration, payPerHour, practiceStageDuration } from "../../customTasks/gameConfiguration";
import { IntroExitStep } from "./IntroExitStep";
import {
  idleTimeNoActivity,
  idleTimeDifferentTab,
  warningTime,
  showPracticeStage,
} from "../../customTasks/gameConfiguration";
import { duration } from "moment";
const seedrandom = require('seedrandom');

export default class Overview extends Component {
  render() {
    const { game, stage } = this.props;
    let gameConf = createTasks(GameConfiguration, game.treatment);
    let set = new Set();
    GameConfiguration.forEach((task) => set.add(task.humanize));
  
    let list;
    if (set.size < 2) {
      list = set;
    } else if (set.size === 2) {
      list = [...set].join("and ");
    } else set.size > 2;
    {
      list = [...set].join(", ");
    }

    const stagesCount = GameConfiguration.reduce(
      (acc, task) => acc + task.instances.length,
      0
    );

    const introDuration = game.treatment.introDuration ?? 180
    const outroDuration = game.treatment.outroDuration ?? 180

    const stagesDuration = gameConf.reduce(
      (acc, task) => {
        let taskTotal = 0
        taskTotal += task.instances.length * task.duration
        if (task.practice_stage) {
          taskTotal += practiceStageDuration
        }
        if (task.intro) {
          taskTotal += introDuration
        }
        if (task.outro) {
          taskTotal += outroDuration
        }
        return (acc + taskTotal)
      },
      0
    );

    const durationInHours = stagesDuration / 3600
    const durationInMinutes = durationInHours * 60;
    const pay = durationInHours * payPerHour

    return (
      <IntroExitStep {...this.props}>
        <h2>Overview</h2>
        <p>
          You will complete a series of {gameConf.length} games.{" "}
          {game.treatment.playerCount > 1
            ? "In each game, you are working as part of a team. "
            : "In each game, you are working individually. "}
          The goal in these games is to perform as best as you can based on the game-specific instructions provided.
        </p>
        <p>
          <strong>You can earn up to ${pay.toFixed(2)}. </strong> 
          Completing the entire series of games will take at most <strong>{durationInMinutes} minutes. </strong>
          If you do not have {durationInMinutes} minutes available to work on this HIT, please do not continue.
        </p>
        <h3>Gameplay</h3>
        <p>
          Each game will start with instructions and scoring details.
          After the instructions, you will play multiple rounds of that game with different constraints.
        {game.treatment.playerCount > 1
        ? " During each round, you will be able to see " +
              "the other players' moves on your screen" +
              (game.treatment.chat
                ? " and chat with your teammates. "
                : " but not chat with your teammates. ")
        :""}
        </p>
        
          {game.treatment.playerCount > 1 ? (
            <span>
              You and {" "}
              <strong>{game.treatment.playerCount - 1} other MTurk worker(s) </strong>
              are playing on a team collaboratively in real-time.
              Once the games begin, move on to the next round by either:
              <ul><li>clicking "Approve Configuration" (all team members must agree). <strong>You may need to click more than once!</strong></li></ul>
              <ul><li>letting the game clock wind down to 0 seconds</li></ul>
            </span>
          ) : (
            <span>
              You are the <strong>only</strong> worker playing.
              Once the games begin, move on to the next round by either:
              <ul><li>clicking "Approve Configuration". You may need to click more than once!</li></ul>
              <ul><li>letting the game clock wind down to 0 seconds</li></ul>
            </span>
          )}
        
        {showPracticeStage ? (
          <div>
            <h3>Practice</h3>
            <strong>
              The first round of each game will be a practice round.{" "}
            </strong>{" "}
            Practice rounds will display a practice stamp at the top right corner of the
            screen.
            Practice rounds do not count towards your score.
          </div>
        ) : (
          <div />
        )}
        <h2>Scoring</h2>
        <p>
          Each game will have more specific scoring guidelines in the instructions.
          Some games will be scored in real-time and some games will be scored "offline" after the experiment ends.
          Your Total Score is an accumulation of how you {game.treatment.playerCount > 1 ? " and your team " : " "} 
          perform in all rounds of all games{showPracticeStage ? " (except practice rounds)" : ""}.
          Scores reflect your performance in the game, not the amount of time you spend in the game.
          Based on your Total Score, you will be awarded a bonus, which will be displayed to you after you complete all games.
          A higher Total Score results in a larger bonus.
        </p>
        <h2>Idle</h2>
        <p>
          If you are idle, you will be removed and <strong>not earn the bonus</strong>. Being idle is defined as{" "}
          <strong>
            being on a different tab/window for more than {idleTimeDifferentTab}{" "}
            seconds
          </strong>{" "}
          or
          <strong>
            {" "}
            not using your keyboard or mouse for over {idleTimeNoActivity}{" "}
            seconds.{" "}
          </strong>
          If either of these occur, a warning message will appear. If you
          do not respond to this message, you will be considered inactive and removed from the game.
        </p>
      </IntroExitStep>
    );
  }
}

function createTasks(gameConfiguration, treatment) {
  let gameConf = gameConfiguration;
  if (treatment.unitsSeed && treatment.randomizeTask) {
    gameConf = gameSelectionShuffle(JSON.parse(JSON.stringify(gameConf)), treatment.unitsSeed);
  }

  if (treatment.numberOfRounds) {
    gameConf = gameConf.slice(0, treatment.numberOfRounds);
  }
  
  if (treatment.unitsSeed && treatment.randomizeTask) {
    gameConf = gameSelectionShuffle(JSON.parse(JSON.stringify(gameConf)), treatment.unitsSeed);
  }

  if (treatment.subUnits) {
    const gameSize = Math.floor(gameConf.length / treatment.subUnits);
    const subunitsList = [];
    if (gameSize != 0) {
      for (let i = 0; i < gameConf.length; i += gameSize) {
        const subUnitElem = gameConf.slice(i, i + gameSize);
        subunitsList.push(subUnitElem)
      }
    } 
    if (treatment.unitsIndex && treatment.unitsIndex >= 0 && treatment.unitsIndex < treatment.subUnits) {
      gameConf = subunitsList[treatment.unitsIndex]
    } else {
      gameConf = subunitsList[0]
    }
  }

  return gameConf;
}

function gameSelectionShuffle(gamesarray, seed) {
  for (var i = 0; i < gamesarray.length - 1; i++) {
    var rng = seedrandom(seed);
    var j = i + Math.floor(rng() * (gamesarray.length - i)); // modified to be random w/ seed

    var temp = gamesarray[j];
    gamesarray[j] = gamesarray[i];
    gamesarray[i] = temp;
    seed = seed + 1;  // increments seed by one st. random number generated in next iteration is different
  }

  return gamesarray;
}
