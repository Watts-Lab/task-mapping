import React from "react";
import { Steps } from "../../../client/common/Steps";
import Instructions from "./Instructions";

export default function (props) {
  return (
    <Steps {...props} steps={[Instructions]} />
    )
}
