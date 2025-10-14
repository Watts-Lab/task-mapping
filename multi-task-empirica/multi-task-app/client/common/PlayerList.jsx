import Tippy from "@tippy.js/react";
import React from "react";
import { Avatar } from "./components/Avatar";

export const PlayerList = ({ players, tooltip = null }) => {
  let p = (
    <div className="flex -space-x-1">
      {players.map((player) => (
        (!player.online || player.exitStatus) ? (
          <div
            key={player.id}
            className="inline-block h-8 w-8 opacity-25 rounded-full ring-2 ring-white"
          >
            <Avatar noTooltip={Boolean(tooltip)} player={player} />
          </div>
        ) : (player.get("approved") ? (
          <div
            key={player.id}
            className="inline-block h-8 w-8 rounded-full ring-4 ring-green-500"
          >
            <Avatar noTooltip={Boolean(tooltip)} player={player} />
          </div>
        ) : (
          <div
            key={player.id}
            className="inline-block h-8 w-8 rounded-full ring-4 ring-red-500"
          >
            <Avatar noTooltip={Boolean(tooltip)} player={player} />
          </div>
        ))
      ))}
    </div>
  );

  if (tooltip) {
    p = <Tippy content={tooltip}>{p}</Tippy>;
  }

  return p;
};
