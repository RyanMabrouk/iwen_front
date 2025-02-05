import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "اتصل بنا",
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="relative flex h-full flex-col">{children}</div>;
}
