import React, {Component} from 'react';
import {Button} from '../../../client/common/components/Button';

export default class Instructions extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {inside} = this.props;
    if (!inside) {
      const {player} = this.props;
      if (player.stage.get('directionsCompleted') != true) {
        player.stage.set('directionsCompleted', false);
        player.stage.set('showOverview', true);
      }
    }
  }

  render() {
    let otherPlayers = [];
    const {inside, game, player} = this.props;
    if (!inside) {
      otherPlayers = _.reject(game.players, p => p._id === player._id);
    }

    return (
      <>
        <div>
          {inside || player.stage.get('showOverview') ? (
            <div style={{marginBottom: '20px'}}>
              <p style={{fontSize: '25px'}}> Game Overview </p>
              <p>
                {' '}
                One or two sentences that give the intuition of what has to be done and a visual
                demo of the task being played{' '}
              </p>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                {!inside && (
                  <Button onClick={() => player.stage.set('showInstructions', true)}>
                    I have read and understood the Game Overview
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <></>
          )}
          {inside || player.stage.get('showInstructions') ? (
            <div style={{marginBottom: '20px'}}>
              <p style={{fontSize: '25px'}}> Instructions </p>
              <p>
                {' '}
                Any details that are important about doing the task, with any visuals needed to
                explain specific mechanics. In some cases, for a task with a lot of instructions,
                this could be more than one "read more" section, split up to logically chunk the
                instructions.{' '}
              </p>
              <p> There will be a practice stage to begin this game.</p>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                {!inside && (
                  <Button onClick={() => player.stage.set('showPerformance', true)}>
                    I have read and understood the Instructions
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <></>
          )}
          {inside || player.stage.get('showPerformance') ? (
            <div style={{marginBottom: '20px'}}>
              <p style={{fontSize: '25px'}}> Performance Measurements </p>
              <p> How performance will be measured and how this will be converted into payment.</p>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                {!inside && (
                  <Button onClick={() => player.stage.set('directionsCompleted', true)}>
                    I have read and understood the Performance Measurements
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
}
