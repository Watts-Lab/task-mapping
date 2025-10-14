import React from "react";
import { Steps } from "../../../client/common/Steps";
import Quiz from "./Quiz";
import Instructions from "./Instructions";

export default function (props) {
  return (
    <div style={{
      height: "92vh"
    }}> 
      <Steps {...props} steps={[Instructions, Quiz]} />
    </div>
    )
}
