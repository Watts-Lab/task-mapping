import React, {Component} from 'react';
import {TaskLayout} from '../../../client/common/TaskLayout';
import {getServerTime} from '../../../client/common/helper/logger';
import {Button} from '../../../client/common/components/Button';
import Instructions from '../intro/Instructions';
import ViewInstructions from '../../../client/common/components/ViewInstructions';

export default class WhacAMole extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.lastDotProcessed = -1;
    this.lastSet = 0;
    this.state = {
      time: Date.now(),
      mouseCoords: {x: -20, y: -20},
      score: 0,
      //  coords : {x : 10, y : 10}
    };
  }

  // handleMouseMove = (event) => {
  //   const { player, stage } = this.props
  //   const task_constants = stage.get('constants')
  //   const coords = this.getCoords(event)
  //   player.stage.set("coords", coords)
  //   this.setState({coords: coords})
  //   stage.get("dots").forEach(dot => {
  //     if (this.distanceBetweenPoints(coords.x, coords.y, dot.x, dot.y) < task_constants.touchDistance && this.isDotActive(dot)) {
  //       if (this.lastDotProcessed === dot.id) return
  //       this.lastDotProcessed = dot.id
  //       player.stage.set("dotsClaimed", [...player.stage.get("dotsClaimed"), dot])
  //       this.updateScores(dot)
  //     }
  //   })
  // }

  handleMouseMoveOnScreen = event => {
    const canvasRect = this.canvasRef.current.getBoundingClientRect();
    // this.setState({ mouseCoords: {x: event.clientX, y: event.clientY} })
    const x = this.clamp(event.clientX, canvasRect.left, canvasRect.left + canvasRect.width);
    const y = this.clamp(event.clientY, canvasRect.top, canvasRect.top + canvasRect.height);
    this.setState({mouseCoords: {x: x, y: y}});
    const coords = {x: x - canvasRect.left, y: y - canvasRect.top};

    const {player, stage} = this.props;
    const task_constants = this.props.stage.get('constants');

    if (Date.now() - this.lastSet > 100) {
      this.lastSet = Date.now();
      player.stage.set('coords', coords);
    }

    stage.get('dots').forEach(dot => {
      if (
        this.distanceBetweenPoints(coords.x, coords.y, dot.x, dot.y) <
          task_constants.touchDistance &&
        this.isDotActive(dot)
      ) {
        if (this.lastDotProcessed === dot.id) return;
        this.lastDotProcessed = dot.id;
        player.stage.set('dotsClaimed', [...player.stage.get('dotsClaimed'), dot]);
        this.updateScores(dot);
      }
    });
  };

  clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
  };

  componentDidMount() {
    const {game} = this.props;
    this.drawCanvas();
    const task_constants = this.props.stage.get('constants');
    this.intervalID = setInterval(() => {
      this.setState({time: Date.now()});
    }, task_constants.generationInterval);
    this.updateScoreID = setInterval(this.updatePlayerScore, 300);
    document.addEventListener('mousemove', this.handleMouseMoveOnScreen);
    game.players.forEach(curPlayer => curPlayer.set('approved', false));

    // this.canvasRef.current.addEventListener('mousemove', this.handleMouseMoveOnScreen)
  }

  componentDidUpdate(prevProps, prevState) {
    this.drawCanvas();
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
    clearInterval(this.updateScoreID);
    document.removeEventListener('mousemove', this.handleMouseMoveOnScreen);
    // this.canvasRef.current.removeEventListener('mousemove', this.handleMouseMoveOnScreen)
  }

  drawCanvas = () => {
    //redraws everything
    const {stage, player, game, round} = this.props;
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stage.get('dots').forEach(dot => {
      if (this.isDotActive(dot)) this.drawDotWithScore(ctx, dot);
    });

    game.players.forEach(otherPlayer => {
      const playerCoords = otherPlayer.stage.get('coords');
      let color;
      if (otherPlayer.id === player.id) return;
      else if (otherPlayer.round.get('team') === player.round.get('team'))
        color = otherPlayer.get('avatar').color;
      else color = 'Crimson';
      this.drawDot(ctx, playerCoords.x, playerCoords.y, 'black', color, stage, round);
    });
    // const playerCoords = this.state.coords
    // this.drawDot(ctx, playerCoords.x, playerCoords.y, 'black', 'white')
  };

  isDotActive = dot => {
    const {game, stage} = this.props;
    const ellapsedTime = getServerTime() - stage.startTimeAt;
    if (dot.startTime > ellapsedTime || dot.endTime < ellapsedTime) return false;
    return !game.players.some(player =>
      player.stage.get('dotsClaimed').some(oDot => oDot.id === dot.id)
    );
  };

  drawDotWithScore = (ctx, dot) => {
    this.drawDot(ctx, dot.x, dot.y, dot.color);
    let points = 0;
    if (this.getDotParameters(dot) !== undefined) {
      points = this.getDotParameters(dot).teamPointsEarned;
    }
    const radius = this.props.stage.get('constants').dotRadius;
    ctx.font = 'bold 13px Arial';
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.fillText((points < 0 ? '' : '+') + points, dot.x - 0.7 * radius, dot.y + 0.4 * radius);
    ctx.fill();
  };

  drawDot = (ctx, x, y, fill, border) => {
    const task_constants = this.props.stage.get('constants');
    ctx.beginPath();
    ctx.arc(x, y, task_constants.dotRadius, 0, 2 * Math.PI, false);
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = border ? border : fill;
    ctx.stroke();
  };

  // getCoords = (event) => {
  //   //gets the coodinates corresponding to an event
  //   const canvas = this.canvasRef.current
  //   const rect = canvas.getBoundingClientRect()
  //   const x = event.clientX - rect.left
  //   const y = event.clientY - rect.top
  //   return {x, y}
  // }

  updatePlayerScore = () => {
    const {player} = this.props;
    let array = player.stage.get('scoreArr');
    const newScore = array[array.length - 1];

    if (newScore === undefined || newScore === null) {
      this.setState({ score: 0 })
      player.stage.set("score", 0);
    } else {
      this.setState({ score: newScore })
      player.stage.set("score", newScore)
    }

    player.stage.set('scoreFeedback', newScore);
  };

  updateScores = dot => {
    const dotParameters = this.getDotParameters(dot);
    this.updateTeamPoints(dotParameters.teamPointsEarned);
    this.updateOpponentPoints(dotParameters.opponentPointsEarned);
  };

  getDotParameters = dot => {
    const {dots} = this.props.stage.get('constants');
    return dots.find(d => d.name === dot.name);
  };

  updateTeamPoints = pointsEarned => {
    const {game, player} = this.props;
    const team = player.round.get('team');
    game.players.forEach(otherPlayer => {
      if (otherPlayer.round.get('team') === team) {
        let array = otherPlayer.stage.get('scoreArr');
        array.push(array[array.length - 1] + pointsEarned);
        otherPlayer.stage.set('scoreArr', array);
      }
    });
  };

  updateOpponentPoints = pointsEarned => {
    const {game, player} = this.props;
    const team = player.round.get('team');
    game.players.forEach(otherPlayer => {
      if (otherPlayer.round.get('team') !== team) {
        let array = otherPlayer.stage.get('scoreArr');
        array.push(array[array.length - 1] + pointsEarned);
        otherPlayer.stage.set('scoreArr', array);
      }
    });
  };

  approve() {
    const { stage, game, player } = this.props;

    player.set("approved", true);

    if (
      game.players.reduce(
        (prev, curPlayer) =>
          prev && (curPlayer.get("approved") || curPlayer.exitStatus)
      )
    ) {
      // stage.set("submitted", true)
      game.players.forEach((curPlayer) => curPlayer.stage.submit());
    }
  }

  distanceBetweenPoints = (x1, y1, x2, y2) => {
    let dx = x2 - x1;
    let dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  };

  render() {
    const {round, stage, player, game} = this.props;
    const task_constants = stage.get('constants');
    const {mouseCoords} = this.state;
    return (
      <TaskLayout
        {...this.props}
        nextForm={() => 
          <div className="flex h-full items-center justify-center space-x-1">
            <Button
              type="submit"
              onClick={this.approve.bind(this)}
              disabled={player.get("approved")}
            >
              Approve Configuration
            </Button>
          </div>
        }
      >
        <div style={{position: 'absolute', bottom: '5px', right: '330px'}}>
          <ViewInstructions inside={true} instruction={Instructions} props></ViewInstructions>
        </div>
        <div className='flex items-center justify-center' style={{marginTop: "20px"}}>
          <div
            className='rounded-full border border-white bg-black'
            style={{
              width: '21px',
              height: '21px',
              position: 'fixed',
              top: mouseCoords.y,
              left: mouseCoords.x,
              transform: 'translate(-50%, -50%)',
            }}
          />
          <canvas
            id='canvas'
            style={{backgroundColor: 'black'}}
            width={task_constants.dimensions.width}
            height={task_constants.dimensions.height}
            ref={this.canvasRef}
            // onMouseMove = {this.handleMouseMove}
          />
        </div>
      </TaskLayout>
    );
  }
}