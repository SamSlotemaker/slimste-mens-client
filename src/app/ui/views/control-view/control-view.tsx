import React from "react";
import { ControlTimeButtons, ControlTurnButtons } from "../../components";
import "./control-view.scss";
const ControlView: React.FC<any> = ({ socket, players }) => {
  const playAudio = () => {
    let audio = new Audio("/ping.mp3");
    audio.play();
  };

  const playTune = () => {
    let audio = new Audio("/tune.mp3");
    audio.play();
  };

  const addSeconds = (team, seconds) => {
    playAudio();
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
      <button
        className="tune_button"
        onClick={() => {
          playTune();
        }}
      >
        Play Tune
      </button>
    </>
  );
};

export default ControlView;
