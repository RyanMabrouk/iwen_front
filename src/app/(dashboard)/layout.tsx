import Header from "@/components/Header/Header";
import React from "react";
import NavBar from "./ui/NavBar";
import Footer from "./ui/Footer";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex h-full flex-col overflow-x-hidden">{children}</div>
    </>
  );
}

// <div className="flex h-full flex-col overflow-x-hidden">{children}</div>
