import React from "react";
import { TimeSync } from "meteor/mizzao:timesync";
import moment from "moment";
import { Button } from "../../../client/common/components/Button";
import { Callout } from "../../../client/common/components/Callout";
import Slider from "meteor/empirica:slider";


export default class TaskResponse extends React.Component {
  state = { 
    inputValue: "", 
    inputError: false
 };

  handleChange = (event) => {
    const { game, player } = this.props;
    const value = event.target.value;
    // only allow value to be set if it is character
    // this lets participants input random character as the first letter - not sure why
    // code modified from https://stackoverflow.com/questions/52846347/reactjs-cannot-restrict-user-input-to-letters-only
    // if (value === "" || /^[A-Za-z]+$/.test(value))
    // this should be changed to appending to the list (figure it out after making the redering function)
    this.setState({ inputValue: value, inputError: false });
    game.players.forEach((curPlayer) => curPlayer.set("approved", false));
  };

  handleChange = num => {
    const { stage, player, game } = this.props;
    // Rounding the number to 2 decimals max
    const value = num;
    player.stage.set("someValue", value);
  };

  handleSubmit = (event) => {
    const { stage, player, game } = this.props;
    // Rounding the number to 2 decimals max
    const value = player.stage.get("someValue");
    const newVal = {
      name: player._id,
      word: value,
    };
    event.preventDefault();
    const list = [];
    for (var i = 0; i < stage.get("sandboxWordList").length; i++) {
      const str = stage.get("sandboxWordList")[i].word;
      //console.log(str);
      list.push(str);
    }
    if (!list.includes(newVal.word)) {
      stage.set('sandboxWordList', stage.get('sandboxWordList').concat(newVal));
    } 
    stage.append('log', {
      verb: 'addedWord',
      subjectId: player._id,
      object: this.state.inputValue,
      at: moment(TimeSync.serverTime(null, 1000)),
    });
    this.setState({ inputValue: "" });
    game.players.forEach((curPlayer) => curPlayer.set("approved", false));
  }

  render() {
    const { player } = this.props;
    const value = player.stage.get("someValue");
    return (
      <div>
        <form 
        className="task-response" 
        onSubmit={this.handleSubmit}
        style={{
          fontSize: "14px",
          marginLeft: "5rem",
        }}>
          <p> </p>
        <div
        style={{
          width: "80%"
        }}> 
          <Slider
          hideHandleOnEmpty
          min={1}
          max={10}
          stepSize={1}
          labelStepSize={1}
          value={value}
          onChange={this.handleChange}
          />
        </div>
          
          <p> </p>
          <Button 
          type="submit" 
          onClick={this.handleSubmit} 
          >
            Add Rating</Button>
        </form>
        <h1></h1> 
      </div>
    );
  }
}
