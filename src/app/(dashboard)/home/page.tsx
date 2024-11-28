import CategoryBooksSection from "@/components/CategoryBooksSection";
import PrimaryButton from "@/components/main/buttons/PrimaryButton";
import Offers from "@/components/Offers";
import Trusted from "@/components/Trusted";
import React from "react";
import Image from "next/image";
import CategoryKidsBooks from "@/components/CategoryKidsBooks";
export default async function Page() {
  return (
    <div>
      <div className="px-4 py-12 sm:px-6 sm:py-24 lg:px-8 lg:py-36 [&_.swiper-pagination-bullet-active]:bg-primary-200">
        <div className="mx-auto h-[250px] w-full max-w-[95%] rounded-xl bg-black sm:h-[350px] sm:max-w-[90%] md:h-[400px] lg:h-[493px] lg:max-w-[80%]"></div>
      </div>
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
    </div>
  );
}
