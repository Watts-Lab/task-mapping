import React, { Component } from "react";

export default class Instructions extends Component {
  render() {
    const { game, player } = this.props
    return (
      <>
        <div className="prose">
          <h2>Instructions</h2>
          <p>The objective is to get the highest score possible.</p>
          <p>
            Control the snake with your keyboard arrows: [↑] [↓] [→] [←]. Try to
            pick up food. Avoid hitting the snakes body.
          </p>
          <p>
            If you hit the snakes body, it is Game Over. You may attempt another
            game by pressing [Replay?].
          </p>
          <p>When you think you cannot improve your score, press Submit.</p>
          <p>On the next page, you will have a chance to try out the experiment.</p>
          <p>Good luck!</p>
        </div>
      </>
    )
  }
}

