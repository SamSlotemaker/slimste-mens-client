import React from "react";
import "./control-turn-buttons.scss";

const ControlTurnButtons = ({ setTurn, players }) => {
  return (
    <div className="turn_buttons">
      {/* <h2>Turns</h2> */}
      <button onClick={() => setTurn(null)} className="stop_time_button">
        Stop time
      </button>
      {players.map((player) => {
        return (
          <button
            key={player.name}
            onClick={() => setTurn(player.name)}
            className="change_turn_button"
          >
            Turn to {player.name}
          </button>
        );
      })}
    </div>
  );
};

export default ControlTurnButtons;
