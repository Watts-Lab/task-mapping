import React from "react";
import { TimeSync } from "meteor/mizzao:timesync";
import moment from "moment";
import { Button } from "../../../client/common/components/Button";
import { decreaseScore } from "../../helper";
import { logAction } from "../../../client/common/helper/logger";

class SimilaritiesList extends React.Component {
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
                  icon="trash"
                  onClick={() => {
                    logAction(player, "removedCategoryPair", item.word);
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
                marginLeft: "5rem",
                color: currPlayer.get("avatar").color,
              }}
            >
              <Button
                icon="trash"
                onClick={() => {
                  logAction(player, "removedCategoryPair", item.word);
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
      "similaritiesList",
      stage.get("similaritiesList").filter((l) => l !== item)
    );
    for (var i = 0; i < stage.get("similaritiesList").length; i++) {
      finalList.push(stage.get("similaritiesList")[i].word);
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
    const { stage } = this.props;
    return (
      <div className="similarities">
        <div className="similarities bp3-card">
          {this.showList(stage.get("similaritiesList"))}
        </div>
      </div>
    );
  }
}

export { SimilaritiesList };
