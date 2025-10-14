import React from "react";
import Quiz from "./Quiz";
import Introduction from "./Introduction";
import Instructions from "./Instructions";
import Demo from "./Demo";
import { Steps } from "../../../client/common/Steps";
import Pay from "../../../client/common/Pay";

export default function (props) {
  return <Steps {...props} steps={[Introduction, Pay, Instructions, Demo, Quiz]} />;
}
