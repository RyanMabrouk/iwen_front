import React, { ReactNode } from "react";
import Navbar from "./navbar";

interface NavZoneProps {
  children: ReactNode;
}

export default function NavZone({ children }: NavZoneProps) {
  return (
    <div dir="rtl" className="mx-auto mt-[2rem] min-w-[80svw] bg-white p-8">
      <Navbar />
      <div className="mt-10">{children}</div>
    </div>
  );
}
