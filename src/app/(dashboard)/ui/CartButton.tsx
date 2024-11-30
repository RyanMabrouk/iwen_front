import Image from "next/image";
import React from "react";

export default function CartButton() {
  return (
    <button
      style={{ background: "white", borderColor: "#1C7775" }}
      className="rounded-md border p-2"
    >
      <Image
        style={{ border: "#1C7775" }}
        src="/dashboard/cart.svg"
        alt="cart"
        width={25}
        height={25}
      />
    </button>
  );
}
