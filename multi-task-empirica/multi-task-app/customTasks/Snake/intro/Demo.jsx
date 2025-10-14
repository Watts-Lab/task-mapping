import React from "react";
import SnakeUI from "../game/SnakeUI";

export default function Demo(props) {
  return (
    <div>
      <div className="flex justify-center">
        <div className="prose">
          <h2>Demo</h2>
        </div>
      </div>
      <SnakeUI {...props} />
    </div>
  );
}
