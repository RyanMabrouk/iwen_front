"use client";
import { Player } from "@lottiefiles/react-lottie-player";

export default function Loading() {
  return (
    <Player
      className="m-auto"
      autoplay
      loop
      src="/loading.json"
      style={{ height: "12rem", width: "12rem" }}
    />
  );
}
