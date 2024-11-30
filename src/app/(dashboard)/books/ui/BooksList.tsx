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
  booksNumber: string;
  sortings: SortingType;
  page: number;
  setPage: (value: number) => void;
  filters: FilterType;
}) {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - 1);
  const formattedDate = currentDate.toISOString().split("T")[0];

  const data = useBooks({
    limit: parseInt(booksNumber) * 3,
    page,
    extra_filters: {
      ...(filter.categories !== undefined &&
        filter.categories.length > 0 && {
          categories_ids: filter.categories,
        }),
      ...(filter.subcategories !== undefined &&
        filter.subcategories.length > 0 && {
          subcategories_ids: filter.subcategories,
        }),
      ...(sortings === "mostSold" && { most_sold: "desc" }),
    },

    filters: {
      ...(sortings === "newest"
        ? { "books.created_at": [{ operator: ">=", value: formattedDate }] }
        : sortings === "discount"
          ? { "books.discount": [{ operator: ">=", value: "0" }] }
          : {}),
      ...(filter.writer !== undefined && {
        "books.writer_id": [{ operator: "=", value: filter.writer }],
      }),
      ...(filter.shareHouse !== undefined && {
        "books.share_house_id": [{ operator: "=", value: filter.shareHouse }],
      }),
      ...(filter.priceRange !== undefined && {
        "books.price": [
          { operator: ">", value: filter.priceRange[0].toString() },
          { operator: "<", value: filter.priceRange[1].toString() },
        ],
      }),
    },
  });
  if (data.isLoading)
    return (
      <div className="flex h-full min-h-[40rem] w-full items-center justify-center bg-transparent bg-opacity-25">
        <Spinner />
      </div>
    );
  const books = data.data?.data?.data;
  const pages = data.data?.data?.meta.total_pages ?? 0;
  return (
    <div className="flex flex-col items-center">
      <div
        dir="rtl"
        className={`grid w-full max-sm:grid-cols-2 grid-cols-${booksNumber}`}
      >
        {books?.map((book, i) => (
          <div
            key={i}
            className={`py-3 transition-all duration-300 max-sm:px-5 ${booksNumber === "6" ? "px-4" : booksNumber === "4" ? "px-10" : booksNumber === "3" ? "px-16 py-4 max-lg:px-5" : "px-20 max-md:px-10"}`}
          >
            <BookCard
              images={book.images_urls}
              {...book}
              writer={book.writer?.name ?? ""}
            />
          </div>
        ))}
      </div>
      <BookPage numberOfPages={pages} page={page} setPage={setPage} />
    </div>
  );
}
