import React, { Component } from "react";

export class AbstractGridUI extends Component {
  render() {
    const { startingGrid, getValue, updateGrid, handleHover, getColor } = this.props;
    return (
      <div className="w-min border-2 border-black">
        {startingGrid.map((row, i) => (
          <div className="flex" key={i}>
            {row.map((cell, j) => (
              <div
                onMouseEnter={() => handleHover && handleHover(i, j)}
                key={j}
                style={{background: getColor && getColor(i, j)}}
                className={`h-12 w-12  border-black hover:bg-green-100 ${
                  getValue(i, j) == 0 ? "white" : "bg-green-500"
                } ${startingGrid[i][j] === 0 ? "border" : "border-2"}`}
                onClick={() => updateGrid(i, j)}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default AbstractGridUI;
