import React, { useEffect, useState } from "react";
import { SortingType } from "../page";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Sortings({
  sortings,
  setView,
}: {
  sortings: SortingType;
  setView: (view: SortingType) => void;
}) {
  const options = [
    {
      id: 1,
      name: "الأكثر مبيعا",
      view: "mostSold",
    },
    {
      id: 2,
      name: "كتب جديدة (10)",
      view: "newest",
    },
    {
      id: 3,
      name: "تخفيض على السعر (19)",
      view: "discount",
    },
    {
      id: 4,
      name: "كل الكتب",
      view: "all",
    },
  ];
  return (
    <ul
      dir="rtl"
      className="flex items-center gap-10"
      style={{ fontWeight: 600 }}
    >
      {options.map((option) => (
        <li
          onClick={() => setView(option.view as SortingType)}
          key={option.id}
          style={{
            color: sortings === option.view ? "#27A49B" : "#000",
          }}
          className="cursor-pointer border-b-2 border-white transition-all duration-200 hover:border-emerald-500"
        >
          {option.name}
        </li>
      ))}
    </ul>
  );
}
