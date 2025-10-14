export const OnStageStart = (game, round, stage) => {
};

export const OnStageEnd = (game, round, stage) => {
  game.players.forEach((player) => {
    const prevScore = player.get("score") || 0;
    player.set("score", prevScore + 1);
    player.set("adjustedScore", player.get("adjustedScore") + Math.round(round.get("bonusRate") * 1));
  });
};

export const OnRoundStart = (game, round) => {
  round.set("bonusRate", 1);
};

export const OnRoundEnd = (game, round) => {};
