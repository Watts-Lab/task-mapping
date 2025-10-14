import React, { Component } from "react";
import { Button } from "../../../client/common/components/Button";
import { _ } from "lodash";
import CanvasWrapper from "../../../client/common/helper/CanvasWrapper";
import { TaskLayout } from "../../../client/common/TaskLayout";
import { logAction } from "../../../client/common/helper/logger";
import { numIntersect } from "../helper/helper";
import Instructions from "../intro/Instructions";
import ViewInstructions from "../../../client/common/components/ViewInstructions";

export default class NineDots extends Component {
  constructor(props) {
    super(props);
    const { player, stage } = props;
    this.taskConstants = stage.get("constants");

    this.canvasRef = React.createRef();
    const dots = {
      points: this.taskConstants.dots,
      radius: this.taskConstants.dotRadius,
      type: "circles",
    };
    const joints = {
      points: [],
      radius: this.taskConstants.jointRadius,
      type: "circles",
    };
    const lines = {
      lines: [],
      width: this.taskConstants.lineWidth,
      type: "lines",
    };
    const hoverCircle = {
      points: [],
      radius: this.taskConstants.jointRadius,
      type: "circles",
    };
    const hoverLine = {
      lines: [],
      width: this.taskConstants.lineWidth,
      type: "lines",
    };
    this.canvasWrapper = new CanvasWrapper(this.canvasRef, {
      dots,
      lines,
      hoverCircle,
      hoverLine,
      joints,
    });

    player.set("moving", -1);

    this.throttledUpdate = _.throttle(
      this.updateState.bind(this),
      this.taskConstants.updateInterval,
      true
    );

    this.state = {
      newLoc: 0,
      showModal: false,
    };
  }

  updateState() {
    const { player, stage, game } = this.props;
    const moving = player.get("moving");
    if (moving !== -1) {
      stage.set(`point-${moving}`, this.state.newLoc);
    }
    game.players.forEach((curPlayer) => curPlayer.set("approved", false));
  }

  reset() {
    const { stage, game } = this.props;

    stage.set("numPoints", 0);
    for (const player of game.players) {
      player.set("moving", -1);
    }

    this.updateState();
  }

  alreadyMoving(movingIndex) {
    const { game } = this.props;
    if (movingIndex === -1) {
      return false;
    }
    for (const player of game.players) {
      if (player.get("moving") === movingIndex) {
        return true;
      }
    }
    return false;
  }

  getJointColors() {
    const { player, stage, game } = this.props;
    const canvasWrapper = this.canvasWrapper;
    const jointColors = new Array(stage.get("numPoints")).fill("black");
    const containingCircle = canvasWrapper.containingCircle(
      "joints",
      this.state.newLoc
    );
    if (containingCircle !== -1) {
      jointColors[containingCircle] = player.get("avatar").color;
    }
    for (const curPlayer of game.players) {
      const curPlayerMoving = curPlayer.get("moving");
      if (curPlayerMoving !== -1) {
        jointColors[curPlayerMoving] = curPlayer.get("avatar").color;
      }
    }
    return jointColors;
  }

  updatePreview(newLoc) {
    const { player, stage } = this.props;
    const canvasWrapper = this.canvasWrapper;
    const containingCircle = canvasWrapper.containingCircle("joints", newLoc);
    const moving = player.get("moving");

    const jointColors = this.getJointColors();

    canvasWrapper.addObject("hoverCircle", { points: [], colors: undefined });
    canvasWrapper.addObject("hoverLine", { lines: [], colors: undefined });
    canvasWrapper.addObject("joints", { colors: jointColors });

    if (containingCircle !== -1 || moving !== -1) {
      canvasWrapper.addObject("joints", { colors: jointColors });
    } else if (stage.get("numPoints") <= this.taskConstants.numEdges) {
      canvasWrapper.addObject("hoverCircle", {
        points: [newLoc],
        colors: [player.get("avatar").color],
      });
      const numPoints = stage.get("numPoints");
      if (numPoints > 0) {
        canvasWrapper.addObject("hoverLine", {
          lines: [[stage.get(`point-${numPoints - 1}`), newLoc]],
          colors: [player.get("avatar").color],
        });
      }
    }

    canvasWrapper.draw();
  }

