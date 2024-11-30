"use client";
import useBanners from "@/hooks/data/banners/useBanners";
import Image from "next/image";
import React from "react";

export default function Banners() {
  const { data: banners } = useBanners() as unknown as {
    data: { data: { url: string }[] };
  };

  return (
    <div className="relative sm:px-6 sm:py-24 lg:px-8 lg:py-36 [&_.swiper-pagination-bullet-active]:bg-primary-200">
      <Image
        src={(banners?.data?.length && (banners?.data)[0].url) || ""}
        alt="Banner Image"
        layout="responsive"
        width={200}
        height={500}
        className="mx-auto w-full max-w-[100%] rounded-xl sm:h-[350px] sm:max-w-[80%]"
      />
    </div>
  );
}
