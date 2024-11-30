import React from "react";
import { useBookProvider } from "../../provider/BookProvider";

export default function DescriptionInfo() {
  const { book } = useBookProvider();
  return (
    <div
      dir="rtl"
      className="flex h-full w-full max-w-[40rem] flex-grow flex-col items-start gap-2 rounded-md border p-5"
      style={{ background: "#FCFCFD", borderColor: "#E7E9EB" }}
    >
      <strong>بعض المواضيع المطروحة في الكتاب</strong>
      {book?.description}
    </div>
  );
}
