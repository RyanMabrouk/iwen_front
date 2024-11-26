import React from "react";
import { SortingType } from "../page";
import useBooks from "@/hooks/data/books/useBooks";
import BookCart from "@/components/BookCart";
import BookPage from "./BookPage";
import { Spinner } from "@/app/ui/Spinner";

export default function BooksList({
  booksNumber,
  sortings,
  page,
  setPage,
}: {
  booksNumber: number;
  sortings: SortingType;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  const data = useBooks({
    limit: booksNumber * 3,
    page,
    ...(sortings === "mostSold" ? { most_sold: "asc" } : {}),
    ...(sortings === "newest"
      ? {
          filters: {
            "books.created_at": [
              {
                operator: ">",
                value: new Date(Date.now() - 4 * 7 * 24 * 60 * 60 * 1000)
                  .toISOString()
                  .split("T")[0],
              },
            ],
          },
        }
      : {}),
    ...(sortings === "discount"
      ? { filters: { "books.discount": [{ operator: ">", value: "0" }] } }
      : {}),
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
            className={` ${booksNumber === 6 ? "px-5 py-4" : "px-10 py-5"}`}
          >
            <BookCart book={book} />
          </div>
        ))}
      </div>
      <BookPage page={page} setPage={setPage} />
    </div>
  );
}
