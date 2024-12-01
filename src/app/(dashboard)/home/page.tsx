import CategoryBooksSection from "@/components/CategoryBooksSection";
import PrimaryButton from "@/components/main/buttons/PrimaryButton";
import Offers from "@/components/Offers";
import Trusted from "@/components/Trusted";
import React from "react";
import Image from "next/image";
import CategoryKidsBooks from "@/components/CategoryKidsBooks";
import Banners from "@/components/main/banners/Banners";
export default async function Page() {
  return (
    <div>
      <Banners />
      <CategoryBooksSection />
      <div className="w-full pb-60">
        <Offers />
        <Trusted />
      </div>
      <div className="relative bg-[#E7F6F5]/40 px-16">
        <Image
          src="/SectionBook.png"
          height={100}
          width={373}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 max-lg:w-[200px]"
          alt="Background"
        />
        <div className="space-y-9 pb-24 pt-52 max-lg:pt-40">
          <div className="flex flex-col items-center text-center text-3xl">
            <span>يمكنك الأن </span>
            <span className="text-center font-medium">
              التمتع بخاصية قراءة الكتاب على الموقع مباشرة
            </span>
          </div>
          <div className="mx-auto w-fit">
            <PrimaryButton>إستكشف أكثر</PrimaryButton>
          </div>
        </div>
      </div>
      <CategoryKidsBooks />
      <div className="flex h-full w-full items-center justify-center">
        <Image
          src={"/writers.svg"}
          alt=""
          className="h-full w-full pb-12 object-cover"
          height={1000}
          width={1000}
        />
      </div>
    </div>
  );
}
