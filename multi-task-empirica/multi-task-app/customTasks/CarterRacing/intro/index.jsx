import React from "react";
import Instructions from "./Instructions";
import { Steps } from "../../../client/common/Steps";
import Quiz from "./Quiz";

export default function (props) {
  return (
    <div style={{
      height: "92vh"
    }} >
      <Steps {...props} steps={[Instructions, Quiz]} />;
    </div>
  )
}
