import React, { useEffect, useState } from "react";
import { SortingType } from "../page";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Sortings({
  sortings,
  setSortings,
}: {
  sortings: SortingType;
  setSortings: React.Dispatch<React.SetStateAction<SortingType>>;
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
  ];
  return (
    <ul
      dir="rtl"
      className="flex items-center gap-10"
      style={{ fontWeight: 600 }}
    >
      {options.map((option) => (
        <li
          onClick={() => setSortings(option.view as SortingType)}
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
