import React from "react";
import { SortingType } from "../page";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
    <ScrollArea>
      <ul
        dir="rtl"
        className="flex items-center gap-10 py-2 max-lg:gap-3"
        style={{ fontWeight: 600 }}
      >
        {options.map((option) => (
          <li
            onClick={() => setView(option.view as SortingType)}
            key={option.id}
            style={{
              color: sortings === option.view ? "#27A49B" : "#000",
            }}
            className="cursor-pointer text-nowrap border-b-2 border-white transition-all duration-200 hover:border-emerald-500"
          >
            {option.name}
          </li>
        ))}
      </ul>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
