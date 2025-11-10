import React from "react";

function useWebsockets() {
  const ws = React.useRef<WebSocket | null>(null);

  React.useEffect(() => {
    ws.current = new WebSocket(
      "https://calculus-stockfish.e7ksbn.easypanel.host/ws/analysis"
    );

    ws.current.onopen = () => console.log("Connected to Stockfish WS");
    ws.current.onclose = () => console.log("Disconnected from Stockfish WS");
    ws.current.onerror = (e) => console.error("WebSocket error:", e);

    return () => {
      ws.current?.close();
    };
  }, []);

  return ws;
}

export default useWebsockets;
