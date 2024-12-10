import React from "react";
import { PageType } from "./BookInfo";
import { useBookProvider } from "../provider/BookProvider";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function InfoNav({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: PageType;
  setSelectedTab: (value: PageType) => void;
}) {
  const { book } = useBookProvider();
  const navItems: { id: PageType; title: string }[] = [
    { id: "main", title: "المعلومات الأساسيات" },
    { id: "details", title: "التفاصيل" },
    {
      id: "comments",
      title: "تعاليق القارئين (" + book?.total_reviews_count + ")",
    },
    { id: "author", title: "تقديم المؤلف" },
    { id: "about", title: "نبذة عن الكتاب" },
  ];
  return (
    <nav className="">
      <ScrollArea>
        <ul
          dir="rtl"
          className="flex items-stretch justify-between gap-6 text-nowrap font-semibold transition-all duration-300 max-xl:gap-3 max-lg:grid max-lg:grid-cols-2 max-lg:text-nowrap max-lg:text-center max-md:flex max-md:flex-col max-sm:flex-row max-sm:gap-3"
          style={{ color: "#1C7775" }}
        >
          {navItems.map((item) => (
            <li
              key={item.id}
              style={{
                borderColor: selectedTab === item.id ? "#1C7775" : "#FFFFFF00",
              }}
              className={`${selectedTab === item.id && ""} border-b-2 transition-all duration-300`}
            >
              <button onClick={() => setSelectedTab(item.id)}>
                {item.title}
              </button>
            </li>
          ))}
        </ul>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </nav>
  );
}
