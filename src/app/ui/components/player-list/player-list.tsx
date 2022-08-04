import React from "react";
import "./player-list.scss";
import { Player } from "../../components";
// players: [{ name: string; seconds: number }]
const PlayerList = ({ players }) => {
  return (
    <section className="playerListFlex">
      {players.map((player) => {
        return <Player key={player.name} player={player} />;
      })}
    </section>
  );
};

export default PlayerList;
