"use client";

import { Spinner } from "@/app/ui/Spinner";
import useOffer from "@/hooks/data/offers/useOffer";
import React from "react";
import BookCard from "@/components/BookCard";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";

export default function PackPage({
  params: { pack },
}: {
  params: { pack: string };
}) {
  const [quantity, setQuantity] = React.useState(1);
  const packData = useOffer(pack);

  if (packData.isLoading) {
    return (
      <div className="flex h-full min-h-[40rem] w-full items-center justify-center bg-transparent bg-opacity-25">
        <Spinner />
      </div>
    );
  }

  const data = packData.data;

  if (!data || !data.books || data.books.length === 0) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center p-4">
        <h1 className="mb-4 text-2xl font-bold">الباقة: {pack}</h1>
        <p>لا توجد كتب متاحة في هذه الباقة.</p>
      </div>
    );
  }

  return (
    <div className="rtl flex min-h-screen w-full flex-col items-center bg-color7 p-4">
      <div className="w-full max-w-6xl">
        <div className="mb-8 flex w-full flex-col-reverse items-center justify-start gap-5 rounded-md md:flex-row">
          <div
            dir="rtl"
            className="flex w-full flex-col justify-between rounded-md p-5"
          >
            <div className="mt-3 flex flex-col items-start justify-between">
              <h1 className="mb-2 text-3xl font-bold">{data.title}</h1>
              <p className="mb-4 text-lg">{data.description}</p>
            </div>
            <div
              className={`z-[10] -mt-2 mb-4 flex w-20 flex-row items-center justify-between gap-3`}
            >
              <div
                role="button"
                className={`h-fit rounded-lg border border-primary-500 p-1 text-primary-400 transition-all hover:bg-black/5 ${"visible"} ${quantity <= 1 ? "cursor-not-allowed" : "cursor-pointer"} `}
                onClick={() => {
                  if (quantity <= 1) return;
                  setQuantity(quantity - 1);
                }}
              >
                <Minus />
              </div>
              <span className={`visible -mb-1 text-lg font-medium`}>
                {quantity}
              </span>
              <div
                role="button"
                className={`h-fit rounded-lg border border-primary-500 p-1 text-primary-400 transition-all hover:bg-black/5 ${
                  quantity > 99 ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                onClick={() => {
                  if (quantity > 99) return;
                  setQuantity(quantity + 1);
                }}
              >
                <Plus />
              </div>
            </div>
            <Link
              href={`/order?offer_id=${data.id}&quantity=${quantity}`}
              className="w-fit items-start rounded-md bg-color1 p-3 text-center text-lg font-semibold text-white transition-all duration-300 hover:bg-color2 hover:shadow-lg"
            >
              شراء الباقة
            </Link>
          </div>
          <Image
            src={data.image_url ?? ""}
            alt={data.title ?? ""}
            width={300}
            height={300}
            className="mb-4 rounded-lg object-cover md:mb-0"
          />
        </div>

        <div className="mb-8 rounded-lg bg-white p-6 text-2xl shadow-md">
          <h2 className="mb-4 font-semibold">تفاصيل الباقة</h2>
          <div dir="rtl" className="mb-2 flex items-center gap-1 text-gray-400">
            السعر قبل العرض:{" "}
            <p className="line-through">{data.price_before_offer} د.م</p>
          </div>
          <p className="mb-2">السعر بعد العرض: {data.price_after_offer} د.م</p>
        </div>

        <h2 className="mb-4 text-2xl font-semibold">الكتب المميزة</h2>
        <div
          dir="rtl"
          className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {data.books.slice(0, 4).map((book) => (
            <BookCard key={book.id} fill={true} {...book} />
          ))}
        </div>
        {/* <h2 className="mb-4 text-2xl font-semibold">
          جميع الكتب في هذه الباقة
        </h2>
        <div className="space-y-4">
          {data.books.map((book) => (
            <BookListElement
              key={book.id}
              book={
                {
                  ...book,
                  writer_books: [],
                  recommended_books: [],
                  categories: [],
                  subcategories: [],
                  total_rating: 0,
                  total_reviews_count: 0,
                  is_in_wishlist: false,
                } as unknown as IBookPopulated
              }
              nationality={"all" as "all" | "tunisian" | "moroccan"}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
}
