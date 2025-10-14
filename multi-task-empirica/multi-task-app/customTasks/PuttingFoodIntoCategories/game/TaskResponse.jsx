import React from "react";
import { TimeSync } from "meteor/mizzao:timesync";
import moment from "moment";
import { Button } from "../../../client/common/components/Button";
import { increaseScore } from "../../helper";
import { Callout } from "../../../client/common/components/Callout";
import { logAction } from "../../../client/common/helper/logger";

export default class TaskResponse extends React.Component {
  state = { 
    inputValue1: "", 
    inputValue2: "", 
    inputError: false
 };

  handleChange1 = (event) => {
    const { game, player } = this.props;
    const value1 = event.target.value;
    // only allow value to be set if it is character
    // this lets participants input random character as the first letter - not sure why
    // code modified from https://stackoverflow.com/questions/52846347/reactjs-cannot-restrict-user-input-to-letters-only
    // if (value === "" || /^[A-Za-z]+$/.test(value))
    // this should be changed to appending to the list (figure it out after making the redering function)
    this.setState({ inputValue1: value1, inputError: false });
  };

  handleChange2 = (event) => {
    const { game, player } = this.props;
    const value2 = event.target.value;
    this.setState({ inputValue2: value2, inputError: false });
  };

  handleSubmit = (item) => {
    const { stage, player, game } = this.props;
    const { inputValue1, inputValue2 } = this.state;
    const newVal = {
      name: player._id,
      word: inputValue1 + ' vs. ' + inputValue2,
    };
    item.preventDefault();
    if (newVal.word.trim() !== "") {
      newVal.word = newVal.word.trim()
      const list = [];
      for (var i = 0; i < stage.get("similaritiesList").length; i++) {
        const str = stage.get("similaritiesList")[i].word;
        list.push(
          str
            .replace(/[^\w\s]|_/g, "")
            .replace(/\s+/g, "")
            .toLowerCase()
        );
      }
      if (
        !list.includes(
          newVal.word
            .replace(/[^\w\s]|_/g, "")
            .replace(/\s+/g, "")
            .toLowerCase() && newVal.word !== ""
        )
      ) {
        stage.set(
          "similaritiesList",
          stage.get("similaritiesList").concat(newVal)
        );
  
        if (stage.get("similaritiesList").length <= 10) {
          game.players.forEach((player, i) => {
            increaseScore(player, stage, null, false);
          });
        }
      }
      logAction(player, "addedCategoryPair", newVal.word);
  
      stage.append("log", {
        verb: "addedWord",
        subjectId: player._id,
        object: this.state.inputValue,
        at: moment(TimeSync.serverTime(null, 1000)),
      });
      this.setState({ inputValue: "" });
      game.players.forEach((curPlayer) => curPlayer.set("approved", false));

    } else {
      this.setState({
        inputError: true
      })
    }
  };

  renderInput() {
    const value = this.state.inputValue;
    return (
      <div>
      <input
        type="text"
        onChange={event => this.handleChange1(event)}
        value={this.state.value1}
        required
        className="form-control"
        style={{ width: "20rem" }}
      />
      {' '}
      vs.
      {' '}
      <input
        type="text"
        onChange={event => this.handleChange2(event)}
        value={this.state.value2}
        required
        className="form-control"
        style={{ width: "20rem" }}
      />
      </div>
    );
  }

  renderErrorMessage() {
    const error = this.state.inputError; 
    if (error) {
      return (
        <Callout title={"Incompatible Classification"}>
            Please make sure that you have entered a classification. 
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
          marginLeft: "5rem",
        }}
      >
        {this.renderInput()}{' '}
        <p> </p>
        <Button type="submit" onClick={this.handleSubmit}>
          Add Category Pair 
        </Button>
      </form>
      <h1></h1> 
      {this.renderErrorMessage()}
      </div>
    );
  }
}
