import React from "react";
import { TaskLayout } from "../../../client/common/TaskLayout";
import { Button } from "../../../client/common/components/Button";
import Instructions from "../intro/Instructions";
import ViewInstructions from "../../../client/common/components/ViewInstructions";
import SyncedInputWrapper from '../../../client/common/components/SyncedInputWrapper';


import { Board } from "./Board";


const BOARD_SIZE = 400;

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

  componentDidUpdate() {
    if (!this.setCursor) {
      this.target?.setSelectionRange(this.pos, this.pos);
      this.setCursor = true;
    }
  }

  approve() {
    const { game, player, stage } = this.props;
    player.set("approved", true);
    if (
      game.players.reduce(
        (prev, curPlayer) =>
          prev && (curPlayer.get("approved") || curPlayer.exitStatus)
      )
    ) {
      stage.set('approved', true);
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
      <div className="flex justify-center pt-4">
        {game.players.length == 1 ? `Click on screen or drag your arrow to select the direction of 'correlated' motion! ` : 
        `Click on screen or drag your black arrow to select the direction of 'correlated' motion! The red arrow shows the average guess.`}
      </div>
      <div> 
        <Board {...this.props} />
    </div>
   </TaskLayout>
    );
  }
}
