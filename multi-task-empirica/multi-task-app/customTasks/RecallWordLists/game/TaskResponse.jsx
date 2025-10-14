import React from "react";
import { TimeSync } from "meteor/mizzao:timesync";
import moment from "moment";
import { Button } from "../../../client/common/components/Button";
import { Callout } from "../../../client/common/components/Callout";
import SyncedInputWrapper from '../../../client/common/components/SyncedInputWrapper';

import { logAction } from '/client/common/helper/logger';


export default class TaskResponse extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      inputValue: "", 
      inputError: false,
    }
 };

  changeLastWord = (e) => {
    const {stage, player, game} = this.props;
    this.setState({ inputError: false });
    const val = e.target.value.replace(/ /g, '').replace(/[^a-zA-Z]/g, '');
    logAction(player, "changedLastWord", val);
    stage.set('lastWords', val);

    this.pos = e.target.selectionStart;
    this.target = e.target;
    this.setCursor = false;

    game.players.forEach((curPlayer) => {
      curPlayer.set("approved", false); 
      //this.calculateScore();
    });
  };

  componentDidMount() {
    const {game} = this.props;
    game.players.forEach(curPlayer => curPlayer.set('approved', false));
  }

  componentDidUpdate() {
    if (!this.setCursor) {
      this.target?.setSelectionRange(this.pos, this.pos);
      this.setCursor = true;
    }
  }

  handleWordListChange = (event) => {
    const { game, player } = this.props;
    const value = event.target.value;
    logAction(player, "typedWord", value);
    this.setState({ inputValue: value, inputError: false });
  };

  handleWordListSubmit = (event) => {
    const { stage, player, game } = this.props;
    event.preventDefault();

    const newVal = {
      name: player._id,
      word: this.state.inputValue,
    };
    const trimmed = newVal.word.trim(); 
    logAction(player, "submittedWord", trimmed);

    if (this.checkValidWord(trimmed)) {
      newVal.word = newVal.word.toLowerCase().trim()
      stage.set("wordsList", stage.get("wordsList").concat(newVal));

      this.setState({ inputValue: "" });
      game.players.forEach((player) => {
        player.set("approved", false); 
        //this.calculateScore();
      });
    } else {
      this.setState({
        inputError: true
      })
    }
  };

  checkValidWord(string) {
    const { stage, player, game, round } = this.props;
    if (!(new RegExp(/^[a-zA-Z]+$/).test(string)) || 
      string.toLowerCase() === "") {
         return false; 
      } 
    return true;
  }

  /* calculateScore() {
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
  } */

  renderInput() {
    const value = this.state.inputValue;
    return (
      <input
        type="text"
        onChange={this.handleWordListChange}
        value={value}
        required
        className="form-control"
        style={{ marginRight: "8px", borderColor: "gainsboro"}}
        onKeyDown={this.handleKeyDown}
      />
    );
  }

  renderErrorMessage() {
    const error = this.state.inputError; 
    if (error) {
      return (
        <Callout title={"Incompatible Word"}>
            Please make sure that your word has at least one letter and only contains characters from the English alphabet.
        </Callout>
      )
    } else {
      return null;
    }
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  render() {
    const {stage, player, game} = this.props;

    return (
      <div>
        <div className='flex flex-col gap-6'>
          <div>
            Last Word:
            <SyncedInputWrapper id={`${0}`} stage={stage} player={player} game={game}>
              <input
                className='focus:ring-sky-500 focus:border-sky-500 mx-1 mt-1 w-32 max-w-lg rounded-md border-gray-300 shadow-sm sm:max-w-xs sm:text-sm'
                type='text'
                value={stage.get('lastWords').toLocaleString()}
                onChange={e => this.changeLastWord(e)}
              />
            </SyncedInputWrapper>
          </div>
        </div>

        <h1></h1>

        <div>
          Remaining Words (in any order):
        </div>
        <p></p>
        <form
        className="task-response"
        onSubmit={this.handleWordListChange}
        style={{
          fontSize: "14px",
          maxWidth: "72%",
          marginLeft: "5rem", 
          display: "flex", 
        }}
      >
        {this.renderInput()}
        <p> </p>
        <Button type="submit" onClick={this.handleWordListSubmit} style={{marginLeft: "5%"}} >
          Add Word
        </Button>
      </form>
      <h1></h1> 
      {this.renderErrorMessage()}
      </div>
    );
  }
}
