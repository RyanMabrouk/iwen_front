"use client";

import { Spinner } from "@/app/ui/Spinner";
import { CartButtons } from "@/components/BookCard";
import PrimaryButton from "@/components/main/buttons/PrimaryButton";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/cart/useCart";
import { IBookPopulated } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const cart = useCart();
  const books = cart?.data ?? [];

  if (cart.isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (books.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div dir="rtl" className="container mx-auto my-8 px-4">
      <h1 className="mb-6 text-right text-2xl font-bold">سلة التسوق</h1>

      {/* Desktop view */}
      <div className="hidden sm:block">
        <DesktopCart books={books} cart={cart} />
      </div>

      {/* Mobile view */}
      <div className="sm:hidden">
        <MobileCart books={books} cart={cart} />
      </div>

      <div className="flex flex-row items-center justify-between gap-[30svw] max-sm:flex-col max-sm:justify-start max-sm:gap-5 max-sm:px-3 max-sm:py-2">
        <Link
          href="/books"
          dir="rtl"
          className="flex justify-center max-sm:w-full"
        >
          <PrimaryButton
            className="flex flex-row-reverse items-center justify-start max-sm:w-[11rem]"
            size="md"
            variant="secondary"
          >
            <span> مواصلة التسوّق</span>
            <Image
              src="/double-arrow-right.svg"
              alt=""
              width={25}
              height={25}
            />
          </PrimaryButton>
        </Link>

        <div
          dir="rtl"
          className="flex flex-row items-center justify-end gap-12 max-sm:w-full lg:gap-24"
        >
          <div className="flex flex-row items-center gap-2">
            <span className="text-nowrap font-medium"> إجمالي المبلغ :</span>
            <span className="text-xl font-semibold">{cart.total}د.م</span>
            {cart.total_before_discount !== cart.total && (
              <span className="text-sm text-color4">
                <del>{cart.total_before_discount}د.م</del>
              </span>
            )}
          </div>
          <Link href="/order">
            <PrimaryButton className="max-sm:w-[11rem]" size="md">
              {" "}
              تأكيد الطلب
            </PrimaryButton>
          </Link>{" "}
        </div>
      </div>
    </div>
  );
}

function DesktopCart({
  books,
  cart,
}: {
  books: IBookPopulated[];
  cart: ReturnType<typeof useCart>;
}) {
  return (
    <div dir="rtl" className="my-8 h-fit max-md:bg-color1 max-sm:bg-color6">
      <div className="relative my-10 flex flex-row justify-evenly bg-bgcolor1 py-4">
        <div className="flex flex-col items-start justify-start gap-8">
          <strong className="text-center text-xl">الوصف</strong>
          {books.map((book, i) => (
            <>
              <div
                key={book.id}
                className="gap -mr-6 flex flex-row items-start gap-6"
              >
                <Image
                  src={book.images_urls?.[0] ?? "/empty-book.svg"}
                  alt="book"
                  className="bg h-[7rem] w-[rem] rounded-md bg-white px-6 py-4"
                  width={120}
                  height={120}
                />
                <div className="mt-6 flex flex-col justify-center gap-2">
                  <h1 className="line-clamp-1 max-w-[30svw] font-semibold">
                    {book.title}
                  </h1>
                  {book.isbn && (
                    <span className="flex flex-row items-start justify-start gap-2 text-sm text-color4">
                      <p>رقم الكتاب :</p>
                      <p>{book.isbn}</p>
                    </span>
                  )}
                </div>
              </div>
            </>
          ))}
        </div>
        <div className="flex flex-col items-start justify-start gap-8">
          <strong className="mb-10 text-xl">الكمية</strong>
          {
            <div className="flex flex-col items-start justify-start gap-[4.85rem]">
              {books.map((book, i) => (
                <div key={book.id + "quantity"} className="-mr-6 mb-10">
                  <CartButtons variant="row" book={book} />
                </div>
              ))}
            </div>
          }
        </div>
        <div className="flex flex-col items-start justify-start gap-8">
          <strong className="mb-10 text-xl">السعر</strong>
          <div className="flex flex-col items-start justify-start gap-[7.23rem]">
            {books.map((book, i) => (
              <span
                className="flex flex-row items-center justify-start gap-2 text-lg font-medium"
                key={book.id + "price"}
              >
                <p>{book.price_after_discount} د.م</p>
                {!!book.discount && (
                  <del className="text-sm text-color4">{book.price}</del>
                )}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start justify-start gap-8">
          <strong className="mb-10 text-xl">إلغاء</strong>
          <div className="flex w-full flex-col items-center justify-center gap-[7.29rem]">
            {books.map((book, i) => (
              <button
                className="flex h-full w-full flex-row items-center justify-center gap-2 text-xl text-color4"
                key={book.id + "remove"}
                onClick={() => {
                  cart.removeFromCart(book.id);
                }}
              >
                <Image
                  src={"/auth/x-dark.svg"}
                  alt=""
                  className="cursor-pointer rounded-full border border-transparent p-1 text-color5 transition-all ease-linear hover:border-color5 hover:shadow-md"
                  width={27}
                  height={27}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileCart({
  books,
  cart,
}: {
  books: IBookPopulated[];
  cart: ReturnType<typeof useCart>;
}) {
  return (
    <div className="space-y-4">
      {books.map((book) => (
        <div key={book.id} className="rounded-lg bg-white p-4 shadow">
          <div className="mb-4 flex items-center justify-between">
            <Image
              src={book.images_urls?.[0] ?? "/empty-book.svg"}
              alt={book.title}
              width={80}
              height={80}
              className="rounded-md object-cover"
            />
            <button
              className="flex h-full w-full flex-row items-center justify-end gap-2 text-xl text-color4"
              key={book.id + "remove"}
              onClick={() => {
                cart.removeFromCart(book.id);
              }}
            >
              <Image
                src={"/auth/x-dark.svg"}
                alt=""
                className="cursor-pointer rounded-full border border-transparent p-1 text-color5 transition-all ease-linear hover:border-color5 hover:shadow-md"
                width={27}
                height={27}
              />
            </button>
          </div>
          <h3 className="mb-2 text-lg font-medium text-gray-900">
            {book.title}
          </h3>
          {book.isbn && (
            <p className="mb-2 text-sm text-gray-500">
              رقم الكتاب: {book.isbn}
            </p>
          )}
          <div className="mb-2 flex items-center gap-2">
            <span className="text-sm text-gray-500">السعر:</span>
            <span className="font-medium">{book.price_after_discount} د.م</span>
            {!!book.discount && (
              <span className="text-xs text-gray-500 line-through">
                {book.price}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">الكمية:</span>
            <CartButtons variant="row" book={book} />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Image
        src="/cart/empty-cart.svg"
        alt="Empty Cart"
        width={300}
        height={300}
      />
      <h2 className="mb-4 mt-8 text-2xl font-bold">سلة التسوق فارغة</h2>
      <Link href="/books">
        <Button className="flex items-center">
          <span className="ml-2">مواصلة التسوّق</span>
          <Image
            src="/double-arrow-right-white.svg"
            alt=""
            width={25}
            height={25}
            className="rotate-180"
          />
        </Button>
      </Link>
    </div>
  );
}
