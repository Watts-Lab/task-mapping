import React from "react";

export class FoodList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { stage, round } = this.props 
    return (
      <div>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "24px",
            marginBottom: "0.5rem",
            marginLeft: "5rem",
            marginTop: "5rem",
          }}
        >
          List
        </div>
        <ul
          style={{
            fontSize: "16px",
            marginLeft: "5rem",
            marginTop: "1rem",
          }}
        >
          {stage.get('constants').list.map((d) => (
            <li key={d.name}>{d.name}</li>
          ))}
        </ul>
        <p> {} </p>
      </div>
    );
  }
}
