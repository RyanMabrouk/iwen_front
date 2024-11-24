"use client";
import React from "react";
import BookInfo from "./ui/Book";
import SimilarBooks from "./ui/SimilarBooks";
import useBook from "@/hooks/data/books/useBook";
import useWriters from "@/hooks/data/books/writers/useWriters";
import { Tables } from "@/types/database.types";
import { BookProvider } from "./provider/BookProvider";

export default function page({
  params: { book },
}: {
  params: { book: string };
}) {
  const bookData = useBook(book);
  const AuthorData = useWriters();

  if (bookData.isLoading || AuthorData.isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        Loading...
      </div>
    );

  return (
    <BookProvider book={bookData.data?.data ?? null}>
      <div className="h-full w-full">
        <BookInfo />
        <hr className="my-5 border border-black" />
        <SimilarBooks books={bookData.data?.data?.recommended_books ?? null} />
      </div>
    </BookProvider>
  );
}
