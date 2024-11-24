"use client";
import React, { useState } from "react";
import SelectWithBorder from "./main/SelectWithBorder";
import CategoryIcon from "./icons/CategoryIcon";
import BookCart from "./BookCart";
import ArrowLeft from "./icons/ArrowLeft";
import CustomSwiper from "./ui/swiper";
import useBooks from "@/hooks/data/books/useBooks";
import useCategories from "@/hooks/data/books/categories/useCategories";
import ArrowRight from "./icons/ArrowRight";
import EmptyBox from "./icons/EmptyBox";

const filter = [
  { label: "الأكثر مبيعا" },
  { label: "كتب جديدة" },
  { label: "تخفيض على السعر" },
  { label: "عروض خاصة بمناسبة رمضان المبارك" },
];

export default function CategoryBooksSection() {
  const [activeFilter, setActiveFilter] = useState(0);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const { data: categories } = useCategories();
  const { data: books } = useBooks({ limit: 20 });

  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const filteredBooks = activeCategoryId
    ? books?.data?.data.filter((book) =>
        book.categories.some((category) => category.id === activeCategoryId),
      )
    : books?.data?.data;

  return (
    <div className="relative bg-[#E7F6F5]/30 px-6 py-14">
      <div className="mx-auto w-full max-w-[1400px] space-y-12">
        <div className="flex h-fit w-full items-center justify-between gap-10 max-xl:flex-col">
          <SelectWithBorder
            defaultStatus
            text={"الفئات"}
            icon={<CategoryIcon size={18} />}
            content={
              categories?.data?.map((category) => ({
                id: category.id,
                name: category.name,
              })) || []
            }
            onChange={(categoryId) => {
              setActiveCategoryId(categoryId);
            }}
          />
          <div className="scrollbar scrollbar-thin scrollbar-thumb-primary-500 scrollbar-track-gray-200 dir-[rtl] relative h-[60px] w-full overflow-x-auto">
            <div className="dir-[rtl] flex min-w-max flex-row-reverse gap-[25px] whitespace-nowrap">
              {filter.map((category, index) => (
                <div key={index}>
                  <h2
                    id={index.toString()}
                    className={`cursor-pointer p-2.5 text-2xl transition-colors ${
                      activeFilter === index
                        ? "font-semibold text-primary-500"
                        : "font-normal"
                    }`}
                    onClick={() => {
                      setActiveFilter(index);
                    }}
                  >
                    {category.label}
                    {index !== activeFilter && (
                      <span className="text-xl"> (09)</span>
                    )}
                  </h2>
                  {index === activeFilter && (
                    <div className="h-0.5 bg-primary-500"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          {filteredBooks && filteredBooks.length > 0 ? (
            filteredBooks.length > 4 ? (
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
                  slides={filteredBooks.map((book) => (
                    <div
                      key={book.id}
                      className="group flex h-full w-full items-center justify-center p-4"
                    >
                      <BookCart
                        id={book.id}
                        title={book.title}
                        writer={book.writer?.name || "كاتب غير معروف"}
                        images={book.images_urls}
                        discount={book.discount}
                        price={book.price}
                      />
                    </div>
                  ))}
                  slidesPerView={1}
                  spaceBetween={20}
                  breakpoints={{
                    1024: { slidesPerView: 4 },
                    768: { slidesPerView: 2 },
                    640: { slidesPerView: 1 },
                  }}
                  className="h-full w-full"
                />
              </>
            ) : (
              <div className="grid grid-cols-4 gap-10 max-xl:grid-cols-2 max-sm:grid-cols-1">
                {filteredBooks.map((book) => (
                  <BookCart
                    key={book.id}
                    id={book.id}
                    title={book.title}
                    writer={book.writer?.name || "كاتب غير معروف"}
                    images={book.images_urls}
                    discount={book.discount}
                    price={book.price}
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
      </div>
    </div>
  );
}
