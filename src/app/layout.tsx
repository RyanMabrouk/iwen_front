import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import Hydration from "@/provider/MainHydration";
const ToastContainer = dynamic(
  () => import("@/hooks/useToast").then((mob) => mob.ToastContainer),
  {
    ssr: false,
  },
);
const ToastProvider = dynamic(
  () => import("@/hooks/useToast").then((mob) => mob.ToastProvider),
  {
    ssr: false,
  },
);

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import Store from "@/provider/QCStore";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";

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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={tajawal.className + " min-h-screen"}>
        <Analytics />
        <SpeedInsights />{" "}
        <Store>
          <Hydration>
            {" "}
            <ToastProvider>
              <ToastContainer />
              <main>{children}</main>{" "}
            </ToastProvider>
          </Hydration>
        </Store>
      </body>
    </html>
  );
}
