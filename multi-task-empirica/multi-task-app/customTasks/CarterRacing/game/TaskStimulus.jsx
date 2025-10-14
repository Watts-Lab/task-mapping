import React from "react";
import { TimeSync } from "meteor/mizzao:timesync";
import moment from "moment";
import { Button } from "../../../client/common/components/Button";
import { decreaseScore, increaseScore } from "../../helper";

class SandboxStimulus extends React.Component {
  showList = (list) => {
    const { game, player, stage } = this.props;
    const otherPlayers = _.reject(game.players, (p) => p._id === player._id);
    const finalWordList = stage.get("finalWordList") ?? [];
    const disabled = finalWordList.length >= 1;

    if (otherPlayers.length === 0) {
      return (
        <ul>
          {list.map((item, i) => {
            return (
              <li
                key={i}
                style={{
                  fontSize: "14px",
                  marginLeft: "5rem",
                }}
              >
                <Button
                  icon="trash"
                  onClick={() => {
                    this.removeWord(item);
                  }}
                />{" "}
                <Button
                  icon="arrow-down"
                  onClick={() => {
                    this.moveWordToFinal(item);
                  }}
                  disabled={disabled}
                />{" "}
                {`${i + 1}. ${item.word}`}
              </li>
            );
          })}
        </ul>
      );
    }
    return (
      <ul>
        {list.map((item, i) => {
          const currPlayer = game.players.find((p) => p._id === item.name);
          return (
            <li
              key={i}
              style={{
                fontSize: "14px",
                marginLeft: "5rem",
                color: currPlayer.get("avatar").color,
              }}
            >
              <Button
                icon="trash"
                onClick={() => {
                  this.removeWord(item);
                }}
              />{" "}
              <Button
                icon="arrow-down"
                onClick={() => {
                  this.moveWordToFinal(item);
                }}
                disabled={disabled}
              />{" "}
              {`${i + 1}. ${item.word}`} 
            </li>
          );
        })}
      </ul>
    );
  };

  removeWord = (item) => {
    const { stage, player, game } = this.props;
    stage.set(
      "sandboxWordList",
      stage.get("sandboxWordList").filter((l) => l !== item)
    );
    stage.append("log", {
      verb: "removedWord",
      subjectId: player._id,
      object: item,
      at: moment(TimeSync.serverTime(null, 1000)),
    });
    game.players.forEach((curPlayer) => curPlayer.set("approved", false));
  };

  moveWordToFinal = (item) => {
    const { stage, player, game } = this.props;
    const finalList = [];
    for (var i = 0; i < stage.get("finalWordList").length; i++) {
      finalList.push(stage.get("finalWordList")[i].word);
    }

    if (!finalList.includes(item.word)) {
      game.players.forEach((player, i) => {
        increaseScore(player, stage, null, false);
        //console.log(player.stage.get("scoreArr"));
      });
    }

    stage.set("finalWordList", stage.get("finalWordList").concat(item));
    stage.set(
      "sandboxWordList",
      stage.get("sandboxWordList").filter((l) => l !== item)
    );

    stage.append("log", {
      verb: "movedWordToFinal",
      subjectId: player._id,
      object: item,
      at: moment(TimeSync.serverTime(null, 1000)),
    });

    if (stage.get("finalWordList").length >= 1) {
      console.debug("overflow");
    }
    game.players.forEach((curPlayer) => curPlayer.set("approved", false));
  };

  render() {
    const { stage } = this.props;
    return (
      <div className="sandboxWord">
        <h2
          style={{
            fontSize: "20px",
            marginLeft: "5rem",
          }}
        >
          Brainstorm
        </h2>
        <p
          style={{
            fontSize: "14px",
            marginLeft: "5rem",
            marginBottom: "1rem",
          }}
        >
          These responses will NOT be graded
        </p>
        <div className="sandboxWordList bp3-card">
          {this.showList(stage.get("sandboxWordList"))}
        </div>
      </div>
    );
  }
}

class FinalWordStimulus extends React.Component {
  showList = (list) => {
    const { game, player } = this.props;
    const otherPlayers = _.reject(game.players, (p) => p._id === player._id);

    if (otherPlayers.length === 0) {
      return (
        <ul>
          {list.map((item, i) => {
            return (
              <li
                key={i}
                style={{
                  fontSize: "14px",
                  marginLeft: "5rem",
                }}
              >
                <Button
                  icon="arrow-up"
                  onClick={() => {
                    this.moveWordToSandbox(item);
                  }}
                />{" "}
                {`${i + 1}. ${item.word}`}
              </li>
            );
          })}
        </ul>
      );
    }
    return (
      <ul>
        {list.map((item, i) => {
          const currPlayer = game.players.find((p) => p._id === item.name);
          return (
            <li
              key={i}
              style={{
                fontSize: "14px",
                marginLeft: "5rem",
                color: currPlayer.get("avatar").color,
              }}
            >
              <Button
                icon="arrow-up"
                onClick={() => {
                  this.moveWordToSandbox(item);
                }}
              />{" "}
              {`${i + 1}. ${item.word}`} 
            </li>
          );
        })}
      </ul>
    );
  };

  moveWordToSandbox = (item) => {
    const { stage, player, game } = this.props;
    const finalList = [];
    stage.set("sandboxWordList", stage.get("sandboxWordList").concat(item));
    stage.set(
      "finalWordList",
      stage.get("finalWordList").filter((l) => l !== item)
    );
    for (var i = 0; i < stage.get("finalWordList").length; i++) {
      finalList.push(stage.get("finalWordList")[i].word);
    }
    if (!finalList.includes(item.word)) {
      game.players.forEach((player, i) => {
        decreaseScore(player, stage, null, false);
        //console.log(player.stage.get("scoreArr"));
      });
    }
    stage.append("log", {
      verb: "movedWordToSandbox",
      subjectId: player._id,
      object: item,
      at: moment(TimeSync.serverTime(null, 1000)),
    });
    game.players.forEach((curPlayer) => curPlayer.set("approved", false));
  };

  render() {
    const { stage, player } = this.props;
    const finalWordList = stage.get("finalWordList");
    const len = finalWordList.length;

    return (
      <div className="sandboxWord">  
        <h2  
          className="fw-bold"
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            marginLeft: "5rem",
            marginTop: "3rem",
          }}
        >
          Final Decision/ Response
        </h2>
        <h5
          className="text-secondary"
          style={{
            fontSize: "18px",
            marginLeft: "5rem",
          }}
        >
          This response will be <strong>graded</strong>.
        </h5>
        {len >= 1 && (
          <h4
            className="text-danger fw-bold"
            style={{
              fontSize: "14px",
              marginLeft: "5rem",
            }}
          >
            Delete this slogan to change the final submission.
          </h4>
        )}
        {!(len >= 1) && (
          <h4
            style={{
              fontSize: "14px",
              marginLeft: "5rem",
              marginBottom: "1rem",
            }}
          >
            You should add a final decision/response here
          </h4>
        )}
        <div className="sandboxWordList bp3-card">
          {this.showList(finalWordList)}
        </div>
      </div>
    );
  }
}

export { SandboxStimulus, FinalWordStimulus };
