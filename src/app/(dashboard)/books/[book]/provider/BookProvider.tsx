"use client";

import { IBookPopulated } from "@/types";
import { Tables } from "@/types/database.types";
import React, { createContext, useEffect, useState } from "react";

type BookContextType = {
  book: IBookPopulated | null;
};

const BookContext = createContext<BookContextType | undefined>(undefined);

export function BookProvider({
  children,
  book,
}: {
  children: React.ReactNode;
  book: IBookPopulated | null;
}) {
  return (
    <BookContext.Provider value={{ book }}>{children}</BookContext.Provider>
  );
}

export function useBookProvider() {
  const context = React.useContext(BookContext);
  if (!context) {
    throw new Error("useCounter must be used within a PageProvider");
  }
  return {
    book: context.book,
  };
}
