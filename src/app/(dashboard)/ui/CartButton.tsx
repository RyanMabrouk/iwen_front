import Image from "next/image";
import React from "react";

export default function CartButton() {
  return (
    <button style={{ background: "white" }} className="rounded-md p-2">
      <Image src="/dashboard/cart.svg" alt="cart" width={25} height={25} />
    </button>
  );
}
