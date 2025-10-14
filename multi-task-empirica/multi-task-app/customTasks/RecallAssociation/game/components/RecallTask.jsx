import React, { Component } from "react";
import { Button } from "../../../../client/common/components/Button";
import { TaskLayout } from "../../../../client/common/TaskLayout";
import { setScore } from "../../../helper";
import "../recallStyles.css";

import { logAction } from '/client/common/helper/logger';

export class RecallTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedListId: -1,
      wordToAdd: "",
      shakeId: -1,
    };
  }

  handleAddWord = () => {
    const {
      stage,
      lists,
      player,
      condition,
      pointsAwarded,
      pointsDeducted,
      game,
    } = this.props;

    const { shakeId, selectedListId, wordToAdd } = this.state;

    logAction(player, "addingWord", wordToAdd)
    
    if (selectedListId === -1) {
      return;
    }

    const wordMatched = lists[selectedListId].words.find(
      (word) => word.toUpperCase() === wordToAdd.toUpperCase()
    );

    const recalledWords =
      condition === "see"
        ? stage.get("recalledWords")
        : player.stage.get("recalledWords");

    var totalMissed = game.players.reduce(
      (acc, p) => acc + p.stage.get("wordsMissed"),
      0
    );

    if (wordMatched) {
      if (
        !recalledWords[selectedListId].words.some((e) => e.word === wordMatched)
      ) {
        recalledWords[selectedListId].words.push({
          player: player.id,
          word: wordMatched,
        });

        if (condition === "see") {
          stage.set("recalledWords", recalledWords);
        } else {
          player.stage.set("recalledWords", recalledWords);
        }
      }
    } else {
      player.stage.set("wordsMissed", player.stage.get("wordsMissed") + 1);
      totalMissed++;
      this.setState({ shakeId: selectedListId });
      setTimeout(() => this.setState({ shakeId: -1 }), 500); // Reset it after animation duration
    }

    const wordsRecalled = recalledWords.reduce(
      (acc, list) => acc + list.words.length,
      0
    );

    const awarded = wordsRecalled * pointsAwarded;
    const deducted = totalMissed * pointsDeducted;
    const newScore = awarded - deducted;
    game.players.forEach((player, i) => {
      setScore(player, stage, newScore);
    });

    this.setState({
      selectedListId: -1,
      wordToAdd: "",
    });
  };

  getColor = (id) => {
    const player = this.props.game.players.find((player) => player.id === id);
    if (player.id === this.props.player.id) return "black";
    return player.get("avatar").color;
  };

  render() {
    const { stage, player, condition } = this.props;
    const { selectedListId, wordToAdd } = this.state;

    const recalledWords =
      condition === "see"
        ? stage.get("recalledWords")
        : player.stage.get("recalledWords");
    //console.log(recalledWords)
    return (
      <div className="flex h-full w-full flex-col overflow-y-auto">
                <style>
          {`
            @keyframes shake {
              0% { transform: translate(1px, 1px) rotate(0deg); }
              10% { transform: translate(-1px, -2px) rotate(-1deg); }
              20% { transform: translate(-3px, 0px) rotate(1deg); }
              30% { transform: translate(3px, 2px) rotate(0deg); }
              40% { transform: translate(1px, -1px) rotate(1deg); }
              50% { transform: translate(-1px, 2px) rotate(-1deg); }
              60% { transform: translate(-3px, 1px) rotate(0deg); }
              70% { transform: translate(3px, 1px) rotate(-1deg); }
              80% { transform: translate(-1px, -1px) rotate(1deg); }
              90% { transform: translate(1px, 2px) rotate(0deg); }
              100% { transform: translate(1px, -2px) rotate(-1deg); }
            }

            .shake-animation {
              animation: shake 0.5s;
              animation-iteration-count: 1;
            }
          `}
        </style>
        {recalledWords.map((list, i) => (
          <div
            key={i}
            className={`flex w-full flex-row justify-start px-12 py-6 bg-${
              i % 2 == 0 ? "white" : "gray-200"
            }`}
            id={list.target}
          >
            <h2 className="w-16 font-medium text-gray-500">{list.target}</h2>
            <div
              className={`max-w-2xl pl-12 ${
                list.words.length !== 0 && "pr-12"
              }`}
            >
              <p>
                {list.words.map((wordEntry, j) => (
                  <span
                    key={j}
                    style={{ color: this.getColor(wordEntry.player) }}
                  >
                    {wordEntry.word}
                    {j < list.words.length - 1 && ", "}
                  </span>
                ))}
              </p>
            </div>
            <div className="flex w-64 flex-wrap">
              <input
                type="text"
                className={`focus:ring-sky-500 focus:border-sky-500 block w-36 max-w-lg rounded-md border-gray-300 shadow-sm sm:max-w-xs sm:text-sm ${
                  this.state.shakeId === i ? "shake-animation" : ""
                }`}
                value={selectedListId === i ? wordToAdd : ""}
                onChange={(e) =>
                  this.setState({
                    wordToAdd: e.target.value,
                    selectedListId: i,
                  })
                }
                onKeyUp={(e) => {
                  if (e.key === "Enter") this.handleAddWord();
                }}
              />
              <Button onClick={this.handleAddWord}>Add Word</Button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default RecallTask;
