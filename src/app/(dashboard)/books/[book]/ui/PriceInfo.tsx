import React from "react";
import BuyNowButton from "./BuyNowButton";
import CartButton from "@/app/(dashboard)/ui/CartButton";

export default function PriceInfo() {
  return (
    <div
      className="flex items-center justify-end gap-3 rounded-md bg-white p-3 pr-10"
      style={{ color: "#27A098" }}
    >
      <p dir="rtl">
        السعر<strong> : 120.000 MAD</strong>{" "}
      </p>
      <CartButton />
      <BuyNowButton />
    </div>
  );
}
