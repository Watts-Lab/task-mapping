import React, { Component } from "react";
import AbstractGridUI from "../game/AbstractGridUI";

const grid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

export class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: grid,
    };
  }

  updateGrid = (x, y) => {
    this.setState((prevState) => ({
      grid: Array.from(prevState.grid, (row, i) =>
        Array.from(row, (cell, j) => (i == x && y == j ? cell + 1 : cell))
      ),
    }));
  };

  getValue = (x, y) => this.state.grid[x][y] % 2;

  render() {
    return (
      <div>
        <div className="flex flex-col items-center">
          <div className="prose">
            <h2>Demo</h2>
          </div>
          <p>Click spaces below to see how squares can be manipulated.</p>
          <AbstractGridUI
            startingGrid={grid}
            getValue={this.getValue}
            updateGrid={this.updateGrid}
          />
        </div>
      </div>
    );
  }
}

export default Demo;
