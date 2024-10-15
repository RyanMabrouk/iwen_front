"use client";
import React, { useEffect, useRef, useState } from "react";
import SelectWithBorder from "./main/SelectWithBorder";
import CategoryIcon from "./icons/CategoryIcon";
import BookCart from "./BookCart";
import ArrowLeft from "./icons/ArrowLeft";

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
  const labelRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (labelRef.current) {
      console.log(labelRef.current.getBoundingClientRect().width);
    }
  }, [
    activeCategory,
    labelRef.current ? labelRef.current.getBoundingClientRect().width : 0,
  ]);
  return (
    <div className="w-full space-y-12 bg-[#E7F6F5]/30 px-64 py-14">
      <div className="flex h-fit w-full items-center justify-between">
        <SelectWithBorder text={"الفئات"} icon={<CategoryIcon size={18} />} />
        <div className="">
          <div className="flex flex-row-reverse gap-[25px]">
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
                  ref={activeCategory == index ? labelRef : undefined}
                >
                  {category.label}
                  {index != activeCategory && (
                    <span className="text-xl"> (09)</span>
                  )}
                </h2>
                {index === activeCategory && (
                  <div
                    className={`h-0.5 bg-primary-500 ${labelRef.current ? `w-[${Math.floor(labelRef.current.getBoundingClientRect().width)}px]` : ""}`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-10">
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
  );
}
