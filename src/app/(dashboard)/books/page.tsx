"use client";
import React, { Suspense } from "react";
import Navigation from "./ui/Navigation";
import BooksList from "./ui/BooksList";

import { useBookProvider } from "./[book]/provider/BookProvider";
import { useBooksProvider } from "./provider/BooksProvider";

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
  const { nationality } = useBooksProvider();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col items-center gap-2">
        <h1 className="mt-6 w-fit border-b-4 px-7 py-2 text-3xl font-semibold text-color1">
          {nationality === "tunisian"
            ? "كتب تونسية "
            : nationality === "moroccan"
              ? "كتب مغربية"
              : "جميع الكتب"}
        </h1>
        <Navigation />
        <BooksList />
      </div>
    </Suspense>
  );
}
