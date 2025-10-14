export function checkConstraint(stage, constraint) {
  const { type, pair } = constraint;
  const constraintId = `${type}-${pair[0]}-${pair[1]}`;
  const room1 = stage.get(`student-${pair[0]}-room`);
  const room2 = stage.get(`student-${pair[1]}-room`);
  const inDeck = room1 === -1 || room2 === -1;
  if (
    (constraint.type === 0 && (room1 !== room2 || inDeck)) ||
    (constraint.type === 1 && room1 === room2 && !inDeck) ||
    (constraint.type === 2 && (Math.abs(room1 - room2) !== 1 || inDeck)) ||
    (constraint.type === 3 && Math.abs(room1 - room2) <= 1 && !inDeck)
  ) {
    stage.set(`constraint-${constraintId}-violated`, true);
  } else {
    stage.set(`constraint-${constraintId}-violated`, false);
  }
}

export function calculateScore(stage, students, payoff, constraints) {
  let score = 0;
  students.forEach(
    (student) =>
      (score +=
        (stage.get(`student-${student}-room`) !== -1
          ? payoff[student][stage.get(`student-${student}-room`)]
          : 0))
  );
  constraints.forEach((constraint) => {
    score += stage.get(
      `constraint-${constraint.type}-${constraint.pair[0]}-${constraint.pair[1]}-violated`
    )
      ? -100
      : 0;
  });
  return score
}
