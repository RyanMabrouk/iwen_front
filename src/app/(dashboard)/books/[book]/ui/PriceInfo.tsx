import React from "react";
import { useBookProvider } from "../provider/BookProvider";
import { CartButtons } from "@/components/BookCard";

export default function PriceInfo() {
  const { book } = useBookProvider();
  if (!book) return null;
  return (
    <div
      className="flex items-center justify-end gap-3 rounded-md border-2 border-gray-200 bg-white p-3 pr-10 max-md:flex-col"
      style={{ color: "#27A098" }}
    >
      <div className="flex flex-row gap-2" dir="rtl">
        <span className="py-2.5 text-lg font-normal text-primary-500">
          {book.price_after_discount} د.م
        </span>
        {!!book.discount && (
          <del className="py-2.5 text-lg font-normal text-primary-500">
            {book.price} د.م
          </del>
        )}
      </div>
      <CartButtons variant="row" book={book} />
    </div>
  );
}
