import React from "react";

import TaskResponse from "./TaskResponse";
import { SimilaritiesList } from "./TaskStimulus";

class List extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="taskSandbox">
        <TaskResponse {...this.props} />
        <SimilaritiesList {...this.props} />
      </div>
    );
  }
}

export { List };
