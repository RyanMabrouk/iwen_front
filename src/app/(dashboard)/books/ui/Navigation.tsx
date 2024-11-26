import React from "react";
import ViewPreference from "./ViewPreference";
import Sortings from "./Sortings";
import { SortingType } from "../page";

export default function Navigation({
  sortings,
  setView,
  bookNumber,
  setBooks,
}: {
  sortings: SortingType;
  setView: (view: SortingType) => void;
  bookNumber: number;
  setBooks: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <nav className="flex w-full items-center justify-between bg-white px-20 py-2">
      <ViewPreference bookNumber={bookNumber} setBooks={setBooks} />{" "}
      <Sortings sortings={sortings} setView={setView} />
    </nav>
  );
}
