import React, { Component } from "react";
import { TaskLayout } from "../../../client/common/TaskLayout";
import MathTask from "./components/MathTask";
import RecallTask from "./components/RecallTask";
import ShowLists from "./components/ShowLists";
import { Button } from "../../../client/common/components/Button";
import Instructions from "../intro/Instructions";
import ViewInstructions from "../../../client/common/components/ViewInstructions";
import UserErrorMessage from '../../UserErrorMessage';
import { StartTimer } from "./StartTimer";

export default class RecallAssociation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      showError: false
    };

    const { stage } = this.props;
    this.props.player.stage.set("step", 0);
  }

  handleKeyDown = (event) => {
    //console.log("down");
    const step = this.props.player.stage.get("step");
    if (step === 1) {
      this.setState({ showError: true });
    }
  };

  handleVisibilityChange = () => {
    const step = this.props.player.stage.get("step");
    if (document.hidden && step === 1) {
      this.setState({ showError: true });
    }
  };
  
  setStep = (newStep) => {
    const { player } = this.props;
    player.stage.set("step", newStep);
  };

  componentDidMount() {
    const { game } = this.props;
    const { player } = this.props;
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
    game.players.forEach((curPlayer) => curPlayer.set("approved", false));
    console.log(player.stage.get("step"));
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
          prev && (curPlayer.get("approved") || curPlayer.exitStatus || !curPlayer.online)
      )
    ) {
      game.players.forEach((curPlayer) => curPlayer.stage.submit());
    }
  }

  render() {
    const { round, stage, player, game } = this.props;
    const task_constants = stage.get('constants')
    const step = player.stage.get("step");
    const { showError } = this.state;
    const errorMessage = "We've detected a violation of the rules mentioned in the instructions: no typing or leaving the tab whilst the word lists are being displayed. Unfortunately, this means you may not participate in the current round. Feel free to press the approve configuration button to move to the next round and please ensure to follow the rules this time.";

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
          <div>
              <UserErrorMessage message={errorMessage} />
              {/* test */}
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
                audioStartDelay={10}
              />
            </h3>
          </div>
  
        </TaskLayout>
      ) : step === 1 ? (
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
        {/* {showError && (
          <div style={{ color: 'red', padding: '10px' }}>
            Error: Unauthorized action during step 1
          </div>
        )} */}
          <div style={{position:"absolute", bottom:"5px", right:"330px"}}>
            <ViewInstructions inside={true} instruction={Instructions} props></ViewInstructions>
          </div>
          <div className="flex h-full w-full flex-col items-center justify-center">
            <ShowLists
              lists={task_constants.lists}
              timeBetweenLists={task_constants.timeBetweenLists}
              setStep={this.setStep}
            />
          </div>
        </TaskLayout>
    ) : step === 2 ? (
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
          <div className="flex h-full w-full flex-col items-center justify-center">
            <MathTask
              numberOfProblems={task_constants.numberOfProblems}
              setStep={this.setStep}
            />
          </div>
        </TaskLayout>
    ) : step == 3 ? (
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
        <RecallTask
          lists={task_constants.lists}
          stage={stage}
          player={player}
          game={game}
          condition={task_constants.condition}
          pointsAwarded={task_constants.pointsAwarded}
          pointsDeducted={task_constants.pointsDeducted}
        />
      </TaskLayout>
    ) : (
      <h1>Something went wrong...</h1>
    );
  }
}
