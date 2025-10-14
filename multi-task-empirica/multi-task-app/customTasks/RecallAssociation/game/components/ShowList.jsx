import React, { Component } from "react";
import '../ShowList.css';

export class ShowList extends Component {
  render() {
    const { list } = this.props;
    if (!list) return <></>;
    return (
      <div
      // className="w-64 flex justify-center"
      >
        <div
        // className="w-32"
        className="nonSelectableText"
        >
          <h1>{list.target}</h1>
          <ol>
            {list.words.map((word, i) => (
              <li key={i}>{word}</li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default ShowList;
