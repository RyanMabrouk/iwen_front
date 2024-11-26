"use client";
import React, { useState } from "react";
import SelectWithBorder from "./main/SelectWithBorder";
import CategoryIcon from "./icons/CategoryIcon";
import BookCart from "./BookCart";
import ArrowLeft from "./icons/ArrowLeft";
import Image from "next/image";

const categories = [
  { label: "الأكثر مبيعا" },
  { label: "كتب جديدة" },
  { label: "تخفيض على السعر" },
  { label: "عروض خاصة بمناسبة رمضان المبارك" },
];

export default function CategoryKidsBooks() {
  const [activeCategory, setActiveCategory] = useState(0);

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

      <div className="relative z-10 mx-auto w-full max-w-[1400px] space-y-12">
        <div className="flex h-fit items-center justify-between gap-10 max-xl:flex-col">
          <div className="flex-1">
            <SelectWithBorder
              className="w-fit"
              text="الفئات"
              icon={<CategoryIcon size={18} />}
            />
          </div>

          <div className="scrollbar-thin scrollbar-thumb-primary-500 flex h-[60px] w-full overflow-x-auto overflow-y-hidden">
            <div className="flex min-w-max flex-row-reverse gap-[25px] whitespace-nowrap">
              {categories.map((category, index) => (
                <div key={index}>
                  <h2
                    id={index.toString()}
                    className={`cursor-pointer p-2.5 text-2xl transition-colors ${
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

        {/* 
        <div className="grid grid-cols-4 gap-10 max-xl:grid-cols-2 max-sm:grid-cols-1">
          <BookCart id="mzkefizpeiezjdzenfi" />
          <BookCart id="jzenvoeznoifez" />
          <BookCart id="ezfezfzefe" />
          <BookCart id="efzefzefezeazaeazell" />
        </div> */}

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
