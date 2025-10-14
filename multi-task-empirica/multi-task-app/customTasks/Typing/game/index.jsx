import React from 'react';

import {TaskLayout} from '../../../client/common/TaskLayout';
import {Button} from '../../../client/common/components/Button';
import {RadioGroup} from '../../../client/common/components/Input';
import {Callout} from '../../../client/common/components/Callout';
import CaseText from './CaseText';
import './TextStyle.css';
import Etherpad from '../../Etherpad';
import ViewInstructions from '../../../client/common/components/ViewInstructions';
import Instructions from '../intro/Instructions';

export default class Typing extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.state = {
      showModal: false,
    };
  }

  componentDidMount() {
    const {game} = this.props;
    // should update when changes made in diff parts of task
    game.players.forEach(curPlayer => curPlayer.set('approved', false));
  }

  handleChange(event) {
    const {stage, game, player} = this.props;
    const el = event.currentTarget;
    stage.set('option', el.value);
    if ((stage.get('isDisagree'), true)) {
      stage.set('isDisagree', false);
    }
    for (let currPlayer of game.players) {
      if (
        currPlayer.get('approved') == true &&
        currPlayer.stage.get('option') !== '' &&
        currPlayer.stage.get('option') != stage.get('option')
      ) {
        stage.set('isDisagree', true);
        game.players.forEach(curPlayer => curPlayer.set('approved'), false);
      }
    }
    player.stage.set('option', el.value);
  }

  reset() {
    const {game, stage} = this.props;
    stage.set('option', '');
    game.players.forEach(curPlayer => curPlayer.set('approved'), false);
    game.players.forEach(curPlayer => curPlayer.stage.set('option', ''));
    stage.set('isDisagree', false);
  }

  approve() {
    const {stage, game, player} = this.props;
    player.set('approved', true);

    if (
      game.players.length === 1 ||
      game.players.reduce(
        (prev, curPlayer) => prev && (curPlayer.get('approved') || curPlayer.exitStatus)
      )
    ) {
      game.players.forEach(curPlayer => {
        curPlayer.stage.submit();
      });
    }
  }

  render() {
    const {stage, player, game} = this.props;
    const otherPlayers = _.reject(game.players, p => p._id === player._id);

    return (
      <TaskLayout
        {...this.props}
        nextForm={() => (
          <div className='flex h-full items-center justify-center space-x-1'>
            <Button
              type='submit'
              onClick={this.approve.bind(this)}
              disabled={player.get('approved')}
            >
              Approve Configuration
            </Button>
          </div>
        )}
      >
        <div style={{position: 'absolute', bottom: '5px', right: '330px'}}>
          <ViewInstructions inside={true} instruction={Instructions} props></ViewInstructions>
        </div>
        <div className='case-text' style={{display: "flex", flexDirection: "row"}}>
          <div className="case-story mr-10 px-2" style={{width: "50%", overflow: "scroll", height:"80vh"}}>
            <CaseText text={stage.get('case')} />
          </div>
          <div className="case-story mr-10 px-2" style={{width: "50%", overflow: "scroll", height:"80vh"}}>
            <div>
              <strong>
                {otherPlayers.length > 0
                  ? 'All the players in your group will work on the same board. Read through the provided text and type it exactly into the provided text box. Click Approve Configuration to move on.'
                  : 'Read through the provided text and type it exactly into the provided text box. Click Approve Configuration to move on'}
              </strong>
            </div>
            <Etherpad {...this.props} padId={Object.keys(stage.get('etherpadData'))[0]} />
          </div>
          {stage.get('isDisagree') ? (
            <div className='my-8'>
              <Callout title={'Someone in your team changed the response.'}>
                Agree on one option with all teammates before clicking Approve
                Configuration.
              </Callout>
            </div>
          ) : (
            <div className='mt-8'></div>
          )}
        </div>
      </TaskLayout>
    );
  }
}
