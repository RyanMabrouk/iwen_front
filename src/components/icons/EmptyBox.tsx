"use client";

import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";

export default function EmptyBox() {
  return (
    <Player
      src={
        "https://lottie.host/85fb7313-2848-45c2-bdb9-2b729f57afc2/AwfmWMtW8n.json"
      }
      className="h-40 w-40"
      loop
      autoplay
    />
  );
}
