import React from "react";
import { Button } from "../../../client/common/components/Button";

const normalCountdown = {
    fontSize: '100px',
    textAlign: 'center',
    marginTop: '50px',
    transform: 'translateY(-50%)',
    color: '#000000',
    fontWeight: "bold",
};

const finalCountdown = {
  fontSize: '100px',
  textAlign: 'center',
  marginTop: '50px',
  transform: 'translateY(-50%)',
  color: '#ff0000',
  fontWeight: "bold",
};

export class StartTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: this.props.audioStartDelay,
    };
  }

  componentDidMount() {
    const { game, player } = this.props;

    this.interval = setInterval(() => {
      this.setState((prevState) => ({ timeLeft: prevState.timeLeft - 1 }));
    }, 1000);
    game.players.forEach((curPlayer) => curPlayer.set("stepApproved", false));
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  handleSubmit = () => {
    const { game, player, stage } = this.props;

    player.set("stepApproved", true);
    if (game.players.length === 1) {
      stage.set("step", 1);
    }
    if (
      game.players.reduce(
        (prev, curPlayer) =>
          prev && (curPlayer.get("stepApproved") || curPlayer.exitStatus || !curPlayer.online)
      )
    ) {
      stage.set("step", 1);
    }

  };

  render() {
    const { player, game, stage } = this.props;
    const { timeLeft, timerStyle } = this.state;

      if (timeLeft <= 0) {
        stage.set("step", 1);
      }
      
      return (
      <div>
        <h1 style={{
              fontSize: "30px",
              textAlign: 'center',
              marginTop: "25vh"}}>
              Round begins in:  
        <div style={timeLeft <= 5 ? finalCountdown : normalCountdown}>{this.formatTime(timeLeft)} </div>
        <div style = {{textAlign: 'center', marginTop: '-40px',}}>
          <Button 
            onClick={this.handleSubmit.bind(this)} disabled={player.get("stepApproved")}>Begin Round
          </Button>
        </div>
        </h1> 
      </div>
      );
    }

}