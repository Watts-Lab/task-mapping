import { Chat } from "@empirica/chat";
import { TimeSync } from "meteor/mizzao:timesync";
import React, { Component } from "react";
import { PlayerList } from "../PlayerList";
import ChatFooter from "./ChatFooter";
import ChatMessage from "./ChatMessage";

function playersForGroup(game, group) {
  return game.players.filter((player) =>
    (player.get("chatGroups") || []).includes(group)
  );
}

export default class ChatContainer extends Component {
  constructor(props) {
    super(props);

    const { game, player } = props;
    const groups = player.get("chatGroups") || [];

    this.groups = groups.map((group) => ({
      group,
      players: playersForGroup(game, group),
    }));

    // this.groups = this.groups.concat(this.groups).concat(this.groups);

    this.state = { activeGroup: groups[0] };
  }

  setActiveGroup = (activeGroup) => {
    const { newMessagesGroup } = this.state;
    const groups = _.reject(newMessagesGroup, (g) => g === activeGroup);
    this.setState({
      activeGroup,
      newMessagesGroup: groups,
    });
  };

  handleIncomingMessage = (msgs, customKey) => {
    const { activeGroup } = this.state;
    const { player } = this.props;

    // key already exist in groups
    if (this.state[customKey]) {
      return;
    }

    // player already on the same window
    if (activeGroup === customKey) {
      return;
    }

    this.setState({ [customKey]: true });
  };

  render() {
    const { activeGroup } = this.state;
    const { player, round } = this.props;

    if (this.groups.length === 0) {
      return null;
    }

    const commonProps = {
      player,
      scope: round,
      // synchronize times with server using TimeSync
      timeStamp: new Date(TimeSync.serverTime(null, 1000)),
    };

    return (
      <div className="relative h-full">
        {/* <div className="absolute inset-0 bg-red-500 opacity-20 flex items-center justify-center">
          <div className="text-2xl text-white transform -rotate-45 font-bold">
            CHAT WIP
          </div>
        </div> */}

        <div style={{ gridTemplateRows: `1fr auto` }} className="grid h-full">
          <div className="h-full overflow-hidden">
            {this.groups.map(({ group }) => {
              return (
                <div
                  key={group}
                  className={`grid grid-rows-1 ${
                    activeGroup == group ? "" : "hidden"
                  }`}
                >
                  <Chat
                    customClassName="mychat"
                    header={null}
                    message={ChatMessage}
                    footer={ChatFooter}
                    {...commonProps}
                    customKey={group}
                    onIncomingMessage={this.handleIncomingMessage}
                  />
                </div>
              );
            })}
          </div>

          <div className="overflow-x-auto pt-3">
            <div className="flex">
              {this.groups.map(({ group, players }) => {
                return (
                  <button
                    onClick={() =>
                      this.setState({ activeGroup: group, [group]: false })
                    }
                    key={group}
                    className={`relative flex h-12 items-center border-r border-t border-gray-200 px-3 ${
                      activeGroup == group
                        ? "bg-gray-200 shadow-inner"
                        : this.state[group]
                        ? "bg-sky-100"
                        : ""
                    }`}
                  >
                    {activeGroup == group ? (
                      <div className="absolute top-0 left-1/2 z-0 h-3 w-3 -translate-x-1/2 -translate-y-1.5 rotate-45 transform border-l border-t border-gray-200 bg-gray-200 shadow-inner"></div>
                    ) : null}
                    <div className="z-10">
                      <PlayerList
                        tooltip={`Group ${group}`}
                        players={players.filter((p) => p.id !== player.id)}
                      />
                    </div>
                  </button>
                );
              })}
              <div className="border-gray-200 flex-grow border-t"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
