"use client";
import React, { useEffect } from "react";
import Navigation from "./ui/Navigation";
import BooksList from "./ui/BooksList";
import { useStateToUrl } from "@/helpers/stateToUrl";
import { useWindowSize } from "@/hooks/useWindowSize";

export type SortingType = "mostSold" | "newest" | "discount" | "all";

export default function page() {
  const [numberOfBooks, setNumberOfBooks] = useStateToUrl<number>(
    "booksPerLine",
    6,
  );
  const [sortings, setSortings] = useStateToUrl<SortingType>("view", "all");
  const [page, setPage] = useStateToUrl<number>("page", 1);
  const size = useWindowSize();
  useEffect(() => {
    if (
      size !== undefined &&
      size.width !== undefined &&
      size.width < 1280 &&
      numberOfBooks > 3
    ) {
      setNumberOfBooks(3);
    } else if (
      size !== undefined &&
      size.width !== undefined &&
      size.width > 1280 &&
      numberOfBooks < 4
    ) {
      setNumberOfBooks(4);
    }
  }, [size]);

  const setView = (view: SortingType) => {
    setSortings(view);
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-2 max-2xl:bg-red-700 max-xl:bg-orange-500 max-lg:bg-yellow-600 max-md:bg-emerald-700 max-sm:bg-blue-500">
      <Navigation
        sortings={sortings}
        setView={setView}
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
