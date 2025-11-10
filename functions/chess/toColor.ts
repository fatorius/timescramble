import { Color } from "@lichess-org/chessground/types";
import { Chess } from "chess.js";

export function toColor(chess: Chess): Color {
  return chess.turn() === "w" ? "white" : "black";
}
