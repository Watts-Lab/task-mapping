import React from "react";
import { TimeSync } from "meteor/mizzao:timesync";
import moment from "moment";
import { Button } from "../../../client/common/components/Button";
import { Callout } from "../../../client/common/components/Callout";

export default class TaskResponse extends React.Component {
  state = { 
    inputValue: "", 
    inputError: false };

  handleChange = (event) => {
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
    if (newVal.word.trim() !== "" && /^[A-Za-z]+$/.test(newVal.word.trim())) {
      newVal.word = newVal.word.trim();
      stage.set("sandboxWordList", stage.get("sandboxWordList").concat(newVal));
      this.setState({ inputValue: "" });
      game.players.forEach((curPlayer) => curPlayer.set("approved", false));
    } else {
      this.setState({ inputError: true});
    }
  };

  renderInput() {
    const value = this.state.inputValue;
    return (
      <input
        type="text"
        onChange={this.handleChange}
        value={value}
        required
        className="form-control"
      />
    );
  }

  renderErrorMessage() {
    const error = this.state.inputError; 
    if (error) {
      return (
        <Callout title={"Incompatible Word"}>
            Please make sure that your word is not empty and contains no spaces or special characters. 
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
          <p style={{marginLeft: "1%"}}> </p>
          <Button type="submit" onClick={this.handleSubmit} style={{marginLeft: "5%"}}>
            Add Word
          </Button>
        </form>
        <h1> </h1>
        {this.renderErrorMessage()}
      </div>
      
    );
  }
}
