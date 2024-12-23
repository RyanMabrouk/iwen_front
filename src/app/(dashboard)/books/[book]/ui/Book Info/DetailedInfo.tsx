import React from "react";
import { useBookProvider } from "../../provider/BookProvider";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DetailedInfo() {
  const { book } = useBookProvider();
  const map = [
    {
      key: "عدد الصفحات :",
      value: book?.page_count,
    },
    {
      key: "تاريخ الإصدار :",
      value: book?.release_year,
    },
    {
      key: "دار النشر :",
      value: book?.share_house?.name,
    },
    {
      key: "اللغة :",
      value: "العربية",
    },
    {
      key: "الحجم :",
      value: "غير متوفر",
    },
    {
      key: "نوع الغلاف :",
      value: book?.cover_type?.name,
    },
    {
      key: "رقم الكتاب :",
      value: book !== null && book?.isbn !== "" ? book?.isbn : "غير متوفر",
    },
  ];
  return (
    <ScrollArea>
      <div
        dir="rtl"
        className="grid w-full grid-cols-3 gap-2 gap-y-4 p-3 max-lg:h-[307px] max-md:flex max-md:max-h-[200px] max-md:flex-col max-sm:max-h-screen"
      >
        {map.map((e) => (
          <div
            key={e.key}
            dir="rtl"
            className="flex items-center gap-1 rounded-md border max-xl:flex-col max-xl:gap-0 max-xl:py-1 max-xl:text-center max-sm:flex-row"
            style={{ background: "#FCFCFD", borderColor: "#E7E9EB" }}
          >
            <h2 className="p-2 py-3 font-semibold">{e.key}</h2>
            <p>{e.value}</p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
