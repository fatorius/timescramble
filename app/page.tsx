"use client";

import React from "react";
import style from "./style.module.css";
import Image from "next/image";
import Game from "@/components/Game";

export default function Home() {
  const [isPlaying, setIsPlaying] = React.useState(false);

  if (isPlaying) {
    return <Game />;
  }

  return (
    <>
      <div>
        <h1 className={style.title}>Timescramble</h1>

        <p className={style.subtitle}>
          How many winning positions can you convert in a timescramble?
        </p>
      </div>

      <Image
        src="/icon.png"
        width={300}
        height={300}
        alt=""
        style={{ filter: "contrast(0.5)" }}
      />

      <button
        className={style.playButton}
        onClick={() => {
          setIsPlaying(true);
        }}
      >
        Play
      </button>
    </>
  );
}
