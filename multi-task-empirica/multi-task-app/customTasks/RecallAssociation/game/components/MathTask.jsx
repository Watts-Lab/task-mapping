import React, { Component } from "react";
import { Button } from "../../../../client/common/components/Button";
import MathProblem from "./MathProblem";

export class MathTask extends Component {
  constructor(props) {
    super(props);
    this.childRefs = new Array(props.numberOfProblems);
    for (let i = 0; i < props.numberOfProblems; i++) {
      this.childRefs[i] = React.createRef();
    }
  }

  handleSubmitProblems = () => {
    var allCorrect = true;
    this.childRefs.forEach((ref) => {
      allCorrect = ref.current.checkIfCorrect() && allCorrect;
    });
    if (allCorrect) {
      this.props.setStep(3);
    }
  };

  render() {
    const { numberOfProblems } = this.props;
    return (
      <div>
        {this.childRefs.map((ref, i) => (
          <MathProblem key={i} ref={ref} />
        ))}
        <Button onClick={this.handleSubmitProblems}>Submit Problems</Button>
      </div>
    );
  }
}

export default MathTask;
