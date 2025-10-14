import React from "react";
import Quiz from "./BasicQuiz";
import Instructions from "./Instructions";
import { Steps } from "../../../client/common/Steps";

export default function (props) {
  return <Steps {...props} steps={[Instructions, Quiz]} />;
}
