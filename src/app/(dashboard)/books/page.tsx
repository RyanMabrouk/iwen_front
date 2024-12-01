"use client";
import React, { useEffect, useState } from "react";
import Navigation from "./ui/Navigation";
import BooksList from "./ui/BooksList";
import { useStateToUrl } from "@/helpers/stateToUrl";
import { useWindowSize } from "@/hooks/useWindowSize";
import { number } from "zod";

export type SortingType = "mostSold" | "newest" | "discount" | "all";
export type GenreType = "test" | "test2";
export type FilterType = {
  stars?: number;
  priceRange?: [number, number];
  genres?: GenreType[];
  release_yearMax?: number;
  release_yearMin?: number;
  writer?: string;
  shareHouse?: string;
  corner?: string;
  categories?: string[];
  subcategories?: string[];
};

export default function Page() {
  const [numberOfBooks, setNumberOfBooks] = useStateToUrl<string>(
    "booksPerLine",
    "6",
  );
  const [sortings, setSortings] = useStateToUrl<SortingType>("view", "all");
  const [page, setPage] = useStateToUrl<number>("page", 1);
  const [filters, setFilters] = useState<FilterType>({});

  /* useEffect(() => {
    if (Object.keys(filters).length > 0) {
      console.log(filters);
    }
  }, [filters]); */

  const size = useWindowSize();
  useEffect(() => {
    if (
      size !== undefined &&
      size.width !== undefined &&
      size.width < 1280 &&
      parseInt(numberOfBooks) > 3
    ) {
      setNumberOfBooks("3");
    } else if (
      size !== undefined &&
      size.width !== undefined &&
      size.width > 1280 &&
      parseInt(numberOfBooks) < 4
    ) {
      setNumberOfBooks("4");
    }
  }, [size]);

  const setView = (view: SortingType) => {
    setSortings(view);
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-2">
      <Navigation
        filters={filters}
        setFilters={setFilters}
        sortings={sortings}
        setView={setView}
        bookNumber={numberOfBooks}
        setBooks={setNumberOfBooks}
      />
      <BooksList
        filters={filters}
        page={page}
        setPage={setPage}
        sortings={sortings}
        booksNumber={numberOfBooks}
      />
    </div>
  );
}
