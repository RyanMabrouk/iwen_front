"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBooksProvider } from "../provider/BooksProvider";
import useURL from "@/hooks/useURL";
import Image from "next/image";

const sortOptions = [
  { value: "alphabetical", label: "أبجدياً" },
  { value: "discount", label: "الخصم" },
  { value: "price", label: "السعر" },
  { value: "date", label: "تاريخ النشر" },
];

export function BooksSortings() {
  const { sortings, asc } = useBooksProvider();
  const { update } = useURL();
  const handleSortings = (value: string) => {
    update([
      { name: "sortings", value },
      { name: "page", value: "1" },
    ]);
  };
  const handleChangeAsc = () => {
    update([
      { name: "asc", value: asc === "1" ? "0" : "1" },
      { name: "page", value: "1" },
    ]);
  };

  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
      <Select dir="rtl" value={sortings} onValueChange={handleSortings}>
        <Image
          src="/dashboard/books/arrow-up.png"
          alt="arrow"
          width={30}
          height={30}
          onClick={handleChangeAsc}
          className={`cursor-pointer rounded-full border-2 border-color1 p-1 transition-all duration-200 hover:shadow-lg ${asc === "0" ? "rotate-180" : ""}`}
        />
        <SelectTrigger className="w-[220px] font-semibold">
          <SelectValue
            placeholder="الترتيب حسب"
            className="outline-none ring-0 ring-transparent"
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>خيارات الترتيب</SelectLabel>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
