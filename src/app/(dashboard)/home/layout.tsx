"use client";
import React, { Suspense } from "react";
import Socials from "../contact/ui/socials";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      <Socials />
      {children}
    </div>
  );
}
