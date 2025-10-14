import React from "react";

class SnakeGame extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.gameBoardEl = React.createRef();

    this.state = {
      gameLoopTimeout: 50,
      startSnakeSize: 0,
      snake: [],
      apple: {},
      direction: "right",
      directionChanged: false,
      isGameOver: false,
      score: 0,
    };
  }

  componentDidMount() {
    this.initGame();
    this.gameLoop();
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
    clearTimeout(this.timeoutId);
  }

  initGame() {
    const { width, height, blockWidth, blockHeight } = this.props;

    // Snake initialization
    let startSnakeSize = this.props.startSnakeSize || 6;
    let snake = [];
    let Xpos = width / 2;
    let Ypos = height / 2;
    let snakeHead = { Xpos: width / 2, Ypos: height / 2 };
    snake.push(snakeHead);
    for (let i = 1; i < startSnakeSize; i++) {
      Xpos -= blockWidth;
      let snakePart = { Xpos: Xpos, Ypos: Ypos };
      snake.push(snakePart);
    }

    // Apple position initialization
    let appleXpos =
      Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
      blockWidth;
    let appleYpos =
      Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
      blockHeight;
    while (appleYpos === snake[0].Ypos) {
      appleYpos =
        Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
        blockHeight;
    }

    this.setState({
      startSnakeSize,
      snake,
      apple: { Xpos: appleXpos, Ypos: appleYpos },
    });
  }

  gameLoop() {
    this.timeoutId = setTimeout(() => {
      if (!this.state.isGameOver) {
        this.moveSnake();
        this.tryToEatSnake();
        this.tryToEatApple();
        this.setState({ directionChanged: false });
      }

      this.gameLoop();
    }, this.state.gameLoopTimeout);
  }

  resetGame() {
    const { width, height, blockWidth, blockHeight } = this.props;

    let apple = this.state.apple;

    // snake reset
    let snake = [];
    let Xpos = width / 2;
    let Ypos = height / 2;
    let snakeHead = { Xpos: width / 2, Ypos: height / 2 };
    snake.push(snakeHead);
    for (let i = 1; i < this.state.startSnakeSize; i++) {
      Xpos -= blockWidth;
      let snakePart = { Xpos: Xpos, Ypos: Ypos };
      snake.push(snakePart);
    }

    // apple position reset
    apple.Xpos =
      Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
      blockWidth;
    apple.Ypos =
      Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
      blockHeight;
    while (this.isAppleOnSnake(apple.Xpos, apple.Ypos)) {
      apple.Xpos =
        Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
        blockWidth;
      apple.Ypos =
        Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
        blockHeight;
    }

    this.setState({
      snake,
      apple,
      direction: "right",
      directionChanged: false,
      isGameOver: false,
      gameLoopTimeout: 100,
      score: 0,
    });

    if (this.props.onScoreChange) {
      this.props.onScoreChange(0);
    }
    if (this.props.onGameRestart) {
      this.props.onGameRestart();
    }
  }

  getRandomColor() {
    let hexa = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) color += hexa[Math.floor(Math.random() * 16)];
    return color;
  }

  moveSnake() {
    let snake = this.state.snake;
    let previousPartX = this.state.snake[0].Xpos;
    let previousPartY = this.state.snake[0].Ypos;
    let tmpPartX = previousPartX;
    let tmpPartY = previousPartY;
    this.moveHead();

    for (let i = 1; i < snake.length; i++) {
      tmpPartX = snake[i].Xpos;
      tmpPartY = snake[i].Ypos;
      snake[i].Xpos = previousPartX;
      snake[i].Ypos = previousPartY;
      previousPartX = tmpPartX;
      previousPartY = tmpPartY;
    }

    this.setState({ snake });
  }

  tryToEatApple() {
    let snake = this.state.snake;
    let apple = this.state.apple;

    // if the snake's head is on an apple
    if (snake[0].Xpos === apple.Xpos && snake[0].Ypos === apple.Ypos) {
      const { width, height, blockWidth, blockHeight } = this.props;
      let newTail = { Xpos: apple.Xpos, Ypos: apple.Ypos };
      let gameLoopTimeout = this.state.gameLoopTimeout;

      // increase snake size
      snake.push(newTail);

      // create another apple
      apple.Xpos =
        Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
        blockWidth;
      apple.Ypos =
        Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
        blockHeight;
      while (this.isAppleOnSnake(apple.Xpos, apple.Ypos)) {
        apple.Xpos =
          Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
          blockWidth;
        apple.Ypos =
          Math.floor(
            Math.random() * ((height - blockHeight) / blockHeight + 1)
          ) * blockHeight;
      }

      // decrease the game loop timeout
      if (gameLoopTimeout > 25) {
        gameLoopTimeout -= 0.5;
      }

      const score = this.state.score + 1;

      this.setState({
        snake,
        apple,
        score,
        gameLoopTimeout,
      });

      if (this.props.onScoreChange) {
        this.props.onScoreChange(score);
      }
    }
  }

  tryToEatSnake() {
    let snake = this.state.snake;

    for (let i = 1; i < snake.length; i++) {
      if (snake[0].Xpos === snake[i].Xpos && snake[0].Ypos === snake[i].Ypos) {
        this.setState({ isGameOver: true });
        if (this.props.onGameEnd) {
          this.props.onGameEnd();
        }
      }
    }
  }

  isAppleOnSnake(appleXpos, appleYpos) {
    let snake = this.state.snake;
    for (let i = 0; i < snake.length; i++) {
      if (appleXpos === snake[i].Xpos && appleYpos === snake[i].Ypos)
        return true;
    }
    return false;
  }

  moveHead() {
    switch (this.state.direction) {
      case "left":
        this.moveHeadLeft();
        break;
      case "up":
        this.moveHeadUp();
        break;
      case "right":
        this.moveHeadRight();
        break;
      default:
        this.moveHeadDown();
    }
  }

  moveHeadLeft() {
    const { width, blockWidth } = this.props;

    let snake = this.state.snake;
    snake[0].Xpos =
      snake[0].Xpos <= 0 ? width - blockWidth : snake[0].Xpos - blockWidth;
    this.setState({ snake });
  }

  moveHeadUp() {
    const { height, blockHeight } = this.props;

    let snake = this.state.snake;
    snake[0].Ypos =
      snake[0].Ypos <= 0 ? height - blockHeight : snake[0].Ypos - blockHeight;
    this.setState({ snake });
  }

  moveHeadRight() {
    const { width, blockWidth } = this.props;

    let snake = this.state.snake;
    snake[0].Xpos =
      snake[0].Xpos >= width - blockWidth ? 0 : snake[0].Xpos + blockWidth;
    this.setState({ snake });
  }

  moveHeadDown() {
    const { height, blockHeight } = this.props;

    let snake = this.state.snake;
    snake[0].Ypos =
      snake[0].Ypos >= height - blockHeight ? 0 : snake[0].Ypos + blockHeight;
    this.setState({ snake });
  }

  handleKeyDown(event) {
    // if spacebar is pressed to run a new game
    if (this.state.isGameOver && event.keyCode === 32) {
      this.resetGame();
      return;
    }

    if (this.state.directionChanged) return;

    switch (event.keyCode) {
      case 37:
      case 65:
        this.goLeft();
        break;
      case 38:
      case 87:
        this.goUp();
        break;
      case 39:
      case 68:
        this.goRight();
        break;
      case 40:
      case 83:
        this.goDown();
        break;
      default:
    }

    this.setState({ directionChanged: true });
  }

  goLeft() {
    let newDirection = this.state.direction === "right" ? "right" : "left";
    this.setState({ direction: newDirection });
  }

  goUp() {
    let newDirection = this.state.direction === "down" ? "down" : "up";
    this.setState({ direction: newDirection });
  }

  goRight() {
    let newDirection = this.state.direction === "left" ? "left" : "right";
    this.setState({ direction: newDirection });
  }

  goDown() {
    let newDirection = this.state.direction === "up" ? "up" : "down";
    this.setState({ direction: newDirection });
  }

  render() {
    const { width, height, blockWidth, blockHeight } = this.props;

    // Game over
    if (this.state.isGameOver) {
      return <div>Game Over</div>;
    }

    return (
      <div
        ref={this.gameBoardEl}
        className="relative ring-4 ring-gray-400"
        style={{ width, height }}
      >
        {this.state.snake.map((snakePart, index) => {
          return (
            <div
              key={index}
              className="absolute bg-gray-700"
              style={{
                width: blockWidth,
                height: blockHeight,
                left: snakePart.Xpos,
                top: snakePart.Ypos,
              }}
            />
          );
        })}

        <div
          className="absolute bg-green-500"
          style={{
            width: blockWidth,
            height: blockHeight,
            left: this.state.apple.Xpos,
            top: this.state.apple.Ypos,
          }}
        />
      </div>
    );
  }
}

export default SnakeGame;
