"use client";
import React, { useState } from "react";
import { Divide, Minus, Plus } from "lucide-react";
import Heart from "./icons/Heart";
import FilledHeart from "./icons/FilledHeart";
import ArrowLeft from "./icons/ArrowLeft";
import ArrowRight from "./icons/ArrowRight";
import CustomSwiper from "./ui/swiper";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Tables } from "@/types/database.types";
import useCart from "@/hooks/cart/useCart";

export default function BookCard({
  id,
  title,
  writer,
  images,
  discount,
  price,
  className,
  stock,
  ...rest
}: Tables<"books"> & {
  className?: string;
  writer?: string;
  images?: string[];
}) {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <div
      dir="rtl"
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-white shadow-md transition-all",
        className,
      )}
    >
      <Image
        src="/acs.png"
        className="absolute -left-7 -top-6 -rotate-12 opacity-30"
        alt="ACS"
        width={1000}
        height={1000}
      />

      <Image
        src="/acs.png"
        className="absolute -top-20 left-20 opacity-30"
        alt="ACS"
        width={1000}
        height={1000}
      />
      {discount !== 0 && (
        <div className="absolute left-3 top-4 z-10 rounded-full bg-primary-400 px-2.5 py-1 text-sm font-medium text-white">
          {discount}% تخفيض
        </div>
      )}

      {images && (
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
            slides={
              images?.map((image, i) => (
                <div
                  className="group flex h-full w-full items-center justify-center p-7"
                  key={i}
                >
                  <Image
                    src={image}
                    className="h-full w-full object-scale-down transition-all duration-200"
                    alt="Book"
                    width={1000}
                    height={1000}
                  />
                </div>
              )) ?? []
            }
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
      )}
      <div className="flex flex-row-reverse items-center justify-between p-4">
        <CartButtons
          book={{
            id,
            title,
            discount,
            price,
            stock,
            ...rest,
          }}
        />
        <div className="flex w-full justify-between">
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-1">
              <span
                data-tip={title}
                className="tooltip tooltip-top line-clamp-1 text-right text-base font-medium"
              >
                {title}{" "}
              </span>
              <span className="text-sm text-gray-600">
                {writer ?? "كاتب غير معروف"}
              </span>
            </div>
            <div>
              <span className="py-2.5 text-lg font-light text-primary-500">
                {price} د.م
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CartButtons({
  variant = "column",
  book,
}: {
  variant?: "column" | "row";
  book: Tables<"books">;
}) {
  const { addToCart, removeFromCart, data } = useCart();
  const quantity = data?.find((item) => item.id === book.id)?.quantity ?? 0;
  return (
    <div
      className={`z-[100] flex items-center justify-between ${
        variant === "column" ? "flex-col" : "flex-row gap-3"
      }`}
    >
      <div
        role="button"
        className={`h-fit rounded-lg border border-primary-500 p-1 text-primary-400 transition-all hover:bg-black/5 ${
          variant === "column"
            ? quantity !== 0
              ? "visible"
              : "invisible"
            : "visible"
        } ${quantity <= 1 && variant === "row" ? "cursor-not-allowed" : "cursor-pointer"} `}
        onClick={() => {
          if (quantity <= 1 && variant === "row") return;
          removeFromCart(book.id);
        }}
      >
        <Minus />
      </div>
      <span
        className={`-mb-1 text-lg font-medium ${variant === "column" ? (quantity !== 0 ? "visible" : "invisible") : "visible"}`}
      >
        {quantity}
      </span>
      <div
        role="button"
        className={`h-fit rounded-lg border border-primary-500 p-1 text-primary-400 transition-all hover:bg-black/5 ${
          quantity >= book.stock ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={() => {
          if (quantity >= book.stock) return;
          addToCart(book);
        }}
      >
        <Plus />
      </div>
    </div>
  );
}
