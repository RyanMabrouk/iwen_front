"use client";
import React, { useEffect } from "react";
import Navigation from "./ui/Navigation";
import BooksList from "./ui/BooksList";
import stateToUrl from "@/helpers/stateToUrl";

export type SortingType = "mostSold" | "newest" | "discount" | "all";

export default function page() {
  const [numberOfBooks, setNumberOfBooks] = stateToUrl<string>(
    "booksPerLine",
    "6",
  );
  const [sortings, setSortings] = stateToUrl<SortingType>("view", "all");
  const [page, setPage] = stateToUrl<string>("page", "1");

  useEffect(() => {
    setPage("1");
  }, [sortings]);

  return (
    <div className="flex flex-col gap-2">
      <Navigation
        sortings={sortings}
        setSortings={setSortings}
        bookNumber={numberOfBooks}
        setBooks={setNumberOfBooks}
      />
      <BooksList
        page={page}
        setPage={setPage}
        sortings={sortings}
        booksNumber={numberOfBooks}
      />
    </div>
  );
}
