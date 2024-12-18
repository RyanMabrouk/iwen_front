"use client";
import React from "react";
import BookInfo from "./ui/Book";
import SimilarBooks from "./ui/SimilarBooks";
import useBook from "@/hooks/data/books/useBook";
import { BookProvider } from "./provider/BookProvider";
import { Spinner } from "@/app/ui/Spinner";

export default function Page({
  params: { book },
}: {
  params: { book: string };
}) {
  const bookData = useBook(book);

  if (bookData.isLoading)
    return (
      <div className="flex h-full min-h-[40rem] w-full items-center justify-center bg-transparent bg-opacity-25">
        <Spinner />
      </div>
    );

  return (
    <BookProvider book={bookData.data?.data ?? null}>
      <div className="h-full w-full max-sm:flex max-sm:flex-col max-sm:items-center">
        <BookInfo />
        <hr className="my-5 border border-black" />
        <SimilarBooks books={bookData.data?.data?.recommended_books ?? null} />
      </div>
    </BookProvider>
  );
}
