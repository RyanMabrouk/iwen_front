"use client";
import CustomSwiper from "@/app/ui/Swiper";
import useBanners from "@/hooks/data/banners/useBanners";
import { useWindowSize } from "@/hooks/useWindowSize";
import Image from "next/image";
import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function Banners() {
  const { data: banners } = useBanners();
  const windowSize = useWindowSize();
  return (
    <div className="relative sm:px-6 sm:py-24 lg:px-8 lg:py-12 [&_.swiper-pagination-bullet-active]:bg-primary-400">
      <CustomSwiper
        slides={(banners?.data ?? []).map((banner, index: number) => (
          <Link href={`/books/${banner?.book_id}`}>
            <Image
              key={index}
              src={
                windowSize.width && windowSize.width <= 1024
                  ? (banner?.phone_url ?? "")
                  : (banner?.url ?? "")
              }
              alt=""
              width={200}
              height={500}
              className="z-0 mx-auto h-fit w-full max-w-[100%] cursor-pointer rounded-xl object-cover sm:h-[350px] sm:max-w-[95%]"
            />
          </Link>
        ))}
        initialSlide={0}
        spaceBetween={35}
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
