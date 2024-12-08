"use client";

import { IBookPopulated } from "@/types";
import Image from "next/image";
import React from "react";
import Cart from "../../../../../public/dashboard/Cart";
import Link from "next/link";
import CustomSwiper from "@/components/ui/swiper";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import useCart from "@/hooks/cart/useCart";
import { Tables } from "@/types/database.types";

export default function BookListElement({ book }: { book: IBookPopulated }) {
  const { addToCart, removeFromCart, data } = useCart();
  const quantity = data?.find((item) => item.id === book.id)?.quantity ?? 0;

  const handleAddToCart = () => {
    addToCart(book as Tables<"books">);
  };

  return (
    <div
      dir="rtl"
      className="group flex items-center gap-4 overflow-hidden rounded-md border border-gray-200 p-4 transition-all duration-300 ease-in-out hover:bg-gray-50 hover:shadow-md"
    >
      <div className="flex items-center gap-4">
        <div className="relative flex h-[20rem] w-[15rem] flex-shrink-0 items-center justify-center overflow-hidden rounded-md transition-transform duration-300 ease-in-out group-hover:scale-105">
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
          <div className="relative z-20 h-full w-full">
            {book.images_urls && book.images_urls.length > 0 ? (
              <CustomSwiper
                className="h-full w-[80%] [&_.swiper-pagination-bullets]:mt-5"
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
                      className="group z-20 flex h-full w-full items-center justify-center p-7"
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
                      className="group z-20 flex h-full w-full items-center justify-center p-7"
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
              <Image
                src="/empty-book.svg"
                alt="كتاب بدون صورة"
                layout="fill"
                objectFit="contain"
                className="z-[100] p-10 transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            )}
          </div>
        </div>
        <div className="flex h-full flex-grow flex-col gap-2 py-10 text-xl">
          <h3 className="max-w-[30rem] text-2xl font-semibold text-gray-800 transition-colors duration-300 ease-in-out group-hover:text-color1">
            {book.title}
          </h3>
          <div className="flex items-center gap-2">
            <p className="text-gray-600 transition-colors duration-300 ease-in-out group-hover:text-gray-800">
              المؤلف:
            </p>
            <h1>{book.writer?.name}</h1>
          </div>
          <div className="flex items-center gap-2">
            <h1>السعر: </h1>
            <p className="font-medium text-green-600 transition-colors duration-300 ease-in-out group-hover:text-green-700">
              {book.price} د.م
            </p>
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
      <div dir="ltr" className="flex h-full flex-1 items-end justify-start p-4">
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={handleAddToCart}
            className="flex flex-row-reverse items-center gap-2 rounded-md border border-color2 p-3 shadow-md transition-all duration-300 hover:bg-color2 hover:text-white hover:ring-2 hover:ring-color2 hover:ring-offset-4"
          >
            <Cart color="#FFFFFF" />
            <h1 className="text-xl">أضف إلى السلة</h1>
          </button>
          <AnimatePresence>
            {quantity > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-2 flex gap-2"
              >
                <button
                  onClick={() => addToCart(book as Tables<"books">)}
                  className={`rounded-md bg-green-500 px-3 py-1 text-white transition-colors hover:bg-green-600 ${
                    quantity >= (book as Tables<"books">).stock
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }`}
                  disabled={quantity >= (book as Tables<"books">).stock}
                >
                  <Plus size={16} />
                </button>
                <span className="flex items-center justify-center rounded-md bg-gray-200 px-3 py-1">
                  {quantity}
                </span>

                <button
                  onClick={() => removeFromCart(book.id)}
                  className="rounded-md bg-red-500 px-3 py-1 text-white transition-colors hover:bg-red-600"
                >
                  <Minus size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
