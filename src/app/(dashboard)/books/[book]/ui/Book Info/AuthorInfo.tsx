import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useBookProvider } from "../../provider/BookProvider";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";

export default function AuthorInfo() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    if (window) {
      const checkScreenSize = () => {
        setIsSmallScreen(window.innerWidth < 1024);
      };

      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);

      return () => window.removeEventListener("resize", checkScreenSize);
    }
  }, []);
  const { book } = useBookProvider();
  if (!book?.writer) return <div>no authors to be shown</div>;

  return (
    <ScrollArea>
      <div
        dir="rtl"
        key="author"
        className="flex w-full max-w-[40rem] gap-3 max-lg:max-h-[12rem] max-lg:flex-col max-lg:items-center max-md:min-h-[200px]"
      >
        <div
          dir="rtl"
          className="m-3 h-auto w-fit flex-grow border p-4 max-lg:w-full"
          style={{ background: "#FCFCFD", borderColor: "#E7E9EB" }}
        >
          <div dir="rtl" className="mb-3 flex items-center gap-2">
            <div className="relative h-10 w-10 rounded-full">
              <Image
                src="/dashboard/book/profile.jpg"
                alt="alternative"
                className="rounded-full"
                fill
              />
            </div>
            <h2 className="font-semibold">{book.writer.name ?? "no name"}</h2>
          </div>
        </div>
        <div
          key="recommended books"
          className="m-3 flex h-[17rem] w-1/2 flex-grow flex-col gap-2 border p-4 max-lg:w-full max-lg:bg-color3"
          style={{ background: "#FCFCFD", borderColor: "#E7E9EB" }}
        >
          <h2 className="font-semibold">
            مؤلفات أخرى متوفرة ({book.writer_books.length})
          </h2>
          <ScrollArea className="w-full flex-grow rounded-md border">
            <div className="flex flex-1 flex-col gap-1 p-3">
              {book.writer_books.map((book) => (
                <Link
                  href={`/books/${book.id}`}
                  dir="rtl"
                  className="flex items-center gap-2 rounded-md border bg-white p-2"
                  style={{ borderColor: "#E7E9EB" }}
                  key={book.id}
                >
                  <div className="relative h-12 w-10">
                    {book.images_urls !== undefined &&
                    book.images_urls.length > 0 ? (
                      <Image
                        src={book.images_urls[0] ?? ""}
                        alt={book.title}
                        fill
                      />
                    ) : (
                      <Image src="/empty-book.svg" alt={book.title} fill />
                    )}
                  </div>
                  <div dir="rtl">
                    <h3 dir="rtl" className="font-semibold">
                      {book.title.length < 18
                        ? book.title
                        : book.title.slice(0, 18) + "..."}
                    </h3>
                    <h4 style={{ color: "#27A098" }}>السعر {book.price} د.م</h4>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
      <ScrollBar orientation={`${isSmallScreen ? "vertical" : "horizontal"}`} />
    </ScrollArea>
  );
}
