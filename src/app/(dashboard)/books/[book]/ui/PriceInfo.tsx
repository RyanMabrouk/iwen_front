import React from "react";
import { Minus, Plus } from "lucide-react";
import useCart from "@/hooks/cart/useCart";
import { useBookProvider } from "../provider/BookProvider";

export default function PriceInfo() {
  const { addToCart, removeFromCart, data } = useCart();
  const { book } = useBookProvider();
  if (!book) return null;

  const quantity = data?.find((item) => item.id === book.id)?.quantity ?? 0;
  return (
    <div
      className="flex items-center justify-end gap-3 rounded-md border-2 border-gray-200 bg-white p-3 pr-10 max-md:flex-col"
      style={{ color: "#27A098" }}
    >
      <div
        dir="rtl"
        className="flex max-lg:flex-col max-lg:items-center max-md:flex-row"
      >
        <p>السعر :</p>
        <h1 className="font-semibold"> 120.000 د.م</h1>{" "}
      </div>
      <div className="flex items-center gap-2">
        <div
          role="button"
          className={`h-fit rounded-lg border border-primary-500 p-1 text-primary-400 transition-all hover:bg-black/5 ${
            quantity >= book.stock ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={() => {
            if (quantity >= book.stock) return;
            addToCart(book);
          }}
        >
          <Plus />
        </div>
        <div className="rounded-md border border-color1 px-3 py-1 text-primary-500">
          <span className="pt-2">{quantity}</span>
        </div>
        <div
          role="button"
          className={`visible h-fit rounded-lg border border-primary-500 p-1 text-primary-400 transition-all hover:bg-black/5 ${quantity < 1 ? "cursor-not-allowed" : "cursor-pointer"} `}
          onClick={() => {
            if (quantity < 1) return;
            removeFromCart(book.id);
          }}
        >
          <Minus />
        </div>
      </div>
    </div>
  );
}
