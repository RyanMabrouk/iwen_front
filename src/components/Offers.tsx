"use client";
import React from "react";
import PrimaryButton from "./main/buttons/PrimaryButton";
import CustomSwiper from "./ui/swiper";
import ArrowLeft from "./icons/ArrowLeft";

export default function Offers() {
  return (
    <div className="mx-auto flex w-full flex-wrap items-center justify-center gap-8 px-6 py-8 sm:gap-10 sm:px-6 sm:py-12 lg:gap-32 lg:px-10 lg:py-16">
      <CustomSwiper
        navigation={{
          prevEl: ".btn_swiper_arrow_left",
          nextEl: ".btn_swiper_arrow_right",
        }}
        slides={Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="mx-auto flex w-full flex-wrap items-center justify-center gap-8 sm:gap-10 lg:gap-[125px]"
          >
            <div className="w-full max-w-[480px] space-y-4 sm:space-y-8 lg:space-y-20">
              <div className="space-y-2">
                <h1 className="flex flex-col py-2 text-2xl sm:text-3xl">
                  <span className="font-bold">إحصل على ثلات كتب</span>
                  <span>بسعر كتابين فقط </span>
                </h1>
                <p className="text-base sm:text-lg">
                  كتاب رؤوس المسائل (المسائل الخلافية بين الحنفية والشافعية)
                  للزمخشري، دراسة وتحقيق: عبد الله نذير أحمد. الزمخشري إمام كبير
                  في الحديث، والتفسير، والنحو، والبلاغة.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex flex-col text-base text-gray-400 sm:text-lg">
                  <span>السعر قبل العرض</span>
                  <span>120.000 TND</span>
                </div>
                <div className="flex items-center justify-between">
                  <PrimaryButton>تمتع بالعرض</PrimaryButton>
                  <span className="flex gap-4 text-2xl sm:gap-[18px] sm:text-3xl">
                    <span>فقط</span>
                    <span>80.000 MAD</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="h-[300px] w-full max-w-[443px] rounded-[20px] bg-black sm:h-[350px] lg:h-[495px]"></div>
          </div>
        ))}
        initialSlide={0}
        slidesPerView={1}
        pagination
        loop
        allowTouchMove
        speed={1500}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        className=""
      />
    </div>
  );
}
