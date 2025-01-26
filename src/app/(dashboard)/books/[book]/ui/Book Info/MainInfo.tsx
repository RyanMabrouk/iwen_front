import React from "react";
import StarRating from "../StarRating";
import Image from "next/image";
import { useBookProvider } from "../../provider/BookProvider";
import check from "../../../../../../../public/dashboard/book/check";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function MainInfo() {
  const { book } = useBookProvider();
  return (
    <ScrollArea dir="rtl" className="h-fit max-h-[300px] w-full">
      <ul className="mb-10 flex flex-col items-start gap-2 p-3">
        <li dir="rtl">
          <strong>إسم المؤلف :</strong> {book?.writer?.name}
        </li>
        <li dir="rtl">
          <strong>إسم الكتاب :</strong> {book?.title}
        </li>
        <li dir="rtl">
          <strong>فئة :</strong> {book?.categories[0].name}
        </li>
        <li dir="rtl" className="flex items-center gap-2 max-md:flex-col">
          <strong>تقييمات القارئين :</strong>
          <div className="flex items-center gap-1">
            <StarRating rating={book?.total_rating ?? 0} />
            <p className="text-xl font-semibold">
              ({book?.total_reviews_count})
            </p>
          </div>
        </li>
        <li
          dir="rtl"
          className="hidden max-sm:visible max-sm:flex max-sm:gap-2"
        >
          <div>{check("#27A098")}</div>
          <div style={{ color: "#27A098" }}>متوفر في المتجر</div>
        </li>
      </ul>
      <div dir="rtl" className="flex gap-2 p-3 max-md:flex-col">
        {/*         <p className="text-nowrap">متوفر بخاصية القراءة على الموقع</p>
         */}{" "}
        {/*  <button>
          <Image
            src="/dashboard/book/e-book.svg"
            alt="e-book"
            height={25}
            width={25}
          />
        </button> */}
      </div>
    </ScrollArea>
  );
}
