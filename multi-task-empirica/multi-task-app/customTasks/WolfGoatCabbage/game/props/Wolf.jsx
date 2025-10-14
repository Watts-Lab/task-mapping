import React from "react"
import { logAction } from "../../../../client/common/helper/logger"
import WolfSvg from "../assets/WolfSvg"

export default class Wolf extends React.Component {
  handleDragStart = (e) => {
    const { stage, player } = this.props
    const dragger = stage.get("wolf-dragger")

    e.dataTransfer.effectAllowed = "move"
    if (dragger) {
      e.preventDefault()
      console.debug("dragger")

      return
    }

    stage.set("wolf-dragger", player._id)
    logAction(player, "draggingStudent", "wolf")
    e.dataTransfer.setData("text/plain", "wolf")
  }

  handleDragOver = (e) => {
    e.preventDefault()
  }

  handleDragEnd = (e) => {
    e.preventDefault()
    const { stage, player } = this.props
    stage.set("wolf-dragger", null)

    //if dropped into non-allowed area
    if (e.dataTransfer.dropEffect === "none") {
      logAction(player, "releasedStudent", "wolf")
    }
  }

  render() {
    const { stage, game, player } = this.props
    this.isDragabble = true // usually everyone can drag, except if it is colored (i.e., being dragged by someone else)
    const dragger = stage.get("wolf-dragger")

    const { onBoat } = stage.get("wgc-config")

    const selectable = onBoat.every(selected => selected !== "wolf")

    let style = 1
    const cursorStyle = { cursor: null }
    if (dragger) {
      const playerDragging = game.players.find((p) => p._id === dragger)
      if (playerDragging) {
        // style.fill = playerDragging.get("avatar").color
        style = 0.5
        if (playerDragging._id != player._id) {
          const pl = player._id
        }
        this.isDragabble = playerDragging._id == player._id //only one can drag at a time
      }
    } else {
      //if the student is NOT being dragged by anyone, then the cursor will be changed
      cursorStyle.cursor = "move"
    }

    return (
      <div>
        {selectable && (
          <div
            className="wolf"
            onDrop={this.handleDrop}
            draggable={this.isDragabble}
            onDragStart={this.handleDragStart}
            onDragOver={this.handleDragOver}
            onDragEnd={this.handleDragEnd}
            style={{ ...cursorStyle, margin: "0.25rem 0.5rem" }}
          >
            <div style={{ opacity: `${style}`, width: "100px", height: "100px" }}>
              <WolfSvg />
            </div>
          </div>
        )}
      </div>
    )
  }
}
