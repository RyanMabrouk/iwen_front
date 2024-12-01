import React from "react";
import useBooks from "@/hooks/data/books/useBooks";
import BookPage from "./BookPage";
import { Spinner } from "@/app/ui/Spinner";
import BookCard from "@/components/BookCard";
import { useBooksProvider } from "../provider/BooksProvider";

export default function BooksList() {
  const {
    view: sortings,
    numberOfBooks: booksNumber,
    page,
    priceRange,
    shareHouse,
    categories,
    subcategories,
    writer,
  } = useBooksProvider();
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - 1);
  const formattedDate = currentDate.toISOString().split("T")[0];
  const extra_filters = {
    ...(Array.isArray(categories.split("%")) &&
      categories.split("%").length > 0 && {
        categories_ids: categories.split("%"),
      }),
    ...(Array.isArray(subcategories.split("%")) &&
      subcategories.split("%").length > 0 && {
        subcategories_ids: subcategories.split("%"),
      }),
    ...(sortings === "mostSold" && { most_sold: "desc" as const }),
  };
  const data = useBooks({
    limit: parseInt(booksNumber) * 3,
    page: parseInt(page),
    ...(Object.keys(extra_filters).length > 0 && { extra_filters }),
    filters: {
      ...(sortings === "newest"
        ? { "books.created_at": [{ operator: ">=", value: formattedDate }] }
        : sortings === "discount"
          ? { "books.discount": [{ operator: ">=", value: "0" }] }
          : {}),
      ...(writer !== undefined &&
        writer !== "" && {
          "books.writer_id": [{ operator: "=", value: writer }],
        }),
      ...(shareHouse !== undefined &&
        shareHouse !== "" && {
          "books.share_house_id": [{ operator: "=", value: shareHouse }],
        }),
      ...(priceRange !== undefined &&
        priceRange !== "" && {
          "books.price": [
            { operator: ">", value: priceRange.split("%")[0] },
            { operator: "<", value: priceRange.split("%")[1] },
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
              images={
                book.images_urls.length > 0 ? book.images_urls : undefined
              }
              {...book}
              writer={book.writer?.name ?? ""}
            />
          </div>
        ))}
      </div>
      <BookPage numberOfPages={pages} />
    </div>
  );
}
