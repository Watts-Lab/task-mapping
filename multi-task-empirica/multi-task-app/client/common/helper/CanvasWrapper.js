export default class CanvasWrapper {
  constructor(canvasRef, objects = {}) {
    this.canvasRef = canvasRef;
    this.objects = objects;
  }

  eventToPointDec(e) {
    const canvas = this.canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return [
      (e.clientX - rect.left) / canvas.width,
      (e.clientY - rect.top) / canvas.width,
    ];
  }

  pointDecToInt(point) {
    const canvas = this.canvasRef.current;
    return [
      Math.round(point[0] * canvas.width),
      Math.round(point[1] * canvas.width),
    ];
  }

  dist(p1, p2 = [0, 0]) {
    return Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2));
  }

  containingCircle(circlesKey, point) {
    const circles = this.objects[circlesKey];
    if (circles === undefined || circles.type !== "circles") {
      return -1;
    }
    for (let i = circles.points.length - 1; i >= 0; i--) {
      if (this.dist(point, circles.points[i]) < circles.radius) {
        return i;
      }
    }
    return -1;
  }

  pointLineIntersect(point, line, radius) {
    const c = point;
    const p1 = line[0];
    const p2 = line[1];

    const r = radius;

    const p1Dist = this.dist(p1, c);
    const p2Dist = this.dist(p2, c);

    const dir12 = [p2[0] - p1[0], p2[1] - p1[1]];
    const len12 = this.dist(p2, p1);
    const unit12 = [dir12[0] / len12, dir12[1] / len12];
    const dir1c = [c[0] - p1[0], c[1] - p1[1]];
    const compLen =
      (dir12[0] * dir1c[0] + dir12[1] * dir1c[1]) / this.dist(dir12);
    const proj = [compLen * unit12[0], compLen * unit12[1]];
    const projDist = this.dist(dir1c, proj);

    return (
      p1Dist < r ||
      p2Dist < r ||
      (compLen >= 0 && compLen <= len12 && projDist < r)
    );
  }

  containingLineOfPoint(linesKey, point) {
    const linesObj = this.objects[linesKey];
    if (linesObj === undefined || linesObj.type !== "lines") {
      return -1;
    }
    for (let i = linesObj.lines.length - 1; i >= 0; i--) {
      if (
        this.pointLineIntersect(point, linesObj.lines[i], linesObj.width / 2)
      ) {
        return i;
      }
    }
    return -1;
  }

  containingLineOfCircle(circlesKey, linesKey, circlesIndex) {
    const linesObj = this.objects[linesKey];
    const circlesObj = this.objects[circlesKey];
    if (
      linesObj === undefined ||
      linesObj.type !== "lines" ||
      circlesObj === undefined ||
      circlesObj.type !== "circles"
    ) {
      return -1;
    }
    for (let i = linesObj.lines.length - 1; i >= 0; i--) {
      if (
        this.pointLineIntersect(
          circlesObj.points[circlesIndex],
          linesObj.lines[i],
          circlesObj.radius + linesObj.width / 2
        )
      ) {
        return i;
      }
    }
    return -1;
  }

  addObject(key, object) {
    const oldObject = this.objects[key];
    if (oldObject === undefined) {
      this.objects[key] = object;
    } else {
      for (const [fieldKey, val] of Object.entries(object)) {
        oldObject[fieldKey] = val;
      }
    }
  }

  getObject(key) {
    return this.objects[key];
  }

  drawCircles(circlesKey) {
    const circlesObj = this.objects[circlesKey];
    if (circlesObj === undefined || circlesObj.type !== "circles") {
      return -1;
    }
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pointsInt = circlesObj.points.map((point) =>
      this.pointDecToInt(point)
    );
    const radiusInt = Math.round(circlesObj.radius * canvas.width);
    for (let i = 0; i < pointsInt.length; i++) {
      if (pointsInt[i] === undefined) {
        continue;
      }
      ctx.beginPath();
      ctx.fillStyle =
        circlesObj.colors !== undefined ? circlesObj.colors[i] : "black";
      ctx.ellipse(
        pointsInt[i][0],
        pointsInt[i][1],
        radiusInt,
        radiusInt,
        0,
        0,
        2 * Math.PI
      );
      ctx.fill();
      ctx.closePath();
    }
  }

  drawLines(linesKey) {
    const linesObj = this.objects[linesKey];
    if (linesObj === undefined || linesObj.type !== "lines") {
      return -1;
    }
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    const linesInt = linesObj.lines.map((line) => [
      this.pointDecToInt(line[0]),
      this.pointDecToInt(line[1]),
    ]);
    const widthInt = Math.round(linesObj.width * canvas.width);
    ctx.beginPath();
    ctx.lineWidth = widthInt;
    for (let i = 0; i < linesInt.length; i++) {
      if (linesInt[i] === undefined) {
        continue;
      }
      ctx.moveTo(linesInt[i][0][0], linesInt[i][0][1]);
      ctx.lineTo(linesInt[i][1][0], linesInt[i][1][1]);
      ctx.strokeStyle =
        linesObj.colors ? linesObj.colors[i] : "black";
      ctx.stroke();
    }
    ctx.closePath();
  }

  draw() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.width);
    ctx.fillStyle = "lightgrey";
    ctx.fill();
    ctx.rect(0, 0, canvas.width, canvas.width);
    ctx.fillStyle = "black";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.closePath();

    for (const [key, object] of Object.entries(this.objects)) {
      if (object.type === "circles") {
        this.drawCircles(key);
      } else if (object.type === "lines") {
        this.drawLines(key);
      }
    }
  }
}
