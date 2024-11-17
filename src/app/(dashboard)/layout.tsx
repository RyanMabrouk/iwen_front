import React from "react";
import NavBar from "./ui/NavBar";
import Footer from "./ui/Footer";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-between bg-yellow-50 font-tajawal">
      <NavBar />
      <div className="w-full flex-1 overflow-x-hidden">{children}</div>
      <Footer />
    </div>
  );
}
