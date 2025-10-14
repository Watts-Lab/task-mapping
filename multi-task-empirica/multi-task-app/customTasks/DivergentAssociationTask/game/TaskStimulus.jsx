import React from "react";
import { TimeSync } from "meteor/mizzao:timesync";
import moment from "moment";
import { Button } from "../../../client/common/components/Button";
import { decreaseScore, increaseScore } from "../../helper";
import TaskResponse from "./TaskResponse";

class SandboxStimulus extends React.Component {
  showList = (list) => {
    const { game, player, stage, round } = this.props;
    const otherPlayers = _.reject(game.players, (p) => p._id === player._id);
    const finalWordList = stage.get("finalWordList") ?? [];
    const numElems = stage.get('constants').numElems; 
    const disabled = finalWordList.length >= numElems;

    if (list.length === 0) {
      return (
        <p 
          style={{
          fontSize: "14px",
        }}> Words you enter will appear here </p>
      )
    }

    if (otherPlayers.length === 0) {
      return (
        <ul>
          {list.map((item, i) => {
            return (
              <li
                key={i}
                style={{
                  fontSize: "14px",
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
    const { stage, player, game, shouldUpdateScore } = this.props;
    const finalList = [];
    for (var i = 0; i < stage.get("finalWordList").length; i++) {
      finalList.push(stage.get("finalWordList")[i].word);
    }

    if (shouldUpdateScore && !finalList.includes(item.word)) {
      game.players.forEach((player, i) => {
        increaseScore(player, stage);
      });
    }

    stage.set("finalWordList", stage.get("finalWordList").concat(item));
    stage.set(
      "sandboxWordList",
      stage.get("sandboxWordList").filter((l) => l !== item)
    );
    if (stage.get("finalWordList").length >= 5 * player.get("numStage")) {
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
            fontWeight: "bold",
            fontSize: "20px",
            marginLeft: "5rem",
            marginTop: "2rem",
          }}
        >
          Sandbox
        </h2>
        <p
          style={{
            fontSize: "16px",
            marginLeft: "5rem",
            marginBottom: "0", 
          }}
        >
          These words will NOT be graded.
        </p>
        {/* <h4
          style={{
            fontSize: "14px",
            marginLeft: "5rem",
            marginTop: "0",
            fontWeight: "bold", 
            marginBottom: "1rem"
          }}> 
            Add English nouns that are unrelated.
          </h4> */}
        <TaskResponse {...this.props} />
        <div className="words bp3-card"
          style={{ margin: "0.5rem", minHeight: "20rem", width: "72%", marginLeft: "5rem", marginBottom: "0"}}>
          {this.showList(stage.get("sandboxWordList"))}
        </div>
      </div>
    );
  }
}

class FinalWordStimulus extends React.Component {
  showList = (list) => {
    const { game, player, round, stage } = this.props;
    const otherPlayers = _.reject(game.players, (p) => p._id === player._id);

    if (list.length === 0) {
      return (
        <p 
          style={{
          fontSize: "14px",
        }}> Words you enter will appear here </p>
      )
    }
    
    if (otherPlayers.length === 0) {
      return (
        <ul>
          {list.map((item, i) => {
            return (
              <li
                key={i}
                style={{
                  fontSize: "14px",
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
    const { stage, player, game, shouldUpdateScore } = this.props;
    const finalList = [];
    stage.set("sandboxWordList", stage.get("sandboxWordList").concat(item));
    stage.set(
      "finalWordList",
      stage.get("finalWordList").filter((l) => l !== item)
    );
    for (var i = 0; i < stage.get("finalWordList").length; i++) {
      finalList.push(stage.get("finalWordList")[i].word);
    }
    if (!finalList.includes(item.word) && shouldUpdateScore) {
      game.players.forEach((player, i) => {
        decreaseScore(player, stage);
      });
    }
    game.players.forEach((curPlayer) => curPlayer.set("approved", false));

  };

  render() {
    const { stage, player, round } = this.props;
    const finalWordList = stage.get("finalWordList");
    const len = finalWordList.length;
    const numElems = stage.get('constants').numElems

    return (
      <div className="sandboxWord">
        <h2
          className="fw-bold"
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            marginLeft: "5rem",
            marginTop: "1rem",
          }}
        >
          Final List
        </h2>
        <h5
          className="text-secondary"
          style={{
            fontSize: "16px",
            marginLeft: "5rem",
          }}
        >
          These words will be graded.
        </h5>
        {len >= numElems && (
          <h4
            className="text-danger fw-bold"
            style={{
              fontSize: "14px",
              marginLeft: "5rem",
              color: "red",
              marginBottom: "1rem"
            }}
          >
            Move a word to add something else.
          </h4>
        )}
        {!(len >= numElems) && (
          <h4
          style={{
            fontSize: "14px",
            marginLeft: "5rem",
            color: "dodgerblue",
            fontWeight: "bold",
            marginBottom: "1rem"
          }}> 
            You can add {numElems - len} more word(s)
          </h4>
        )}
        <div className="words bp3-card"
          style={{ margin: "0.5rem", minHeight: "20rem", width: "72%", marginLeft: "5rem"}}>
          {this.showList(finalWordList)}
        </div>
      </div>
    );
  }
}

export { SandboxStimulus, FinalWordStimulus };
