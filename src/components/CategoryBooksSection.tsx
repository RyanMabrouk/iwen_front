"use client";
import React, { useEffect, useRef, useState } from "react";
import SelectWithBorder from "./main/SelectWithBorder";
import CategoryIcon from "./icons/CategoryIcon";
import BookCart from "./BookCart";
import ArrowLeft from "./icons/ArrowLeft";
import useBooks from "@/hooks/data/books/useBooks";

const categories = [
  {
    label: "الأكثر مبيعا",
  },
  {
    label: "كتب جديدة",
  },
  {
    label: "تخفيض على السعر",
  },
  {
    label: "عروض خاصة بمناسبة رمضان المبارك",
  },
];

export default function CategoryBooksSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const { data: books, error } = useBooks({ limit: 4, page: 1 });

  // if (error) console.log("Hey i have error !" + error.message);
  console.log(books);

  return (
    <div className="overflow-hidden bg-[#E7F6F5]/30 px-6 py-14">
      <div className="mx-auto w-full max-w-[1400px] space-y-12">
        <div className="flex h-fit w-full items-center justify-between gap-10 max-xl:flex-col">
          <SelectWithBorder text={"الفئات"} icon={<CategoryIcon size={18} />} />
          <div className="scrollbar scrollbar-thin scrollbar-thumb-primary-500 scrollbar-track-gray-200 dir-[rtl] relative h-[60px] w-full overflow-x-auto overflow-y-hidden">
            <div className="dir-[rtl] flex min-w-max flex-row-reverse gap-[25px] whitespace-nowrap">
              {categories.map((category, index) => (
                <div key={index}>
                  <h2
                    id={index.toString()}
                    className={`cursor-pointer p-2.5 text-2xl transition-colors ${
                      activeCategory === index
                        ? "font-semibold text-primary-500"
                        : "font-normal"
                    }`}
                    onClick={() => {
                      setActiveCategory(index);
                    }}
                  >
                    {category.label}
                    {index != activeCategory && (
                      <span className="text-xl"> (09)</span>
                    )}
                  </h2>
                  {index === activeCategory && (
                    <div className={`h-0.5 bg-primary-500`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-10 max-xl:grid-cols-2 max-sm:grid-cols-1">
          <BookCart id={"zepofjzeijfhchgg"} />
          <BookCart id={"zeoijfezoiezofouezh"} />
          <BookCart id={"zejfnezonfoez"} />
          <BookCart id={"zefoizeoifezofez"} />
        </div>
        <div className="mx-auto flex w-fit cursor-pointer items-center gap-4">
          <span className="flex">
            <ArrowLeft size={16} />
            <ArrowLeft size={16} />
          </span>
          <span className="text-xl">عرض المزيد</span>
        </div>
      </div>
    </div>
  );
}
