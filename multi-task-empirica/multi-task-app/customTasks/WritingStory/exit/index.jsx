import React from "react";
import { Steps } from "../../../client/common/Steps";
import FeedbackForm from "../../../client/common/FeedbackForm";
import Instructions from "../intro/Instructions";

export default function (props) {
  return (
    <div style={{
      height: "92vh"
      }}>       
      <Steps {...props} steps={[FeedbackForm]} instructions={<Instructions inside={true} props></Instructions>}/>
    </div> 
  )
}
