import useBooks from "@/hooks/data/books/useBooks";
import React from "react";
import SimilarBook from "./SimilarBook";

export default function SimilarBooks() {
  const similarBooksData = useBooks({ limit: 8 });
  if (similarBooksData.isLoading) return <div>Loading...</div>;
  const similarBooks = similarBooksData.data?.data?.data ?? [];
  return (
    <div dir="rtl" className="flex flex-col gap-3">
      <h1 className="font-semibold">كتب مشابهة أخرى</h1>
      <div dir="ltr" className="grid-cols-6 gap-3">
        {similarBooks.map((book, i) => (
          <SimilarBook key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
