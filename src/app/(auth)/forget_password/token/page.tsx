"use client";
import React, { Suspense } from "react";
import Token from "./ui/Token";
import { Player } from "@lottiefiles/react-lottie-player";

export default function page() {
  return (
    <Suspense
      fallback={
        <Player
          className="m-auto"
          autoplay
          loop
          src="/loading.json"
          style={{ height: "12rem", width: "12rem" }}
        />
      }
    >
      <Token />
    </Suspense>
  );
}
