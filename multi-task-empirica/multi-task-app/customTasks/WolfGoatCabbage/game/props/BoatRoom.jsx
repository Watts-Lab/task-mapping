import React from "react";
import { logAction } from "../../../../client/common/helper/logger";
import BoatSvg from "../assets/BoatSvg";

export default class BoatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hovered: false };
    this.taskConstants = this.props.stage.get("constants");
  }

  handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    this.setState({ hovered: true });
  };

  handleDragLeave = (e) => {
    this.setState({ hovered: false });
  };

  handleDrop = (e) => {
    const { game, stage, player, character } = this.props;
    const student = e.dataTransfer.getData("text/plain");
    this.state.dropped = e.dataTransfer.getData("text");
    const currentRoom = stage.get(`${character}`);
    const config = stage.get("wgc-config");
    const boatSide = config.boatSide;

    e.preventDefault();
    stage.set(`${student}-dragger`, null);

    switch (student) {
      case "wolf":
        if (boatSide === (config.sides[0] === 0 ? "left" : "right")) {
          this.props.setCharacter(student, stage);
        }
        break;
      case "goat":
        if (boatSide === (config.sides[1] === 0 ? "left" : "right")) {
          this.props.setCharacter(student, stage);
        }
        break;
      case "cabbage":
        if (boatSide === (config.sides[2] === 0 ? "left" : "right")) {
          this.props.setCharacter(student, stage);
        }
        break;
      case "caterpillar":
        if (boatSide === (config.sides[3] === 0 ? "left" : "right")) {
          this.props.setCharacter(student, stage);
        }
        break;
      default:
        break;
    }

    this.setState({ hovered: false });

    if (currentRoom === character) {
      logAction(player, "releasedStudent", character);
      return;
    }

    stage.set(`${character}`, character);
    logAction(player, "movedStudent", student);
    game.players.forEach((curPlayer) => curPlayer.set("approved", false));
  };

  render() {
    const { isDeck } = this.props;
    const { hovered } = this.state;

    const classNameRoom = isDeck && "bp3-elevation-1";
    const classNameHovered = hovered && "bp3-elevation-3";
    return (
      <div
        onDrop={this.handleDrop}
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
        className={`bp3-card ${classNameRoom} ${classNameHovered}`}
        style={{
          paddingBottom: "1rem",
          minWidth: "9rem",
          minHeight: isDeck ? "7rem" : "8.5rem",
        }}
      >
        <div style={{ width: "100px", height: "100px" }}>
          <BoatSvg />
        </div>
      </div>
    );
  }
}
