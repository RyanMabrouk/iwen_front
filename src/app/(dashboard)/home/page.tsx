import CategoryBooksSection from "@/components/CategoryBooksSection";
import PrimaryButton from "@/components/main/buttons/PrimaryButton";
import Offers from "@/components/Offers";
import Trusted from "@/components/Trusted";
import React from "react";
import Image from "next/image";
import CategoryKidsBooks from "@/components/CategoryKidsBooks";
import Banners from "@/components/main/banners/Banners";
import Link from "next/link";
export default async function Page() {
  return (
    <div className="mb-12 h-full">
      <Banners />

      <CategoryBooksSection />
      <div className="w-full pb-60">
        <Offers />
        {/* <Trusted /> */}
      </div>
      <div className="relative z-50 bg-bgcolor1 px-16">
        <Image
          src="/SectionBook.png"
          height={100}
          width={373}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 max-lg:w-[200px]"
          alt="Background"
        />
        <div className="space-y-9 pb-24 pt-52 max-lg:pt-40">
          <div className="flex flex-col items-center text-center text-3xl">
            <span>اختر كتابك</span>
            <span className="text-center font-medium">
              {
                " إكتشف الآن تشكيلتنا الواسعة من الكتب، واختر ما يناسب ذوقك من بين آلاف العناوين المميزة"
              }
            </span>
          </div>
          <div className="mx-auto w-fit">
            <Link href="/books">
              <PrimaryButton>إستكشف أكثر</PrimaryButton>
            </Link>
          </div>
        </div>
      </div>
      <CategoryKidsBooks />

      {/* <NewAuthors /> */}
    </div>
  );
}
