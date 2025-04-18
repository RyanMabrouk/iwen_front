"use client";
import Header from "@/components/Header/Header";
import { Player } from "@lottiefiles/react-lottie-player";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
const Footer = dynamic(() => import("./ui/Footer"));

export default function Layout({ children }: { children: React.ReactNode }) {
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
      <Header />
      <div className="flex h-full flex-col">{children}</div>
      <Footer />
    </Suspense>
  );
}
