import React from "react";

import TaskResponse from "./TaskResponse";
import { WordsList } from "./TaskStimulus";

class List extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="taskSandbox">
        <WordsList {...this.props} />
      </div>
    );
  }
}

export { List };
