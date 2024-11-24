import React from "react";
import ViewPreference from "./ViewPreference";
import Sortings from "./Sortings";
import { SortingType } from "../page";

export default function Navigation({
  sortings,
  setSortings,
  bookNumber,
  setBooks,
}: {
  sortings: SortingType;
  setSortings: React.Dispatch<React.SetStateAction<SortingType>>;
  bookNumber: string;
  setBooks: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <nav className="flex w-full items-center justify-between bg-white px-20 py-2">
      <ViewPreference bookNumber={bookNumber} setBooks={setBooks} />{" "}
      <Sortings sortings={sortings} setSortings={setSortings} />
    </nav>
  );
}
