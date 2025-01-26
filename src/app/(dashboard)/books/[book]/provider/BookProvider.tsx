"use client";

import { useStateToUrl } from "@/helpers/stateToUrl";
import { IBookPopulated } from "@/types";
import React, { createContext, useContext } from "react";

type BookContextType = {
  book: IBookPopulated | null;
  view: string;
  setView: (view: string) => void;
};

const BookContext = createContext<BookContextType | undefined>(undefined);
export type PageType = "main" | "details" | "comments" | "author" | "about";

export function BookProvider({
  children,
  book,
}: {
  children: React.ReactNode;
  book: IBookPopulated | null;
}) {
  const [view, setView] = useStateToUrl<"view">("view", "main");
  return (
    <BookContext.Provider value={{ book, view, setView }}>
      {children}
    </BookContext.Provider>
  );
}

export function useBookProvider() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useCounter must be used within a PageProvider");
  }
  return {
    book: context.book,
    view: context.view,
    setView: context.setView,
  };
}
