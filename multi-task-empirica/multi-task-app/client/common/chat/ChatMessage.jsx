import React from "react";
import { PAvatar } from "../components/Avatar";

export default class ChatMessage extends React.Component {
  renderTime = (timeStamp) => {
    if (!timeStamp) {
      return null;
    }

    const d = new Date(timeStamp);
    if (d.getTime() <= 0) {
      return null;
    }

    const hours = d.getHours();
    const minutes = d.getMinutes();

    if (!hours || !minutes) {
      return null;
    }

    const h = hours.toString().padStart(2, "0");
    const m = minutes.toString().padStart(2, "0");

    return (
      <div className="px-1 text-xs text-gray-400">
        {h}:{m}
      </div>
    );
  };

  renderName = (isSelf, player) => {
    if (isSelf) return null;
    return (
      <div
        className="pb-1 font-medium font-bold"
        style={{
          color: player.avatar.color
        }}
      >
        {player.avatar.name}
      </div>
    );
  };

  renderAvatar = (isSelf, player) => {
    if (isSelf) return null;

    return (
      <div className="pt-2">
        <div className="h-6 w-6">
          <PAvatar
            name={player.avatar.name}
            svg={player.avatar.svg}
            playerID={player._id}
            noTooltip
          />
        </div>
      </div>
    );
  };

  render() {
    const { message, player } = this.props;
    const { player: msgPlayer, text, timeStamp } = message;

    const isSelf = player._id == msgPlayer._id;

    return (
      <div className={`flex px-2 py-1 text-sm ${isSelf ? "justify-end" : ""}`}>
        <div style={{ maxWidth: isSelf ? "75%" : "90%" }}>
          <div className="flex space-x-2">
            {this.renderAvatar(isSelf, msgPlayer)}
            <div
              className={`flex flex-col space-y-1 ${isSelf ? "items-end" : ""}`}
            >
              <div
                className={`rounded px-2 py-2 ${
                  isSelf ? "bg-sky-500 text-white" : "bg-gray-100 text-gray-700"
                }`}
              >
                {this.renderName(isSelf, msgPlayer)}
                <div className="text">{text}</div>
              </div>
              {this.renderTime(timeStamp)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
