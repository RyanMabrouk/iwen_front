import React from "react";
import { SortingType } from "../page";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useBooksProvider } from "../provider/BooksProvider";
import Link from "next/link";

export default function Sortings() {
  const { view, changeView } = useBooksProvider();
  const { numberOfBooks } = useBooksProvider();
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
          <Link
            href={`/books?page=1&view=${option.view}&booksPerLine=${numberOfBooks}`}
          >
            <li
              onClick={() => {
                changeView(option.view);
                console.log("1- changing to ", option.view);
              }}
              key={option.id}
              style={{
                color: view === option.view ? "#27A49B" : "#000",
              }}
              className="cursor-pointer text-nowrap border-b-2 border-white transition-all duration-200 hover:border-emerald-500"
            >
              {option.name}
            </li>
          </Link>
        ))}
      </ul>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
