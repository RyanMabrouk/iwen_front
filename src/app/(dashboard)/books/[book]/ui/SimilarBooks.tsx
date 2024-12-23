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
  if (!books || books.length === 0) {
    return null;
  }

  return (
    <div
      dir="rtl"
      className="mb-10 flex flex-col gap-3 bg-bgcolor1 p-5 max-sm:w-screen"
    >
      <h1 className="mr-8 font-semibold text-black">كتب مشابهة أخرى</h1>
      <div className="relative">
        <ArrowLeft
          size={40}
          className="custom-swiper-books-next absolute -left-5 top-1/2 z-10 -translate-y-1/2 cursor-pointer text-primary-400 max-sm:-left-6"
        />
        <ArrowRight
          size={40}
          className="custom-swiper-books-prev absolute -right-5 top-1/2 z-10 -translate-y-1/2 cursor-pointer text-primary-400 max-sm:-right-6"
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
              <BookCard
                {...book}
                writer={book.writer?.name ?? "كاتب غير معروف"}
              />
            </div>
          ))}
          slidesPerView={2}
          spaceBetween={5}
          breakpoints={{
            1600: { slidesPerView: 6 },
            1200: { slidesPerView: 5 },
            900: { slidesPerView: 4 },
            500: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
