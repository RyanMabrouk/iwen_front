import React from "react";
import useBooks from "@/hooks/data/books/useBooks";
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
      <div className="flex h-[30rem] w-full flex-col items-center justify-center text-2xl">
        <Image src="/empty-book.svg" alt="book" width={200} height={200} />
        <h1>لا يوجد كتب</h1>
      </div>
    );
  const pages = data.data?.data?.meta.total_pages ?? 0;
  return (
    <div className="flex flex-col items-center">
      {numberOfBooks !== "1" ? (
        <div
          dir="rtl"
          className={`grid w-fit max-sm:grid-cols-2 grid-cols-${numberOfBooks}`}
        >
          {books?.map((book, i) => (
            <div
              key={i}
              className={`py-3 transition-all duration-300 max-sm:px-5 ${numberOfBooks === "6" ? "px-4" : numberOfBooks === "4" ? "px-5" : numberOfBooks === "3" ? "px-16 py-4 max-lg:px-5" : "px-20 max-md:px-10"}`}
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
      ) : (
        <div className="grid w-fit grid-cols-1 gap-5 px-20">
          {books?.map((book, i) => <BookListElement book={book} />)}
        </div>
      )}
      <BookPage numberOfPages={pages} />
    </div>
  );
}
