"use client";
import CustomSwiper from "@/app/ui/Swiper";
import useBanners from "@/hooks/data/banners/useBanners";
import Image from "next/image";
import React, { useState } from "react";

type Banner = {
  url: string;
};

export default function Banners() {
  const { data: banners } = useBanners() as unknown as {
    data: { data: { url: string }[] };
  };

  return (
    <div className="relative sm:px-6 sm:py-24 lg:px-8 lg:py-36 [&_.swiper-pagination-bullet-active]:bg-primary-200">
      <CustomSwiper
        slides={(banners?.data || []).map((banner: Banner, index: number) => (
          <Image
            key={index}
            src={banner.url || ""}
            alt="Banner Image"
            layout="responsive"
            width={200}
            height={500}
            className="mx-auto w-full max-w-[100%] rounded-xl sm:h-[350px] sm:max-w-[80%]"
          />
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
