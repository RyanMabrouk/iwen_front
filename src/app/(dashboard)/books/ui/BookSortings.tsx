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
import { SortAsc } from "lucide-react";
import { useBooksProvider } from "../provider/BooksProvider";

const sortOptions = [
  { value: "alphabetical", label: "أبجدياً" },
  { value: "discount", label: "الخصم" },
  { value: "price-asc", label: "السعر: من الأقل إلى الأعلى" },
  { value: "price-desc", label: "السعر: من الأعلى إلى الأقل" },
  { value: "date", label: "تاريخ النشر" },
];

export function BooksSortings() {
  const { sortings, setSortings } = useBooksProvider();

  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
      <Select dir="rtl" value={sortings} onValueChange={setSortings}>
        <SelectTrigger className="w-[220px] font-semibold">
          <SelectValue placeholder="الترتيب حسب" />
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
