import React from "react";
import Arrow from "./Arrow";

import { logAction } from '/client/common/helper/logger';

const DOT_RADIUS = 5;

const BOARD_SIZE = 400;
const BORDER_WIDTH = 2;
const COLLISION_BORDER_WIDTH = 10;

const DPS = 8; // dots per second
const FPS = 60; // frames per second

const seedrandom = require("seedrandom");

const Dot = props => {
  const { data, time } = props;
  const {
    start: { x: startX, y: startY },
    velocity: { x: velX, y: velY },
    startTime,
    endTime,
  } = data;
  const color = `hsl(225, 100%, 50%)`;
  const age = time - startTime;
  const x = startX + velX * age;
  const y = startY + velY * age;

  const style = {
    position: "absolute",
    left: BOARD_SIZE / 2 + x - DOT_RADIUS,
    top: BOARD_SIZE / 2 + y - DOT_RADIUS,
    backgroundColor: color,
    borderRadius: DOT_RADIUS,
    width: 2 * DOT_RADIUS,
    height: 2 * DOT_RADIUS,
    // opacity: 1 - 0.9 * (age / (1 + endTime - startTime))
  };
  return <div style={style} />;
};

const polarVector = (scale, angle) => {
  return {
    x: scale * Math.cos(angle),
    y: scale * Math.sin(angle)
  };
};

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function toDegrees(radians) {
  return radians * (180 / Math.PI);
}

export class Board extends React.Component {
  constructor(props) {
    super(props);
    this.parentRef = React.createRef();
    this.state = {
        dots: [],
        time: 0,
        isDragging: false, 
        playerAngle: null, 
    };

    const { stage } = this.props;
    const seed = stage.get('seed');
    this.math = require('random-seed').create(seed);
    this.math.initState();

  }
  
  randomAngle() {
    return (this.math.random() *  Math.PI * 2);
  }

  componentDidMount() {
    this.startGame();
  }

  componentWillUnmount() {
    this.stopGame();
  }

  generateAngle() {
    const { stage } = this.props;

    if (this.math.random()  <  stage.get('corrDotPercent')) {
      return (-stage.get('corrAngle') * (Math.PI / 180));
    } else {
      return this.math.random() ;
    }
  }

  addDot(dots) {
  const { time } = this.state;
  const { stage } = this.props;

  const velAngle = this.generateAngle();
  const posAngle = Math.PI + velAngle + (this.randomAngle() - Math.PI) / 2;
  const speed = stage.get('speed') / FPS;
  const distance = BOARD_SIZE / 2 - DOT_RADIUS;
  const dot = {
    start: polarVector(BOARD_SIZE / 2, posAngle),
    velocity: polarVector(speed, velAngle),
    id: Math.random(), // todo uuidv4
  };
   
  dot.startTime = time;
  dot.endTime = Math.floor(
    time + 2 * distance * Math.cos(velAngle - posAngle + Math.PI) / speed
  );

  const newDots = [...dots, dot];
  return newDots;
  }

  addDots(dots, count) {
    let newDots = dots;
    for (let i = 0; i < count; i += 1) {
      newDots = this.addDot(newDots);
    }
    return newDots;
  }

  // "reducer" for disposeDots
  disposeDots(dots) {
    const { time } = this.state;
    const newDots = dots.filter(({ endTime }) => endTime >= time);
    return newDots;
  }

  startGame() {
    this.setState({
      dots: this.addDots([], 2)
    });
    this.running = setInterval(() => {
      this.step();
    }, 1000 / FPS);
  }

  stopGame() {
    clearInterval(this.running);
    this.running = undefined;
  }

  renderDots() {
    const { dots, time } = this.state;
    return (
      <div className="dots">
        {dots.map(dot => <Dot key={dot.id} time={time} data={dot} />)}
      </div>
    );
  }

  handleClick = (i, e) => {
    const { stage, player } = this.props;

    function toDegrees(radians) {
      return radians * (180 / Math.PI);
    }

    const parentRect = this.parentRef.current.getBoundingClientRect();
    const x = e.clientX - parentRect.left;
    const y = e.clientY - parentRect.top;  

    const dx = x - (BOARD_SIZE / 2);
    const dy = y - (BOARD_SIZE / 2);

    let guess = Math.atan2(dy, dx);

    guess = -toDegrees(guess);
    if (guess < 0) {
      guess += 360; 
    }

    logAction(player, "clickedArrow", i, guess);

    let answerFull = stage.get('angleAns');
    answerFull[i] = guess;
    stage.set('angleAns', answerFull);
  };

