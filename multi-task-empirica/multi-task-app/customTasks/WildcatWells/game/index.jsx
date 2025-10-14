import React from "react";
import { TaskLayout } from "../../../client/common/TaskLayout";
import { Button } from "../../../client/common/components/Button";
import Instructions from "../intro/Instructions";
import ViewInstructions from "../../../client/common/components/ViewInstructions";
import { gameboard0 } from "../game/gameboards/board0"
import { gameboard1 } from "../game/gameboards/board1"
import { gameboard2 } from "../game/gameboards/board2"
import { gameboard3 } from "../game/gameboards/board3"
import { logAction } from "/client/common/helper/logger";

export default class WildcatWells extends React.Component {
  constructor(props) {
    super(props);
    this.timer = setInterval(this.decrementCountdown, 1000);
    this.state = {
      showModal: false,
      currDate: Math.round(new Date().getTime() / 1000) * 1000,
      timeLeft: 0,
    };
  }

  componentDidMount() {
    const { stage, game, player } = this.props;
    document.getElementById('desertMap').onclick = function(e) {
      var rect = e.target.getBoundingClientRect();
      var x = Math.round(e.clientX - rect.left); // x position within the element.
      var y = Math.round(e.clientY - rect.top);  // y position within the element.
      stage.set("currXCoord", x);
      stage.set("currYCoord", y);
      stage.set("lastClickedPlayer", player.get("avatar"));
      game.players.forEach(curPlayer => curPlayer.set('approved', false));
      game.players.forEach(curPlayer => curPlayer.set('submitCoordinateApproved', false));

      logAction(player, "set new location", [x, y]);
    }
    game.players.forEach(curPlayer => curPlayer.set('approved', false));
    game.players.forEach(curPlayer => curPlayer.set('submitCoordinateApproved', false));
  }

  decrementCountdown = () => {
    this.setState((prevState) => ({
      showModal: prevState.showModal,
      currDate: Math.round(new Date().getTime() / 1000) * 1000,
    }));
  };

  calculateScore(scoreElem) {
    const { game, player, stage } = this.props;
    
    let intervalScore = 0
    intervalScore = Math.floor(scoreElem / ((stage.get("scoreGrid")[0]).length - 1))

    game.players.forEach((playerObj) => {
      if (playerObj.stage.get("score")) {
        playerObj.stage.set("score", playerObj.stage.get("score") + intervalScore);
      } else {
        playerObj.stage.set("score", intervalScore);
      }
    })
  }

  approve() {
    const { stage, game, player } = this.props;

    player.set("approved", true);

    if (
      game.players.reduce(
        (prev, curPlayer) =>
          prev && (curPlayer.get("approved") || curPlayer.exitStatus)
      )
    ) {
      game.players.forEach((curPlayer) => curPlayer.stage.submit());
    }
  }

  submitCoordinate(timeLeft) {
    const { stage, game, player } = this.props;

    player.set("submitCoordinateApproved", true);

    if (
      game.players.reduce(
        (prev, curPlayer) =>
          prev && (curPlayer.get("submitCoordinateApproved") || curPlayer.exitStatus)
      )
    ) {
      const startTimeVal = stage.get("fakeStageStartTime");
      const newStartTimeVal = startTimeVal - timeLeft * 1000;
      stage.set("fakeStageStartTime", newStartTimeVal);
      game.players.forEach(curPlayer => curPlayer.set('submitCoordinateApproved', false));
    }
  }
  
