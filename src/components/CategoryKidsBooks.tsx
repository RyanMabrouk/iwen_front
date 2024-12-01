"use client";
import React, { useState } from "react";
import SelectWithBorder from "./main/SelectWithBorder";
import CategoryIcon from "./icons/CategoryIcon";
import BookCard from "./BookCard";
import ArrowLeft from "./icons/ArrowLeft";
import Image from "next/image";
import useBooks from "@/hooks/data/books/useBooks";
import ArrowRight from "./icons/ArrowRight";
import CustomSwiper from "./ui/swiper";
import EmptyBox from "./icons/EmptyBox";

const categories = [
  { label: "الأكثر مبيعا" },
  { label: "كتب جديدة" },
  { label: "تخفيض على السعر" },
  { label: "عروض خاصة بمناسبة رمضان المبارك" },
];

export default function CategoryKidsBooks() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const { data: books } = useBooks({ limit: 10 });

  return (
    <div className="relative space-y-12 bg-white px-6 py-14">
      <div className="pointer-events-none absolute inset-0 top-12 flex w-full items-start justify-between">
        <Image
          src="/boykid.png"
          className="w-auto max-w-[50%]"
          alt="Boy Kid"
          width={1000}
          height={1000}
        />
        <Image
          src="/girlkid.png"
          className="w-auto max-w-[50%]"
          alt="Girl Kid"
          width={1000}
          height={1000}
        />
      </div>

      <h1 className="relative z-10 mx-auto w-fit text-3xl font-bold">
        ركن الأطفال
      </h1>

      <div className="mx-auto w-full max-w-[1400px] space-y-12">
        <div className="flex h-fit w-full items-center justify-between gap-10 max-xl:flex-col">
          <div className="scrollbar scrollbar-thin scrollbar-thumb-primary-500 scrollbar-track-gray-200 dir-[rtl] relative h-[60px] w-full overflow-x-auto">
            <div className="flex min-w-max flex-row-reverse gap-[25px] whitespace-nowrap">
              {categories.map((category, index) => (
                <div key={index}>
                  <h2
                    id={index.toString()}
                    className={`cursor-pointer p-2.5 text-xl transition-colors ${
                      activeCategory === index
                        ? "font-semibold text-primary-500"
                        : "font-normal"
                    }`}
                    onClick={() => setActiveCategory(index)}
                  >
                    {category.label}
                    {index !== activeCategory && (
                      <span className="text-xl"> (09)</span>
                    )}
                  </h2>
                  {index === activeCategory && (
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
                      <BookCard {...book} writer={book.writer?.name} />
                    </div>
                  ))}
                  slidesPerView={1}
                  spaceBetween={20}
                  breakpoints={{
                    1024: { slidesPerView: 5 },
                    768: { slidesPerView: 2 },
                    640: { slidesPerView: 1 },
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
                    writer={book.writer?.name}
                    stock={book.stock}
                    images={book.images_urls}
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

        <div className="mx-auto flex w-fit cursor-pointer items-center gap-4">
          <span className="flex">
            <ArrowLeft size={16} />
            <ArrowLeft size={16} />
          </span>
          <span className="text-xl font-medium text-gray-700">عرض المزيد</span>
        </div>
      </div>
    </div>
  );
}
