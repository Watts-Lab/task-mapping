import React from "react";

import { Centered } from "../common/components/Layouts";

export default class Thanks extends React.Component {
  static stepName = "Thanks";
  render() {
    return (
      <Centered>
        <div className="prose mt-8">
          <h2>Finished</h2>
          <p>Thank you for participating!</p>
        </div>
      </Centered>
    );
  }
}
