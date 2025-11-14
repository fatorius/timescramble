import React from "react";

function useTime(initialTime: number, onFinish: () => void) {
  const [playerTime, setPlayerTime] = React.useState(initialTime);
  const [timeRunning, setTimeRunning] = React.useState(false);

  React.useEffect(() => {
    if (playerTime <= 0) {
      setTimeRunning(false);
      onFinish();
    }
  }, [playerTime]);

  React.useEffect(() => {
    if (!timeRunning) return;

    const interval = setInterval(() => {
      setPlayerTime((s) => Math.max(0, s - 1));
    }, 100);

    return () => clearInterval(interval);
  }, [timeRunning]);

  return { playerTime, setPlayerTime, setTimeRunning };
}

export default useTime;
