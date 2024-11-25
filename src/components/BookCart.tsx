import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import Heart from "./icons/Heart";
import FilledHeart from "./icons/FilledHeart";
import ArrowLeft from "./icons/ArrowLeft";
import ArrowRight from "./icons/ArrowRight";
import CustomSwiper from "./ui/swiper";
import { cn } from "@/lib/utils";

export default function BookCart({
  id,
  title,
  writer,
  images,
  discount,
  price,
  className,
}: {
  id: string;
  title: string;
  writer: string;
  images: string[];
  discount: number;
  price: number;
  className?: string;
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(0);

  // console.log(images);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-white shadow-md transition-all",
        className,
      )}
    >
      <img
        src="/acs.png"
        className="absolute -left-7 -top-6 -rotate-12 opacity-30"
      />
      <img src="/acs.png" className="absolute -top-20 left-20 opacity-30" />
      {discount !== 0 && (
        <div className="absolute left-3 top-4 z-10 rounded-full bg-primary-400 px-2.5 py-1 text-sm font-medium text-white">
          {discount}% off
        </div>
      )}

      <div className="group relative flex h-64 cursor-pointer items-center justify-center">
        <ArrowLeft
          size={22}
          className={`${"btn_swiper_arrow_left" + id} absolute left-[5%] top-1/2 z-20 -translate-y-1/2 cursor-pointer text-gray-500`}
        />
        <ArrowRight
          size={22}
          className={`${"btn_swiper_arrow_right" + id} absolute right-[5%] top-1/2 z-20 -translate-y-1/2 cursor-pointer text-gray-500`}
        />
        <CustomSwiper
          navigation={{
            prevEl: `${".btn_swiper_arrow_left" + id}`,
            nextEl: `${".btn_swiper_arrow_right" + id}`,
          }}
          loop
          slides={Array.from({ length: 2 }).map((_, i) => (
            <div className="group flex h-full w-full items-center justify-center p-7">
              <img
                src="/book.png"
                className="h-full w-full object-scale-down transition-all duration-200"
              />
            </div>
          ))}
          initialSlide={0}
          slidesPerView={1}
          pagination
          className="h-full w-full [&_.swiper-pagination-bullets]:mt-5"
        />
        <div className="absolute h-48 w-48 rounded-[100%] bg-primary-500/10 blur-lg transition-all"></div>
        <div
          className="group absolute right-6 top-6 z-10 cursor-pointer"
          onClick={() => setIsLiked(!isLiked)}
        >
          {isLiked ? (
            <FilledHeart
              size={20}
              className="text-red-500 transition-colors duration-500"
            />
          ) : (
            <Heart
              className="text-gray-400 transition-all hover:text-red-500"
              size={20}
            />
          )}
        </div>
      </div>

      <div className="flex items-center justify-between p-4">
        <div className="flex w-full justify-between">
          <div className="flex flex-col items-center justify-between">
            <div
              className={`h-fit cursor-pointer rounded-lg border border-primary-500 p-1 text-primary-400 transition-all hover:bg-black/5 ${
                quantity !== 0 ? "visible" : "invisible"
              }`}
              onClick={() => setQuantity(Math.max(0, quantity - 1))}
            >
              <Minus />
            </div>
            <span
              className={`text-lg font-medium ${quantity !== 0 ? "visible" : "invisible"}`}
            >
              {quantity}
            </span>
            <div
              className="h-fit cursor-pointer rounded-lg border border-primary-500 p-1 text-primary-400 transition-all hover:bg-black/5"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus />
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-1">
              <span className="line-clamp-1 text-base font-medium">
                {title}{" "}
              </span>
              <span className="text-sm text-gray-600">{writer}</span>
            </div>
            <div>
              <span className="py-2.5 text-lg font-light text-primary-500">
                {price} MAD
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
