import React from "react";
import NavBook from "./ui/NavBook";

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavBook />
      {children}
    </div>
  );
}
