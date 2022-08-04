import React from "react";
import "./player.scss";

const Player = ({ player }) => {
  return (
    <article className="player_container">
      <div className="player_container__name">{player.name}</div>
      <div className="player_container__time">{player.seconds}</div>
    </article>
  );
};

export default Player;
