"use client";
import useBanners from "@/hooks/data/banners/useBanners";
import Image from "next/image";
import React from "react";

export default function Banners() {
  const { data: banners } = useBanners() as unknown as {
    data: { data: { url: string }[] };
  };

  if (banners?.data?.length) {
    console.log("this is my data :", banners.data[0]);
  }

  return (
    <div className="px-4 py-12 sm:px-6 sm:py-24 lg:px-8 lg:py-36 [&_.swiper-pagination-bullet-active]:bg-primary-200">
      <div className="relative mx-auto h-[250px] w-full max-w-[95%] overflow-hidden rounded-xl sm:h-[350px] sm:max-w-[90%] md:h-[400px] lg:h-[493px] lg:max-w-[80%]">
        <Image
          fill
          src={(banners?.data?.length && (banners?.data)[0].url) || ""} // Use a fallback image or placeholder
          alt="Banner Image"
          style={{ objectFit: "cover" }} // Use style instead of deprecated objectFit
        />
      </div>
    </div>
  );
}
