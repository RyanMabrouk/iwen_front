"use client";

import React from "react";

import ViewPreference from "./ViewPreference";
import Sortings from "./Sortings";
import BooksFilters from "./BooksFilters";
import { FilterType, SortingType } from "../page";

export default function Navigation({
  sortings,
  setView,
  bookNumber,
  setBooks,
  filters,
  setFilters,
}: {
  sortings: SortingType;
  setView: (view: SortingType) => void;
  bookNumber: string;
  setBooks: (value: string) => void;
  filters: FilterType;
  setFilters: React.Dispatch<React.SetStateAction<FilterType>>;
}) {
  return (
    <nav className="flex w-full items-center justify-between bg-white px-4 py-2 sm:px-6 lg:px-8">
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <ViewPreference
            className="max-sm:hidden"
            bookNumber={bookNumber}
            setBooks={setBooks}
          />
          <BooksFilters setFilters={setFilters} />
        </div>
        <Sortings sortings={sortings} setView={setView} />
      </div>
    </nav>
  );
}
