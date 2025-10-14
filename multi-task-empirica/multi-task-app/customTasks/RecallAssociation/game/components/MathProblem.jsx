import React, { Component } from "react";

export class MathProblem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      n1: 0,
      n2: 0,
      value: "",
      showError: false,
    };
  }

  componentDidMount() {
    this.setState({
      n1: Math.floor(Math.random() * 20),
      n2: Math.floor(Math.random() * 20),
    });
  }

  checkIfCorrect = () => {
    const { n1, n2, value } = this.state;
    if (value === undefined || value != n1 + n2) {
      this.setState({ showError: true });
      return false;
    }
    this.setState({ showError: false });
    return true;
  };

  handleChange = (e) => {
    if (isNaN(e.target.value)) return;
    this.setState({ value: e.target.value });
  };

  render() {
    const { n1, n2, value, showError } = this.state;
    return (
      <div className="flex h-16 flex-row">
        <div className="flex w-12 justify-end">{n1}</div>
        <div className="flex w-12 justify-end">+</div>
        <div className="flex w-12 justify-end">{n2}</div>
        <div className="flex w-12 justify-end">=</div>
        <input
          className="ml-4 h-8 w-12 rounded-md"
          type="tel"
          value={value}
          onChange={this.handleChange}
        />
        {showError && <div className="text-red-600">*</div>}
      </div>
    );
  }
}

export default MathProblem;
