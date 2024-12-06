import React, { Suspense } from "react";
import Header from "./ui/header";
import NavZone from "./ui/navZone";
import getUser from "@/api/getUser";
import { redirect } from "next/navigation";
import { Player } from "@lottiefiles/react-lottie-player";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await getUser();
  if (!data.user) {
    redirect("/login");
  }
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
      <div className="m-auto mt-12 flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-bgcolor1 p-10">
        <Header />
        <NavZone>{children}</NavZone>
      </div>
    </Suspense>
  );
}
