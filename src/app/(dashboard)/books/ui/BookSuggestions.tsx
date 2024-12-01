import { IBookPopulated } from "@/types";
import React from "react";

export default function BookSuggestions({
  books,
}: {
  books: IBookPopulated[];
}) {
  return (
    <div className="left-2 top-8 z-[101] bg-color1">
      {books.map((book) => book.title)}
    </div>
  );
}
