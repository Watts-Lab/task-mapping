import React from 'react';

import TaskResponse from './TaskResponse';
import {SandboxStimulus, FinalWordStimulus} from './TaskStimulus';

class TaskSandbox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='taskSandbox'>
        <TaskResponse {...this.props} />
        <SandboxStimulus {...this.props} />
      </div>
    );
  }
}

class TaskFinal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='taskSandbox'>
        <FinalWordStimulus {...this.props} />
      </div>
    );
  }
}

export {TaskSandbox, TaskFinal};
