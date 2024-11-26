import React from "react";
import Header from "./ui/header";
import NavZone from "./ui/navZone";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="m-auto flex h-full min-h-screen flex-col overflow-x-hidden bg-bgcolor1 p-10">
      <Header />
      <NavZone>{children}</NavZone>
    </div>
  );
}
