import React from "react";
import Timer from "./components/Timer.jsx";
import { nameToAvatar } from "../../customTasks/avatars";

export default class PlayerProfile extends React.Component {
  renderProfile() {
    const { player } = this.props;
    return (
      <div className="profile-score">
        <h3>Your Profile</h3>
      </div>
    );
  }

  renderScore() {
    const { player } = this.props;
    return (
      <div className="profile-score">
        <h4>Total score</h4>
        <span>{(player.get("score") || 0).toFixed(2)}</span>
      </div>
    );
  }

  render() {
    const { game, stage } = this.props;

    return (
      <aside className="player-profile">
        {this.renderProfile()}
        {game.treatment.feedback && this.renderScore()}
        <Timer stage={stage} />
      </aside>
    );
  }
}
