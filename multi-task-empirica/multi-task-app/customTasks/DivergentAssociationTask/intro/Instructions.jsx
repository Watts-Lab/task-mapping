import React, { Component } from "react";
import Idle from '../../Idle';
import { RadioGroup } from '/client/common/components/Input';
import { FormLabel, FormSection } from '/client/common/components/Form';
import { Callout } from '/client/common/components/Callout';
import { Button } from "/client/common/components/Button";

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

  componentDidMount() {
    const {inside} = this.props;

    if (!inside) {
      const { player } = this.props;
      player.stage.set("correct", false);
      if (player.stage.get("directionsCompleted") != true) {
        player.stage.set("directionsCompleted", false)
        player.stage.set("showOverview", true)
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const answers = {
      q1: 'most_different',
      q2: 'no',
      //maxScore: '100'
    }
    const { player } = this.props;
    const valid = _.isMatch(this.state, answers);

    if (prevState.valid !== valid) {
      player.stage.set('directionsCompleted', valid);
      this.setState({ valid });
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
  
  render() {
    const {submitted, inside, game, player } = this.props
    const {q1, q2, valid} = this.state;
    const { showOverview, showInstructions, showPerformance, showPractice, showQuiz } = this.state;

    let otherPlayers = [];

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
            <div style={{marginBottom: '20px'}}>
              <p style={{fontSize: '25px'}}> Game Overview </p> 
              <p>
                In this game, you will come up with a list of words.
              </p>
              <strong>Goal:</strong> Enter words that are as different from each other as possible, in all meanings and uses of the word.
              <p>
              <strong>Rounds:</strong> Will have different numbers of words to enter.
              </p>
              <p></p>
              <div style={{marginBottom: '20px'}}><strong>Game Board:</strong></div>
              <img src="img/dat.gif" />
              <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'center'}}> 
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
        ): 
            <></>
          }
          <div id="showInstructions" className={`${inside || showInstructions ? "opacity-100" : "opacity-0"}`} style={{ marginBottom: '20px' }}>
              <p style={{fontSize: '25px'}}> Instructions </p> 
                <div>{otherPlayers.length > 0 ? "Your team works on the same list and will submit one shared response. All players must agree to move on.": "" }</div>
                Entries in the list must be:
                  <ul style={{ listStyle: 'disc inside', marginLeft: '40px'}}>
                    <li>Single words in English</li>
                    <li>Only nouns (e.g. things, objects, concepts)</li>
                    <li>No proper nouns (e.g. no specific people or places)</li>
                    <li>No specialized vocabulary (e.g. no technical terms)</li>
                    <li>Think of the words on your own (e.g. do not just look at objects in your surroundings)</li>
                  </ul>
                <ul style={{ listStyle: 'disc inside'}}>
                <li> 
                  Add words to the Sandbox List to brainstorm different possible entries {otherPlayers.length > 0 ? "with your team" : "" }.
                </li>
                <li>
                  Move words to the Final List before submission. {otherPlayers.length > 0 ? "Your team shares one final list." : "" }
                </li>
                <li> 
                  Only words in the Final List will be graded.
                </li>
                <div style={{ height: "10px"}}></div>
              </ul>
              <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'center'}}> 
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
          <div id="showPerformance" className={`${inside || showPerformance ? "opacity-100" : "opacity-0"}`} style={{ marginBottom: '20px' }}>
            <p style={{fontSize: '25px'}}> Scoring </p> 
              <p> 
                Your score is determined by how different the words in the Final List are from each other, in all meanings and uses of the words.
                This score will be calculated after the experiment ends.
              </p>
              <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'center'}}> 
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

          <div id="showPractice" className={`${inside || showPractice ? "opacity-100" : "opacity-0"}`} style={{ marginBottom: '20px' }}>
              <p style={{fontSize: '25px'}}> Practice </p>
              <p>
                After the Instructions, there will be a practice round.
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
                <FormLabel id='q1' name='What is the main activity of this game?'> 
                  <RadioGroup
                    name='q1'
                    onChange={this.handleChange}
                    value={q1}
                    options={[
                      {
                        label: 'To come up with words as different from each other as possible using the Final list.',
                        value: 'most_different',
                      },
                      {
                        label: 'To come up with the most number of words using the Sandbox list.',
                        value: 'number_words',
                      },
                      {
                        label: 'Both of the above.',
                        value: 'both',
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
                        value: 'yes',
                      },
                      {
                        label: 'No, it is calculated after the experiment ends.',
                        value: 'no',
                      },
                    ]}
                  />
                </FormLabel>
              </FormSection>

              {submitted && !valid ? (
                <div className='my-8'>
                  <Callout title={'You have one or more mistake(s)'}>
                    Please ensure that you answer the questions correctly, or go back to the
                    instructions.
                  </Callout>
                </div>
              ) : (
                <div className='mt-8'></div>
              )}
            </div>
          )}
        </div>

        <Idle {...this.props} />
      </>
    );
  }
}
