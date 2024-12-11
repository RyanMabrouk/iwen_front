"use client";

import { useStateToUrl } from "@/helpers/stateToUrl";
import React, { createContext, useContext, useEffect, useState } from "react";
import { WindowSize, useWindowSize } from "@/hooks/useWindowSize";
import { parse } from "path";

interface BooksProviderProps {
  asc: string;
  setAsc: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
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
  const [search, setSearch] = useStateToUrl("search", "");
  const [asc, setAsc] = useStateToUrl("asc", "1");
  const size = useWindowSize();
  useEffect(() => {
    if (
      size !== undefined &&
      size.width !== undefined &&
      size.width < 1280 &&
      (parseInt(numberOfBooks) > 3 || parseInt(numberOfBooks) === 1)
    ) {
      setNumberOfBooks("3");
    } else if (
      size !== undefined &&
      size.width !== undefined &&
      parseInt(numberOfBooks) !== 1 &&
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
        asc,
        setAsc,
        search,
        setSearch,
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
    asc: context.asc!,
    setAsc: context.setAsc!,
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
    search: context.search!,
    setSearch: context.setSearch!,
  };
}
