import React from "react";
import NavBook from "./ui/NavBook";
import BooksProvider from "./provider/BooksProvider";

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <BooksProvider>
      <NavBook />
      {children}
    </BooksProvider>
  );
}
