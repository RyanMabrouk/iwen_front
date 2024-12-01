"use client";

import { useStateToUrl } from "@/helpers/stateToUrl";
import React, { createContext, useContext, useEffect, useState } from "react";
import { FilterType, SortingType } from "../page";
import { WindowSize, useWindowSize } from "@/hooks/useWindowSize";

interface BooksProviderProps {
  view: string;
  setView: (value: string) => void;
  numberOfBooks: string;
  setNumberOfBooks: (value: string) => void;
  page: string;
  setPage: (value: string) => void;
  size: WindowSize;
  changeView: (view: string) => void;
  corner: string;
  setCorner: (value: string) => void;
  shareHouse: string;
  setShareHouse: (value: string) => void;
  writer: string;
  setWriter: (value: string) => void;
  priceRange: string;
  setPriceRange: (value: string) => void;
  categories: string;
  setCategories: (value: string) => void;
  subcategories: string;
  setSubcategories: (value: string) => void;
  sortings: string;
  setSortings: (value: string) => void;
}

// Create a context for the BooksProvider
const BooksContext = createContext<BooksProviderProps | undefined>(undefined);

// Custom hook to access the BooksProvider values

// BooksProvider component
export default function BooksProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [numberOfBooks, setNumberOfBooks] = useStateToUrl("booksPerLine", "6");
  const [view, setView] = useStateToUrl("view", "all");
  const [page, setPage] = useStateToUrl("page", "1");
  const [categories, setCategories] = useStateToUrl("categories", "");
  const [subcategories, setSubcategories] = useStateToUrl("subcategories", "");
  const [corner, setCorner] = useStateToUrl("corner", "");
  const [shareHouse, setShareHouse] = useStateToUrl("shareHouse", "");
  const [writer, setWriter] = useStateToUrl("writer", "");
  const [priceRange, setPriceRange] = useStateToUrl("priceRange", "");
  const [sortings, setSortings] = useStateToUrl("sortings", "");
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

  const changeView = (view: string) => {
    setView(view);
    setPage("1");
  };

  return (
    <BooksContext.Provider
      value={{
        sortings,
        setSortings,
        view,
        setView,
        page,
        setPage,
        numberOfBooks,
        setNumberOfBooks,
        size,
        changeView,
        corner,
        setCorner,
        shareHouse,
        setShareHouse,
        writer,
        setWriter,
        priceRange,
        setPriceRange,
        categories,
        setCategories,
        subcategories,
        setSubcategories,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}

export function useBooksProvider() {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error("useBooksProvider must be used within a BooksProvider");
  }
  return {
    view: context.view!,
    setView: context.setView!,
    numberOfBooks: context.numberOfBooks!,
    setNumberOfBooks: context.setNumberOfBooks!,
    page: context.page!,
    setPage: context.setPage!,
    size: context.size!,
    changeView: context.changeView!,
    corner: context.corner!,
    setCorner: context.setCorner!,
    shareHouse: context.shareHouse!,
    setShareHouse: context.setShareHouse!,
    writer: context.writer!,
    setWriter: context.setWriter!,
    priceRange: context.priceRange!,
    setPriceRange: context.setPriceRange!,
    categories: context.categories!,
    setCategories: context.setCategories!,
    subcategories: context.subcategories!,
    setSubcategories: context.setSubcategories!,
    sortings: context.sortings!,
    setSortings: context.setSortings!,
  };
}
