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
    const { inside } = this.props;

    if (!inside) {
      const { player } = this.props;
      player.stage.set("correct", false);
      if (player.stage.get("directionsCompleted") != true) {
        player.stage.set("directionsCompleted", false);
        player.stage.set("showOverview", true);
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const answers = {
      q1: 'q1_a',
      q2: 'q2_a',
    };
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
    this.setState({ [ele.name]: ele.value.trim().toLowerCase() });
  };

  handleButton = event => {
    const jumpTo = event.jumpTo;
    // set state of next section to true and jump to that section
    this.setState({[jumpTo] : true}); // button has been clicked so set state to true
    document.getElementById(jumpTo).scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    const { submitted, inside, game, player } = this.props;
    const { q1, q2, valid } = this.state;
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
          {(inside || showOverview) ? (<div style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "25px" }}> Game Overview </p>
                <p>In this game, you will create a room assignment plan by assigning a group of students into dorm rooms.</p>
                <p><strong>Goal:</strong> Create the room assignment plan that maximizes overall satisfaction for the group.</p>
                <p><strong>Rounds:</strong> Will have different numbers of students, rooms, or payoff calculations.</p>
              <p></p>
              <div style={{marginBottom: '20px'}}><strong>Game Board:</strong></div>
              <div>
                <img src='img/gif_room_assignment.gif' alt="gif of game" />
              </div>
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
            <p style={{ fontSize: "25px" }}> Instructions </p>
            <p>{otherPlayers.length > 0
              ? 'Your team works on the same room assignment plan and will submit one shared response. All players must agree to move on.'
              : ''}
            </p>
            <ul style={{ listStyle: 'disc inside' }}>
              <li>Assign students to rooms by dragging and dropping them into the rooms.</li>
              <li>Note that for each student and room, there is a different payoff.</li>
              <li>The specific constraints of each round are listed once the round begins.</li>
              <li>Keep in mind some general constraints: some students can't live together or be neighbors, some students must live together or be neighbors</li>
              <li>Rooms can be left empty</li>
              <li>All students should be placed in a room.</li>
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
            <p style={{ fontSize: "25px" }}> Scoring </p>
            <p>
              Your score is determined by the payoff from the final room assignment plan.
              It will be normalized with the maximum payoff possible (final score = your payoff / max payoff).
              This score will be calculated during the experiment.
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
            <p style={{ fontSize: '25px' }}> Practice </p>
            <p>
              After the Instruction page, there will be a practice round.
              This practice will not count towards your score.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                        label: 'To allocate people to rooms.',
                        value: 'q1_a',
                      },
                      {
                        label: 'To allocate funds to requests.',
                        value: 'q1_b',
                      },
                      {
                        label: 'To allocate animals to owners.',
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
