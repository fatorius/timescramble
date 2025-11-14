import React from "react";
import Play from "./Play";

import final from "./final.module.css";

function Game() {
  const [finalScore, setFinalScore] = React.useState(0);
  const [reason, setReason] = React.useState("");
  const [isFinished, setIsFinished] = React.useState(false);

  if (isFinished) {
    return (
      <div className={final.playScreen}>
        <h1 className={final.title}>Game over!</h1>
        <p className={final.subtitle}>{reason}</p>
        <p className={final.subtitle}>Sua pontuação: {finalScore}</p>

        <button
          onClick={() => {
            setIsFinished(false);
          }}
        >
          Play again
        </button>
      </div>
    );
  }

  return (
    <Play
      onFinish={(score: number, reason: string) => {
        setFinalScore(score);
        setReason(reason);
        setIsFinished(true);
      }}
    />
  );
}

export default Game;
