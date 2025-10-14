import React from 'react';
import {TimeSync} from 'meteor/mizzao:timesync';
import moment from 'moment';
import {Button} from '../../../client/common/components/Button';
import {Callout} from '../../../client/common/components/Callout';

export default class TaskResponse extends React.Component {
  state = {
    inputValue: '',
    inputError: false,
  };

  handleChange = event => {
    const {game, player} = this.props;
    const value = event.target.value;
    // only allow value to be set if it is character
    // this lets participants input random character as the first letter - not sure why
    // code modified from https://stackoverflow.com/questions/52846347/reactjs-cannot-restrict-user-input-to-letters-only
    // if (value === "" || /^[A-Za-z]+$/.test(value))
    // this should be changed to appending to the list (figure it out after making the redering function)
    this.setState({inputValue: value, inputError: false});
    game.players.forEach(curPlayer => curPlayer.set('approved', false));
  };

  handleSubmit = event => {
    const {stage, player, game} = this.props;
    const newVal = {
      name: player._id,
      word: this.state.inputValue,
    };
    event.preventDefault();
    if (newVal.word.trim() !== '') {
      const list = [];
      for (var i = 0; i < stage.get('sandboxWordList').length; i++) {
        const str = stage.get('sandboxWordList')[i].word;
        list.push(str);
      }
      if (!list.includes(newVal.word.trim())) {
        newVal.word = newVal.word.trim();
        stage.set('sandboxWordList', stage.get('sandboxWordList').concat(newVal));
      }
      stage.append('log', {
        verb: 'addedWord',
        subjectId: player._id,
        object: this.state.inputValue,
        at: moment(TimeSync.serverTime(null, 1000)),
      });
      this.setState({inputValue: ''});
      game.players.forEach(curPlayer => curPlayer.set('approved', false));
    } else {
      this.setState({
        inputError: true,
      });
    }
  };

  renderErrorMessage() {
    const error = this.state.inputError;
    if (error) {
      return (
        <Callout title={'Incompatible Slogan'}>
          Please make sure that you have entered a slogan.
        </Callout>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div>
        <form
          className='task-response'
          onSubmit={this.handleSubmit}
          style={{
            fontSize: '14px',
            marginLeft: '5rem',
          }}
        >
          <p> </p>
          {this.renderInput()}
          <p> </p>
          <Button type='submit' onClick={this.handleSubmit}>
            Add Response to Drafts
          </Button>
        </form>
        <h1></h1>
        {this.renderErrorMessage()}
      </div>
    );
  }

  renderInput() {
    const value = this.state.inputValue;
    return (
      <div>
        <textarea
          type='text'
          onChange={this.handleChange}
          value={value}
          required
          style={{
            width: '50rem',
            height: '25rem',
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        />
      </div>
    );
  }
}
