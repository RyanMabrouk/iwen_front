import React from "react";
import BuyNowButton from "./BuyNowButton";
import CartButton from "@/app/(dashboard)/ui/CartButton";

export default function PriceInfo() {
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
        <h1 className="font-semibold"> 120.000 MAD</h1>{" "}
      </div>
      <div className="flex gap-2">
        <CartButton />
        <BuyNowButton />
      </div>
    </div>
  );
}
