import React, { Component } from "react";
import ShowList from "./ShowList";

export class ShowLists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listIndex: 0,
    };
  }

  changeIndex = (i) => {
    this.setState((prevState, props) => ({
      listIndex:
        (prevState.listIndex + i + props.lists.length) % props.lists.length,
    }));
  };

  incrementIndex = () => {
    this.setState(
      (prevState) => ({
        listIndex: prevState.listIndex + 1,
      }),
      () => {
        if (this.state.listIndex === this.props.lists.length) {
          this.props.setStep(2);
        }
      }
    );
  };

  componentDidMount() {
    this.intervalID = setInterval(
      this.incrementIndex,
      this.props.timeBetweenLists
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    const { lists } = this.props;
    const { listIndex } = this.state;
    return (
      <div className="flex flex-row">
        {/* <Button
          className="h-10 w-10"
          type="button"
          onClick={() => this.changeIndex(-1)}
          rightIcon="arrow-left"
        /> */}
        <ShowList list={lists[listIndex]} />
        {/* <Button
          className="h-10 w-10"
          type="button"
          onClick={() => this.changeIndex(1)}
          rightIcon="arrow-right"
        /> */}
      </div>
    );
  }
}

export default ShowLists;
