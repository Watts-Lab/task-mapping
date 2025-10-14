import React, { Component } from "react";
import { TaskSandbox, TaskFinal } from "./Task.jsx";
import { TaskLayout } from "../../../client/common/TaskLayout";
import { Button } from "../../../client/common/components/Button";
import Instructions from "../intro/Instructions";
import ViewInstructions from "../../../client/common/components/ViewInstructions";

export default class AdvertisementWriting extends React.Component {
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
          <h3
            style={{                
              fontWeight: "bold",
              fontSize: "20px",
              marginTop: "1rem", 
              marginLeft: "5rem"
              }}> Write a slogan for {stage.get("constants").product_name} </h3>
          <h1></h1> 
          <iframe src={`${stage.get("constants").img_address}`} style={{marginLeft: "5rem", marginRight: "5rem", border: "1px solid #e6e9eb", borderRadius: "10px", padding:"1rem", height: 460, width: `calc(100% - 10rem)`}} title={`${stage.get("constants").product_name}`}></iframe>
        </div>
        <h1></h1>
        <div> 
          <TaskSandbox
            game={game}
            round={round}
            stage={stage}
            player={player}
            score={true}
          />
        </div>
        <div>  
          <TaskFinal
            game={game}
            round={round}
            stage={stage}
            player={player}
            score={true}
          />
        </div>
      </TaskLayout>
    );
  }
}