import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { Routes, Route } from "react-router-dom";
import { GameView, ControlView, Puzzle } from "./ui/views";
import "./App.scss";

const ENDPOINT = "http://localhost:5000";
const initialPlayers = [
  { name: "Yannik & Astrid", seconds: 60 },
  { name: "Sam & Martijn", seconds: 60 },
  { name: "Dirk & Dena", seconds: 60 },
];

const puzzleWordsOne = [
  {
    word: "Bagage",
    set: 1,
  },
  {
    word: "Klim",
    set: 1,
  },
  {
    word: "Afdruip",
    set: 1,
  },
  {
    word: "Elasticiteit",
    set: 1,
  },
  {
    word: "Schateren",
    set: 2,
  },
  {
    word: "Laat me niet",
    set: 2,
  },
  {
    word: "Brullen",
    set: 2,
  },
  {
    word: "In je vuistje",
    set: 2,
  },
  {
    word: "Saus",
    set: 3,
  },
  {
    word: "Babi of ajam",
    set: 3,
  },
  {
    word: "Stokje",
    set: 3,
  },
  {
    word: "Kroket",
    set: 3,
  },
];
const puzzleWordsTwo = [
  {
    word: "Crawl",
    set: 1,
  },
  {
    word: "Zingen uit volle",
    set: 1,
  },
  {
    word: "Beeld",
    set: 1,
  },
  {
    word: "Vergroting",
    set: 1,
  },
  {
    word: "Complot",
    set: 2,
  },
  {
    word: "Doem",
    set: 2,
  },
  {
    word: "Filosoof",
    set: 2,
  },
  {
    word: "Van Rodin",
    set: 2,
  },
  {
    word: "Bocht",
    set: 3,
  },
  {
    word: "Boot",
    set: 3,
  },
  {
    word: "Bahn",
    set: 3,
  },
  {
    word: "Aanspreekvorm",
    set: 3,
  },
];
const puzzleWordsThree = [
  {
    word: "Drift",
    set: 1,
  },
  {
    word: "Van-jut",
    set: 1,
  },
  {
    word: "Koffie",
    set: 1,
  },
  {
    word: "Noch staart",
    set: 1,
  },
  {
    word: "Je hebt groot",
    set: 2,
  },
  {
    word: "Gestemd",
    set: 2,
  },
  {
    word: "Direct",
    set: 2,
  },
  {
    word: "Maker",
    set: 2,
  },
  {
    word: "Keeper Tim",
    set: 3,
  },
  {
    word: "Speld",
    set: 3,
  },
  {
    word: "Staart",
    set: 3,
  },
  {
    word: "Pijpen",
    set: 3,
  },
];

const App = () => {
  const [socket, setSocket] = useState<any>(null);
  const [players, setPlayers] = useState<any>(initialPlayers);

  useEffect(() => {
    const socketConnect = socketIOClient(ENDPOINT, {
      transports: ["websocket"],
    });
    setSocket(socketConnect);

    var storedPlayers = localStorage.getItem("players");

    if (storedPlayers) {
      setPlayers(JSON.parse(storedPlayers));
    }

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    // save item in localstorage every second
    try {
      localStorage.setItem("players", JSON.stringify(players));
    } catch {
      console.log("item not set");
    }
  }, [players]);

  useEffect(() => {
    if (!socket) return;
    socket.on("connect", () => {
      console.log(`I'm connected with the back-end`);
    });
  }, [socket]);

  return (
    <>
      {socket && (
        <Routes>
          <Route
            path="/"
            element={React.cloneElement(<GameView />, {
              socket,
              players,
              setPlayers,
            })}
          />
          <Route
            path="/controls"
            element={React.cloneElement(<ControlView />, {
              socket,
              players,
              setPlayers,
            })}
          />
          <Route
            path="/puzzleOne"
            element={React.cloneElement(<Puzzle />, {
              socket,
              puzzleWords: puzzleWordsOne,
            })}
          />
          <Route
            path="/puzzleTwo"
            element={React.cloneElement(<Puzzle />, {
              socket,
              puzzleWords: puzzleWordsTwo,
            })}
          />
          <Route
            path="/puzzleThree"
            element={React.cloneElement(<Puzzle />, {
              socket,
              puzzleWords: puzzleWordsThree,
            })}
          />
        </Routes>
      )}
    </>
  );
};

export default App;
