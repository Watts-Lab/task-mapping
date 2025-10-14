function dist(p1, p2 = [0, 0]) {
  return Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2));
}

function pointLineIntersect(point, line, radius) {
  const c = point;
  const p1 = line[0];
  const p2 = line[1];

  const r = radius;

  const p1Dist = dist(p1, c);
  const p2Dist = dist(p2, c);

  const dir12 = [p2[0] - p1[0], p2[1] - p1[1]];
  const len12 = dist(p2, p1);
  const unit12 = [dir12[0] / len12, dir12[1] / len12];
  const dir1c = [c[0] - p1[0], c[1] - p1[1]];
  const compLen =
    (dir12[0] * dir1c[0] + dir12[1] * dir1c[1]) / dist(dir12);
  const proj = [compLen * unit12[0], compLen * unit12[1]];
  const projDist = dist(dir1c, proj);

  return (
    p1Dist < r ||
    p2Dist < r ||
    (compLen >= 0 && compLen <= len12 && projDist < r)
  );
}

export function numIntersect(dots, radius, lines, width) {
  let cnt = 0;
  for (let i = 0; i < dots.length; i++) {
    for (let j = 0; j < lines.length; j++) {
      if (
        pointLineIntersect(
          dots[i],
          lines[j],
          radius + width / 2
        )
      ) {
        cnt++;
        break;
      }
    }
  }
  return cnt;
}