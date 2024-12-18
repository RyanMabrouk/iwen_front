"use client";

import { IBookPopulated } from "@/types";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import CustomSwiper from "@/components/ui/swiper";
import { Minus, Plus } from "lucide-react";
import useCart from "@/hooks/cart/useCart";
import { Tables } from "@/types/database.types";
import { cn } from "@/lib/utils";
import TooltipGeneric from "@/app/ui/InsightGeneric";
import { WishListHeart } from "@/components/BookCard";
import ArrowLeft from "@/components/icons/ArrowLeft";
import ArrowRight from "@/components/icons/ArrowRight";

export default function BookListElement({
  book,
  nationality = "all",
}: {
  book: IBookPopulated;
  nationality?: "all" | "tunisian" | "moroccan";
}) {
  const isDiscounted = !!book.discount;
  const isOutOfStock = book.stock === 0;
  const isNewBook =
    new Date(book.created_at) >=
    new Date(new Date().setMonth(new Date().getMonth() - 1));

  return (
    <div
      dir="rtl"
      className="group relative flex items-center gap-4 overflow-hidden rounded-md border border-gray-200 bg-color7 p-4 transition-all duration-300 ease-in-out hover:bg-gray-50 hover:shadow-md"
    >
      {nationality === "tunisian" && (
        <div className="absolute left-[10px] top-[10px] z-10 rounded-full bg-transparent px-2.5 py-1 text-sm font-medium text-white">
          <Image
            src="/dashboard/books/tunisia.png"
            alt="tunisia"
            width={50}
            height={50}
          />
        </div>
      )}
      {nationality === "moroccan" && (
        <div className="absolute left-[10px] top-[10px] z-10 rounded-full bg-transparent px-2.5 py-1 text-sm font-medium text-white">
          <Image
            src="/dashboard/books/morocco.png"
            alt="morcco"
            width={50}
            height={50}
          />
        </div>
      )}
      <div className="flex items-center gap-4">
        <div className="relative flex h-[20rem] w-[15rem] items-center justify-center rounded-md transition-transform duration-300 ease-in-out group-hover:scale-105">
          <Image
            src="/acs.png"
            className="absolute -left-7 -top-6 z-10 -rotate-12 opacity-30 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
            alt="ACS"
            width={1000}
            height={1000}
          />
          <Image
            src="/acs.png"
            className="absolute -top-20 left-20 z-10 opacity-30 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
            alt="ACS"
            width={1000}
            height={1000}
          />

          <div className="relative z-20 flex h-full w-full items-center [&_.swiper-pagination-bullet-active]:bg-primary-400">
            <ArrowLeft
              size={22}
              className={`${"btn_swiper_arrow_left" + book.id} absolute left-[0%] top-1/2 z-20 -translate-y-1/2 cursor-pointer text-gray-500`}
            />
            <ArrowRight
              size={22}
              className={`${"btn_swiper_arrow_right" + book.id} absolute right-[0%] top-1/2 z-20 -translate-y-1/2 cursor-pointer text-gray-500`}
            />
            {book.images_urls && book.images_urls.length > 0 ? (
              <CustomSwiper
                className="h-fit w-[80%] [&_.swiper-pagination-bullets]:mt-5"
                navigation={{
                  prevEl: `${".btn_swiper_arrow_left" + book.id}`,
                  nextEl: `${".btn_swiper_arrow_right" + book.id}`,
                }}
                loop
                slides={
                  book.images_urls?.map((image, i) => (
                    <Link
                      href={`/books/${book.id}`}
                      key={i}
                      className="group z-20 flex h-[15rem] w-full items-center justify-center"
                    >
                      <Image
                        src={image}
                        className="h-[70%] w-[70%] object-scale-down transition-all duration-200"
                        alt=""
                        width={250}
                        height={250}
                      />
                    </Link>
                  )) ?? [
                    <Link
                      href={`/books/${book.id}`}
                      className="group z-20 flex h-[14rem] w-full items-center justify-center p-7"
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
            ) : (
              <Link href={`/books/${book.id}`}>
                <Image
                  src="/empty-book.svg"
                  alt="كتاب بدون صورة"
                  objectFit="contain"
                  className="z-[100] p-10 transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
              </Link>
            )}
          </div>
          <WishListHeart size={25} liked={book.is_in_wishlist} book={book} />
        </div>
        <div className="flex h-full flex-grow flex-col gap-2 py-10 text-xl">
          <div className="mb-2 flex items-center gap-2">
            {isDiscounted && !isOutOfStock && !isNewBook && (
              <div className="rounded-full bg-primary-400 px-2.5 py-1 text-sm font-medium text-white">
                تخفيض{" "}
                {book.discount_type === "percentage"
                  ? book.discount + "%"
                  : book.discount + " د.م"}{" "}
              </div>
            )}
            {isOutOfStock && (
              <div className="rounded-full bg-red-500 px-2.5 py-1 text-sm font-medium text-white">
                نفذت الكمية
              </div>
            )}
            {!isOutOfStock && isNewBook && (
              <div className="rounded-full bg-[#2774A0] px-2.5 py-1 text-sm font-medium text-white">
                جديد{" "}
              </div>
            )}
          </div>
          <Link
            href={`/books/${book.id}`}
            className="max-w-[30rem] text-2xl font-semibold text-gray-800 transition-colors duration-300 ease-in-out group-hover:text-color1"
          >
            <TooltipGeneric tip={book.title}>
              <h1 className="line-clamp-1 text-right text-xl font-medium">
                {book.title}
              </h1>
            </TooltipGeneric>
          </Link>
          <div className="flex items-center gap-2">
            <p className="text-gray-600 transition-colors duration-300 ease-in-out group-hover:text-gray-800">
              المؤلف:
            </p>
            <TooltipGeneric tip={book.writer?.name ?? ""}>
              <h1 className="line-clamp-1 text-base text-gray-600">
                {book.writer?.name ?? "كاتب غير معروف"}
              </h1>
            </TooltipGeneric>
          </div>
          <div className="flex items-center gap-2">
            <h1>السعر: </h1>
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
          {book.share_house?.name && (
            <div className="flex items-center gap-2">
              <h1>دار النشر: </h1>
              <p className="text-gray-600 transition-colors duration-300 ease-in-out group-hover:text-gray-800">
                {book.share_house.name}
              </p>
            </div>
          )}
          {book.release_year && (
            <div className="flex items-center gap-2">
              <h1>سنة النشر: </h1>
              <p className="text-gray-600 transition-colors duration-300 ease-in-out group-hover:text-gray-800">
                {book.release_year}
              </p>
            </div>
          )}
        </div>
      </div>
      <div
        dir="ltr"
        className="flex h-full w-fit flex-1 items-end justify-start p-4"
      >
        <CartButtons book={book as Tables<"books">} />
      </div>
    </div>
  );
}

function CartButtons({ book }: { book: Tables<"books"> }) {
  const { addToCart, removeFromCart, data } = useCart();
  const quantity = data?.find((item) => item.id === book.id)?.quantity ?? 0;
  return (
    <div className="z-[10] flex items-center justify-between gap-3">
      <button
        className={cn(
          "h-fit rounded-lg border border-primary-500 p-2 text-primary-400 transition-all hover:bg-black/5",
          quantity >= book.stock ? "cursor-not-allowed" : "cursor-pointer",
        )}
        onClick={() => {
          if (quantity >= book.stock) return;
          addToCart(book);
        }}
      >
        <Plus size={16} />
      </button>

      <div className="relative min-w-[1.5rem] rounded-md border border-color1 px-3 py-0.5 text-center text-lg font-medium">
        <span className="-mb-3">{quantity}</span>
      </div>
      <button
        className={cn(
          "h-fit rounded-lg border border-primary-500 p-2 text-primary-400 transition-all hover:bg-black/5",
          quantity === 0 ? "invisible" : "visible",
          quantity < 1 ? "cursor-not-allowed" : "cursor-pointer",
        )}
        onClick={() => {
          if (quantity < 1) return;
          removeFromCart(book.id);
        }}
      >
        <Minus size={16} />
      </button>
    </div>
  );
}
