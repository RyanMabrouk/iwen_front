import React from "react";
import BookPage from "./BookPage";
import { Spinner } from "@/app/ui/Spinner";
import BookCard from "@/components/BookCard";
import { useBooksProvider } from "../provider/BooksProvider";
import BookListElement from "./BookListElement";
import useCurrentBooks from "../hooks/useCurrentBooks";
import Image from "next/image";

export default function BooksList() {
  const { numberOfBooks } = useBooksProvider();

  const data = useCurrentBooks();
  if (data.isLoading)
    return (
      <div className="flex h-full min-h-[40rem] w-full items-center justify-center bg-transparent bg-opacity-25">
        <Spinner />
      </div>
    );
  const books = data.data?.data?.data;
  if (books?.length === 0)
    return (
      <div className="flex h-[40rem] w-full flex-col items-center justify-center gap-10 text-2xl">
        <Image
          src="/dashboard/books/no-books.png"
          alt="book"
          width={800}
          quality={100}
          height={300}
        />
        <h1 className="mr-5 font-semibold">لا يوجد كتب</h1>
      </div>
    );
  const pages = data.data?.data?.meta.total_pages ?? 0;
  return (
    <div className="flex w-full flex-col items-center bg-color3 py-5">
      {numberOfBooks !== "1" ? (
        <div
          dir="rtl"
          className={`grid w-fit max-sm:grid-cols-2 ${numberOfBooks === "4" ? "w-full grid-cols-4" : numberOfBooks === "6" ? "grid-cols-6" : numberOfBooks === "3" ? "grid-cols-3" : numberOfBooks === "2" ? "grid-cols-2" : "grid-cols-1"} `}
        >
          {books?.map((book, i) => (
            <div
              key={i}
              className={`flex items-center justify-center py-3 transition-all duration-300 max-sm:px-5 ${numberOfBooks === "6" ? "px-4" : numberOfBooks === "4" ? "w-full px-5" : numberOfBooks === "3" ? "px-7 py-4 max-lg:px-5" : "px-20 max-md:px-10"}`}
            >
              <BookCard
                fill={true}
                {...book}
                writer={book.writer?.name ?? ""}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="ml-auto grid w-fit grid-cols-1 gap-5 px-20">
          {books?.map((book, i) => <BookListElement book={book} />)}
        </div>
      )}
      <BookPage numberOfPages={pages} />
    </div>
  );
}
