import React from "react";
import StarRating from "../StarRating";
import Image from "next/image";

export default function MainInfo() {
  return (
    <div className="">
      <ul className="mb-10 flex flex-col items-end gap-2 p-3">
        <li dir="rtl">
          <strong>إسم المؤلف :</strong> أحمد بن حنبل
        </li>
        <li dir="rtl">
          <strong>إسم الكتاب :</strong> أحمد بن حنبل
        </li>
        <li dir="rtl">
          <strong>فئة :</strong> أحمد بن حنبل
        </li>
        <li dir="rtl" className="flex gap-2">
          <strong>تقييمات القارئين :</strong>
          <StarRating rating={5} />
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
