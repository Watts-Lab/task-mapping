import React from "react"
import ChatContainer from "./chat/ChatContainer"
import { Avatar } from "./components/Avatar"
import { PlayerList } from "./PlayerList"

export default class Sidebar extends React.Component {
  render() {
    const { game, player } = this.props

    const { name } = player.get("avatar") || {}
    const showChat = this.props.game.treatment.chat
    const neighborsIndexes = player.get("neighbors") ? player.get("neighbors").map((n) => parseInt(n)) : []
    const neighbors = game.players.filter((p) => neighborsIndexes.includes(p.get("index")))
    const solo = game.players.length === 1

    return (
      <div className={`sidebar border-l border-gray-200 ${solo ? "solo" : ""}`}>
        <div className="flex h-14 items-center justify-between border-b border-gray-200 bg-gray-50 py-2 px-2 text-sm font-medium leading-4 text-gray-600">
          <div className="flex items-center space-x-2 ">
            <div className="h-11 w-11">
              <Avatar player={player} noTooltip />
            </div>
            <div
              className="font-bold"
              style={{
                color: player.get("avatar").color,
              }}
            >
              {name || player.id}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex flex-col items-center justify-center">
              <div className="text-sky-600 text-lg font-semibold leading-6">{player.stage.get("score")}</div>
              <div className="text-xs uppercase tracking-wide text-gray-400">Game Score</div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="text-sky-600 text-lg font-semibold leading-6">{player.get("score")}</div>
              <div className="text-xs uppercase tracking-wide text-gray-400">Total Score</div>
            </div>
          </div>
        </div>

        {solo ? null : (
          <div className="flex h-12 items-center justify-between border-b border-gray-200 py-2 px-2 text-sm font-medium leading-4 text-gray-600">
            <PlayerList players={neighbors} />
            <div>{neighbors.length} neighbors</div>
          </div>
        )}

        <div className="relative h-full overflow-hidden">
          {solo || !showChat ? (
            <div className="absolute inset-0 z-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
              <div className="text-md font-medium text-white">Chat Disabled</div>
            </div>
          ) : null}
          <ChatContainer player={this.props.player} round={this.props.round} game={this.props.game} />
        </div>
      </div>
    )
  }
}
