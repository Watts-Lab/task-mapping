import React from "react";
import { TaskFinal, TaskSandbox } from "./Task.jsx";
import { TaskLayout } from "../../../client/common/TaskLayout.jsx";
import { Button } from "../../../client/common/components/Button";
import Instructions from "../intro/Instructions";
import ViewInstructions from "../../../client/common/components/ViewInstructions";

export default class DivergentAssociationTask extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { game } = this.props;
    game.players.forEach((curPlayer) => curPlayer.set("approved", false));
  }

  approve() {
    const { game, player } = this.props;
    player.set("approved", true);
    if (game.players.length === 1) {
      game.players.forEach((curPlayer) => curPlayer.stage.submit())
    }
    if (
      game.players.reduce(
        (prev, curPlayer) =>
          prev && (curPlayer.get("approved") || curPlayer.exitStatus || !curPlayer.online)
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
          <TaskSandbox {...this.props} shouldUpdateScore={true} />
        </div>
        <div>
          <TaskFinal {...this.props} shouldUpdateScore={true} />
        </div>
      </TaskLayout>
    );
  }
}
