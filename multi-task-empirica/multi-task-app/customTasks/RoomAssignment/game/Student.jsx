import React from "react";
import { logAction } from "../../../client/common/helper/logger";

export default class Student extends React.Component {
  handleDragStart = (e) => {
    const { student, stage, player } = this.props;
    const dragger = stage.get(`student-${student}-dragger`); // Check if there is already a dragger

    // If so, you can't move it, already someone is moving it!
    if (dragger) {
      // Can't drag
      e.preventDefault();
      console.debug("dragger");

      return;
    }

    stage.set(`student-${student}-dragger`, player._id);
    logAction(player, "draggingStudent", student);
    e.dataTransfer.setData("text/plain", student);
  };

  handleDragOver = (e) => {
    e.preventDefault();
  };

  handleDragEnd = (e) => {
    e.preventDefault();
    const { student, stage, player } = this.props;
    stage.set(`student-${student}-dragger`, null);

    //if dropped into non-allowed area
    if (e.dataTransfer.dropEffect === "none") {
      logAction(player, "releasedStudent", student);
    }
  };

  render() {
    const { student, stage, game, player } = this.props;
    this.isDragabble = true; // usually everyone can drag, except if it is colored (i.e., being dragged by someone else)
    const dragger = stage.get(`student-${student}-dragger`);
    const style = {};
    const cursorStyle = { cursor: null };
    if (dragger) {
      const playerDragging = game.players.find((p) => p._id === dragger);
      if (playerDragging) {
        style.fill = playerDragging.get("avatar").color;
        this.isDragabble = playerDragging === player._id; //only one can drag at a time
      }
    } else {
      //if the student is NOT being dragged by anyone, then the cursor will be changed
      cursorStyle.cursor = "move";
    }

    return (
      <div
        draggable={this.isDragabble}
        onDragStart={this.handleDragStart}
        onDragOver={this.handleDragOver}
        onDragEnd={this.handleDragEnd}
        style={{ ...cursorStyle, margin: "0.25rem 0.5rem" }}
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 192 512"
            style={{
              height: "3rem",
            }}
          >
            <path
              style={style}
              d="M96 0c35.346 0 64 28.654 64 64s-28.654 64-64 64-64-28.654-64-64S60.654 0 96 0m48 144h-11.36c-22.711 10.443-49.59 10.894-73.28 0H48c-26.51 0-48 21.49-48 48v136c0 13.255 10.745 24 24 24h16v136c0 13.255 10.745 24 24 24h64c13.255 0 24-10.745 24-24V352h16c13.255 0 24-10.745 24-24V192c0-26.51-21.49-48-48-48z"
            />
          </svg>
        </span>
        <div style={{ marginTop: "0.3rem", textAlign: "center" }}>
          {student}
        </div>
      </div>
    );
  }
}