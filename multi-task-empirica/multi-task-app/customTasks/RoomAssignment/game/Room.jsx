import React from "react";
import Student from "./Student.jsx";
import { checkConstraint } from "../helper";
import { logAction } from "../../../client/common/helper/logger";

export default class Room extends React.Component {
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
    e.preventDefault();
    const { game, stage, player, room } = this.props;
    const student = e.dataTransfer.getData("text/plain");
    stage.set(`student-${student}-dragger`, null); //maybe this fixes the problem of stucked colors
    const currentRoom = stage.get(`student-${student}-room`);

    this.setState({ hovered: false });

    // Avoid any unwanted drops!
    // We're using the native DnD system, which mean people can drag anything
    // onto these drop zones (e.g. files from their desktop) so we check this
    // is an existing student first.
    if (currentRoom === room) {
      //if they kept the student where it is, log that they stayed in the same place And don't change the answer
      logAction(player, "releasedStudent", student);
      return;
    }

    stage.set(`student-${student}-room`, room);

    logAction(player, "movedStudent", student, room);

    this.taskConstants.constraints.forEach(
      (constraint) =>
        (constraint.pair[0] === student || constraint.pair[1] === student) &&
        checkConstraint(stage, constraint)
    );

    game.players.forEach((curPlayer) => curPlayer.set("approved", false));
  };

  render() {
    const { room, isDeck, stage, ...rest } = this.props;
    const { hovered } = this.state;
    const students = [];
    this.taskConstants.students.forEach((student) => {
      if (stage.get(`student-${student}-room`) === room) {
        students.push(student);
      }
    });

    const classNameRoom = isDeck && "bp3-elevation-1";
    const classNameHovered = hovered && "bp3-elevation-3";
    return (
      <div
        onDrop={this.handleDrop}
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
        className={`bp3-card ${classNameRoom} ${classNameHovered}`}
        style={{
          margin: "0.5rem",
          paddingBottom: "0.5rem",
          minWidth: "9rem",
          minHeight: isDeck ? "7rem" : "8.5rem",
        }}
      >
        {isDeck ? null : <h6 className="bp3-heading">Room {room}</h6>}
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {students.map((student) => (
            <Student
              onDragStart={this.handleDragStart}
              key={student}
              student={student}
              room={room}
              stage={stage}
              {...rest}
            />
          ))}
        </div>
      </div>
    );
  }
}