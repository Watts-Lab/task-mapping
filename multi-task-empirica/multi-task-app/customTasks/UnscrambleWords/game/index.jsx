import React from "react";
import { TaskLayout } from "../../../client/common/TaskLayout";
import { Button } from "../../../client/common/components/Button";
import Instructions from "../intro/Instructions";
import ViewInstructions from "../../../client/common/components/ViewInstructions";
import SyncedInputWrapper from '../../../client/common/components/SyncedInputWrapper';

import { logAction } from '/client/common/helper/logger';

export default class TaskTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };
  }

  changeLastInput = (i, e) => {
    const {stage, player, game} = this.props; 
    const val = e.target.value.replace(/ /g, '').replace(/[^a-zA-Z]/g, '');

    const userInputList = stage.get('userInputList');
    userInputList[i].input = val;
    logAction(player, "changedWord", userInputList[i]);
    stage.set('userInputList', userInputList);

    this.pos = e.target.selectionStart;
    this.target = e.target;
    this.setCursor = false;

    game.players.forEach(curPlayer => curPlayer.set('approved', false));
  }

  componentDidMount() {
    const { game } = this.props;
    // should update when changes made in diff parts of task 
    game.players.forEach((curPlayer) => curPlayer.set("approved", false));
  }

  componentDidUpdate() {
    if (!this.setCursor) {
      this.target?.setSelectionRange(this.pos, this.pos);
      this.setCursor = true;
    }
  }

  approve() {
    const { game, player } = this.props;
    player.set("approved", true);
    if (
      game.players.reduce(
        (prev, curPlayer) =>
          prev && (curPlayer.get("approved") || curPlayer.exitStatus)
      )
    ) {
      game.players.forEach((curPlayer) => curPlayer.stage.submit());
    }
  }
    
  render() {
    const { round, stage, player, game } = this.props;
    
    return (
      <TaskLayout 
        {...this.props}
        nextForm={() => (
          <div className="flex h-full items-center justify-center space-x-1">
            <Button
              type="submit"
              onClick={this.approve.bind(this)}
              disabled={player.get("approved")}
            >
              Approve Configuration
            </Button>
          </div>
        )}>
        <div style={{position:"absolute", bottom:"5px", right:"330px"}}>
          <ViewInstructions inside={true} instruction={Instructions} props></ViewInstructions>
        </div>
        <div className='flex flex-col gap-6 justify-center items-center pt-6'>
          {stage.get('userInputList').map((singleInput, i) => {
            return (
              <div key={i}>
               <div>
               {singleInput.letters} 
                  <SyncedInputWrapper id={`input${i}`} stage={stage} player={player} game={game}>
                    <input
                    className='focus:ring-sky-500 focus:border-sky-500 mx-1 mt-1 w-40 max-w-lg rounded-md border-gray-300 shadow-sm sm:max-w-xs sm:text-sm'
                    type='text'
                    value={singleInput.input.toLocaleString()}
                    onChange={e => this.changeLastInput(i, e)}
                  />
                  </SyncedInputWrapper>
                {stage.get('displayFeedback') && ((singleInput.input).toUpperCase() === singleInput.word) && (
                <span className='text-green-500 ml-2'>CORRECT</span>)}
               </div>
              </div>
             );
           })}
        </div>
      </TaskLayout>
    );
  }
}
