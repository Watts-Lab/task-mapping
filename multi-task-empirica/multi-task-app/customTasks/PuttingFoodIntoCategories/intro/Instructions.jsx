import React, {Component} from 'react';
import {Callout} from '../../../client/common/components/Callout';
import {FormLabel, FormSection} from '../../../client/common/components/Form';
import {RadioGroup} from '../../../client/common/components/Input';
import Idle from '/customTasks/Idle';
import {Button} from '/client/common/components/Button';

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
      q1: 'q1_b',
      q2: 'q2_b',
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
    const { showOverview, showInstructions, showPerformance, showPractice, showQuiz } = this.state;

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
              <p style={{fontSize: '25px'}}> Game Overview </p>
                <p>
                 In this game, you will create classifications for a list of foods. 
                </p>
                <p>
                <strong>Goal:</strong> Generate as many different classifications as possible.
                </p>
                <p>
                <strong>Rounds:</strong> Each round will contain different types of food items.
                </p>
              <p></p>
              <div style={{marginBottom: '20px'}}><strong>Game Board:</strong></div>
              <img src='img/categorize-food.gif' alt="gif of game" />
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
              <div style={{marginBottom: '20px'}}>
              <p style={{fontSize: '25px'}}> Instructions </p>
              <p>
              {otherPlayers.length > 0 ? (
                  'Your team will work on the same list and will submit one shared response. All players can click "Approve Configuration" to move on.'
                ) : (
                  'You can click "Approve Configuration" to move on.'
                )}
              </p>
              <ul style={{ listStyle: 'disc inside'}}>
                <li>Enter as many unique classifications as possible within the time limit.</li>
                <li>A classification contains two characteristics that divide the items in the list.</li>
                <li>All items should fall into one of the two characteristics.</li>
              </ul>
              <div style={{ height: "10px"}}></div>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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
            <p style={{fontSize: '25px'}}> Scoring </p>
              <p>
              The score is determined by the number of unique classifications. More classifications score more points. 
              Classifications that are repeated will not count.
              The score will be calculated after the game ends.
              </p>
              <div style={{ height: "10px"}}></div>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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
              <div style={{ height: "10px"}}></div>
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
                        label:'To describe every food item in a list.',
                        value: 'q1_a',
                      },
                      {
                        label: 'To categorize food items in a list to divide the items.',
                        value: 'q1_b',
                      },
                      {
                        label: 'To paint every food item in a list in their natural color.',
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