  render() {
    const { round, stage, player, game } = this.props;

    let gameboard = null;
    if (stage.get('constants').name === "Wildcat Wells instance zero") {
      gameboard = gameboard0
    } else if (stage.get('constants').name === "Wildcat Wells instance one") {
      gameboard = gameboard1
    } else if (stage.get('constants').name === "Wildcat Wells instance two") {
      gameboard = gameboard2
    } else if (stage.get('constants').name === "Wildcat Wells instance three") {
      gameboard = gameboard3
    }

    const stageStartTime = stage.get("fakeStageStartTime");

    const currentTime = Math.round(this.state.currDate / 1000) * 1000
    const timeLeft = stage.get("constants").intervalDuration - 
      (Math.floor((currentTime - stageStartTime) / 1000)) % (stage.get("constants").intervalDuration + 1)    
    const currentInterval = (Math.floor((currentTime - stageStartTime) / (1000 * (stage.get("constants").intervalDuration + 1)))) + 1

    if (timeLeft == 0 && stage.get("scoreGrid")[1][currentInterval] === "-") {
      let newScore = 0;
      if (stage.get("currXCoord") != null && stage.get("currYCoord") != null) {
        newScore = Math.round(gameboard[stage.get("currXCoord")][stage.get("currYCoord")] * 100);
        if (newScore < 0) {
          newScore = 0
        } else if (newScore > 100) {
          newScore = 100
        }
      }

      this.calculateScore(newScore);

      const oldGrid = stage.get("scoreGrid");
      oldGrid[1][currentInterval] = newScore;
      stage.set("scoreGrid", oldGrid);

      const previousCoords = stage.get("previousCoords");
      previousCoords.push([currentInterval, stage.get("currXCoord"), stage.get("currYCoord"), newScore]);
      stage.set("previousCoords", previousCoords);

      if (currentInterval == 10 || (!stage.get('constants').calculateScore && currentInterval == 6)) {
        // delays submit so player can see result of the round
        setTimeout(function(){
          player.stage.submit();
        }, 500);
      }

      stage.set("currXCoord", null); 
      stage.set("currYCoord", null);
    }

    const xCoord = stage.get("currXCoord");
    const yCoord = stage.get("currYCoord");

    let transformedXCoord = xCoord
    let transformedYCoord = yCoord
    if (transformedXCoord != null && transformedYCoord != null) {
      transformedXCoord = transformedXCoord + 66;
      transformedYCoord = transformedYCoord + 258;
    } 
    
    let lastClickedPlayerColor = "black"
    let lastClickedPlayerName = ""
    if (stage.get("lastClickedPlayer")) {
      lastClickedPlayerColor = stage.get("lastClickedPlayer").color;
      lastClickedPlayerName = stage.get("lastClickedPlayer").name;
    }
    
    const scoreGrid = stage.get("scoreGrid");
    const previousCoordinates = stage.get("previousCoords");

    const listItems = previousCoordinates.map((coordinate, index) => (
      <p
      style={{
        position: "absolute", 
        top: coordinate[2] + 258,
        left: coordinate[1] + 66,
        fontWeight: "bolder", 
        color: coordinate[3] >= 90 ? "green" : coordinate[3] >= 70 ? "yellow" : coordinate[3] >= 50 ? "orange" : "red", 
        cursor: "pointer"
      }}> {coordinate[1] != null ? coordinate[0] : ""} </p>
    ))

    return (
      <TaskLayout
        {...this.props}
        nextForm={() => 
          <div className="flex h-full items-center justify-center space-x-1">
            <Button
              type="submit"
              onClick={this.approve.bind(this)}
              disabled={player.get("approved")}
            >
              Approve Configuration
            </Button>
          </div>
        }
      >
        <div style={{position:"absolute", bottom:"5px", right:"330px"}}>
          <ViewInstructions inside={true} instruction={Instructions} props></ViewInstructions>
        </div>
        <div style={{
          border: "1px solid rgb(209 213 219)", 
          width: "90%", 
          margin: "40px",
          padding: "20px", 
          borderRadius: "5px",
          backgroundColor: "rgb(249 250 251)"
        }}> 
          <div style={{
            width: "100%", 
            height: "130px", 
            borderRadius: "5px",
            backgroundColor: "white", 
            border: "1px solid rgb(209 213 219)", 
            marginBottom: "9px",
            display: "flex",
          }}>
            <div style={{
              margin: "20px", 
              width: "50px", 
              textAlign: "center", 
            }}>
              <p style={{ fontSize: "10px", marginTop: "15px", marginBottom: "0px" }}>
                Current Interval
              </p>
              <p style={{ fontSize: "45px", fontWeight: "bold", color: "cornflowerblue", marginTop: "-5px" }}>
                { currentInterval }
              </p>
            </div>
            <div>
            <div className="w-min border-2 border-gray" style={{ marginTop: "40px", alignSelf: "flex-end" }}>
              {scoreGrid.map((row, i) => (
                <div className="flex" key={i}>
                  {row.map((cell, j) => (
                    <div className={"h-6 w-14 border-gray border"} 
                      style={{ fontSize: "11px", 
                        textAlign: "center", 
                        paddingTop: "4px" 
                      }}>
                        { scoreGrid[i][j] }
                    </div>
                  ))}
                </div>
              ))}
            </div>
            </div>
          </div>
          <div style={{ 
            display: "flex", 
            borderRadius: "5px",
            backgroundColor: "white", 
            border: "1px solid rgb(209 213 219)", 
            padding: "10px"
            }}>
            <img 
              id="desertMap"
              src={`img/desert/${stage.get("constants").img}`} 
              alt="image of desert map" 
              style={{ 
                width: 400, 
                height: 400, 
                border: "1px solid rgb(209 213 219)"
              }}
            />
            <div style={{ display: "block"}}>
              <div style={{ margin: "10px", display: "flex" }}> 
                <p
                  style={{
                    fontSize: "16px", 
                    marginTop: "-3px",
                    marginRight: "3px"
                  }}> Last clicked by: 
                </p>
                <p
                  style={{
                    fontWeight: "bold", 
                    marginTop: "-3px",
                    color: lastClickedPlayerColor,
                  }}>
                  { lastClickedPlayerName }
                </p>
              </div>
              <div
                style={{ 
                  margin: "10px", 
                  marginBottom: "0px"
                }}> 
                <p
                style={{
                  fontSize: "16px", 
                  marginBottom: "3px",
                }}> Drilling location coordinates: </p>
                <div style={{ display: "flex" }}>
                  <div style={{ display: "flex", marginRight: "14px" }}> 
                    <p style={{ 
                      color: "cornflowerblue", 
                      fontWeight: "bold", 
                      marginRight: "3px", 
                    }}> X: </p>
                    <p> {xCoord} </p>
                  </div>
                  <div style={{ display: "flex" }}> 
                    <p style={{ 
                      color: "cornflowerblue", 
                      fontWeight: "bold", 
                      marginRight: "3px" 
                    }}> Y: </p>
                    <p> {yCoord} </p>
                  </div>
                </div>
                <div
                  style={{ 
                    marginBottom: "0px",
                    display: "flex"
                  }}> 
                  <p
                  style={{
                    fontSize: "16px", 
                    marginRight: "3px", 
                    marginBottom: "0px"
                  }}> Seconds remaining for current drill: </p>
                  {timeLeft == 0 ? 
                    <p 
                    style={{ 
                      color: "red", 
                      fontWeight: "bold"
                    }}> submitting... </p> :
                    <p 
                    style={{ 
                      color: "cornflowerblue", 
                      fontWeight: "bold"
                    }}> {timeLeft} </p>
                  }
                </div>
                <div
                  style={{
                    marginLeft: "135px",
                    marginTop: "10px"
                  }}>
                  <Button
                    type="submit"
                    onClick={() => this.submitCoordinate(timeLeft)}
                    disabled={player.get("submitCoordinateApproved")}
                  > Submit Location </Button>
                </div>
              </div>
            </div>
          </div>
          {transformedXCoord != null && transformedYCoord != null ? (
            <p
            style={{
              position: "absolute", 
              top: transformedYCoord,
              left: transformedXCoord,
              fontWeight: "bolder", 
              color: lastClickedPlayerColor, 
              cursor: "pointer"
            }}> + </p>
            ) : 
            <p/>
          }
        </div>
        <div>
          {listItems}
        </div>
      </TaskLayout>
    );
  }
}

