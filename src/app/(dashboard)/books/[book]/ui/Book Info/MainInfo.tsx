import React from "react";
import StarRating from "../StarRating";
import Image from "next/image";
import { useBookProvider } from "../../provider/BookProvider";

export default function MainInfo() {
  const { book, authors } = useBookProvider();
  return (
    <div className="w-full">
      <ul className="mb-10 flex flex-col items-start gap-2 p-3">
        <li dir="rtl">
          <strong>إسم المؤلف :</strong> {authors?.[0].name}
        </li>
        <li dir="rtl">
          <strong>إسم الكتاب :</strong> {book?.title}
        </li>
        <li dir="rtl">
          <strong>فئة :</strong> {book?.categories[0].name}
        </li>
        <li dir="rtl" className="flex gap-2">
          <strong>تقييمات القارئين :</strong>
          <StarRating rating={3} />
          <p className="font-semibold">(X)</p>
        </li>
      </ul>
      <div dir="rtl" className="flex gap-2 p-3">
        <p>متوفر بخاصية القراءة على الموقع</p>
        <button>
          <Image
            src="/dashboard/book/e-book.svg"
            alt="e-book"
            height={25}
            width={25}
          />
        </button>
      </div>
    </div>
  );
}
