import React from "react";
import { ControlTimeButtons, ControlTurnButtons } from "../../components";
import "./control-view.scss";
const ControlView: React.FC<any> = ({ socket, players }) => {
  const addSeconds = (team, seconds) => {
    socket.emit("add", { seconds: seconds, team: team });
  };

  const setTurn = (turn) => {
    socket.emit("changeTurn", { turn });
  };

  return (
    <>
      <ControlTurnButtons setTurn={setTurn} players={players} />
      {players.map((player) => {
        return (
          <ControlTimeButtons
            key={player.name}
            team={player.name}
            addSeconds={addSeconds}
          />
        );
      })}
    </>
  );
};

export default ControlView;
