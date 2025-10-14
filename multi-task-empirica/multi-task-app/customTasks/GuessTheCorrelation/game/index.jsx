import React from "react";
import { TaskLayout } from "../../../client/common/TaskLayout";
import { Button } from "../../../client/common/components/Button";
import Slider from "meteor/empirica:slider";
import ReactModal from "react-modal";
import Instructions from "../intro/Instructions";
import ViewInstructions from "../../../client/common/components/ViewInstructions";

export default class GuessTheCorrelation extends React.Component {
  constructor(props) {
    super(props);
    this.taskConstants = props.stage.get("constants");
    this.state = {
      value: undefined,
      showModal: false,
    };
  }

  componentDidMount() {
    const { game, stage, player } = this.props;
    game.players.forEach((curPlayer) => curPlayer.set("approved", false));
    game.players.forEach((curPlayer) => curPlayer.set("submitted", false));
  }

  submit = () => {
    const { stage, game, player } = this.props;

    player.set("submitted", true);

    if (
      game.players.reduce(
        (prev, currPlayer) =>
          (prev && currPlayer.get("submitted")) || currPlayer.exitStatus
      )
    ) {
      stage.set("submitted", true);

      if (!this.taskConstants.practice) {
        const dbValue = stage.get("value");

        let normed = 0;
        if (dbValue === null) {
          normed = 1;
        } else {
          normed = Math.abs(dbValue - stage.get("constants").correlation)
        }
        if (normed < 0.025) {
          stage.set("score", 100);
          game.players.forEach(
            (currPlayer) => {
              currPlayer.stage.set("score", 100)
            }
          )
        } else {
          stage.set("score", Math.round(100 - Number(normed) * 100));
          game.players.forEach(
            (currPlayer) => {
              currPlayer.stage.set("score", Math.round(100 - Number(normed) * 100))
            }
          )
        }
      }
    }
  };

  approve() {
    const { stage, game, player } = this.props;

    player.set("approved", true);
    stage.set("guessed", stage.get("value"));

    if (
      game.players.reduce(
        (prev, curPlayer) =>
          prev && (curPlayer.get("approved") || curPlayer.exitStatus)
      )
    ) {
      player.set("submitted", false);
      game.players.forEach((curPlayer) => curPlayer.stage.submit());
    }
  }

  calculateScore = (guessed) => {
    if (guessed === null) {
      return 0;
    }
    let normed = Math.abs(guessed - this.taskConstants.correlation);
    if (normed < 0.025) {
      return 100;
    } else {
      return 100 - Number(normed) * 100;
    }
  };

  handleRelease = (value) => {
    const { stage, game, player } = this.props;
    stage.set("value", value);
    game.players.forEach((curPlayer) => curPlayer.set("approved", false));
    game.players.forEach((curPlayer) => curPlayer.set("submitted", false));
  };

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    const { player, stage } = this.props;
    const stageSubmitted = stage.get("submitted");
    const playerSubmitted = player.get("submitted");
    const dbValue = stage.get("value");
    const dbScore = stage.get("score");

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
        <div
          className="mx-auto"
          style={{
            position: "relative",
            width: "50vw",
          }}
        > 
            <img className="mx-auto" width="580" src={this.taskConstants.path}></img>
            <div className="mx-auto" style={{ width:"50vw"}}>
              {
                dbValue !== undefined ? (
                  <Slider
                  min={0}
                  max={1}
                  value={Number(dbValue)}
                  stepSize={0.01}
                  onRelease={this.handleRelease}
                  labelStepSize={0.1}
                  vertical={false}
                  handleHtmlProps={{ "aria-label": "example 1" }}
                />
                ) : (
                  <Slider
                  hideHandleOnEmpty={true}
                  min={0}
                  max={1}
                  stepSize={0.01}
                  onRelease={this.handleRelease}
                  labelStepSize={0.1}
                  vertical={false}
                  handleHtmlProps={{ "aria-label": "example 1" }}
                />
                )
              }
            </div>
          <div
            className="mx-auto"
            style={{
              width: "10vw",
              marginTop: "1.5rem",
              marginBottom: "1.5rem",
            }}
          >
            <Button onClick={this.submit} disabled={playerSubmitted || stageSubmitted}>
              Submit
            </Button>
          </div>
          {stageSubmitted && (
            <>
              <div
                style={{
                  position: "absolute",
                  opacity: "0",
                  top: "0",
                  left: "0",
                  width: "50vw",
                  height: "80vh",
                  backgroundColor: "red",
                }}
              ></div>
              <div style={{ alignItems: "center", textAlign: "center" }}>
                {!this.taskConstants.practice && (
                  <>
                    <table style={{ marginLeft: "auto", marginRight: "auto" }}>
                      <tr>
                        <th style={{ paddingRight: "1rem" }}>You Guessed</th>
                        <th>Correct Value</th>
                        <th style={{ paddingLeft: "1rem" }}>Result</th>
                      </tr>
                      <tr>
                        {
                          dbValue === null ? (
                            <td>N/A</td>
                          ) : (
                            <td>{Math.round(dbValue * 100) / 100}</td>
                          )
                        }
                        <td>{this.taskConstants.correlation}</td>
                          {
                            dbScore === null ? (
                              <td>+0</td>
                            ) : (
                              <td>                          +
                                {stage.get("score")}
                              </td>
                            )
                          }
                      </tr>
                    </table>
                    <p>Click approve configuration to move on</p>
                  </>
                )}
                {this.taskConstants.practice && (
                  <>
                    <p>This is a practice round and will not be scored!</p>
                    <p>Click approve configuration to move on</p>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </TaskLayout>
    );
  }
}
