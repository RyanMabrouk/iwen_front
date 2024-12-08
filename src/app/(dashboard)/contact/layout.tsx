"use client";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="relative flex h-full flex-col">{children}</div>;
}
