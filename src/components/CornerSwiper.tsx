"use client";
import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import ArrowLeft from "./icons/ArrowLeft";
import Image from "next/image";
import useBooks from "@/hooks/data/books/useBooks";
import ArrowRight from "./icons/ArrowRight";
import CustomSwiper from "./ui/swiper";
import EmptyBox from "./icons/EmptyBox";
import Link from "next/link";
import useCorners from "@/hooks/data/books/corners/useCorners";
import { useQueryClient } from "@tanstack/react-query";
import { booksQuery } from "@/hooks/data/books/booksQuery";

export default function CornerSwiper() {
  const [activeCorner, setActiveCorner] = useState(0);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const { data: corners } = useCorners();
  const { data: books } = useBooks({
    filters: {
      "books.corner_id": [
        {
          operator: "=",
          value: corners?.data?.[activeCorner].id ?? "",
        },
      ],
    },
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (corners?.data?.length) {
      setActiveCorner(0);
    }

    corners?.data?.forEach((corner, index) => {
      queryClient.prefetchQuery(
        booksQuery({
          filters: { "books.corner_id": [{ operator: "=", value: corner.id }] },
        }),
      );
    });
  }, [corners?.data?.length]);

  if (!corners || !books) {
    return null;
  }

  return (
    <div className="relative mb-12 space-y-12 bg-white px-6 pt-14">
      <div className="pointer-events-none absolute inset-0 top-12 flex w-full items-start justify-between">
        <Image
          src="/right-img.svg"
          className="w-full max-w-[20%]"
          alt="Boy Kid"
          width={500}
          height={500}
        />
        <Image
          src="/left-img.svg"
          className="w-full max-w-[20%]"
          alt="Girl Kid"
          width={500}
          height={500}
        />
      </div>

      <h1 className="relative z-10 mx-auto w-fit text-3xl font-bold">
        قسم {corners.data?.[activeCorner].name}
      </h1>

      <div className="mx-auto w-full max-w-[1400px] space-y-12">
        <div className="flex h-fit w-full items-center justify-between gap-10 max-xl:flex-col">
          <div className="scrollbar scrollbar-thin scrollbar-thumb-primary-500 scrollbar-track-gray-200 dir-[rtl] relative h-[60px] w-full overflow-x-auto">
            <div className="flex min-w-max flex-row-reverse gap-[25px] whitespace-nowrap">
              {corners?.data?.map((corner, index) => (
                <div key={index}>
                  <h2
                    id={index.toString()}
                    className={`cursor-pointer p-2.5 text-xl transition-colors ${
                      activeCorner === index
                        ? "font-semibold text-primary-500"
                        : "font-normal"
                    }`}
                    onClick={() => setActiveCorner(index)}
                  >
                    {corner.name}
                    {index === activeCorner && (
                      <span className="text-xl">
                        {" "}
                        ({books.data?.meta.total_count})
                      </span>
                    )}
                  </h2>
                  {index === activeCorner && (
                    <div className="h-0.5 bg-primary-500"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          {books?.data && books.data.data.length > 0 ? (
            books.data.data.length > 4 ? (
              <>
                <div className="top-1/2 z-10 flex w-full justify-between">
                  <ArrowLeft
                    size={40}
                    className={`custom-swiper-books-prev absolute -left-10 top-1/2 -translate-y-1/2 cursor-pointer ${
                      isPrevDisabled ? "text-gray-400" : "text-primary-400"
                    } max-sm:-left-6`}
                  />
                  <ArrowRight
                    size={40}
                    className={`custom-swiper-books-next absolute -right-10 top-1/2 -translate-y-1/2 cursor-pointer ${
                      isNextDisabled ? "text-gray-400" : "text-primary-400"
                    } max-sm:-right-6`}
                  />
                </div>

                <CustomSwiper
                  onSwiper={(swiper) => {
                    setIsPrevDisabled(swiper.isBeginning);
                    setIsNextDisabled(swiper.isEnd);
                  }}
                  onSlideChange={(swiper) => {
                    setIsPrevDisabled(swiper.isBeginning);
                    setIsNextDisabled(swiper.isEnd);
                  }}
                  navigation={{
                    prevEl: ".custom-swiper-books-prev",
                    nextEl: ".custom-swiper-books-next",
                  }}
                  slides={books.data.data.map((book) => (
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
                  slidesPerView={1}
                  spaceBetween={20}
                  breakpoints={{
                    1200: { slidesPerView: 5 },
                    1024: { slidesPerView: 4 },
                    768: { slidesPerView: 3 },
                    600: { slidesPerView: 2 },
                    500: { slidesPerView: 1 },
                  }}
                  className="h-full w-full"
                />
              </>
            ) : (
              <div className="grid grid-cols-4 gap-10 max-xl:grid-cols-2 max-sm:grid-cols-1">
                {books.data.data.map((book) => (
                  <BookCard
                    key={book.id}
                    {...book}
                    writer={book.writer?.name ?? "كاتب غير معروف"}
                  />
                ))}
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4">
              <EmptyBox />
              <p className="text-lg text-gray-500">لا توجد كتب متاحة</p>
            </div>
          )}
        </div>

        <Link
          href={{
            pathname: "/books",
            query: { corner: corners.data?.[activeCorner].id },
          }}
          className="absolute left-[2%] top-[21%] mx-auto flex w-fit cursor-pointer items-center gap-2 bg-white px-4 text-gray-700 hover:text-color1 hover:underline max-[1100px]:hidden"
        >
          <span className="flex">
            <ArrowLeft size={12} />
            <ArrowLeft size={12} />
          </span>
          <span className="text-lg font-medium">عرض المزيد</span>
        </Link>
      </div>
    </div>
  );
}
