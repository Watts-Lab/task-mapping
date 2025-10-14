import React, { Component } from "react"
import Room from "../props/Room"
import { Button } from "../../../../client/common/components/Button"
import BoatRoom from "../props/BoatRoom"
import WolfSvg from "../assets/WolfSvg"
import CabbageSvg from "../assets/CabbageSvg"
import GoatSvg from "../assets/GoatSvg"
import { checkWin, calculateScore, calcCapacity, emptyBoat, endConditions, setCharacter} from '../../api/api'

export default class InstanceOne extends Component {
  constructor(props) {
    super(props)
    /*
     * State codes:
     * onBoat: null for empty, wolf for wolf, etc.
     * sides = [wolf, goat, cabbage]: 0 = left, 1 = right
     * status: 0 = none, 1 = lost, 2 = won
     */
  }

  moveBoat(paramSide) {
    const { stage, player, game } = this.props
    const { maxPossibleScore, fewestMoves } = stage.get("constants")
    const config = stage.get("wgc-config")
    const { boatSide, sides, moves } = config
    const selected = config.onBoat[0]
    game.players.forEach((curPlayer) => curPlayer.set("approved", false));

    if (boatSide !== paramSide) {
      config.boatSide = paramSide
      if (selected !== null) {
        switch (selected) {
          case "wolf":
            if (sides[0] === 0) {
              config.sides[0] = 1
            } else {
              config.sides[0] = 0
            }
            break
          case "goat":
            if (sides[1] === 0) {
              config.sides[1] = 1
            } else {
              config.sides[1] = 0
            }
            break
          case "cabbage":
            if (sides[2] === 0) {
              config.sides[2] = 1
            } else {
              config.sides[2] = 0
            }
            break
        }
      }

      config.moves = moves + 1
      config.onBoat = [null]
      stage.set("wgc-config", config)

      const propCheck = config.boatSide === "left" ? 1 : 0;

      const wolfGoat = sides[0] == propCheck && sides[1] == propCheck
      const goatCabbage = sides[1] == propCheck && sides[2] == propCheck

      endConditions([wolfGoat, goatCabbage], stage, player, config, game);
    }
  }

