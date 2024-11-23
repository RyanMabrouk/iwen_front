import React from "react";
import { SortingType } from "../page";
import useBooks from "@/hooks/data/books/useBooks";
import BookPreview from "./BookPreview";

export default function BooksList({
  booksNumber,
  sortings,
}: {
  booksNumber: number;
  sortings: SortingType;
}) {
  const data = useBooks({ limit: booksNumber * 3, page: 1 });
  if (data.isLoading) return <div>Loading...</div>;
  const books = data.data?.data?.data;
  return (
    <div className={`grid w-full grid-cols-${booksNumber}`}>
      {books?.map((book) => <BookPreview key={book.id} book={book} />)}
    </div>
  );
}
