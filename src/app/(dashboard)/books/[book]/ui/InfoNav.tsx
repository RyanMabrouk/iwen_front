import React from "react";
import { PageType } from "./BookInfo";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function InfoNav({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: PageType;
  setSelectedTab: React.Dispatch<React.SetStateAction<PageType>>;
}) {
  const navItems: { id: PageType; title: string }[] = [
    { id: "main", title: "المعلومات الأساسيات" },
    { id: "details", title: "التفاصيل" },
    { id: "comments", title: "تعاليق القارئين (X)" },
    { id: "author", title: "تقديم المؤلف" },
    { id: "about", title: "نبذة عن الكتاب" },
  ];
  return (
    <nav className="">
      <ul
        dir="rtl"
        className="flex justify-center gap-6 text-nowrap font-semibold transition-all duration-300 max-xl:gap-3 max-lg:grid max-lg:grid-cols-2 max-lg:text-nowrap max-lg:text-center max-md:flex max-md:flex-col max-sm:max-w-[350px] max-sm:flex-row max-sm:overflow-x-scroll"
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
    </nav>
  );
}
