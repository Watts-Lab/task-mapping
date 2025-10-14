import React from "react"
import { logAction } from "../../../../client/common/helper/logger"
import CabbageSvg from "../assets/CabbageSvg"

export default class Cabbage extends React.Component {
  handleDragStart = (e) => {
    const { stage, player } = this.props
    const dragger = stage.get("cabbage-dragger")

    e.dataTransfer.effectAllowed = "move"
    if (dragger) {
      e.preventDefault()
      console.debug("dragger")

      return
    }

    stage.set("cabbage-dragger", player._id)
    logAction(player, "draggingStudent", "cabbage")
    e.dataTransfer.setData("text/plain", "cabbage")
  }

  handleDragOver = (e) => {
    e.preventDefault()
  }

  handleDragEnd = (e) => {
    e.preventDefault()
    const { stage, player } = this.props
    stage.set("cabbage-dragger", null)

    //if dropped into non-allowed area
    if (e.dataTransfer.dropEffect === "none") {
      logAction(player, "releasedStudent", "cabbage")
    }
  }

  render() {
    const { stage, game, player } = this.props
    this.isDragabble = true 
    const dragger = stage.get("cabbage-dragger")
    const { onBoat } = stage.get("wgc-config")

    const selectable = onBoat.every(selected => selected !== "cabbage")

    let style = 1
    const cursorStyle = { cursor: null }
    if (dragger) {
      const playerDragging = game.players.find((p) => p._id === dragger)
      if (playerDragging) {
        style = 0.5
        if (playerDragging._id != player._id) {
          const pl = player._id
        }
        this.isDragabble = playerDragging._id == player._id
      }
    } else {
      cursorStyle.cursor = "move"
    }

    return (
      <div>
        {selectable && (
          <div draggable={this.isDragabble} onDragStart={this.handleDragStart} onDragOver={this.handleDragOver} onDragEnd={this.handleDragEnd} style={{ ...cursorStyle, margin: "0.25rem 0.5rem" }}>
            <div style={{ opacity: `${style}`, width: "100px", height: "100px" }}>
              <CabbageSvg />
            </div>
          </div>
        )}
      </div>
    )
  }
}
