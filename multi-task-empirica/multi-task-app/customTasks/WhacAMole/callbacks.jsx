import { startDurations, endDurations, setNormalizedScoreFromFeedbackScore, 
  calculatePaymentIntroOutroPractice, calculatePaymentStage } from "../helper";

const seedrandom = require("seedrandom");

export const OnRoundStart = (game, round) => {
  const scoredTasks = game.get("scored");
  scoredTasks.push(round.get("name"));
  game.set("scored", scoredTasks);
};

export const OnStageStart = (game, round, stage) => {
  const rng = seedrandom(stage.get('constants').seed);

  if (!round.get("assigned")) {
    const numberOfTeams = stage.get('constants').numberOfTeams;

    game.players.forEach((player, index) => {
      player.round.set("team", index % numberOfTeams);
      player.stage.set("score", 0);
    });

    round.set("assigned", true);
  }

  game.players.forEach((player, index) => {
    player.stage.set("coords", { x: 10, y: 10 });
    player.stage.set("dotsClaimed", []);
    player.stage.set("scoreArr", []);
    player.stage.set("scoreFeedback", 0);
  });

  const [dots, maxScore] = generateDots(game, round, stage, rng);
  stage.set("dots", dots);
  stage.set("maxPossibleScore", maxScore);

  startDurations(stage);
};

export const OnStageEnd = (game, round, stage) => {
  //console.log("Hello")
  if (stage.get('constants').calculateScore) {
    game.players.forEach((player) => {
      setNormalizedScoreFromFeedbackScore(player, stage);
      calculatePaymentStage(game, player, stage, round);
    });
  } else {
    game.players.forEach((player) => {
      calculatePaymentIntroOutroPractice(player, stage);
    });
  }
  endDurations(stage);
};

export const OnRoundEnd = (game, round) => {};

function generateDots(game, round, stage, rng) {
  const dots = [];
  const {
    generationInterval,
    generationsPerInterval,
    appearanceProbability,
    appearanceTime,
    dots: dotArr,
    dimensions,
  } = stage.get('constants')
  const dur = Math.min(stage.durationInSeconds, 3600) * 1000;

  let maxScore = 0;
  let j = 0;
  for (let t = 0; t < dur; t += generationInterval) {
    for (let i = 0; i < generationsPerInterval; i++) {
      if (rng() < appearanceProbability) {
        const end = t + appearanceTime;
        const [dot, score] = generateDot(j, dotArr, dimensions, t, end, rng);
        dots.push(dot);
        maxScore += score;
        j++;
      }
    }
  }

  return [dots, maxScore];
}

function generateDot(i, dots, dimensions, startTime, endTime, rng) {
  const prefixSum = new Array(dots.length).fill(0);

  prefixSum[0] = dots[0].appearanceFrequency;

  for (let i = 1; i < dots.length; i++) {
    prefixSum[i] = prefixSum[i - 1] + dots[i].appearanceFrequency;
  }

  const r = Math.floor(rng() * prefixSum[prefixSum.length - 1]);

  let dot = dots[prefixSum.findIndex((v) => r < v)];

  return [
    {
      id: i,
      name: dot.name,
      x: Math.floor(rng() * dimensions.width),
      y: Math.floor(rng() * dimensions.height),
      color: dot.color,
      startTime,
      endTime,
    },
    dot.teamPointsEarned > 0 ? dot.teamPointsEarned : 0,
  ];
}
