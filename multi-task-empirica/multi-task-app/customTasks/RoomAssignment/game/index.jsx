import React, { Component } from "react";
import ReactModal from "react-modal";
import Room from "./Room";
import { Button } from "../../../client/common/components/Button";
import { calculateScore } from "../helper";
import { TaskLayout } from "../../../client/common/TaskLayout";
import Instructions from "../intro/Instructions";
import ViewInstructions from "../../../client/common/components/ViewInstructions";

export default class RoomAssignment extends Component {
  constructor(props) {
    super(props);
    this.taskConstants = props.stage.get("constants");
  }

  componentDidMount() {
    const { game } = this.props;
    game.players.forEach((curPlayer) => 
      curPlayer.set("approved", false));
  }

  componentDidUpdate(prevProps) {
    const { stage, player } = this.props;
    const score = calculateScore(
      stage,
      this.taskConstants.students,
      this.taskConstants.payoff,
      this.taskConstants.constraints,
    );
    const scoreArr = player.stage.get("scoreArr");
    // removes reduncancy to prevent glitching
    if (scoreArr[scoreArr.length - 1] != score) {
      scoreArr.push(score);
      player.stage.set("scoreArr", scoreArr);
      let currScore = Math.round((100 * score) / stage.get("maxPossibleScore"))
      if (currScore < 0) {
        currScore = 0
      }
      player.stage.set("score", currScore)
    }
  }

  renderPayoff() {
    const { stage } = this.props;

    return (
      <div style={{ whiteSpace: "nowrap", margin: "1rem", overflowX: "auto" }}>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "24px",
            marginBottom: "0.5rem",
          }}
        >
          Payoff
        </div>
        <table>
          <thead style={{ borderBottom: "1px solid grey" }}>
            <tr>
              <th>Rooms</th>
              {this.taskConstants.rooms.map((room) => (
                <th key={room}>{room}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.taskConstants.students.map((student) => (
              <tr
                key={student}
                style={{
                  textAlign: "center",
                }}
              >
                <th style={{ paddingRight: "0.5rem" }}>Student {student}</th>
                {this.taskConstants.rooms.map((room) => (
                  <td
                    className={
                      stage.get(`student-${student}-room`) === room && "active"
                    }
                    key={room}
                    style={{
                      minWidth: "2.5rem",
                      ...(stage.get(`student-${student}-room`) === room && {
                        background: "lightgrey",
                      }),
                    }}
                  >
                    {this.taskConstants.payoff[student][room]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  renderConstraint(constraint) {
    const { stage } = this.props;
    let constraintText = "Invalid constraint";
    const { type, pair } = constraint;
    const constraintId = `${type}-${pair[0]}-${pair[1]}`;
    const violated = stage.get(`constraint-${constraintId}-violated`);
    if (type === 0) {
      constraintText = `${pair[0]} and ${pair[1]} must be in the same room`;
    } else if (type === 1) {
      constraintText = `${pair[0]} and ${pair[1]} can not be in the same room`;
    } else if (type === 2) {
      constraintText = `${pair[0]} and ${pair[1]} must be neighbors`;
    } else if (type === 3) {
      constraintText = `${pair[0]} and ${pair[1]} can not be in the same room or be neighbors`;
    }
    return (
      <li
        key={constraintId}
        style={{
          color: violated ? "red" : "black",
        }}
      >
        {constraintText}
      </li>
    );
  }

  renderConstraints() {
    return (
      this.taskConstants.constraints && (
        <div style={{ margin: "1rem", minWidth: "20rem" }}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "24px",
              marginBottom: "0.5rem",
            }}
          >
            Constraints
          </div>
          <ul style={{ listStyleType: "disc", listStylePosition: "inside" }}>
            {this.taskConstants.constraints.map((constraint) =>
              this.renderConstraint(constraint)
            )}
          </ul>
        </div>
      )
    );
  }

  renderBoard() {
    const { player, stage, game } = this.props;

    return (
      <div style={{ margin: "1rem 0.5rem 0rem 0.5rem" }}>
        <div style={{ display: "flex" }}>
          <div style={{ flexGrow: "1" }}>
            <Room room={-1} stage={stage} game={game} player={player} isDeck />
          </div>
          <div
            className={"bp3-card bp3-elevation-1"}
            style={{ margin: "0.5rem", minHeight: "5.5rem" }}
          >
            <h6 className="bp3-heading">Current Solution Quality</h6>
            <div>
              {calculateScore(
                stage,
                this.taskConstants.students,
                this.taskConstants.payoff,
                this.taskConstants.constraints
              )}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {this.taskConstants.rooms.map((room) => (
            <Room
              key={room}
              room={room}
              stage={stage}
              game={game}
              player={player}
            />
          ))}
        </div>
      </div>
    );
  }

  approve() {
    const { game, player } = this.props;
    player.set("approved", true);
    if (
      game.players.reduce(
        (prev, curPlayer) =>
          prev &&
          (curPlayer.get("approved") ||
            curPlayer.exitStatus ||
            !curPlayer.online)
      )
    ) {
      game.players.forEach((curPlayer) => curPlayer.stage.submit());
    }
  }

  render() {
    const { player } = this.props;

    return (
      <TaskLayout
        {...this.props}
        nextForm={() => (
          <div className="flex h-full items-center justify-center space-x-1">
            <Button
              type="submit"
              onClick={this.approve.bind(this)}
              disabled={player.get("approved")}
            >
              Approve Configuration
            </Button>
          </div>
        )}
      >
        <div style={{position:"absolute", bottom:"5px", right:"330px"}}>
          <ViewInstructions inside={true} instruction={Instructions} props></ViewInstructions>
        </div>
        {this.renderBoard()}
        <div style={{ display: "flex" }}>
          {this.renderPayoff()}
          {this.renderConstraints()}
        </div>
      </TaskLayout>
    );
  }
}
