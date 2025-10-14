import React, { Component } from "react";
import { TaskLayout } from "../../../client/common/TaskLayout";
import { Button } from "../../../client/common/components/Button";
import Game0 from "./GameZero";
import Game1 from "./gameOne";
import Game2 from "./gameTwo";
import Game3 from "./gameThree";
import Instructions from "../intro/Instructions";
import ViewInstructions from "../../../client/common/components/ViewInstructions";

export default class ObjectBasedReasoning extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };
  }

  componentDidMount() {
    const { game } = this.props;
    game.players.forEach((curPlayer) => curPlayer.set("approved", false));
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

  chooseGame() {
    const { stage } = this.props; 
    const gameNum = stage.get('constants').game
    if (gameNum == 0) {
      return <Game0 {...this.props} /> 
    } else if (gameNum == 1) {
      return <Game1 {...this.props} /> 
    } else if (gameNum == 2) {
      return <Game2 {...this.props} /> 
    } else {
      return <Game3 {...this.props} /> 
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
        )}>
        <div style={{position:"absolute", bottom:"5px", right:"330px"}}>
          <ViewInstructions inside={true} instruction={Instructions} props></ViewInstructions>
        </div>
        {this.chooseGame()}
      </TaskLayout>
    );
  }
}
