"use client";
import React, { Suspense } from "react";
import Navigation from "./ui/Navigation";
import BooksList from "./ui/BooksList";

import BooksProvider from "./provider/BooksProvider";

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

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BooksProvider>
        <div className="flex flex-col gap-2">
          <Navigation />
          <BooksList />
        </div>
      </BooksProvider>
    </Suspense>
  );
}
