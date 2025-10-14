export function cyclic(edges, cities) {
  if (edges.length !== cities.length) {
    return false;
  }

  const edgesCopy = [...edges];
  let curIndex = 0;

  do {
    const edgeIndex = edgesCopy.findIndex(
      (e) => e[0] === curIndex || e[1] === curIndex
    );

    if (edgeIndex === -1) {
      break;
    }

    curIndex =
      edgesCopy[edgeIndex][0] === curIndex
        ? edgesCopy[edgeIndex][1]
        : edgesCopy[edgeIndex][0];

    edgesCopy.splice(edgeIndex, 1);
  } while (edgesCopy.length > 0 && curIndex !== 0);

  return !(edgesCopy.length > 0 || curIndex !== 0);
}

export function calculateDist(edges, taskConstants) {
  const { worstDistance, bestDistance, cities } = taskConstants;

  if (!cyclic(edges, cities)) {
    return undefined;
  }

  return distanceMeasurements(edges, taskConstants);
}

export function distanceMeasurements(edges, taskConstants) {
  const { worstDistance, bestDistance, cities } = taskConstants;

  let dist = 0;

  for (const edge of edges) {
    const p1 = cities[edge[0]];
    const p2 = cities[edge[1]];
    dist += Math.sqrt(
    Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2)
    );
  }

  return Math.round(dist * 1000) / 1000;
}

export function calScore(edges, taskConstants) {
  const { worstDistance, bestDistance, cities } = taskConstants;
  const dist = calculateDist(edges, taskConstants);
  const fromWorst = worstDistance - (dist ?? worstDistance);
  const fromBest = worstDistance - bestDistance;
  return (10 * fromWorst) / fromBest;
}
