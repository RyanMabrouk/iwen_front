import React from "react";
import { useBookProvider } from "../../provider/BookProvider";

export default function DetailedInfo() {
  const { book } = useBookProvider();
  return (
    <div dir="rtl" className="grid w-full grid-cols-3 gap-4 p-4">
      <div
        dir="rtl"
        className="flex items-center gap-1 rounded-md border"
        style={{ background: "#FCFCFD", borderColor: "#E7E9EB" }}
      >
        <h2 className="p-2 py-3 font-semibold">عدد الصفحات :</h2>
        <p>{book?.page_count}</p>
      </div>
      <div
        dir="rtl"
        className="flex items-center gap-1 rounded-md border"
        style={{ background: "#FCFCFD", borderColor: "#E7E9EB" }}
      >
        <h2 className="p-2 py-3 font-semibold">تاريخ الإصدار : </h2>
        <p>{book?.release_year}</p>
      </div>
      <div
        dir="rtl"
        className="flex items-center gap-1 rounded-md border"
        style={{ background: "#FCFCFD", borderColor: "#E7E9EB" }}
      >
        <h2 className="p-2 py-3 font-semibold">دار النشر : </h2>
        <p>{book?.share_house?.name}</p>
      </div>
      <div
        dir="rtl"
        className="flex items-center gap-1 rounded-md border"
        style={{ background: "#FCFCFD", borderColor: "#E7E9EB" }}
      >
        <h2 className="p-2 py-3 font-semibold">اللغة :</h2>
        <p>العربية</p>
      </div>
      <div
        dir="rtl"
        className="flex items-center gap-1 rounded-md border"
        style={{ background: "#FCFCFD", borderColor: "#E7E9EB" }}
      >
        <h2 className="p-2 py-3 font-semibold">الحجم :</h2>
        <p>XXX</p>
      </div>
      <div
        dir="rtl"
        className="flex items-center gap-1 rounded-md border"
        style={{ background: "#FCFCFD", borderColor: "#E7E9EB" }}
      >
        <h2 className="p-2 py-3 font-semibold">نوع الغلاف :</h2>
        <p>{book?.cover_type?.name}</p>
      </div>
      <div
        dir="rtl"
        className="flex items-center gap-1 rounded-md border"
        style={{ background: "#FCFCFD", borderColor: "#E7E9EB" }}
      >
        <h2 className="p-2 py-3 font-semibold">رقم الكتاب : </h2>
        <p>{book?.isbn}</p>
      </div>
    </div>
  );
}
