import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Centered } from "../common/components/Layouts";

export default class Sorry extends Component {
  static stepName = "Sorry";

  render() {
    const { player, game } = this.props;
    let msg;
    switch (player.exitStatus) {
      case "gameFull":
        msg = "All games you are eligible for have filled up too fast...";
        break;
      case "gameLobbyTimedOut":
        msg = "There were NOT enough players for the game to start...";
        break;
      case "playerEndedLobbyWait":
        msg =
          "You decided to stop waiting, we are sorry it was too long a wait.";
        break;
      case "playerEndedGame":
        msg = "You decided to end the game.";
        break;
      default:
        msg = "Unfortunately the Game was cancelled...";
        break;
    }
    if (player.exitReason === "failedQuestion") {
      msg =
        "Unfortunately you did not meet the conditions required to play the game.";
    }
    
    if (player.exitReason === "timedOut") {
      msg =
        "You have been idle for too long. Thank you for participating.";
    }

    if (player.exitReason === "offline") {
      msg =
        "You have been offline for too long. Thank you for participating.";
    }
    // Only for dev
    if (!game && Meteor.isDevelopment) {
      msg =
        "Unfortunately the Game was cancelled because of failed to init Game (only visible in development, check the logs).";
    }

    return (
      <Centered>
        <div className="prose mt-8">
          <h2>Sorry!</h2>
          <p>Sorry, you were not able to play! {msg}</p>
          <p>
            <strong>
              Please contact the researcher to see if there are more games
              available.
            </strong>
          </p>
        </div>
      </Centered>
    );
  }
}