  handleDrag = (i, offsetX, offsetY) => {
    const { stage, player, game } = this.props;

    function toDegrees(radians) {
      return radians * (180 / Math.PI);
    }
  
    const dx = offsetX - (BOARD_SIZE / 2);
    const dy = offsetY - (BOARD_SIZE / 2);
  
    let guess = Math.atan2(dy, dx);

    this.setState({playerAngle: guess});

    guess = -toDegrees(guess);
    if (guess < 0) {
      guess += 360; 
    }
  
  };

  renderAverageGuess() {
    const { player, stage, guess, game } = this.props;

    const answerFull = stage.get('angleAns');
    const validAnswers = answerFull.filter((value) => !isNaN(parseFloat(value)));

    let averageAngle = 0;

    if (validAnswers.length > 0) {
      averageAngle = calculateAverageAngle(validAnswers);
      (stage.get('average') !== averageAngle) && stage.set('average', averageAngle);
    }

    function calculateAverageAngle(angles) {
      let sumX = 0;
      let sumY = 0;
    
      for (const angle of angles) {
        const radianAngle = toRadians(angle);
        sumX += Math.cos(radianAngle);
        sumY += Math.sin(radianAngle);
      }
    
      const averageX = sumX / angles.length;
      const averageY = sumY / angles.length;
      const averageRadian = Math.atan2(averageY, averageX);
      let averageAngle = toDegrees(averageRadian);
    
      if (averageAngle < 0) {
        averageAngle += 360; // Adjust for negative angles
      }
    
      return averageAngle;
    }

    const answer = toRadians(averageAngle); 

    if (Number.isNaN(answer) || answer == ''|| game.players.length == 1 ) {
      return;
    }

    return (
      <Arrow
        id={`guess`}
        angle={-answer}
        size={4} 
        boardSize={BOARD_SIZE}
        player={player}
        stage={stage}
        game={game}
        average={true}
      />
    );
  }

  step() {
    if (!this.running) return;
    const { time, dots } = this.state;
    const newTime = time + 1;
    let newDots = this.disposeDots(dots);
    if (this.math.random()  < DPS / FPS) {
      newDots = this.addDot(newDots);
    }
    this.setState({
      time: newTime,
      dots: newDots
    });
  }

  render() {
    const { stage, player, game } = this.props;
    const angleAnswer = stage.get('angleAns');
    const avg = stage.get('average');
    const idList = stage.get('idList'); 
    const id = idList.indexOf(player._id);
    let offsetX, offsetY;

    const style = {
      position: "absolute",
      top: "50%", 
      left: "30vw", 
      transform: "translate(-50%, -50%)",
      width: BOARD_SIZE + 2 * BORDER_WIDTH,
      height: BOARD_SIZE + 2 * BORDER_WIDTH,
      borderRadius: BOARD_SIZE / 2,
      boxSizing: "border-box",
      border: `${BORDER_WIDTH}px solid rgba(12, 164, 236, 1)`
    };

    return (
        <div 
          className="board"
          ref={this.parentRef}
          style={style}
          onClick={(e) => {
            if (!stage.get('approved')) {
              this.handleClick(id, e);
            }
          }}          
          onMouseDown={(e) => {
            if (!stage.get('approved')) {
              const onMouseMove = (event) => {
                this.setState({isDragging: true});
                const parentRect = this.parentRef.current.getBoundingClientRect();
                offsetX = event.clientX - parentRect.left;
                offsetY = event.clientY - parentRect.top;
                this.setState({isDragging: true });
                this.handleDrag(id, offsetX, offsetY); 
              };
              document.addEventListener('mousemove', onMouseMove);
              document.addEventListener('mouseup', () => {
                document.removeEventListener('mousemove', onMouseMove);
                this.setState({ isDragging: false });
                });
          }}}
        >
          {this.renderDots()}
          {(angleAnswer).map((singleAnswer, i) => {
        const isPlayerArrow = (idList[i] == player._id);
        const anglePlayer = this.state.isDragging ? this.state.playerAngle : -(toRadians(stage.get('angleAns')[i]));
        const arrowProps = isPlayerArrow ? {
          readOnly: false,
          angle: anglePlayer,
        } : {
          readOnly: true,
          angle: -(toRadians(stage.get('angleAns')[i])),
        };
        return (
          <div key={i}>
             <Arrow
              id={idList[i]}
              size={4} 
              boardSize={BOARD_SIZE}
              player={player}
              stage={stage}
              game={game}
              {...arrowProps}/>
          </div>
        );
      })}    
       {this.renderAverageGuess()}
        </div>
    );
  }
}