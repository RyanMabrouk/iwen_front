import React from "react";
import { SortingType } from "../page";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useBooksProvider } from "../provider/BooksProvider";
import Link from "next/link";
import useCurrentBooks from "../hooks/useCurrentBooks";

export default function BookViews() {
  const { view, changeView } = useBooksProvider();
  const { numberOfBooks } = useBooksProvider();
  const data = useCurrentBooks();
  if (data.isLoading) return null;
  const options = [
    {
      id: 1,
      name: "الأكثر مبيعا",
      view: "mostSold",
      results: view === "mostSold" ? data.data?.data?.meta.total_count : 0,
    },
    {
      id: 2,
      name: "كتب جديدة",
      view: "newest",
      results: view === "newest" ? data.data?.data?.meta.total_count : 0,
    },
    {
      id: 3,
      name: "تخفيض على السعر",
      view: "discount",
      results: view === "discount" ? data.data?.data?.meta.total_count : 0,
    },
    {
      id: 4,
      name: "كل الكتب",
      view: "all",
      results: view === "all" ? data.data?.data?.meta.total_count : 0,
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
            key={option.id}
            href={`/books?page=1&view=${option.view}&booksPerLine=${numberOfBooks}`}
          >
            <li
              onClick={() => {
                changeView(option.view);
              }}
              key={option.id}
              style={{
                color: view === option.view ? "#27A49B" : "#000",
              }}
              className="cursor-pointer text-nowrap border-b-2 border-white transition-all duration-200 hover:border-emerald-500"
            >
              <div className="flex items-center gap-1">
                <h2>{option.name}</h2>
                <h2>({option.results})</h2>
              </div>
            </li>
          </Link>
        ))}
      </ul>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
