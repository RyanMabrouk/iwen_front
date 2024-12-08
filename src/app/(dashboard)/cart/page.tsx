"use client";
import { Spinner } from "@/app/ui/Spinner";
import { CartButtons } from "@/components/BookCard";
import PrimaryButton from "@/components/main/buttons/PrimaryButton";
import useCart from "@/hooks/cart/useCart";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const cart = useCart();
  const books = cart?.data ?? [];
  return (
    <>
      {books.length > 0 ? (
        <div dir="rtl" className="my-8 h-fit">
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
                    className="flex flex-row items-start justify-start gap-2 text-lg font-medium"
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
          <div className="flex flex-row items-center justify-evenly gap-[30svw]">
            <Link href="/books">
              <PrimaryButton
                className="flex flex-row-reverse items-center"
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

            <div className="flex flex-row items-center gap-12 lg:gap-24">
              <div className="flex flex-row gap-2">
                <span className="font-medium"> إجمالي المبلغ :</span>
                <span className="text-xl font-semibold">{cart.total}د.م</span>
                {cart.total_before_discount !== cart.total && (
                  <span className="text-sm text-color4">
                    <del>{cart.total_before_discount}د.م</del>
                  </span>
                )}
              </div>
              <Link href="/order">
                <PrimaryButton size="md"> تأكيد الطلب</PrimaryButton>
              </Link>{" "}
            </div>
          </div>
        </div>
      ) : cart.isLoading ? (
        <span>
          <Spinner />
        </span>
      ) : (
        <div className="relative flex items-center justify-center overflow-x-hidden overflow-y-hidden">
          <Image
            src="/cart/empty-cart.svg"
            className="h-full w-full"
            alt=""
            width={2000}
            height={2000}
          />
          <Link href="/home" className="absolute top-[68%] z-[1000] -ml-6">
            <PrimaryButton
              className="flex flex-row-reverse items-center"
              size="md"
              variant="primary"
            >
              <span> مواصلة التسوّق</span>
              <Image
                src="/double-arrow-right-white.svg"
                alt=""
                className="rotate-180"
                width={25}
                height={25}
              />
            </PrimaryButton>
          </Link>
        </div>
      )}
    </>
  );
}
