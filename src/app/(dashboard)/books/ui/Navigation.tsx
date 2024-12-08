"use client";

import React from "react";

import ViewPreference from "./ViewPreference";
import BookViews from "./Sortings";
import BooksFilters from "./BooksFilters";
import { BooksSortings } from "./BookSortings";

export default function Navigation() {
  return (
    <nav className="flex w-full items-center justify-between bg-white px-4 py-2 sm:px-6 lg:px-8">
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <ViewPreference className="max-sm:hidden" />
          <BooksFilters />
          <BooksSortings />
        </div>
        <BookViews />
      </div>
    </nav>
  );
}
