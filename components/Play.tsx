"use client";

import "./chessground.css";
import "./3d.css";
import "./theme.css";

import style from "./play.module.css";

import formatTenthsToTime from "@/functions/time/formatTenthsToTime";
import useGame from "@/hooks/useGame";
import Image from "next/image";

interface PropsFunctions {
  onFinish: (score: number, reason: string) => void;
}

function Play({ onFinish }: PropsFunctions) {
  const {
    gamesWon,
    position,
    isPromotionModalOpen,
    playerTime,
    handlePromotionSelect,
    isPlayerWhite,
  } = useGame({ onFinish });

  return (
    <div className={style.playScreen}>
      <div className="blue merida">
        <div
          id="chessboard"
          style={{
            display: position === null ? "hidden" : "block",
            width: "510px",
            height: "510px",
          }}
        ></div>
      </div>
      {isPromotionModalOpen ? (
        <div
          style={{
            width: (
              document.getElementsByTagName("cg-container")[0] as HTMLElement
            ).style.width,
            height: (
              document.getElementsByTagName("cg-container")[0] as HTMLElement
            ).style.height,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            zIndex: "10",
            backgroundColor: "#00000040",
          }}
        >
          <div className="flex flex-row bg-[#e0e9e8] px-4 py-2 gap-4 rounded">
            <button onClick={() => handlePromotionSelect("q")}>
              <Image
                src={
                  isPlayerWhite
                    ? "/images/pieces/merida/wQ.svg"
                    : "/images/pieces/merida/bQ.svg"
                }
                width={50}
                height={50}
                alt=""
              />
            </button>
            <button onClick={() => handlePromotionSelect("r")}>
              <Image
                src={
                  isPlayerWhite
                    ? "/images/pieces/merida/wR.svg"
                    : "/images/pieces/merida/bR.svg"
                }
                width={50}
                height={50}
                alt=""
              />
            </button>
            <button onClick={() => handlePromotionSelect("b")}>
              <Image
                src={
                  isPlayerWhite
                    ? "/images/pieces/merida/wB.svg"
                    : "/images/pieces/merida/bB.svg"
                }
                width={50}
                height={50}
                alt=""
              />
            </button>
            <button onClick={() => handlePromotionSelect("n")}>
              <Image
                src={
                  isPlayerWhite
                    ? "/images/pieces/merida/wN.svg"
                    : "/images/pieces/merida/bN.svg"
                }
                width={50}
                height={50}
                alt=""
              />
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className={style.runInfo}>
        <div>
          <div className={style.gameScore}>Games won: {gamesWon}</div>
          <button
            onClick={() => {
              onFinish(gamesWon, "You resigned");
            }}
            className={style.giveUpButton}
          >
            <Image src="/images/flag.svg" width={15} height={15} alt="" />
          </button>
        </div>
        <div className={style.gameClock}>{formatTenthsToTime(playerTime)}</div>
      </div>
    </div>
  );
}

export default Play;
