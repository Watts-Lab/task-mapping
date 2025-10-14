import React, { Component } from "react";
import { Button } from "../../../client/common/components/Button";
import { TaskLayout } from "../../../client/common/TaskLayout";
import AbstractGridUI from "./AbstractGridUI";
import { calculateScore, numberChanged } from "../helper/helper";
import Instructions from "../intro/Instructions";
import ViewInstructions from "../../../client/common/components/ViewInstructions";

export default class AbstractGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };
  }

  updateGrid = (i, j) => {
    const { stage, game, round } = this.props;
    const grid = stage.get("grid");
    grid[i][j] = (grid[i][j] + 1) % 2;
    stage.set("grid", grid);
    game.players.forEach((curPlayer) => curPlayer.set("approved", false));
    /// calculate new score
    const startGrid = stage.get("constants").startingGrid;
    const currGrid = stage.get("grid");
    const maxScore = stage.get("maxPossibleScore");
    const score = calculateScore(startGrid, currGrid, maxScore);
    const numChanged = numberChanged(startGrid, currGrid);

    game.players.forEach((player, i) => {
      let arr = player.stage.get("scoreArr");
      arr.push(numChanged);
      player.stage.set("scoreArr", arr);
      //console.log(player.stage.get("scoreArr"));
    });
  };

  componentDidMount() {
    const { game } = this.props;
    game.players.forEach((curPlayer) => curPlayer.set("approved", false));
  }

  getValue = (i, j) => this.props.stage.get("grid")[i][j];

  handleHover = (i, j) => {
    const { player } = this.props;
    const hoveredGrid = { i, j };
    player.stage.set("hoveredGrid", hoveredGrid);
  };

  getColor = (i, j) => {
    const player = this.props.game.players.find(
      (player) =>
        player.stage.get("hoveredGrid")?.i === i &&
        player.stage.get("hoveredGrid")?.j === j
    );
    if (!player || player.id === this.props.player.id) return null;
    return player.get("avatar").color;
  };

  approve() {
    const { game, player } = this.props;
    player.set("approved", true);
    if (
      game.players.reduce(
        (prev, curPlayer) =>
          prev &&
          (curPlayer.get("approved") ||
            curPlayer.exitStatus ||
            !curPlayer.online)
      )
    ) {
      game.players.forEach((curPlayer) => curPlayer.stage.submit());
    }
  }

  render() {
    const { round, stage, player, game } = this.props;
    return (
      <TaskLayout
        {...this.props}
        nextForm={() => (
          <div className="flex h-full items-center justify-center space-x-1">
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
        <div className="mt-8 flex w-full justify-center">
          <AbstractGridUI
            startingGrid={stage.get("constants").startingGrid}
            getValue={this.getValue}
            updateGrid={this.updateGrid}
            handleHover={this.handleHover}
            getColor={this.getColor}
          />
        </div>
      </TaskLayout>
    );
  }
}
