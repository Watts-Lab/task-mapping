import React from "react";

export default function SyncedInputWrapper({ children, id, stage, player, game }) {
  const handleChange = (e) => {
    stage.set(id, player.id);
    children.props.onChange(e);
  };

  const handleBlur = () => {
    stage.set(id, undefined);
  };

  const getColor = (id) => {
    const p = game.players.find(p => p.id === id)
    if (p.id === player.id) return null
    return player.get("avatar").color
  }

  const disabled = stage.get(id) && stage.get(id) !== player.id;

  return (
    <>
      {React.cloneElement(children, {
        disabled: disabled,
        style: disabled ? {border: '2px solid', borderColor: getColor(stage.get(id))} : {}, 
        onChange: handleChange,
        onBlur: handleBlur,
      })}
    </>
  );
}
