import React from "react";
import NavBar from "./ui/NavBar";
import Footer from "./ui/Footer";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{ background: "#E4EFEF" }}
      className="flex min-h-screen w-full flex-col items-center justify-between font-tajawal"
    >
      {/* <NavBar /> */}
      <div className="w-full flex-1 overflow-x-hidden">{children}</div>
    </div>
  );
}

// <div className="flex h-full flex-col overflow-x-hidden">{children}</div>
