import React from "react";
import PAvatar from '/client/common/components/Avatar'

const ARROW_WIDTH1 = 100;
const ARROW_WIDTH2 = 80;
const ARROW_ASPECT_RATIO = 2.5;
const ARROW_HEIGHT1 = ARROW_WIDTH1 / ARROW_ASPECT_RATIO;
const ARROW_HEIGHT2 = ARROW_WIDTH2 / ARROW_ASPECT_RATIO;

class Arrow extends React.Component {

  getAvatar = (id) => {
    const { game, player } = this.props;
    const foundPlayer = game.players.find(p => p._id === id);
    if (foundPlayer) {
      return [foundPlayer.get("avatar").color, foundPlayer.get("avatar").svg];
    }
    return null;
  };

  render() {
    const { angle, boardSize, size = 3, readOnly = false, average = false } = this.props;
    const { id, stage, player } = this.props;

    let style, color;

    const width = ARROW_WIDTH2 * size;
    const height = ARROW_HEIGHT2 * size;

    const baseStyle = {
      position: "absolute",
      left: boardSize / 2 - width / 2,
      top: boardSize / 2 - height / 2,
      transform: `rotate(${angle}rad)`,
      pointerEvents: "none",
      width: width,
      height: height,
    };

    if (readOnly) {
      color = this.getAvatar(id)[0];
      style = {
        ...baseStyle,
        opacity: 0.3,
      };
    }
    else {
      const width = ARROW_WIDTH1 * size;
      const height = ARROW_HEIGHT1 * size;
      color = 'hsl(0, 0%, 0%)';
      style = {
        ...baseStyle,
        opacity: 1,
        zIndex: 1,
      };
    }

    if (average) {
      const width = ARROW_WIDTH2 * size;
      const height = ARROW_HEIGHT2 * size;
      color = `hsl(354, 100%, 50%)`;
      style = {
        ...baseStyle,
        opacity: 0.5,
      };
    }

    return (
      <div style={style}>
        <svg viewBox={`0 0 ${90} ${30}`}>
          <path
            transform="translate(45, 2)"
            fill={color}
            d={readOnly ? "M27.665, 14.625H1.111 C 0.492,14.626 0,15.118 0,15.737c 0,0.619 0.492,1.127 1.111,1.127h 26.554c 0.619, 0 1.111, -0.508 1.111, -1.127c 0,-0.619 -0.492,-1.127 -1.111,-1.127" :
              "M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111 C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587 c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z"}
          />
        </svg>
        {readOnly ? <div style={{width: 30, height: 30, transform: 'rotate(90deg) translate(-59px,-275px)'}} dangerouslySetInnerHTML={{ __html: this.getAvatar(id)[1] }}></div>: <></>}

      </div>
    );
  }
}

export default Arrow;
