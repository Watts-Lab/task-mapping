import React from "react";
import { TaskLayout } from "../../../client/common/TaskLayout";
import { Button } from "../../../client/common/components/Button";
import Instructions from "../intro/Instructions";
import ViewInstructions from "../../../client/common/components/ViewInstructions";

export default class TaskTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };
  }

  componentDidMount() {
    const { game } = this.props;
    // should update when changes made in diff parts of task 
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
        <div> 
          <h1 style={{
            fontSize: "25px",
            marginLeft: "40px", 
            fontWeight: "bold", 
            color: "#0ea5e9"}}> 
            {stage.displayName} 
          </h1> 
        </div>
      </TaskLayout>
    );
  }
}
