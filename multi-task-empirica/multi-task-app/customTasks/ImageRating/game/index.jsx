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
              Approve Rating
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
              marginTop: "3rem", 
              marginLeft: "5rem"
              }}> Rate the image and description below: </h3> 
          <p
            style={{
              fontSize: "18px",
              marginLeft: "5rem"
            }}> Please pick a whole number between 1 (worst) and 10 (best) </p> 
          <img src={stage.get('constants').address} width="380px" style={{marginLeft: "5rem"}}></img>
          <div 
            href={stage.get('constants').address}
            target="_blank"
            style={{
            fontSize: "18px",
            marginLeft: "5rem",
            marginBottom: "2rem"
            }}>
          Description: {stage.get('constants').image_name}
          </div>
        </div>
        <p> </p>
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