  mouseDown(e) {
    const { player, stage, game } = this.props;
    const { dots, dotRadius, lineWidth } = stage.get("constants");
    const canvasWrapper = this.canvasWrapper;
    const newLoc = canvasWrapper.eventToPointDec(e);
    const containingCircle = canvasWrapper.containingCircle("joints", newLoc);
    if (this.alreadyMoving(containingCircle)) {
      return;
    }

    const numPoints = stage.get("numPoints");
    if (containingCircle !== -1) {
      player.set("moving", containingCircle);
      this.setState({ newLoc: newLoc });
      logAction(player, "selectedPoint", player.get("moving"));
    } else if (numPoints <= this.taskConstants.numEdges) {
      stage.set(`point-${numPoints}`, newLoc);
      stage.set("numPoints", numPoints + 1);
      player.set("moving", numPoints);
      this.setState({ newLoc: newLoc });
      logAction(player, "addedPoint", player.get("moving"), this.state.newLoc);
    }

    this.updatePreview(e);
//// updating score array
    const lines = [];

    for (let i = 1; i < stage.get("numPoints"); i++) {
      lines.push([stage.get(`point-${i - 1}`), stage.get(`point-${i}`)]);
    }

    const score = numIntersect(dots, dotRadius, lines, lineWidth);
    const normalizedScore = Math.round((100 * score) / stage.get("maxPossibleScore"));

    game.players.forEach((player, i) => {
      let arr = player.stage.get("scoreArr"); 
      if (arr[arr.length - 1] !== normalizedScore) {
        arr.push(normalizedScore);
        player.stage.set("scoreArr", arr);
        //console.log(player.stage.get("scoreArr"));
      }
    });

  }

  mouseUp(e) {
    const { player } = this.props;
    let moving = player.get("moving");

    if (moving !== -1) {
      this.updateState();
      logAction(
        player,
        "releasedPoint",
        player.get("moving"),
        this.state.newLoc
      );
      player.set("moving", -1);
    }
  }

  mouseMove(e) {
    const { player } = this.props;
    const moving = player.get("moving");
    const newLoc = this.canvasWrapper.eventToPointDec(e);
    this.setState({ newLoc });
    if (moving !== -1) {
      this.throttledUpdate();
    }

    this.updatePreview(newLoc);
  }

  mouseLeave(e) {
    const canvasWrapper = this.canvasWrapper;
    canvasWrapper.addObject("hoverCircle", { points: [], colors: undefined });
    canvasWrapper.addObject("hoverLine", { lines: [], colors: undefined });

    this.canvasWrapper.draw();
  }

  componentDidMount() {
    const { game } = this.props;
    const canvas = this.canvasRef.current;
    canvas.addEventListener("mousedown", this.mouseDown.bind(this));
    canvas.addEventListener("mouseup", this.mouseUp.bind(this));
    canvas.addEventListener("mousemove", this.mouseMove.bind(this));
    canvas.addEventListener("mouseleave", this.mouseLeave.bind(this));
    game.players.forEach((curPlayer) => curPlayer.set("approved", false));
  }

  componentDidUpdate() {
    const { player, stage } = this.props;
    const canvasWrapper = this.canvasWrapper;

    const joints = [];
    for (let i = 0; i < stage.get("numPoints"); i++) {
      joints.push(stage.get(`point-${i}`));
    }
    const moving = player.get("moving");
    if (moving !== -1) {
      joints[moving] = this.state.newLoc;
    }
    const lines = [];
    for (let i = 1; i < stage.get("numPoints"); i++) {
      lines.push([joints[i - 1], joints[i]]);
    }

    canvasWrapper.addObject("joints", {
      points: joints,
      colors: this.getJointColors(),
    });
    canvasWrapper.addObject("lines", { lines });
    const intersect = [...this.taskConstants.dots.keys()].map(
      (ind) => canvasWrapper.containingLineOfCircle("dots", "lines", ind) !== -1
    );
    const colors = intersect.map((b) => (b ? "green" : "black"));
    canvasWrapper.addObject("dots", { colors });
    canvasWrapper.draw();
  }

  approve() {
    const { game, player } = this.props;
    player.set("approved", true);
    if (
      game.players.reduce(
        (prev, curPlayer) => prev && (curPlayer.get("approved") || curPlayer.exitStatus || !curPlayer.online)
      )
    ) {
      game.players.forEach((curPlayer) => curPlayer.stage.submit());
    }
  }

  render() {
    const { player } = this.props;

    return (
      <TaskLayout
        {...this.props}
        nextForm={() => (
          <div className="flex h-full items-center justify-center space-x-1">
            <Button onClick={this.reset.bind(this)}>Reset</Button>
            <Button
              type="submit"
              onClick={this.approve.bind(this)}
              disabled={player.get("approved")}
            >
              Approve Configuration
            </Button>
          </div>
        )}
      >
        <div style={{position:"absolute", bottom:"5px", right:"330px"}}>
          <ViewInstructions inside={true} instruction={Instructions} props></ViewInstructions>
        </div>
        <canvas
          ref={this.canvasRef}
          width={this.taskConstants.size}
          height={this.taskConstants.size}
          className="mx-auto"
        />
      </TaskLayout>
    );
  }
}
