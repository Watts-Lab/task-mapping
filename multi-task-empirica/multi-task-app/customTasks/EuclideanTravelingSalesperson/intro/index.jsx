import React from "react";
import Instructions from "./Instructions";
import Quiz from "./BasicQuiz";
import { Steps } from "../../../client/common/Steps";

export default function (props) {
  return <Steps {...props} steps={[Instructions, Quiz]} />;
}
