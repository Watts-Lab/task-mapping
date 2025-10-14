import React from 'react';
import {Callout} from '../../../client/common/components/Callout';
import {FormLabel, FormSection} from '../../../client/common/components/Form';
import {RadioGroup} from '../../../client/common/components/Input';
import { Button } from '/client/common/components/Button';

export default class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goal: '',
      scoring: '',
      submitted: false,
      valid: false,
    };
  }

  componentDidUpdate() {
    const answers = {
      goal: 'most_different',
      scoring: 'no',
      //maxScore: '100'
    }
    const {goal, scoring, maxScore, valid: prevValid} = this.state;
    const valid = _.isMatch(this.state, answers);

    if (prevValid !== valid) {
      this.setState({valid});
      this.props.onValid(valid);
    }
  }

  handleChange = event => {
    const el = event.currentTarget;
    this.setState({[el.name]: el.value.trim().toLowerCase()});
    this.setState({ submitted: false })
  };

  checkSolutions() {
    const { valid } = this.state;
    const { player } = this.props
    this.setState({ submitted: true })
    if (valid) {
      player.stage.set("directionsCompleted", true)
    } else  {
      player.stage.set("directionsCompleted", false)
    }
  }

  render() {
    const {goal, scoring, maxScore, valid} = this.state;
    return (
      <div>
        <p style={{fontSize: '25px', width: '500px'}}> Comprehension Check </p> 
        {this.state.submitted && !valid ? (
            <div className='my-8'>
              <Callout title={'You have one or more mistake(s)'}>
                Please ensure that you answer the questions correctly, or go back to the instructions.
              </Callout>
            </div>
          ) : (
            <div className='mt-8'></div>
        )}
        <FormSection style={{margin: '40px'}}>
          <FormLabel id='goal' name='What is the main activity of this game?'>
            <RadioGroup
              name='goal'
              onChange={this.handleChange}
              value={goal}
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
          <FormLabel id='scoring' name='Will this game have a score at the end of each round?'>
            <RadioGroup
              name='scoring'
              onChange={this.handleChange}
              value={scoring}
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
        <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'center'}}> 
            <Button onClick={this.checkSolutions.bind(this)}> 
              Check Answers
            </Button> 
        </div>
        <div style={{height: '50px'}}></div>
      </div>
    );
  }
}

 /* <FormLabel id='maxScore' name='What is the maximum score you can earn from all rounds of this game combined?'>
            <RadioGroup
              name='maxScore'
              onChange={this.handleChange}
              value={maxScore}
              options={[
                {
                  label: '10',
                  value: '10',
                },
                {
                  label: '50',
                  value: '50',
                },
                {
                  label: '100',
                  value: '100',
                },
              ]}
            />
          </FormLabel> */
