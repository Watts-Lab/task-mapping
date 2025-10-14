import React, { Component } from "react";
import SnakeGame from "./Snake";

const HEIGHT = 600;
const WIDTH = 400;

export default class SnakeUI extends Component {
  state = { score: 0, highScore: 0 };

  handleReplay = () => {
    this.setState({ gameEnd: false });

    const { player, saveScore } = this.props;
    if (saveScore) {
      player.stage.set("score", 0);
    } else {
      this.setState({ score: 0 });
    }
  };

  handleGameEnd = () => {
    this.setState({ gameEnd: true });
  };

  handleGameRestart = () => {};

  handleScoreChange = (score) => {
    const { player, saveScore } = this.props;

    if (!saveScore) {
      const { highScore } = this.state;
      if (score > highScore) {
        this.setState({ highScore: score });
      }

      this.setState({ score });

      return;
    }

    const stageHighScore = player.stage.get("highScore") || 0;
    if (score > stageHighScore) {
      player.stage.set("highScore", score);
    }

    const playerHighScore = player.get("highScore") || 0;
    if (score > playerHighScore) {
      player.set("highScore", score);
    }

    player.stage.set("score", score);
  };

  render() {
    const { game, player, saveScore } = this.props;
    let { gameEnd, score, highScore } = this.state;

    if (saveScore) {
      score = player.stage.get("score") || "0";
      highScore = player.stage.get("highScore") || "0";
    }

    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div style={{ width: HEIGHT }}>
          <div className="snake-font flex justify-between py-4">
            <div>Score: {String(score).padStart(3, "0")}</div>

            <div>High Score: {String(highScore).padStart(3, "0")}</div>
          </div>

          {player.stage.submitted ? (
            <GameFrame>
              {game.treatment.playerCount > 1 ? (
                <div className="text-lg text-gray-400">
                  Waiting for the other Players
                </div>
              ) : (
                <div></div>
              )}
            </GameFrame>
          ) : gameEnd ? (
            <GameFrame>
              <div className="text-2xl text-red-600">GAME OVER</div>
              <div className="pt-4 text-xl text-gray-500 hover:text-gray-700">
                <button onClick={this.handleReplay}>REPLAY?</button>
              </div>
            </GameFrame>
          ) : (
            <SnakeGame
              width={HEIGHT}
              height={WIDTH}
              blockWidth={20}
              blockHeight={20}
              onGameEnd={this.handleGameEnd}
              onScoreChange={this.handleScoreChange}
              onGameRestart={this.handleGameRestart}
            />
          )}
        </div>
      </div>
    );
  }
}

function GameFrame({ children }) {
  return (
    <div
      className="snake-font flex flex-col items-center justify-center ring-4 ring-gray-400"
      style={{ width: HEIGHT, height: WIDTH }}
    >
      {children}
    </div>
  );
}
