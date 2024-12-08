import { IBookPopulated } from "@/types";
import Image from "next/image";
import React from "react";
import Cart from "../../../../../public/dashboard/Cart";
import Link from "next/link";

export default function BookListElement({ book }: { book: IBookPopulated }) {
  return (
    <Link
      href={`books/${book.id}`}
      dir="rtl"
      className="group flex items-center gap-4 overflow-hidden rounded-md border border-gray-200 p-4 transition-all duration-300 ease-in-out hover:bg-gray-50 hover:shadow-md"
    >
      <div className="flex items-center gap-4">
        <div className="relative flex h-[20rem] w-[15rem] flex-shrink-0 items-center justify-center overflow-hidden rounded-md transition-transform duration-300 ease-in-out group-hover:scale-105">
          <Image
            src="/acs.png"
            className="absolute -left-7 -top-6 z-[50] -rotate-12 opacity-30 transition-opacity duration-300 ease-in-out group-hover:opacity-50"
            alt="ACS"
            width={1000}
            height={1000}
          />
          <Image
            src="/acs.png"
            className="absolute -top-20 left-20 z-[50] opacity-30 transition-opacity duration-300 ease-in-out group-hover:opacity-50"
            alt="ACS"
            width={1000}
            height={1000}
          />
          <div className="relative h-full w-full">
            {book.images_urls[0] ? (
              <Image
                src={book.images_urls[0]}
                alt={book.title}
                layout="fill"
                objectFit="contain"
                className="z-[100] rounded p-10 transition-transform duration-300 ease-in-out group-hover:scale-110"
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
        <div className="flex h-full flex-grow flex-col gap-2 py-10 text-2xl">
          <h3 className="text-xl font-semibold text-gray-800 transition-colors duration-300 ease-in-out group-hover:text-blue-600">
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
              {book.price} ريال
            </p>
          </div>
          {book.share_house?.name && (
            <div className="flex items-center gap-2">
              <h1>الناشر: </h1>
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
      <div className="b flex h-full flex-1 items-end p-4">
        <button className="flex flex-row-reverse items-center gap-2 rounded-md border border-color1 p-3 shadow-md transition-all duration-300 hover:bg-color1 hover:text-white hover:ring-2 hover:ring-color2 hover:ring-offset-4">
          <Cart color="#FFFFFF" />
          <h1 className="text-xl">أضف إلى السلة</h1>
        </button>
      </div>
    </Link>
  );
}
