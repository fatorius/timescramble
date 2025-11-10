import { Key } from "@lichess-org/chessground/types";
import { Chess, SQUARES } from "chess.js";

export function toDests(chess: Chess): Map<Key, Key[]> {
  const dests = new Map();
  SQUARES.forEach((square) => {
    const ms = chess.moves({ square: square, verbose: true });
    if (ms.length) {
      dests.set(
        square,
        ms.map((m) => m.to)
      );
    }
  });
  return dests;
}
