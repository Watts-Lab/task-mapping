import React, { Component } from "react";
import { Button } from "../../../client/common/components/Button";
import { TaskLayout } from "../../../client/common/TaskLayout";
import InstanceOne from "./RoundOne/InstanceOne";
import InstanceTwo from "./RoundTwo/InstanceTwo";
import InstanceThree from "./RoundThree/InstanceThree";
import PracticeRound from "./RoundZero/PracticeRound";
import Instructions from "../intro/Instructions";
import ViewInstructions from "../../../client/common/components/ViewInstructions";

export default class WolfGoatCabbage extends Component {
  constructor(props) {
    super(props);
    this.taskConstants = props.stage.get("constants");

    this.state = {
      showModal: false,
    };
  }

  resetBoard() {
    const { instance } = this.taskConstants;
    const { stage, game } = this.props
    game.players.forEach((curPlayer) => curPlayer.set("approved", false));

    if (instance === "zero") {
      stage.set("wgc-config", { 
        boatSide: "left", 
        onBoat: [null],
        sides: [0, 0], 
        status: 0, 
        moves: 0 
      });
    } else if (instance === "one") {
      stage.set("wgc-config", { 
        boatSide: "left", 
        onBoat: [null],
        sides: [0, 0, 0], 
        status: 0, 
        moves: 0 
      })    
    } else if (instance === "two") {
      stage.set("wgc-config", { 
        boatSide: "left", 
        onBoat: [null, null], 
        sides: [0, 0, 0], 
        status: 0, 
        moves: 0 
      });
    } else {
      stage.set("wgc-config", {
        boatSide: "left",
        onBoat: [null, null],
        sides: [0, 0, 0, 0],
        status: 0,
        moves: 0,
      });
    }

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
        (prev, curPlayer) =>
          prev && (curPlayer.get("approved") || curPlayer.exitStatus)
      )
    ) {
      game.players.forEach((curPlayer) => curPlayer.stage.submit());
    }
  }

  render() {
    const { player, stage } = this.props;
    const level = this.taskConstants.instance;
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
            <div style={{marginLeft: "0.5rem"}}>
              <Button secondary = {true} onClick={() => this.resetBoard()}>Reset</Button>
            </div>
          </div>
        )}
      >
        <div style={{position:"absolute", bottom:"5px", right:"330px"}}>
          <ViewInstructions inside={true} instruction={Instructions} props></ViewInstructions>
        </div>
        {level === "zero" && <PracticeRound {...this.props} />}
        {level === "one" && <InstanceOne {...this.props} />}
        {level === "two" && <InstanceTwo {...this.props} />}
        {level === "three" && <InstanceThree {...this.props} />}
      </TaskLayout>
    );
  }
}
