import React from "react";
import NavBook from "./ui/NavBook";
import BookInfo from "./ui/BookInfo";
import SimilarBooks from "./ui/SimilarBooks";

export default function page({
  params: { book },
}: {
  params: { book: string };
}) {
  return (
    <div className="h-full w-full">
      <NavBook />
      <BookInfo />
      <SimilarBooks />
    </div>
  );
}
