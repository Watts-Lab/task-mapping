import React, { Component } from "react";
import CanvasWrapper from "../../../client/common/helper/CanvasWrapper";
import SocialExposure from "./SocialExposure";
import { Button } from "../../../client/common/components/Button";
import { TaskLayout } from "../../../client/common/TaskLayout";
import { logAction } from "../../../client/common/helper/logger";
import { calScore } from "../helper/helper";
import { distanceMeasurements } from "../helper/helper";
import Instructions from "../intro/Instructions";
import ViewInstructions from "../../../client/common/components/ViewInstructions";

export default class EuclideanTravelingSalesperson extends Component {
  constructor(props) {
    super(props);
    const { stage, round } = props;
    this.canvasRef = React.createRef();
    this.taskConstants = stage.get('constants');

    this.state = {
      showModal: false,
    };
  }

  reset() {
    const { game, round, player } = this.props;
    this.setEdges([]);
    round.set("log", []);
    for (const playerIter of game.players) {
      playerIter.set("moving", -1);
    }
    logAction(player, "reset");
    game.players.forEach((curPlayer) => curPlayer.set("approved", false));
  }

  getEdges() {
    const { player, stage } = this.props;
    return this.taskConstants.collaboration
      ? stage.get("edges")
      : player.get("edges");
  }

  setEdges(edges) {
    const { player, stage } = this.props;
    this.taskConstants.collaboration
      ? stage.set("edges", edges)
      : player.set("edges", edges);
  }

  createWrapper() {
    const edges = this.getEdges();
    const edgesPoints = edges.map((edge) => [
      this.taskConstants.cities[edge[0]],
      this.taskConstants.cities[edge[1]],
    ]);
    const route = {
      lines: edgesPoints,
      width: this.taskConstants.lineWidth,
      type: "lines",
    };
    const cities = {
      points: this.taskConstants.cities,
      radius: this.taskConstants.dotRadius,
      type: "circles",
    };
    return new CanvasWrapper(this.canvasRef, { route: route, cities: cities });
  }

  getColors() {
    const { player, game } = this.props;
    let colors = Array(this.taskConstants.cities.length);
    for (let i = 0; i < this.taskConstants.cities.length; i++) {
      if (this.degree(i) === 0) {
        colors[i] = "black";
      } else if (this.degree(i) === 1) {
        colors[i] = "white";
      } else {
        colors[i] = "grey";
      }
    }
    if (this.taskConstants.collaboration) {
      for (const playerIter of game.players) {
        const moving = playerIter.get("moving");
        if (moving !== -1) {
          colors[moving] = playerIter.get("avatar").color;
        }
      }
    }
    const moving = player.get("moving");
    if (moving !== -1) {
      colors[moving] = player.get("avatar").color;
    }
    return colors;
  }

  degree(cityInd) {
    const edges = this.getEdges();
    return edges.reduce(
      (prev, edge) => prev + (edge.includes(cityInd) ? 1 : 0),
      0
    );
  }

  containsEdge(edge) {
    const edges = this.getEdges();
    for (const edgeIter of edges) {
      if (
        (edgeIter[0] === edge[0] && edgeIter[1] === edge[1]) ||
        (edgeIter[1] === edge[0] && edgeIter[0] === edge[1])
      ) {
        return true;
      }
    }
    return false;
  }

  mouseUp(e) {
    const { player, game, stage, round } = this.props;
    const canvasWrapper = this.createWrapper();

    const point = canvasWrapper.eventToPointDec(e);
    const cityInd = canvasWrapper.containingCircle("cities", point);
    const edgeInd = canvasWrapper.containingLineOfPoint("route", point);

    const moving = player.get("moving");
    const edges = this.getEdges();

    if (cityInd === -1 && edgeInd !== -1) {
      edges.splice(edgeInd, 1);
      this.setEdges(edges);
      logAction(player, "deletedEdge", edges[edgeInd]);
      game.players.forEach((player) => player.stage.set("approved", false));
    }

    if (cityInd !== -1 && this.degree(cityInd) < 2) {
      if (moving === -1) {
        player.set("moving", cityInd);
        logAction(player, "selectPoint", cityInd);
      } else if (cityInd === moving) {
        player.set("moving", -1);
        logAction(player, "deselectPoint", cityInd);
      } else if (cityInd !== -1 && !this.containsEdge([moving, cityInd])) {
        edges.push([moving, cityInd]);
        this.setEdges(edges);
        player.set("moving", -1);
        if (this.degree(moving) >= 2 || this.degree(cityInd)) {
          game.players.forEach(
            (playerIter) =>
              (playerIter.get("moving") === moving ||
                playerIter.get("moving") === cityInd) &&
              playerIter.set("moving", -1)
          );
        }
        logAction(player, "createEdge", [moving, cityInd]);
      }

      game.players.forEach((curPlayer) => curPlayer.set("approved", false));
    }

    ///// update score array 
    var score; 
    if (stage.get('constants').collaboration) {
      score = distanceMeasurements(stage.get("edges"), stage.get('constants'));
    } else {
      score = distanceMeasurements(player.get("edges"), stage.get('constants'));
    }
    const normalizedScore = Math.round((100 * score) / stage.get("maxPossibleScore"));
    //console.log(normalizedScore);

    game.players.forEach((player, i) => {
      let arr = player.stage.get("scoreArr"); 
      if (arr[arr.length - 1] !== normalizedScore) {
        arr.push(normalizedScore);
        player.stage.set("scoreArr", arr);
        //console.log(player.stage.get("scoreArr"));
      }
    });
  }

  componentDidMount() {
    const { game } = this.props;
    const canvas = this.canvasRef.current;
    canvas.addEventListener("mouseup", this.mouseUp.bind(this));
    game.players.forEach((curPlayer) => curPlayer.set("approved", false));
  }

  componentDidUpdate() {
    const canvasWrapper = this.createWrapper();
    canvasWrapper.addObject("cities", { colors: this.getColors() });
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
        <div className="flex flex-row flex-wrap justify-center space-x-1 space-y-1">
          <canvas
            ref={this.canvasRef}
            width={this.taskConstants.size}
            height={this.taskConstants.size}
          />
          <SocialExposure {...this.props} />
        </div>
      </TaskLayout>
    );
  }
}
