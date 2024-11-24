import BooBookCartkCart from "@/components/BookCart";
import useBooks from "@/hooks/data/books/useBooks";
import { IBookPopulated } from "@/types";
import React from "react";

export default function SimilarBooks({
  books,
}: {
  books: IBookPopulated[] | null;
}) {
  return (
    <div dir="rtl" className="flex flex-col gap-3 p-5">
      <h1 className="mr-8 font-semibold">كتب مشابهة أخرى</h1>
      <div
        dir="rtl"
        className="grid grid-cols-6 gap-3 px-7 py-4 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1"
      >
        {books?.map((book, i) => (
          <BooBookCartkCart key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
