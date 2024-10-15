"use client";
import React, { useRef, useState } from "react";
import BookCart from "./BookCart";
import ArrowLeft from "./icons/ArrowLeft";
import SelectWithBorder from "./main/SelectWithBorder";
import CategoryIcon from "./icons/CategoryIcon";
import Image from "next/image";

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

export default function CategoryKidsBooks() {
  const [activeCategory, setActiveCategory] = useState(0);
  const labelRef = useRef<HTMLHeadingElement>(null);
  return (
    <div className="relative space-y-12 bg-white px-64 pt-20">
      <div className="pointer-events-none absolute inset-0 flex w-full items-start justify-between">
        <img src="/boykid.png" className="w-fit" />
        <img src="/girlkid.png" className="w-fit" />
      </div>
      <h1 className="mx-auto w-fit text-3xl font-bold">ركن الأطفال</h1>

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
        <BookCart id={"mzkefizpeiezjdzenfi"} />
        <BookCart id={"jzenvoeznoifez"} />
        <BookCart id={"ezfezfzefe"} />
        <BookCart id={"efzefzefezeazaeazell"} />
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
