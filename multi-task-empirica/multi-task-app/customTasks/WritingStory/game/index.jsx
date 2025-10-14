import React, {Component} from 'react';
import {TaskLayout} from '../../../client/common/TaskLayout';
import {Button} from '../../../client/common/components/Button';
import Etherpad from '../../Etherpad';
import Instructions from '../intro/Instructions';
import ViewInstructions from '../../../client/common/components/ViewInstructions';

export default class WritingStory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };
  }

  componentDidMount() {
    const {game} = this.props;
    game.players.forEach(curPlayer => curPlayer.set('approved', false));
  }

  approve() {
    const {stage, game, player} = this.props;
    player.set('approved', true);

    if (
      game.players.length === 1 ||
      game.players.reduce(
        (prev, curPlayer) =>
          prev && (curPlayer.get('approved') || curPlayer.exitStatus || !curPlayer.online)
      )
    ) {
      game.players.forEach(curPlayer => {
        curPlayer.stage.submit();
      });
    }
  }

  render() {
    const {stage, player} = this.props;

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
        <div className='my-6 mx-auto flex w-5/6 flex-col gap-y-8'>
          <div>
            <h3
              style={{
                fontSize: '20px',
              }}
            >
              Write a response to the prompt below:
            </h3>
            <p
              style={{
                fontWeight: 'bold',
                fontSize: '18px',
              }}
            >
              {stage.get('constants').question}
            </p>
          </div>
          <div>
            <Etherpad {...this.props} padId={Object.keys(stage.get('etherpadData'))[0]} />
          </div>
        </div>
      </TaskLayout>
    );
  }
}
