import React, { useEffect, useState } from "react";
import "./puzzle.scss";
const ControlView: React.FC<any> = ({ socket, puzzleWords }) => {
  const [words, setWords] = useState<any>(null);

  const correctWord = (set) => {
    setWords((oldState) => {
      const newState = [...oldState];
      newState.map((word) => {
        if (word.set === set) {
          word.guessed = true;
          return word;
        }
        return word;
      });

      return newState;
    });
    socket.emit("puzzleCorrect", { seconds: 30 });
  };

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

  useEffect(() => {
    setWords(shuffle(puzzleWords));
  }, [puzzleWords]);

  return (
    <>
      <div className="puzzlePage">
        <section className="puzzleContainer">
          {words &&
            words.map((word) => {
              return (
                <div
                  className={
                    word.guessed
                      ? `puzzleWord guessed set${word.set}`
                      : `puzzleWord set${word.set}`
                  }
                  key={word.word}
                  onClick={() => {
                    if (!word.guessed) {
                      correctWord(word.set);
                    }
                  }}
                >
                  {word.word}
                </div>
              );
            })}
        </section>
      </div>
    </>
  );
};

export default ControlView;
