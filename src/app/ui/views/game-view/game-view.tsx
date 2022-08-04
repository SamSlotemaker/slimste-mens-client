import React, { useEffect, useState, useRef } from "react";
import { PlayerList } from "../../components";
import "./game-view.scss";
const GameView: React.FC<any> = ({ socket, players, setPlayers }) => {
  const [error, setError] = useState(false);
  const interval = useRef<any>();

  const [turn, setTurn] = useState<null | string>(null);

  //changing seconds of the one who's turn it is
  const addSeconds = (team, seconds) => {
    setPlayers((prevState) => {
      const newPlayers = [...prevState];
      newPlayers.forEach((player) => {
        if (player.name === team) {
          player.seconds += seconds;
        }
      });
      return newPlayers;
    });
  };

  const addSecondsPuzzle = (seconds, turn) => {
    setPlayers((prevState) => {
      const newPlayers = [...prevState];
      console.log(seconds);
      newPlayers.forEach((player) => {
        if (player.name === turn) {
          player.seconds += seconds;
        }
      });
      return newPlayers;
    });
  };

  //listen to the add seconds effect
  useEffect(() => {
    socket.on("add", ({ team, seconds }) => {
      addSeconds(team, seconds);
    });

    socket.on("puzzleCorrect", (seconds) => {
      addSecondsPuzzle(seconds, turn);
    });

    return () => {
      socket.off("add");
      socket.off("puzzleCorrect");
    };
  }, [socket, turn]);

  useEffect(() => {
    socket.on("changeTurn", (turn) => {
      setTurn(turn);
    });
  }, [socket]);

  //count timer down when it's your turn
  useEffect(() => {
    clearInterval(interval.current);
    interval.current = setInterval(() => {
      if (!turn) return;
      setPlayers((prevState) => {
        const newPlayers = [...prevState];
        newPlayers.forEach((player) => {
          if (player.name === turn) {
            player.seconds -= 1;
          }
        });

        return newPlayers;
      });
    }, 1000);

    return () => clearInterval(interval.current);
  }, [turn]);

  if (error) {
    return <div>errorrrrrrrr</div>;
  }

  return (
    <div className="game_view">
      <PlayerList players={players} />
    </div>
  );
};

export default GameView;
