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
              Approve Decision
            </Button>
          </div>
        )}>
        <div style={{position:"absolute", bottom:"5px", right:"330px"}}>
          <ViewInstructions inside={true} instruction={Instructions} props></ViewInstructions>
        </div>
        <div>
          <p
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              fontSize: "20px",
              marginTop: "3rem", 
              marginLeft: "5rem", 
              color: "blue",
              marginRight: "2rem"
            }}> Read through the scenario below and then scroll to the bottom to write your response: 
         </p> 
         <p
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              fontSize: "40px",
              marginTop: "3rem", 
              marginLeft: "20rem", 
              marginRight: "2rem",
              color: "blue",
            }}> Carter Racing Scenario
         </p> 
         <img src="img/info1.png" marginLeft= "5rem" ></img>
        <img src="img/info2.png" ></img>
        <img src="img/info3.png" ></img>
        </div>
        <p
            style={{
              fontSize: "40px",
              color: "blue",
              marginLeft: "20rem", 
              fontWeight: "bold"
            }}> Additional Information: 
        </p>  
        <img src="img/table1.png" ></img>
        <img src="img/table2.png" ></img>
        <img src="img/table3.png" ></img>
        <div> 
        <h3
            style={{                
              fontWeight: "bold",
              fontSize: "20px",
              marginTop: "3rem", 
              marginLeft: "5rem", 
              marginRight: "2rem",
              color: "blue",
              }}> Write a response below about whether you should race or not and why. 
              Please ensure you have a response in the "Final Decision/Response 
              section before clicking the Approve Decision button</h3> 
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
