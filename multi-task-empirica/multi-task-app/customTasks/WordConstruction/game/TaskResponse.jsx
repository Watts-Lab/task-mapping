import React from "react";
import { TimeSync } from "meteor/mizzao:timesync";
import moment from "moment";
import { Button } from "../../../client/common/components/Button";
import { Callout } from "../../../client/common/components/Callout";

export default class TaskResponse extends React.Component {
  state = { 
    inputValue: "", 
    inputError: false,
 };

  handleChange = (event) => {
    const { game, player } = this.props;
    const value = event.target.value;
    this.setState({ inputValue: value, inputError: false });
  };

  handleSubmit = (item) => {
    const { stage, player, game } = this.props;
    const newVal = {
      name: player._id,
      word: this.state.inputValue,
    };
    item.preventDefault();
    const trimmed = newVal.word.trim(); 
    // I don't think we need this check --> && this.checkValidCharacters(trimmed)
    if (trimmed.length === 4 && this.checkValidWord(trimmed)) {
      newVal.word = newVal.word.toLowerCase().trim()
      const list = [];
      for (var i = 0; i < stage.get("wordsList").length; i++) {
        const str = stage.get("wordsList")[i].word;
        list.push(
          str
        );
      }
      if (!list.includes(newVal.word)) {
        stage.set(
          "wordsList",
          stage.get("wordsList").concat(newVal)
        );
      } else {
        this.setState({
          inputError: true
        })
        this.renderErrorMessage()
      }
      this.setState({ inputValue: "" });
      game.players.forEach((player) => {
        player.set("approved", false); 
        const scoreArr = player.stage.get("scoreArr");
        const normalizedScore = Math.round((100 * stage.get("wordsList").length) / stage.get("maxScore"));
        scoreArr.push(normalizedScore); 
        player.stage.set("scoreArr", scoreArr);
        const feedback = player.stage.get("scoreFeedback") + 1;
        player.stage.set("scoreFeedback", feedback);
        player.stage.set("score", normalizedScore);
      });
    } else {
      this.setState({
        inputError: true
      })
    }
  };

  checkValidCharacters(string) {
    const { stage, player, game, round } = this.props;
    const characters = stage.get('constants').characters; 
    for (var i = 0; i < string.length; i++) {
      if (!characters.toLowerCase().includes(string.toLowerCase().charAt(i)) || 
        string.toLowerCase().charAt(i) === " " || 
        string.toLowerCase().charAt(i) === ",") {
         return false; 
      } 
    }
    return true;
  }

  // word must be Uppercase
  findWordinTrie(word, wordTrie) {
    let cur = wordTrie
    for (let i = 0; i < 3; i++){
      if (!(word.charAt(i) in cur['children'])){
        return false
      }
      cur = cur['children'][word.charAt(i)]
    }
    return word.charAt(3) in cur['children'] && cur['children'][word.charAt(3)]['end']
  }

  checkValidWord(string) {
    const { stage, player, game, round } = this.props;
    const upper = string.toUpperCase(); 
    const taskConstants = stage.get('constants');
    return this.findWordinTrie(upper, taskConstants.possible_trie)
  }

  renderInput() {
    const value = this.state.inputValue;
    return (
      <input
        type="text"
        onChange={this.handleChange}
        value={value}
        required
        className="form-control"
        style={{ marginRight: "8px", borderColor: "gainsboro"}}
      />
    );
  }

  renderErrorMessage() {
    const error = this.state.inputError; 
    if (error) {
      return (
        <Callout title={"Incompatible Word"}>
            Please make sure that your word is 4 letters long, in English, is not repeated, 
            and only contains the characters specified. 
        </Callout>
      )
    } else {
      return null;
    }
  }

  render() {
    return (
      <div> 
        <form
        className="task-response"
        onSubmit={this.handleSubmit}
        style={{
          fontSize: "14px",
          maxWidth: "72%",
          marginLeft: "5rem", 
          display: "flex", 
        }}
      >
        {this.renderInput()}
        <p> </p>
        <Button type="submit" onClick={this.handleSubmit} style={{marginLeft: "5%"}}>
          Add Word
        </Button>
      </form>
      <h1></h1> 
      {this.renderErrorMessage()}
      </div>
    );
  }
}
