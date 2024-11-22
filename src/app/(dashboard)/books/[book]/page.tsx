"use client";
import React from "react";
import NavBook from "./ui/NavBook";
import BookInfo from "./ui/Book";
import SimilarBooks from "./ui/SimilarBooks";
import useBook from "@/hooks/data/books/useBook";
import { BookProvider } from "./provider/BookProvider";
import useWriters from "@/hooks/data/books/writers/useWriters";
import { Tables } from "@/types/database.types";

export default function page({
  params: { book },
}: {
  params: { book: string };
}) {
  const bookData = useBook(book);
  const AuthorData = useWriters();

  if (bookData.isLoading || AuthorData.isLoading) return <div>Loading...</div>;
  const author =
    AuthorData.data?.data?.filter(
      (e) => e.id !== bookData.data?.data?.writer_id,
    ) ?? null;

  return (
    <BookProvider
      book={bookData.data?.data ?? null}
      authors={author as Tables<"writers">[] | null}
    >
      <div className="h-full w-full">
        <NavBook />
        <BookInfo />
        <hr className="my-5 border border-black" />
        <SimilarBooks />
      </div>
    </BookProvider>
  );
}
