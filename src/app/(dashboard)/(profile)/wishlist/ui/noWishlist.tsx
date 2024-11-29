import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NoWishlist() {
  return (
    <div className="flex flex-col m-auto justify-center gap-2">
      <div className="font-semibold text-center">قائمة الرغبات </div>
      <Image
        src={"/profile/noBooks.png"}
        alt="noPurchases"
        width={500}
        height={500}
        className="mt-10 h-auto w-[30rem] m-auto"
      />
      <div className="text-center">لا يوجد كتب في قائمة الرغبات</div>
      <Link href="/books" className="text-center">
      <button className="rounded-md m-auto mt-5 bg-color2 w-fit p-2 px-4 text-lg text-white opacity-100 hover:opacity-50">
        مواصلة التسوّق
      </button>
      </Link>

    </div>
  );
}
