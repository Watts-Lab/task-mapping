import React, {Component} from 'react';
import Idle from '../../Idle';
import {RadioGroup} from '/client/common/components/Input';
import {FormLabel, FormSection} from '/client/common/components/Form';
import {Callout} from '/client/common/components/Callout';
import {Button} from '/client/common/components/Button';

import { AudioTest } from "./AudioTest";

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
      showTestAudio: false,
      showQuiz: false,
      valid: false,
    };
  }

  componentDidMount() {
    const {inside} = this.props;
    if (!inside) {
      const {player} = this.props;
      player.stage.set("correct", false);
      if (player.stage.get('directionsCompleted') != true) {
        player.stage.set('directionsCompleted', false);
        player.stage.set('showOverview', true);
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const answers = {
      q1: 'q1_c',
      q2: 'q2_a',
    };
    const {player} = this.props;
    const valid = _.isMatch(this.state, answers);

    if (prevState.valid !== valid) {
      player.stage.set('directionsCompleted', valid);
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

  render() {
    const {submitted, inside, game, player} = this.props;
    const {q1, q2, valid} = this.state;
    const { showOverview, showInstructions, showPerformance, showPractice, showTestAudio, showQuiz } = this.state;

    let otherPlayers = [];
    if (!inside) {
      otherPlayers = _.reject(game.players, p => p._id === player._id);
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
              <p style={{fontSize: '25px'}}> Overview </p>
                <p>In this game, you will hear a list of words and will then be asked to recall as many of them as possible.</p>
                <p><strong>Goal:</strong> After hearing the list, recall as many of the words as possible.</p>
                <p><strong>Rounds:</strong> Will contain different words.</p>
              <div style={{marginBottom: '20px'}}><strong>Game Board:</strong></div>
              <div>
                <img src='img/recall-word-lists.gif' alt="gif of game" />
              </div>
              <p></p>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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
              <p style={{fontSize: '25px'}}> Instructions </p>
              <p>
                {otherPlayers.length > 0
                  ? 'Your team works on the same response and will submit one shared response. All players can agree to move on.'
                  : ''}
              </p>
              <ul style={{ listStyle: 'disc inside' }}>
                <li>The audio will play shortly after the round starts. Please make sure your volume is turned up.</li>
                <li>If you are typing while the audio is playing, <b>you will not be able to participate in the round</b>.</li>
                <li>If you change your tab while the audio is playing, <b>you will not be able to participate in the round</b>.</li>
                <li>Type the last word shared in the audio in the box labelled "Last Word". This word MUST be correct to score any points.</li>
                <li>Enter the other words in any order in the list.</li>
              </ul>
              <p></p>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
                Your score is determined by the number of words that are correctly typed. Typed words must be spelled correctly in order to earn any points. 
                Any incorrect words will cause points to be deducted from your total score. The "last word" must be correct or you will score 0 points regardless 
                of how many other words you recalled correctly. This score will be calculated and displayed to you during the experiment.
              </p>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
                After the Instructions page, there will be a practice round.
                This practice will not count towards your score.
              </p>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              {(!inside && !showTestAudio) ? (
                  <Button onClick={() => {
                    const jumpTo = "showTestAudio";
                    this.handleButton({jumpTo});
                  }}>
                    I have read and understood the first round is Practice
                  </Button>
                ):
                <></>}
            </div>
          </div>



          <div id="showTestAudio" className={`${inside || showTestAudio ? "opacity-100" : "opacity-0"}`} style={{ marginBottom: '20px' }}>
              <p style={{fontSize: '25px'}}> Test Audio </p>
              <p>
                Make sure your volume is turned up. Click the below button to test that your audio is working.
              </p>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              
              <AudioTest {...this.props}
                audioFilePath={"sounds/test_audio.mp3"} />
              <p></p>

              {(!inside && !showQuiz) ? (
                  <Button onClick={() => {
                    const jumpTo = "showQuiz";
                    this.handleButton({jumpTo});
                  }}>
                    I confirm that my audio is working
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
                        label: 'To create a list of any words.',
                        value: 'q1_a',
                      },
                      {
                        label: 'To create a list of animals.',
                        value: 'q1_b',
                      },
                      {
                        label: 'To replicate the list of words stated in the audio',
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
