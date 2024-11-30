import React from "react";
import { FilterType, SortingType } from "../page";
import useBooks from "@/hooks/data/books/useBooks";

import BookPage from "./BookPage";
import { Spinner } from "@/app/ui/Spinner";
import BookCard from "@/components/BookCard";

export default function BooksList({
  booksNumber,
  sortings,
  page,
  setPage,
  filters: filter,
}: {
  booksNumber: number;
  sortings: SortingType;
  page: number;
  setPage: (value: number) => void;
  filters: FilterType;
}) {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - 1);
  const formattedDate = currentDate.toISOString().split("T")[0];

  const data = useBooks({
    limit: booksNumber * 3,
    page,
    ...(sortings === "mostSold" && { most_sold: "desc" }),
    filters: {
      ...(sortings === "newest"
        ? { books: [{ operator: ">=", value: formattedDate }] }
        : sortings === "discount"
          ? { books: [{ operator: ">", value: "0%" }] }
          : {}),
    },
  });
  if (data.isLoading)
    return (
      <div className="flex h-full min-h-[40rem] w-full items-center justify-center bg-transparent bg-opacity-25">
        <Spinner />
      </div>
    );
  const books = data.data?.data?.data;
  return (
    <div className="flex flex-col items-center">
      <div dir="rtl" className={`grid w-full grid-cols-${booksNumber}`}>
        {books?.map((book, i) => (
          <div
            key={i}
            className={`py-3 transition-all duration-300 ${booksNumber === 6 ? "px-4" : booksNumber === 4 ? "px-10" : booksNumber === 3 ? "px-16 py-4 max-lg:px-5" : "px-20 max-md:px-10"}`}
          >
            <BookCard {...book} writer={book.writer?.name ?? ""} />
          </div>
        ))}
      </div>
      <BookPage page={page} setPage={setPage} />
    </div>
  );
}
