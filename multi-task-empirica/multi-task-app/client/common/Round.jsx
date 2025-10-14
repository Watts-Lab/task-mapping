import React from "react";
import Task from "../game/Task.jsx";
import Header from "./Header";
import Sidebar from "./Sidebar.jsx";

const enableSound = false;
const roundSound = new Audio("sounds/round-sound.mp3");
const gameSound = new Audio("sounds/bell.mp3");
let timerID = ""

export default class Round extends React.Component {
  componentDidMount() {
    const { game, player } = this.props;

    if (game.get("justStarted")) {
      game.set("justStarted", false);

      // Play the bell sound only once when the game starts
      enableSound && gameSound.play();
    } else {
      // Play the piano sound on each reload
      enableSound && roundSound.play();
    }

    timerID = setInterval(() => {
      player.set("lastTick", new Date(Tracker.nonreactive(TimeSync.serverTime)).valueOf())
      //console.log("tick: " + player.get("lastTick"))
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(timerID)
  }

  render() {
    const { stage } = this.props;

    const hasSidebar = stage.get("stage_type") === "game";

    return (
      <div className="round">
        <Header {...this.props} />

        <div
          className={`h-full overflow-hidden ${
            hasSidebar ? "two-col-layout" : ""
          }`}
        >
          <Task {...this.props} />
          {hasSidebar ? <Sidebar {...this.props} /> : ""}
        </div>
      </div>
    );
  }
}
