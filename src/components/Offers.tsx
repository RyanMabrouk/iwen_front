import React from "react";
import PrimaryButton from "./main/buttons/PrimaryButton";

export default function Offers() {
  return (
    <div className="mx-auto flex w-full flex-wrap items-center justify-center gap-32 px-10 py-16 max-lg:flex-col max-lg:gap-14">
      <div className="w-full max-w-[508px] space-y-12">
        <div className="space-y-4">
          <span className="flex flex-col text-2xl lg:text-3xl">
            <span className="font-bold">إحصل على ثلات كتب</span>
            <span>بسعر كتابين فقط</span>
          </span>{" "}
          <p className="text-base font-light lg:text-lg">
            كتاب رؤوس المسائل (المسائل الخلافية بين الحنفية والشافعية) للزمخشري،
            دراسة وتحقيق: عبد الله نذير أحمد. الزمخشري إمام كبير في الحديث،
            والتفسير، والنحو، والبلاغة.
          </p>
        </div>
        <div className="flex justify-end gap-4 lg:gap-14">
          <div className="flex items-end">
            <PrimaryButton>تمتع بالعرض</PrimaryButton>
          </div>
          <div>
            <span className="flex flex-col text-base text-gray-400 lg:text-lg">
              <span>السعر قبل العرض</span>
              <span>120.000 TND</span>
            </span>
            <span className="flex gap-2 text-[1.5rem] lg:gap-4 lg:text-[2rem]">
              <span>فقط</span>
              <span className="whitespace-nowrap">80.000 MAD</span>
            </span>
          </div>
        </div>
      </div>
      <div className="h-[350px] w-full max-w-[443px] rounded-xl bg-black lg:h-[495px]"></div>
    </div>
  );
}
