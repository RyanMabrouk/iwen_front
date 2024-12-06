"use client";
import Header from "@/components/Header/Header";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex h-full flex-col overflow-x-hidden">{children}</div>
    </>
  );
}
