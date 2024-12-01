"use client";
import useCart from "@/hooks/cart/useCart";
import Link from "next/link";
import ShoppingCart from "../icons/ShoppingCart";

export default function CartButton() {
  const { data: cart } = useCart();
  return (
    <Link
      href={"/cart"}
      className="relative flex h-[3rem] w-fit min-w-[50px] items-center justify-center rounded-lg border bg-white text-primary-500 shadow-md transition-all ease-linear hover:border-white hover:bg-primary-500 hover:text-white"
    >
      <ShoppingCart size={22} className="" />
      {!!cart?.length && (
        <span className="bg-color6 absolute -right-2 -top-2 flex size-[1.25rem] items-center justify-center rounded-full px-1.5 text-center text-[0.9rem] text-white">
          <span className="-mb-[4px]">{cart?.length}</span>
        </span>
      )}
    </Link>
  );
}
