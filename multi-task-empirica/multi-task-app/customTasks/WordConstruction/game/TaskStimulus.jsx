import React from "react";
import { TimeSync } from "meteor/mizzao:timesync";
import moment from "moment";
import { Button } from "../../../client/common/components/Button";
import { decreaseScore } from "../../helper";
import TaskResponse from "./TaskResponse";
import { round } from "lodash";

class WordsList extends React.Component {
  showList = (list) => {
    const { game, player } = this.props;
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
                {/* <Button
                  icon="trash"
                  onClick={() => {
                    this.removeWord(item);
                  }}
                />{" "} */}
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
              {`${i + 1}. ${item.word}`} 
            </li>
          );
        })}
      </ul>
    );
  };

  removeWord = (item) => {
    const { stage, player, game } = this.props;
    const finalList = [];
    stage.set(
      "wordsList",
      stage.get("wordsList").filter((l) => l !== item)
    );
    for (var i = 0; i < stage.get("wordsList").length; i++) {
      finalList.push(stage.get("wordsList")[i].word);
    }
    game.players.forEach((player, i) => {
      decreaseScore(player, stage, null, false);
    });
    stage.append("log", {
      verb: "removedWord",
      subjectId: player._id,
      object: item,
      at: moment(TimeSync.serverTime(null, 1000)),
    });
    game.players.forEach((curPlayer) => curPlayer.set("approved", false));
  };

  render() {
    const { stage, player, round } = this.props;
    return (
      <div className="words">
        {/* <h2
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            marginLeft: "5rem",
            marginTop: "3rem",
          }}
        >
          Word Construction
        </h2>
        <h3
          style={{
            fontSize: "16px",
            marginLeft: "5rem",
          }}
        >
          Add as many 4-letter words English words that can be made up of the following set of characters.
        </h3>
        <p
          style={{
            fontSize: "16px",
            marginLeft: "5rem",
          }}>
             <strong> You are allowed to repeat characters.</strong></p> */}
        <p 
          style={{
            fontSize: "16px",
            marginLeft: "5rem",
            marginTop: "1rem",
            color: "dodgerblue"
          }}> 
          Letters: {stage.get('constants').characters}
        </p>
        {/* <h3
          style={{
            fontSize: "14px",
            marginLeft: "5rem",
            marginBottom: "5px"
          }}
        >
          Enter the words you have generated here. Note that you cannot add the same classification twice.
        </h3> */}
        <TaskResponse {...this.props} />
        <div className="words bp3-card"
          style={{ margin: "0.5rem", minHeight: "20rem", width: "72%", marginLeft: "5rem"}}>
          <h2
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            marginBottom: "0.5rem",
          }}> Final List </h2>
          {this.showList(stage.get("wordsList"))}
        </div>
      </div>
    );
  }
}

export { WordsList };
