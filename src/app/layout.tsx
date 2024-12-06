import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import Hydration from "@/provider/MainHydration";
import { ToastContainer, ToastProvider } from "@/hooks/useToast";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import Store from "@/provider/QCStore";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false },
);
const tajawal = Tajawal({
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  subsets: ["arabic"],
  style: ["normal"],
});

export const metadata: Metadata = {
  title: "",
  description: "",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: [],
  authors: [
    {
      name: "",
      url: "",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={tajawal.className + " min-h-screen"}>
        <Analytics />
        <SpeedInsights />
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
          {" "}
          <Store>
            <Hydration>
              <ToastProvider>
                <ToastContainer />
                <main>{children}</main>{" "}
              </ToastProvider>
            </Hydration>
          </Store>
        </Suspense>
      </body>
    </html>
  );
}
