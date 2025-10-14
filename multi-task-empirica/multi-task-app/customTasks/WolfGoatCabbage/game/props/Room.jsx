import React from "react"
import { logAction } from "../../../../client/common/helper/logger"
import Wolf from "./Wolf.jsx"
import Goat from "./Goat.jsx"
import Cabbage from "./Cabbage"
import Caterpillar from "./Catterpillar"

export default class RoomOne extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hovered: false }
    this.taskConstants = this.props.stage.get("constants")
  }

  handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    this.setState({ hovered: true })
  }

  handleDragLeave = (e) => {
    this.setState({ hovered: false })
  }

  resetRoom() {
    this.setState({ hovered: false })
  }

  handleDrop = (e) => {
    e.preventDefault()
    const { game, stage, player, character } = this.props
    const student = e.dataTransfer.getData("text/plain")
    stage.set(`${character}-dragger`, null)
    const currentRoom = stage.get(`${character}`)

    this.setState({ hovered: false })

    if (currentRoom === character) {
      logAction(player, "releasedStudent", character)
      return
    }

    stage.set(`${character}`, character)
    logAction(player, "movedStudent", student)
    game.players.forEach((curPlayer) => curPlayer.set("approved", false))
  }

  render() {
    const { isDeck, character, stage, ...rest } = this.props

    return (
      <div
        onDrop={this.handleDrop}
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
        style={{
          margin: "0.5rem",
          padding: "auto",
          minWidth: "9rem",
          minHeight: isDeck ? "7rem" : "8.5rem",
        }}
      >
        <h6 style={{ textAlign: "center" }}>
          <strong>{character}</strong>
        </h6>
        {character === "wolf" ? (
          <div style={{ display: "flex", marginLeft: "1rem", flexWrap: "wrap" }}>
            <Wolf onDragStart={this.handleDragStart} stage={stage} {...rest} />
          </div>
        ) : null}
        {character === "goat" ? (
          <div style={{ display: "flex", marginLeft: "1rem", flexWrap: "wrap" }}>
            <Goat onDragStart={this.handleDragStart} stage={stage} {...rest} />
          </div>
        ) : null}
        {character === "cabbage" ? (
          <div style={{ display: "flex", marginLeft: "1rem", flexWrap: "wrap" }}>
            <Cabbage onDragStart={this.handleDragStart} stage={stage} {...rest} />
          </div>
        ) : null}
        {character === "caterpillar" ? (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <Caterpillar
              onDragStart={this.handleDragStart}
              stage={stage}
              {...rest}
            />
          </div>
        ) : null}
      </div>
    )
  }
}
