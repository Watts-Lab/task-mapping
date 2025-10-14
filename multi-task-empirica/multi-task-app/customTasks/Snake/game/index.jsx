import React from "react";
import { TaskLayout } from "../../../client/common/TaskLayout";
import SnakeUI from "./SnakeUI";
import Instructions from "../intro/Instructions";
import ViewInstructions from "../../../client/common/components/ViewInstructions";

export default function Snake(props) {


  return (
    <TaskLayout {...props}>
        <div style={{position:"absolute", bottom:"5px", right:"330px"}}>
          <ViewInstructions inside={true} instruction={Instructions} props></ViewInstructions>
        </div>
      <SnakeUI {...props} saveScore />
    </TaskLayout>
  );
}
