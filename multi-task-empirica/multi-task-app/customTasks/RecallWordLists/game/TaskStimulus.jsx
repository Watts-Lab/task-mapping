import React from "react";
import { TimeSync } from "meteor/mizzao:timesync";
import moment from "moment";
import { Button } from "../../../client/common/components/Button";
// import { decreaseScore } from "../../helper";
import TaskResponse from "./TaskResponse";
import { round } from "lodash";

import { logAction } from '/client/common/helper/logger';

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
       this.updateScore();
    });
    logAction(player, "removedWord", item)
    game.players.forEach((curPlayer) => curPlayer.set("approved", false));
  };

  updateScore() {
    const { stage, player, game } = this.props;

    const scoreArr = player.stage.get("scoreArr");

    const isLastWordCorrect = stage.get("lastWords")===stage.get('constants').wordAnswer;
    let listScore = 0;
    let finalAnswers = stage.get("wordsList");

    for (let i = 0; i < stage.get('constants').listAnswers.length; i++) {
      for (let j = 0; j < stage.get("wordsList").length; j++) {
        if (stage.get("wordsList")[j].word === stage.get('constants').listAnswers[i]) {
          listScore += 1;
          finalAnswers = finalAnswers.filter((answer) => answer.word !== stage.get('constants').listAnswers[i]);
          break;
        }
      }
      for (let j = 0; j < stage.get("wordsList").length; j++) {
        if (stage.get("wordsList")[j].word === stage.get('constants').wordAnswer) {
          finalAnswers = finalAnswers.filter((answer) => answer.word !== stage.get('constants').wordAnswer);
          break;
        }
      }
    }

    listScore = listScore - finalAnswers.length;
    const normalizedScore = Math.round((100 * listScore) / stage.get('constants').listAnswers.length);
    const roundScore = isLastWordCorrect ? normalizedScore : 0;

    scoreArr.push(roundScore); 
    player.stage.set("scoreArr", scoreArr);
    const feedback = player.stage.get("scoreFeedback") + 1;
    player.stage.set("scoreFeedback", feedback);
    player.stage.set("score", roundScore);
  };

  render() {
    const { stage, player, round } = this.props;
    return (
      <div className="words">
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
