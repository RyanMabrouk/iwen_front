import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NoPurchases() {
  return (
    <div className="m-auto flex flex-col justify-center gap-2">
      <div className="text-center font-semibold">تاريخ المشتريات</div>
      <Image
        src={"/profile/noPurchases.png"}
        alt="noPurchases"
        width={500}
        height={500}
        className="m-auto mt-10 h-auto w-[30rem]"
      />
      <div className="text-center">
        لا يوجد فواتير , لم يتم إجراء أي عمليات شراء حتى الآن
      </div>
      <Link href="/books" className="text-center">
        <button className="m-auto mt-5 w-fit rounded-md bg-color2 p-2 px-4 text-lg text-white opacity-100 hover:opacity-50">
          مواصلة التسوّق
        </button>
      </Link>
    </div>
  );
}
