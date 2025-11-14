import React from "react";
import useWebsockets from "./useWebsockets";
import useTime from "./useTime";
import { Chessground } from "@lichess-org/chessground";
import { toDests } from "@/functions/chess/toDests";
import { Chess, Square } from "chess.js";
import { Key } from "@lichess-org/chessground/types";
import { toColor } from "@/functions/chess/toColor";

interface Position {
  fen: string;
  game_id: string;
  winning_side: number;
}

interface PropsFunctions {
  onFinish: (score: number, reason: string) => void;
}

function useGame({ onFinish }: PropsFunctions) {
  const [gamesWon, setGamesWon] = React.useState(0);
  const [position, setPosition] = React.useState<Position | null>(null);
  const [isPlayerWhite, setIsPlayerWhite] = React.useState(true);
  const ws = useWebsockets();

  const { playerTime, setPlayerTime, setTimeRunning } = useTime(150, () => {
    onFinish(gamesWon, "Your time is over");
  });

  const [isPromotionModalOpen, setIsPromotionModalOpen] = React.useState(false);
  const [promotionResolver, setPromotionResolver] = React.useState<
    ((piece: string) => void) | null
  >(null);

  async function openPromotionModal() {
    setIsPromotionModalOpen(true);
    return new Promise<string>((resolve) => {
      setPromotionResolver(() => resolve);
    });
  }

  function handlePromotionSelect(piece: string) {
    setIsPromotionModalOpen(false);
    promotionResolver?.(piece);
    setPromotionResolver(null);
  }

  React.useEffect(() => {
    fetch("/api/getGame")
      .then((obj) => {
        return obj.json();
      })
      .then((response: Position) => {
        const chess = new Chess(response.fen);

        const playerSide = response.winning_side === 0 ? "w" : "b";

        setIsPlayerWhite(playerSide === "w");

        const cg = Chessground(
          document.getElementById("chessboard") as HTMLElement,
          {
            orientation: response.winning_side === 0 ? "white" : "black",
            fen: response.fen,
            movable: {
              free: false,
              dests: toDests(chess),
              color: response.winning_side === 0 ? "white" : "black",
            },
            draggable: {
              showGhost: true,
            },
          }
        );

        if (ws.current) {
          ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (!data.move) return;

            const move = data.move;
            const from = move.slice(0, 2) as Key;
            const to = move.slice(2, 4) as Key;
            let promotedPiece: string | undefined = undefined;

            if (move.length === 5) {
              promotedPiece = move.slice(4, 5);
            }

            chess.move({ from, to, promotion: promotedPiece });

            cg.set({
              fen: chess.fen(),
              turnColor: toColor(chess),
              movable: {
                color: toColor(chess),
                dests: toDests(chess),
              },
            });

            if (chess.isCheckmate()) {
              onFinish(gamesWon, "You got checkmated");
            }

            if (chess.isDraw()) {
              onFinish(gamesWon, "You drawn");
            }

            setTimeRunning(true);
            cg.playPremove();
          };
        }

        cg.set({
          movable: {
            events: {
              after: async (orig: Key, dest: Key) => {
                const piece = chess.get(orig as Square);
                let promotedPiece: string | undefined = undefined;

                const isPromotion =
                  piece?.type === "p" &&
                  ((piece.color === "w" && dest[1] === "8") ||
                    (piece.color === "b" && dest[1] === "1"));

                if (isPromotion) {
                  promotedPiece = await openPromotionModal();
                }

                setTimeRunning(false);

                setPlayerTime((s) => {
                  return s + 5;
                });

                chess.move({ from: orig, to: dest, promotion: promotedPiece });

                if (isPromotion) {
                  cg.set({
                    fen: chess.fen(),
                    turnColor: toColor(chess),
                    movable: {
                      color: toColor(chess),
                      dests: toDests(chess),
                    },
                  });
                }

                if (chess.isDraw()) {
                  onFinish(gamesWon, "You drawn");
                }

                if (chess.isCheckmate()) {
                  setGamesWon((s) => {
                    return s + 1;
                  });
                  setPlayerTime((s) => {
                    return s + 20;
                  });
                }

                ws.current?.send(JSON.stringify({ fen: chess.fen() }));
              },
            },
          },
        });

        if (playerSide !== chess.turn()) {
          const moves = chess.moves({ verbose: true });
          const move = moves[Math.floor(Math.random() * moves.length)];

          chess.move(move.san);
          cg.move(move.from, move.to);

          cg.set({
            turnColor: toColor(chess),
            movable: {
              color: toColor(chess),
              dests: toDests(chess),
            },
          });
        }

        setTimeRunning(true);
        setPosition(response);
      });
  }, [gamesWon]);

  return {
    gamesWon,
    position,
    isPromotionModalOpen,
    playerTime,
    handlePromotionSelect,
    isPlayerWhite,
  };
}

export default useGame;
