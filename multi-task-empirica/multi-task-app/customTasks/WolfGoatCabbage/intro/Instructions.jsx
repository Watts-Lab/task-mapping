import React, { Component } from "react";
import { Button } from "../../../client/common/components/Button";
import {FormLabel, FormSection} from '/client/common/components/Form';
import Idle from '../../Idle';
import {RadioGroup} from '/client/common/components/Input';
import {Callout} from '/client/common/components/Callout';

export default class Instructions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      q1: '',
      q2: '',
      showOverview: true,
      showInstructions: false,
      showPerformance: false,
      showPractice: false,
      showQuiz: false,
      valid: false,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const answers = {
      q1: 'q1_b',
      q2: 'q2_a',
    };
    const {player} = this.props;
    const valid = _.isMatch(this.state, answers);
  
    if (prevState.valid !== valid) {
      player.stage.set('directionsCompleted', valid);
      player.stage.set("correct", true)
      this.setState({valid});
      this.props.onValid(valid);
    }
  }

  handleChange = event => {
    const ele = event.currentTarget;
    this.setState({[ele.name]: ele.value.trim().toLowerCase()});
  };

  handleButton = event => {
    const jumpTo = event.jumpTo;
    // set state of next section to true and jump to that section
    this.setState({[jumpTo] : true}); // button has been clicked so set state to true
    document.getElementById(jumpTo).scrollIntoView({ behavior: 'smooth' });
  }

  componentDidMount() {
    const {inside} = this.props
    if (!inside) {
      const { player } = this.props;
      player.stage.set("correct", false);
      if (player.stage.get("directionsCompleted") != true) {
        player.stage.set("directionsCompleted", false)
        player.stage.set("showOverview", true)
      }
      player.stage.set("correct", false)
    }
  }

  render() {
    const {submitted, inside, game, player} = this.props;
    const {q1, q2, valid} = this.state;
    const { showOverview, showInstructions, showPerformance, showPractice, showQuiz } = this.state;

    let otherPlayers = []
    if (!inside) {
      otherPlayers = _.reject(game.players, (p) => p._id === player._id);
      if (valid && player.stage.get("correct") !== true) {
        player.stage.set("correct", true);
      } else if (!valid && player.stage.get("correct") == true) {
        player.stage.set("correct", false);
      }
    }

    return (
      <>
        <div>
        {(inside || showOverview) ? (
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "25px" }}> Wolf, Goat Cabbage </p>
                  <p>In this game, you will strategically move characters across a river, using a boat with a limited number of spots.</p>
                  <p><strong>Goal:</strong> Move all characters from the left side to the right side in the fewest number of moves while respecting the constraints to avoid anyone eating anyone else.</p>
                  <p><strong>Rounds:</strong> Will have different characters, constraints, or number of spots on the boat.</p>
              <div style={{marginBottom: '20px'}}><strong>Game Board:</strong></div>
              <img src="img/wgc.gif" style={{margin:"auto", width: "600px"}}/>
              <p></p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {(!inside && !showInstructions) ? (
                  <Button onClick={() => {
                    const jumpTo = "showInstructions";
                    this.handleButton({jumpTo});
                  }}>
                    I have read and understood the Game Overview
                  </Button>
                ):
                <></>}
              </div>
            </div>
          ) : (
            <></>
          )}
           <div id="showInstructions" className={`${inside || showInstructions ? "opacity-100" : "opacity-0"}`} style={{ marginBottom: '20px' }}>
              <div style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "25px" }}> Instructions </p>
              <p>{otherPlayers.length > 0
                  ? 'Your team works on the same board and will contribute to shared moves. All players can agree to move on.'
                  : ''}
              </p>
              <ul style={{ listStyle: 'disc inside' }}>
                  <li>Place characters into the boat by dragging and dropping them over the boat.</li>
                  <li>A move is counted only when you shift the boat across the river bank (eg from left to right or from right to left)</li>
                  <li>Leaving two or more characters unattended when the constraints specify that one character will eat another will result in a failed attempt. This will require you to reset the board.</li>
                  <li>Characters are considered “unattended” if the boat is on the opposite side of the river from them.</li>
                  <li>You {otherPlayers.length > 0 ? "and your team" : "" } have an unlimited number of attempts and may reset the board at any point in the game.</li>
                  <li>The constraints of each round are listed once the round begins. For example, a constraint may be "The Triceratops will eat the Grass". You will fail if you leave the Triceratops on the same side as the Grass.</li>
              </ul>
              <p>Note: No eating ever occurs on the boat</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {(!inside && !showPerformance) ? (
                  <Button onClick={() => {
                    const jumpTo = "showPerformance";
                    this.handleButton({jumpTo});
                  }}>
                    I have read and understood the Instructions
                  </Button>
                ):
                <></>}
              </div>
            </div>
          </div>
          <div id="showPerformance" className={`${inside || showPerformance ? "opacity-100" : "opacity-0"}`} style={{ marginBottom: '20px' }}>
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "25px" }}> Scoring </p>
              <p>
              Your score is determined by the number of moves it takes you to get all characters to the right side.
              You must get all characters to the right to score any points.
              The more moves you take, the less points you will score. We will only keep your best solution each round. 
              This score will be calculated during the experiment.
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {(!inside && !showPractice) ? (
                  <Button onClick={() => {
                    const jumpTo = "showPractice";
                    this.handleButton({jumpTo});
                  }}>
                    I have read and understood the Scoring
                  </Button>
                ):
                <></>}
              </div>
            </div>
          </div>
          <div id="showPractice" className={`${inside || showPractice ? "opacity-100" : "opacity-0"}`} style={{ marginBottom: '20px' }}>
            <p style={{fontSize: '25px'}}> Practice </p>
            <p>
              After the Instructions page, there will be a practice round.
              This practice will not count towards your score.
            </p>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {(!inside && !showQuiz) ? (
                  <Button onClick={() => {
                    const jumpTo = "showQuiz";
                    this.handleButton({jumpTo});
                  }}>
                    I have read and understood the first round is Practice
                  </Button>
                ):
                <></>}
            </div>
          </div>
          {!inside && (
            <div id="showQuiz" className={`${inside || showQuiz ? "opacity-100" : "opacity-0"}`}>
              <FormSection title='Comprehension Check'>
                <FormLabel id='q1' name='What is the main activity in this game?'>
                  <RadioGroup
                    name='q1'
                    onChange={this.handleChange}
                    value={q1}
                    options={[
                      {
                        label: 'To guess a correlation',
                        value: 'q1_a',
                      },
                      {
                        label: 'To move characters from one side to another',
                        value: 'q1_b',
                      },
                      {
                        label: 'To move your cursor over dots',
                        value: 'q1_c',
                      },
                    ]}
                  />
                </FormLabel>
                <FormLabel id='q2' name='Will this game have a score at the end of each round?'>
                  <RadioGroup
                    name='q2'
                    onChange={this.handleChange}
                    value={q2}
                    options={[
                      {
                        label: 'Yes, it is calculated at the end of each round.',
                        value: 'q2_a',
                      },
                      {
                        label: 'No, it is calculated after the experiment ends.',
                        value: 'q2_b',
                      },
                    ]}
                  />
                </FormLabel>
              </FormSection>
              {submitted && !valid ? (
                <div className="my-8">
                  <Callout title={"You have one or more mistake(s)"}>Please ensure that you answer the questions correctly, or go back to the instructions.</Callout>
                </div>
              ) : (
                <div className="mt-8"></div>
              )}
            </div>
            )}
        </div>
        <Idle {...this.props} />
      </>
    );
  }
}
