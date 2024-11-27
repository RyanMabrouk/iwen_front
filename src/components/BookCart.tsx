"use client";
import React, { useState } from "react";
import { Minus, Plus, ShoppingCartIcon } from "lucide-react";
import Heart from "./icons/Heart";
import FilledHeart from "./icons/FilledHeart";
import ArrowLeft from "./icons/ArrowLeft";
import ArrowRight from "./icons/ArrowRight";
import CustomSwiper from "./ui/swiper";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ShoppingCart from "./icons/ShoppingCart";
import getEndpoint from "@/services/getEndpoint";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/useToast";
import sendRequest from "@/services/sendRequest";
import { IValidationErrors } from "@/types";

export default function BookCart({
  id,
  title,
  writer,
  images,
  discount,
  price,
  className,
  isWishlist,
}: {
  id: string;
  title: string;
  writer: string;
  images: string[];
  discount: number;
  price: number;
  className?: string;
  isWishlist?: boolean;
}) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(isWishlist);
  const [errors, setError] = useState<
    IValidationErrors<{ book_id: string }> | null | undefined
  >();
  const [quantity, setQuantity] = useState(0);
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
        payload: { book_id: id },
      });
      if (error) {
        setError(validationErrors);
        throw new Error("Validation error");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist", "me"] });
      toast.info("تمت الإضافة إلى قائمة الرغبات");
    },
    onError: () => {
      toast.info("هذا الكتاب موجود بالفعل في قائمة الرغبات");
    },
  });
  const removeFromWishlistMutation = useMutation({
    mutationFn: async () => {
      await sendRequest({ method: "DELETE", url: deleteUrl(id) });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist", "me"] });
      toast.info("تمت الإزالة من قائمة الرغبات");
    },
    onError: (error) => {
      console.log(error);
      toast.info("هذا الكتاب غير موجود في قائمة الرغبات");
    },
  });
  const toggleWishlist = () => {
    setIsLiked((prev) => !prev);
    if (isLiked) {
      removeFromWishlistMutation.mutate();
    } else {
      addToWishlistMutation.mutate();
    }
  };

  return (
    <div
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
          slides={images.map((imageUrl, index) => (
            <div
              className="group flex h-full w-full items-center justify-center p-7"
              key={index}
            >
              <Image
                src={imageUrl}
                className="h-full w-full object-scale-down transition-all duration-200"
                alt={`Book Image ${index + 1}`}
                width={1000}
                height={1000}
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
          onClick={toggleWishlist}
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
          {errors?.book_id.map((error, index) => (
            <div key={index} className="text-sm text-red-500">
              {error}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between p-4">
        <div className="flex w-full justify-between">
          {/*       <div className="mt-auto h-fit cursor-pointer rounded-lg border border-primary-500 p-2 text-primary-400 transition-all hover:bg-black/5">
            <ShoppingCartIcon />
          </div>*/}
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
