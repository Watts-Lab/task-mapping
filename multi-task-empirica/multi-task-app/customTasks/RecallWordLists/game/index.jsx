import React, { Component } from "react";
import { StartTimer } from "./StartTimer";
import { AudioPlayer } from "./AudioPlayer";
import { List } from "./Task.jsx";
import { TaskLayout } from "../../../client/common/TaskLayout";
import { Button } from "../../../client/common/components/Button";
import Instructions from "../intro/Instructions";
import ViewInstructions from "../../../client/common/components/ViewInstructions";

export default class RecallWordLists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      showError: false,
    };
  }

  handleKeyDown = (event) => {
    const step = this.props.stage.get("step");
    if (step === 1) {
      this.setState({ showError: true });
    }
  };

  handleVisibilityChange = () => {
    const step = this.props.stage.get("step");
    if (document.hidden && step === 1) {
      this.setState({ showError: true });
    }
  };

  componentDidMount() {
    const { game } = this.props;

    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("visibilitychange", this.handleVisibilityChange);

    // should update when changes made in diff parts of task 
    game.players.forEach((curPlayer) => curPlayer.set("approved", false));
    game.players.forEach((curPlayer) => curPlayer.set("getAudio", false));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("visibilitychange", this.handleVisibilityChange);
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
          prev && (curPlayer.get("approved") || curPlayer.exitStatus || !curPlayer.online )
      )
    ) {
      game.players.forEach((curPlayer) => curPlayer.stage.submit());
    }
  }

  render() {
    const { round, stage, player, game } = this.props;

    const step = stage.get("step");
    const { showError } = this.state;
    const errorMessage = "We've detected a violation of the rules mentioned in the instructions: no typing or leaving the tab while the audio is being played. Unfortunately, this means you may not participate in the current round.";
    
    if (showError) {
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
            <div style={{ textAlign: 'center', width: '100vh', marginTop: '30vh', marginLeft: '20vh', border: '1px solid red', backgroundColor: '#fdd', padding: '10px', borderRadius: '5px' }}>
              <strong>Error:</strong> {errorMessage}
            </div>
          </TaskLayout>

      );
  }
    
  return step === 0 ? (
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
        <h1
            style={{
              fontSize: "25px",
              marginLeft: "40px", 
              fontWeight: "bold", 
              color: "#0ea5e9"}}>
          </h1>
          <h3 style={{                
            fontSize: "20px",
            marginTop: "0rem", 
            marginLeft: "5rem"
            }}>
            <StartTimer game={game} round={round} stage={stage} player={player}
              audioStartDelay={stage.get('constants').audioStartDelay}
            />
          </h3>
        </div>

      </TaskLayout>
    ): step === 1 ? (
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
          <h1
            style={{
              fontSize: "25px",
              marginLeft: "40px", 
              fontWeight: "bold", 
              color: "#0ea5e9"}}>
          </h1>

          <h3 style={{                
            fontSize: "20px",
            marginTop: "0rem", 
            marginLeft: "5rem"
            }}>
            <AudioPlayer game={game} round={round} stage={stage} player={player}
              audioFilePath={stage.get('constants').audioFile}
              />
          </h3>
        </div>

      </TaskLayout>
      ): step === 2 ? (
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
          <h1
            style={{
              fontSize: "25px",
              marginLeft: "40px", 
              fontWeight: "bold", 
              color: "#0ea5e9"}}>
          </h1>
          <h3 style={{                
            fontSize: "20px",
            marginTop: "0rem", 
            marginLeft: "5rem"
            }}>
            <List {...this.props} />
          </h3>
        </div>

    </TaskLayout>
    ): (
      <h1>Something went wrong...</h1>
    );
  }
}
