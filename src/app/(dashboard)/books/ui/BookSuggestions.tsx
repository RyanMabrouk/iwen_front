import { IBookPopulated } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface BookSuggestionsProps {
  books: IBookPopulated[];
  onSuggestionClick: (bookTitle: string) => void;
  onFocus: (bool: boolean) => void;
}

export default function BookSuggestions({
  onFocus,
  books,
  onSuggestionClick,
}: BookSuggestionsProps) {
  const router = useRouter();
  if (books.length === 0) {
    return null;
  }

  return (
    <div className="absolute z-20 mt-1 w-full rounded-md bg-white shadow-lg">
      <ul className="max-h-60 overflow-auto py-1 text-base">
        {books.map((book) => (
          <li
            key={book.id}
            onMouseOver={() => onFocus(true)}
            onMouseLeave={() => onFocus(false)}
            className="flex cursor-pointer items-stretch gap-3 px-4 py-2 hover:bg-gray-100"
          >
            <div
              dir="rtl"
              className="flex w-full items-center gap-3"
              onClick={() => {
                onSuggestionClick(book.title);
                router.push(`/books/${book.id}`);
              }}
            >
              {book?.images_urls !== undefined &&
              book.images_urls.length > 0 ? (
                <Image
                  src={book.images_urls[0] ?? ""}
                  alt="book"
                  width={40}
                  height={10}
                  className="mr-2"
                />
              ) : (
                <Image
                  src={"/empty-book.svg"}
                  alt="book"
                  width={40}
                  height={10}
                  className="mr-2"
                />
              )}
              <h1>{book.title}</h1>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
