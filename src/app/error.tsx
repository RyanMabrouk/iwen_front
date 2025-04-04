"use client";
import { Player } from "@lottiefiles/react-lottie-player";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("ui error :" + error);
  }, [error]);
  return (
    <div className="z-[9999] flex h-screen w-screen flex-col items-center justify-center gap-4">
      <Player
        src="https://lottie.host/fe6d5193-dee6-47e6-909b-490ba613151a/qH19788RBq.json"
        className="h-80 w-80"
        loop
        autoplay
      />
      <h2 className="text-xl font-semibold">Something went wrong!</h2>
      <Link
        href="/"
        className="text-lg text-blue-500 transition-all ease-linear hover:text-blue-500 hover:underline"
      >
        Go back
      </Link>
    </div>
  );
}
