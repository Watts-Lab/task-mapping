import React from "react";
import taskWhiteList from "../../customTasks/taskWhiteList";
import Loading from "../common/components/Loading";
import ImportedComponent from "../common/ImportedComponent";

taskWhiteList();

export default class Task extends React.Component {
  componentDidUpdate() {
    const { player, stage } = this.props;

    // Skip if we're not quitting state early
    if (!player.get("quitStageEarly")) {
      return;
    }

    if (
      stage.get("stage_type") === "intro" ||
      stage.get("stage_count") === stage.playerStageIds.length
    ) {
      player.set("quitStageEarly", false);
    } else {
      player.stage.submit();
    }
  }

  render() {
    if (this.props.player.get("quitStageEarly")) {
      return <Loading />;
    }

    return (
      <div className="h-full overflow-hidden">
        <ImportedComponent
          {...this.props}
          componentPath={this.props.stage.get("component_path")}
        />
      </div>
    );
  }
}
