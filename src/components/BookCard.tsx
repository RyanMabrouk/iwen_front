"use client";
import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import Heart from "./icons/Heart";
import FilledHeart from "./icons/FilledHeart";
import ArrowLeft from "./icons/ArrowLeft";
import ArrowRight from "./icons/ArrowRight";
import CustomSwiper from "./ui/swiper";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Tables } from "@/types/database.types";
import useCart from "@/hooks/cart/useCart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import sendRequest from "@/services/sendRequest";
import getEndpoint from "@/services/getEndpoint";
import { useToast } from "@/hooks/useToast";
import Link from "next/link";
import TooltipGeneric from "@/app/ui/InsightGeneric";

export default function BookCard({
  writer,
  images,
  className,
  is_in_wishlist,
  ...book
}: Tables<"books"> & {
  is_in_wishlist?: boolean;
  className?: string;
  writer?: string;
  images?: string[];
}) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(is_in_wishlist);
  const addUrl = getEndpoint({
    resource: "wishlist",
    action: "createWishlist",
  });
  const deleteUrl = getEndpoint({
    resource: "wishlist",
    action: "deleteWishlist",
  });
  const addToWishlistMutation = useMutation({
    mutationFn: async () => {
      const { error, validationErrors } = await sendRequest<
        { book_id: string },
        { book_id: string }
      >({
        method: "POST",
        url: addUrl(),
        payload: { book_id: book.id },
      });
      if (error || validationErrors) {
        throw new Error("Validation error");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.info("تمت الإضافة إلى قائمة الرغبات");
    },
    onError: () => {
      toast.info("هذا الكتاب موجود بالفعل في قائمة الرغبات");
    },
  });
  const removeFromWishlistMutation = useMutation({
    mutationFn: async () => {
      await sendRequest({ method: "DELETE", url: deleteUrl(book.id) });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.info("تمت الإزالة من قائمة الرغبات");
    },
    onError: (error) => {
      toast.info("هذا الكتاب غير موجود في قائمة الرغبات");
    },
  });
  return (
    <div
      dir="rtl"
      className={cn(
        "relative h-[20rem] w-[13rem] rounded-2xl border bg-white shadow-md transition-all",
        className,
      )}
    >
      {!!book.discount && (
        <div className="absolute left-3 top-4 z-10 rounded-full bg-primary-400 px-2.5 py-1 text-sm font-medium text-white">
          تخفيض{" "}
          {book.discount_type === "percentage"
            ? book.discount + "%"
            : book.discount + " د.م"}{" "}
        </div>
      )}

      <div className="group relative flex h-[65%] cursor-pointer flex-row items-center justify-center overflow-clip">
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
        <ArrowLeft
          size={22}
          className={`${"btn_swiper_arrow_left" + book.id} absolute left-[5%] top-1/2 z-20 -translate-y-1/2 cursor-pointer text-gray-500`}
        />
        <ArrowRight
          size={22}
          className={`${"btn_swiper_arrow_right" + book.id} absolute right-[5%] top-1/2 z-20 -translate-y-1/2 cursor-pointer text-gray-500`}
        />
        <CustomSwiper
          className="h-full w-[80%] [&_.swiper-pagination-bullets]:mt-5"
          navigation={{
            prevEl: `${".btn_swiper_arrow_left" + book.id}`,
            nextEl: `${".btn_swiper_arrow_right" + book.id}`,
          }}
          loop
          slides={
            images?.map((image, i) => (
              <Link
                href={`/books/${book.id}`}
                key={i}
                className="group flex h-full w-full items-center justify-center p-7"
              >
                <Image
                  src={image}
                  className="h-full w-full object-scale-down transition-all duration-200"
                  alt=""
                  width={500}
                  height={500}
                />
              </Link>
            )) ?? [
              <Link
                href={`/books/${book.id}`}
                className="group flex h-full w-full items-center justify-center p-7"
                key={0}
              >
                <Image
                  src="/empty-book.svg"
                  className="-mb-12 h-full w-full object-scale-down transition-all duration-200"
                  alt="Book"
                  width={1000}
                  height={1000}
                />
              </Link>,
            ]
          }
          initialSlide={0}
          slidesPerView={1}
          pagination
        />
        <div className="absolute h-48 w-48 rounded-[100%] bg-primary-500/10 blur-lg transition-all"></div>
        <div
          className="group absolute right-6 top-6 z-10 cursor-pointer"
          onClick={() => {
            if (isLiked) {
              removeFromWishlistMutation.mutate();
            } else {
              addToWishlistMutation.mutate();
            }
            setIsLiked((prev) => !prev);
          }}
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
      <div className="flex flex-row-reverse items-center justify-between p-3">
        <CartButtons book={book} />
        <div className="flex w-full justify-between">
          <div className="flex flex-col justify-between">
            <div className="flex flex-col items-start gap-1">
              <TooltipGeneric tip={book.title}>
                <h1
                  data-tip={book.title}
                  className="tooltip tooltip-top line-clamp-1 text-right text-base font-medium"
                >
                  {book.title}
                </h1>
              </TooltipGeneric>
              <TooltipGeneric tip={writer ?? ""}>
                <h1 className="line-clamp-1 text-sm text-gray-600">
                  {writer ?? "كاتب غير معروف"}
                </h1>
              </TooltipGeneric>
            </div>
            <div className="flex flex-row gap-2">
              <span className="py-2.5 text-lg font-normal text-primary-500">
                {book.price_after_discount} د.م
              </span>
              {!!book.discount && (
                <del className="py-2.5 text-lg font-normal text-primary-500">
                  {book.price} د.م
                </del>
              )}
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
      className={`z-[10] flex items-center justify-between -mt-2 ${
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
