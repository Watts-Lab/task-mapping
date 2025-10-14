import React from "react";
import Instructions from "../intro/Instructions";
import { Steps } from "../../../client/common/Steps";
import Quiz from "../intro/BasicQuiz";

export default function (props) {
  return (
    <div style={{
      height: "92vh"
    }}> 
      <Steps {...props} steps={[Instructions]} />
    </div>
  )
}
