"use client";
import React from "react";
import PrimaryButton from "./main/buttons/PrimaryButton";
import CustomSwiper from "./ui/swiper";
import Image from "next/image";
import useOffers from "@/hooks/data/offers/useOffers";
import Link from "next/link";

export default function Offers() {
  const { data: offers } = useOffers();
  return (
    <div
      className="mx-auto flex w-full flex-wrap items-center justify-center gap-8 px-6 py-8 sm:gap-10 sm:px-6 sm:py-12 lg:gap-32 lg:px-10 lg:py-16"
      dir="rtl"
    >
      <CustomSwiper
        className="[&_.swiper-pagination-bullet-active]:bg-primary-400"
        navigation={{
          prevEl: ".btn_swiper_arrow_left",
          nextEl: ".btn_swiper_arrow_right",
        }}
        slides={
          offers?.data?.map((offer, i) => (
            <div
              key={i}
              className="mx-auto flex w-full flex-row-reverse flex-wrap items-center justify-center gap-8 sm:gap-10 lg:gap-[125px]"
            >
              <div className="w-full max-w-[480px] space-y-4 sm:space-y-8 lg:space-y-20">
                <div className="space-y-2">
                  <h1 className="flex flex-col py-2 text-2xl sm:text-3xl">
                    {offer.title}
                  </h1>
                  <p className="text-base sm:text-lg">{offer.description} </p>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col text-base text-gray-400 sm:text-lg">
                    <span>السعر قبل العرض</span>
                    <span> {offer.price_before_offer}د.م </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Link href={`/packs/${offer.id}`}>
                      <PrimaryButton>تمتع بالعرض</PrimaryButton>
                    </Link>
                    <span className="flex flex-row-reverse gap-4 text-2xl sm:gap-[18px] sm:text-3xl">
                      <span>فقط</span>
                      <span> {offer.price_after_offer}د.م </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="h-[300px] w-full max-w-[443px] rounded-[20px] bg-black sm:h-[350px] lg:h-[495px]">
                <Image
                  src={offer.image_url}
                  height={495}
                  width={443}
                  className="rounded-[20px]"
                  alt=""
                />
              </div>
            </div>
          )) ?? []
        }
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
      />
    </div>
  );
}