  renderBoard() {
    const { player, stage, game } = this.props
    const config = stage.get("wgc-config")
    const { boatSide, status, onBoat } = config
    const boatCharacter = onBoat[0]
    const wolfSide = config.sides[0] === 0 ? "left" : "right"
    const goatSide = config.sides[1] === 0 ? "left" : "right"
    const cabbageSide = config.sides[2] === 0 ? "left" : "right"

    return (
      <>
        <div style={{ justifyItems: "center", margin: "1rem 0.5rem 0rem 0.5rem", display: "grid", gridTemplateColumns: "1fr 3fr 1fr" }}>
          <div
            id="left-column"
            style={{
              position: "relative",
              margin: "0.5rem",
              paddingBottom: "0.5rem",
              width: "11rem",
              maxWidth: "11rem",
              height: "36rem",
              maxHeight: "36rem",
            }}
          >
            <div
              style={{
                padding: "0",
                visibility: status === 1 || status === 2 ? "visible" : "hidden",
                width: "11rem",
                maxWidth: "11rem",
                height: "36rem",
                maxHeight: "36rem",
                position: "absolute",
                opacity: "0",
              }}
            ></div>
            {wolfSide === "left" && boatCharacter !== "wolf" && <Room character="wolf" stage={stage} game={game} player={player} />}
            {goatSide === "left" && boatCharacter !== "goat" && <Room character="goat" stage={stage} game={game} player={player} />}
            {cabbageSide === "left" && boatCharacter !== "cabbage" && <Room character="cabbage" stage={stage} game={game} player={player} />}
          </div>
          <div id="middle column" style={{ backgroundColor: "#bfdbfe", borderRadius: "5px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
            <div id="second-left-column" style={{ paddingLeft: "2rem" }}>
              <div id="boat">
                <div
                  style={{
                    marginTop: "1rem",
                    padding: "0 0 0 0",
                    width: "10rem",
                    maxWidth: "10rem",
                    height: "11rem",
                    maxHeight: "11rem",
                  }}
                >
                  {boatSide === "left" && <BoatRoom character="boat" sides={config.sides} setCharacter={setCharacter} stage={stage} game={game} player={player} />}
                </div>
                {boatSide === "left" && boatCharacter !== null && (
                  <div
                    className={`bp3-card`}
                    style={{
                      marginTop: "1rem",
                      marginLeft: "0.5rem",
                      marginRight: "0.5rem",
                      paddingBottom: "0.5rem",
                      width: "144px",
                      height: "136px",
                    }}
                  >
                    {boatCharacter === "wolf" && <WolfSvg />}
                    {boatCharacter === "goat" && <GoatSvg />}
                    {boatCharacter === "cabbage" && <CabbageSvg />}
                  </div>
                )}
              </div>
            </div>
            <div id="middle">
              <div style={{ marginTop: "1rem", textAlign: "center" }}>
                <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                  <h2>Moves Taken: {config.moves}</h2>
                </div>
                <div style={{ textAlign: "center", marginBottom: "0.5rem", marginRight: "0.5rem" }}>
                  <div style={{ display: "inline", width: "4rem" }}>
                    <Button style={{ marginRight: "0.5rem" }} disabled={status === 1 || status === 2} onClick={() => this.moveBoat("left")}>
                      ←
                    </Button>
                    <Button disabled={status === 1 || status === 2} onClick={() => this.moveBoat("right")}>
                      →
                    </Button>
                  </div>
                </div>
                <div style={{ display: "block" }}>
                  <div style={{ marginBottom: "0.5rem", marginRight: "0.5rem" }}>
                    <Button disabled={status === 1 || status === 2} onClick={() => emptyBoat(1, config, stage)}>
                      Empty boat
                    </Button>
                  </div>
                </div>
              </div>
              <div
                style={{
                  margin: "auto",
                  color: "black",
                  backgroundColor: "#93c5fd",
                  paddingTop: "0.5rem",
                  paddingBottom: "0.5rem",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                  borderRadius: "5px",
                  border: "1px solid #60a5fa",
                  width: "15rem",
                  maxWidth: "15rem",
                }}
              >
                <p style={{ textAlign: "center" }}>
                  <strong>Constraints:</strong>
                </p>
                <ul>
                  <li>- Remaining seats: {1 - calcCapacity(onBoat)}</li>
                  <li>- No eating occurs on boat</li>
                  <br></br>
                  <li>- Wolf eats Goat</li>
                  <li>- Goat eats Cabbage</li>
                </ul>
              </div>
              <div style={{ display: "grid" }}>
                <div style={{ marginTop: "2rem", textAlign: "center" }}>
                  {status === 1 && (
                    <>
                      <div
                        style={{ margin: "auto", color: "#dc2626", backgroundColor: "#fee2e2", padding: "1rem", borderRadius: "5px", border: "1px solid #f87171", width: "15rem", maxWidth: "15rem" }}
                      >
                        <div>
                          <strong>Incorrect!</strong>
                          <p>A constraint was broken:</p>
                        </div>
                        <ul>
                          <li>- Wolf and Goat</li>
                          <li>- Goat and Cabbage</li>
                        </ul>
                        <br></br>
                        <p>Click reset to try again</p>
                      </div>
                    </>
                  )}
                  {status === 2 && (
                    <div style={{ margin: "auto", color: "#059669", backgroundColor: "#d1fae5", padding: "1rem", borderRadius: "5px", border: "1px solid #34d399", width: "15rem", maxWidth: "15rem" }}>
                      <div style={{ textAlign: "center" }}>
                        <p>Complete!</p>
                        <p>Click Approve Configuration to move on or reset to try again</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div id="second-right-column" style={{ paddingLeft: "1rem" }}>
              <div
                style={{
                  marginTop: "1rem",
                  padding: "0 0 0 0",
                  width: "10rem",
                  maxWidth: "10rem",
                  height: "11rem",
                  maxHeight: "11rem",
                }}
              >
                {boatSide === "right" && <BoatRoom onBoat={config.onBoat[0]} sides={config.sides} setCharacter={setCharacter} character="boat" stage={stage} game={game} player={player} />}
              </div>
              {boatSide === "right" && boatCharacter !== null && (
                <div
                  className={`bp3-card`}
                  style={{
                    marginTop: "1rem",
                    marginLeft: "0.5rem",
                    paddingBottom: "0.5rem",
                    width: "144px",
                    height: "136px",
                  }}
                >
                  {boatCharacter === "wolf" && <WolfSvg />}
                  {boatCharacter === "goat" && <GoatSvg />}
                  {boatCharacter === "cabbage" && <CabbageSvg />}
                </div>
              )}
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#dcfce7",
              borderRadius: "2px",
              position: "relative",
              margin: "0.5rem",
              padding: "0.5rem",
              width: "11rem",
              maxWidth: "11rem",
              height: "38rem",
              maxHeight: "38rem",
            }}
          >
            <div
              style={{
                padding: "0",
                visibility: status === 1 || status === 2 ? "visible" : "hidden",
                width: "11rem",
                maxWidth: "11rem",
                height: "36rem",
                maxHeight: "36rem",
                position: "absolute",
                opacity: "0",
              }}
            ></div>
            {wolfSide === "right" && boatCharacter !== "wolf" && <Room character="wolf" stage={stage} game={game} player={player} />}
            {goatSide === "right" && boatCharacter !== "goat" && <Room character="goat" stage={stage} game={game} player={player} />}
            {cabbageSide === "right" && boatCharacter !== "cabbage" && <Room character="cabbage" stage={stage} game={game} player={player} />}
          </div>
        </div>
      </>
    )
  }

  approve() {
    const { game, player } = this.props
    player.set("approved", true)
    if (game.players.reduce((prev, curPlayer) => prev && (curPlayer.get("approved") || curPlayer.exitStatus))) {
      game.players.forEach((curPlayer) => curPlayer.stage.submit())
    }
  }

  render() {
    return <>{this.renderBoard()}</>
  }
}
