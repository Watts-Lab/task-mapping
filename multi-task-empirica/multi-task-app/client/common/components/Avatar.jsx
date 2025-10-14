import Tippy from "@tippy.js/react";
import React from "react";

export function Avatar({ player, noTooltip = false }) {
  const { name, svg, color, url } = player.get("avatar");

  return (
    <PAvatar
      name={name}
      svg={svg}
      color={color}
      url={url}
      playerID={player._id}
      noTooltip={noTooltip}
    />
  );
}

export function PAvatar({
  name,
  svg,
  color,
  url = null,
  playerID,
  noTooltip = false,
}) {
  let out;
  if (svg) {
    out = (
      <div
        className="inline-block h-full w-full rounded-full bg-white p-1"
        dangerouslySetInnerHTML={{ __html: svg }}
      ></div>
    );
  } else {
    out = (
      <img
        className="inline-block h-full w-full rounded-full"
        src={url || `https://avatars.dicebear.com/v2/gridy/${playerID}.svg`}
        alt="Avatar"
      />
    );
  }

  if (name && !noTooltip) {
    out = (
      <div className="avatar-tooltip">
        <Tippy content={name}>{out}</Tippy>
      </div>
    );
  }

  return (
    <div className="inline-block h-full w-full rounded-full ring-1 ring-gray-100">
      {out}
    </div>
  );
}
