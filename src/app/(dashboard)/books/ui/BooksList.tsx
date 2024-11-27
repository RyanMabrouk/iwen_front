import React from "react";
import { FilterType, SortingType } from "../page";
import useBooks from "@/hooks/data/books/useBooks";
import BookCart from "@/components/BookCart";
import BookPage from "./BookPage";
import { Spinner } from "@/app/ui/Spinner";

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
  setPage: React.Dispatch<React.SetStateAction<number>>;
  filters: FilterType;
}) {
  const data = useBooks({
    limit: booksNumber * 3,
    page,
    filters: {
      ...(sortings === "newest" && {
        "books.created_at": [
          {
            operator: ">",
            value: new Date(Date.now() - 4 * 7 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0],
          },
        ],
      }),
      ...(sortings === "discount" && {
        "books.discount": [{ operator: ">", value: "0" }],
      }),
      ...(filter.priceMin !== undefined &&
      filter.priceMax !== undefined &&
      filter.priceMin > 0 &&
      filter.priceMax < 1000
        ? {
            "books.price_dollar": [
              { operator: ">", value: filter.priceMin.toString() },
              { operator: "<", value: filter.priceMax.toString() },
            ],
          }
        : filter.priceMin !== undefined && filter.priceMin > 0
          ? {
              "books.price_dollar": [
                { operator: ">", value: filter.priceMin.toString() },
              ],
            }
          : filter.priceMax !== undefined && filter.priceMax < 1000
            ? {
                "books.price_dollar": [
                  { operator: "<", value: filter.priceMax.toString() },
                ],
              }
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
            <BookCart book={book} />
          </div>
        ))}
      </div>
      <BookPage page={page} setPage={setPage} />
    </div>
  );
}
