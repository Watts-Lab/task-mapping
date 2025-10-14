import React from "react";
import CanvasWrapper from "../../../client/common/helper/CanvasWrapper";
import { calculateDist } from "../helper/helper";

export default class SocialExposure extends React.Component {
  constructor(props) {
    super(props);

    const { game, round, stage, player } = this.props;

    this.taskConstants = stage.get('constants');

    if (this.hideExposure()) {
      return;
    }

    this.connectedPlayers = [];

    this.exposureConstants = round.stages.find(
      (stage) => stage.data.stageNum === this.taskConstants.exposureStage
    ).data.constants;

    for (const entry of game.treatment.networkStructure.split(",")) {
      const split = entry.split("-").map((s) => parseInt(s));
      const playerInd = this.getPlayerIndex(player._id);

      let otherPlayerInd;
      if (split[0] === playerInd) {
        otherPlayerInd = split[1];
      } else if (split[1] === playerInd) {
        otherPlayerInd = split[0];
      }

      if (otherPlayerInd !== undefined) {
        this.connectedPlayers.push(otherPlayerInd);
      }
    }

    this.canvasRefs = Array(game.players.length);

    for (const otherPlayerInd of this.connectedPlayers) {
      this.canvasRefs[otherPlayerInd] = React.createRef();
    }

    this.collaborativeCanvasRef = React.createRef();
  }

  hideExposure() {
    return (
      !this.taskConstants.exposureStage || this.taskConstants.exposureStage <= 0
    );
  }

  getPlayer(playerInd) {
    const { game } = this.props;
    return game.players.find((p) => p._id === game.playerIds[playerInd - 1]);
  }

  getPlayerIndex(playerId) {
    const { game } = this.props;
    return game.playerIds.findIndex((id) => id === playerId) + 1;
  }

  getCanvasRef(playerInd) {
    if (playerInd !== undefined) {
      return this.canvasRefs[playerInd];
    } else {
      return this.collaborativeCanvasRef;
    }
  }

  getEdges(playerInd) {
    const { round } = this.props;

    if (playerInd !== undefined) {
      const playerId = this.getPlayer(playerInd)._id;
      return round.stages[this.taskConstants.exposureStage].data.record[
        playerId
      ];
    }

    return round.stages[this.taskConstants.exposureStage].data.edges;
  }

  createWrapper(playerInd) {
    const edges = this.getEdges(playerInd);

    const edgesPoints = edges.map((edge) => [
      this.exposureConstants.cities[edge[0]],
      this.exposureConstants.cities[edge[1]],
    ]);

    const route = {
      lines: edgesPoints,
      width: this.exposureConstants.lineWidth,
      type: "lines",
    };

    const cities = {
      points: this.exposureConstants.cities,
      radius: this.exposureConstants.dotRadius,
      type: "circles",
    };

    return new CanvasWrapper(this.getCanvasRef(playerInd), {
      route: route,
      cities: cities,
    });
  }

  renderSocialInteraction(playerInd) {
    const { game } = this.props;

    const playerId =
      playerInd !== undefined ? this.getPlayer(playerInd)._id : undefined;

    return (
      <div className="alter" key={playerId ?? ""}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {playerInd && (
            <>
              <div
                key={playerId}
                title={this.getPlayer(playerInd).get("avatar")["name"]}
                dangerouslySetInnerHTML={{
                  __html: this.getPlayer(playerInd).get("avatar")["svg"],
                }}
                style={{ maxWidth: "2em" }}
              />
              <div key={`${playerId}_id`}>{playerId}</div>
            </>
          )}

          {game.treatment.feedback && (
            <div>
              {"Distance is: " +
                (calculateDist(this.getEdges(playerInd), this.exposureConstants.cities) ?? "Invalid")}
            </div>
          )}

          <canvas
            ref={this.getCanvasRef(playerInd)}
            width={200}
            height={200}
            style={{ maxWidth: "200px" }}
          />
        </div>
      </div>
    );
  }

  componentDidMount() {
    if (this.hideExposure()) {
      return;
    }

    if (this.exposureConstants.collaboration) {
      this.createWrapper(undefined).draw();
    } else {
      for (const player of this.connectedPlayers) {
        this.createWrapper(player).draw();
      }
    }
  }

  render() {
    const connectedPlayers = this.connectedPlayers;
    const exposureStage = this.taskConstants.exposureStage;

    if (this.hideExposure()) {
      return null;
    }

    const collaboration = this.exposureConstants.collaboration;

    if (!collaboration && connectedPlayers.length === 0) {
      return null;
    }

    return (
      <div className="social-exposure">
        <p>
          <strong>Here are path(s) drawn for round {exposureStage}:</strong>
        </p>
        {collaboration
          ? this.renderSocialInteraction(undefined)
          : connectedPlayers.map((p) => this.renderSocialInteraction(p))}
      </div>
    );
  }
}
