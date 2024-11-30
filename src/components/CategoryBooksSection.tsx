"use client";

import React, { useState } from "react";
import SelectWithBorder from "./main/SelectWithBorder";
import CategoryIcon from "./icons/CategoryIcon";
import BookCard from "./BookCart";
import ArrowLeft from "./icons/ArrowLeft";
import CustomSwiper from "./ui/swiper";
import useBooks from "@/hooks/data/books/useBooks";
import useCategories from "@/hooks/data/books/categories/useCategories";
import ArrowRight from "./icons/ArrowRight";
import EmptyBox from "./icons/EmptyBox";
import useEvents from "@/hooks/data/events/useEvents";
import SingleEvent from "./SingleEvent";
import useEvent from "@/hooks/data/events/useEvent";
import Events from "./Events";

export default function CategoryBooksSection() {
  const [activeEvent, setActiveEvent] = useState(0);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [books, setBooks] = useState<any[]>([]);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const { data: categories } = useCategories();

  // if (events?.data) {
  //   setAllEvents(events?.data?.data || []);
  // }
  // setAllEvents(events?.data?.data || []);
  // console.log(events);

  // if (events?.data) {
  //   const event = useEvent({
  //     eventId: (events.data as unknown as any[])[0].id,
  //   });
  //   // setEventBooks(Array.isArray(event.data?.data) ? event.data.data : []);
  //   console.log(event);
  // }

  interface Book {
    id: string;
    categories: { id: string }[];
    writer?: { name: string };
    [key: string]: any;
  }

  const filtredBooks = activeCategoryId
    ? books.filter((book: Book) =>
        book.categories.some((category) => category.id === activeCategoryId),
      )
    : books || [];

  return (
    <div className="relative bg-[#E7F6F5]/30 px-6 py-14">
      <div className="mx-auto w-full max-w-[1400px] space-y-12">
        <div className="flex h-fit w-full items-center justify-between gap-10 max-xl:flex-col">
          <SelectWithBorder
            defaultStatus
            text="الفئات"
            icon={<CategoryIcon size={18} />}
            content={[
              { id: null, name: "عرض الكل" },
              ...(categories?.data?.map((category) => ({
                id: category.id,
                name: category.name,
              })) || []),
            ]}
            onChange={(categoryId) => {
              setActiveCategoryId(categoryId); 
            }}
          />
          <div className="scrollbar scrollbar-thin scrollbar-thumb-primary-500 scrollbar-track-gray-200 dir-[rtl] relative h-[60px] w-full overflow-x-auto">
            <Events
              activeEvent={activeEvent}
              setActiveEvent={setActiveEvent}
              books={books}
              setBooks={setBooks}
            />
          </div>
        </div>

        <div className="relative">
          {filtredBooks && filtredBooks.length > 0 ? (
            books.length > 4 ? (
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
                  slides={books.map((book) => (
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
                    1024: { slidesPerView: 4 },
                    768: { slidesPerView: 2 },
                    640: { slidesPerView: 1 },
                  }}
                  className="h-full w-full"
                />
              </>
            ) : (
              <div className="grid grid-cols-4 gap-10 max-xl:grid-cols-2 max-sm:grid-cols-1">
                {filtredBooks.map((book) => (
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
      </div>
    </div>
  );
}
