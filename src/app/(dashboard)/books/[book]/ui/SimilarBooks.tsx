import CustomSwiper from "@/app/ui/Swiper";
import BookCard from "@/components/BookCard";
import ArrowLeft from "@/components/icons/ArrowLeft";
import ArrowRight from "@/components/icons/ArrowRight";
import { useWindowSize } from "@/hooks/useWindowSize";
import { IBookPopulated } from "@/types";
import React from "react";

export default function SimilarBooks({
  books,
}: {
  books: IBookPopulated[] | null;
}) {
  const { width } = useWindowSize();

  if (!books || books.length === 0) {
    return null; // Don't render anything if there are no books
  }

  return (
    <div dir="rtl" className="flex flex-col gap-3 p-5">
      <h1 className="mr-8 font-semibold">كتب مشابهة أخرى</h1>
      {width !== undefined && width > 640 ? (
        <div
          dir="rtl"
          className="grid grid-cols-6 gap-x-8 gap-y-3 px-7 py-4 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1"
        >
          {books.map((book) => (
            <BookCard key={book.id} {...book} writer={book.writer?.name} />
          ))}
        </div>
      ) : (
        <div className="relative">
          <ArrowLeft
            size={40}
            className="custom-swiper-books-next absolute -left-10 top-1/2 z-10 -translate-y-1/2 cursor-pointer text-primary-400 max-sm:-left-6"
          />
          <ArrowRight
            size={40}
            className="custom-swiper-books-prev absolute -right-10 top-1/2 z-10 -translate-y-1/2 cursor-pointer text-primary-400 max-sm:-right-6"
          />
          <CustomSwiper
            loop
            navigation={{
              prevEl: ".custom-swiper-books-prev",
              nextEl: ".custom-swiper-books-next",
            }}
            slides={books.map((book) => (
              <div
                key={book.id}
                className="group flex h-full w-full items-center justify-center p-4"
              >
                <BookCard {...book} writer={book.writer?.name} />
              </div>
            ))}
            slidesPerView={2}
            spaceBetween={20}
            breakpoints={{
              1024: { slidesPerView: 5 },
              768: { slidesPerView: 2 },
              640: { slidesPerView: 1 },
            }}
            className="h-full w-full"
          />
        </div>
      )}
    </div>
  );
}
