import React, {Component} from 'react';

import SyncedInputWrapper from '../../../client/common/components/SyncedInputWrapper';
import {TaskLayout} from '../../../client/common/TaskLayout';
import {Button} from '../../../client/common/components/Button';
import Etherpad from '../../Etherpad';
import Instructions from '../intro/Instructions';
import ViewInstructions from '../../../client/common/components/ViewInstructions';

export default class AllocatingResources extends Component {
  constructor(props) {
    super(props);

  }

  changeAllocationAmount = (i, e) => {
    const {stage, game} = this.props;

    const val = parseInt(e.target.value.replace(/,/g, ''));
    if (isNaN(val) && e.target.value !== '') {
      return;
    }

    const allocations = stage.get('allocations');
    allocations[i].money = val;
    stage.set('allocations', allocations);

    this.pos = e.target.selectionStart;
    this.target = e.target;
    this.setCursor = false;

    const matches = val.toLocaleString().substring(0, this.pos).match(/,/g);
    const commasBefore = (matches || []).length;

    this.pos += commasBefore - this.lastCommasBefore; //offset
    this.lastCommasBefore = commasBefore;

    game.players.forEach(curPlayer => curPlayer.set('approved', false));

    const totalMoney = stage.get('constants').money;
    const moneyUsed = allocations.reduce(
      (acc, allocation) => acc + (isNaN(allocation.money) ? 0 : allocation.money),
      0
    );

    let score = 0;
    if (moneyUsed <= totalMoney) {
      score = Math.floor((100 * moneyUsed) / totalMoney);
    }

    game.players.forEach((player, i) => {
      player.stage.set('scoreFeedback', score);

      const scoreArr = player.stage.get('scoreArr');
      scoreArr.push(score);
      player.stage.set('scoreArr', scoreArr);
    });

    game.players.forEach(curPlayer => curPlayer.set('approved', false));
  };

  componentDidMount() {
    const {game} = this.props;
    this.lastCommasBefore = 0;
    game.players.forEach(curPlayer => curPlayer.set('approved', false));
  }

  componentDidUpdate() {
    if (!this.setCursor) {
      this.target?.setSelectionRange(this.pos, this.pos);
      this.setCursor = true;
    }
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
    const {stage, player, game} = this.props;
    const task_constants = stage.get('constants');
    const moneyLeft =
      task_constants.money +
      stage.get('allocations').reduce((acc, allocation) => acc - allocation.money, 0);
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
            Proposals received from various organizations for projects are listed below.
          </div>

          {/* <div className='flex flex-col items-center'>
            <div className='underline'>Proposed Projects:</div>
            <ul className='list-outside list-disc'>
              {task_constants.projects.map((project, i) => (
                <li className='my-2' key={i}>
                  <span className='font-medium'>{project.project}</span> (Needs: $
                  {project.amountNeeded.toLocaleString()})
                </li>
              ))}
            </ul>
          </div>

          <div>
            Please enter your allocations below with your group. While there is no optimal
            allocation, your group performance will be evaluated by judges based on how persuasive
            your arguments for the allocation are.
          </div> */}
          <div className='flex items-center justify-center'>
            Total Amount to Allocate:&nbsp;
            <span
              className='text-2xl font-medium'
            >
              ${task_constants.money.toLocaleString()}
            </span>
          </div> 
          <div className='flex items-center justify-center'>
            Amount Left to Allocate:&nbsp;
            <span
              className={`text-2xl font-medium ${
                moneyLeft > 0 ? 'text-green-600' : 'text-red-500'
              }`}
            >
              ${moneyLeft.toLocaleString()}
            </span>
          </div>
          <div className='flex flex-col gap-6'>
            {stage.get('allocations').map((allocation, i) => {
              return (
                <div key={i}>
                  <div className='font-medium'>
                    Project {i + 1}: {allocation.project} (Needs: $
                    {allocation.amountNeeded.toLocaleString()})
                  </div>
                  <div>
                    Amount (in dollars):
                    <SyncedInputWrapper id={`amount${i}`} stage={stage} player={player} game={game}>
                      <input
                        className='focus:ring-sky-500 focus:border-sky-500 mx-1 mt-1 w-32 max-w-lg rounded-md border-gray-300 shadow-sm sm:max-w-xs sm:text-sm'
                        type='tel'
                        value={
                          allocation.money === 0
                            ? allocation.money.toLocaleString()
                            : parseInt(allocation.money)
                            ? parseInt(allocation.money).toLocaleString()
                            : ''
                        }
                        onChange={e => this.changeAllocationAmount(i, e)}
                      />
                    </SyncedInputWrapper>
                  </div>
                </div>
              );
            })}
            <div>
              Reasoning:
              <Etherpad {...this.props} padId={Object.keys(stage.get('etherpadData'))[0]} />
            </div>
          </div>
        </div>
      </TaskLayout>
    );
  }
}
