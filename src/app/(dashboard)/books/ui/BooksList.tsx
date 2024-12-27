import React from "react";
import BookPage from "./BookPage";
import { Spinner } from "@/app/ui/Spinner";
import BookCard from "@/components/BookCard";
import { useBooksProvider } from "../provider/BooksProvider";
import BookListElement from "./BookListElement";
import useCurrentBooks from "../hooks/useCurrentBooks";
import Image from "next/image";

export default function BooksList() {
  const { numberOfBooks } = useBooksProvider() as {
    numberOfBooks: "6" | "4" | "3" | "1";
  };
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
      <div className="flex h-[40rem] w-screen flex-col items-center justify-center gap-10 overflow-y-hidden text-2xl">
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
    <div className="flex w-screen flex-col items-center overflow-y-hidden bg-color3 py-5">
      {numberOfBooks !== "1" ? (
        <div
          dir="rtl"
          className={`grid w-fit gap-2 overflow-hidden max-sm:grid-cols-2 ${numberOfBooks === "4" ? "grid-cols-4" : numberOfBooks === "6" ? "grid-cols-6" : numberOfBooks === "3" ? "grid-cols-3" : numberOfBooks === "2" ? "grid-cols-2" : "grid-cols-1"} `}
        >
          {books?.map((book, i) => (
            <div
              key={i}
              className={`flex items-center justify-center transition-all duration-300`}
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
        <div className="ml-auto grid grid-cols-1 gap-5 overflow-y-hidden px-20">
          {books?.map((book, i) => <BookListElement book={book} />)}
        </div>
      )}
      <BookPage numberOfPages={pages} />
    </div>
  );
}
