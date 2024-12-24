import Image from "next/image";
import React from "react";
import heart from "../../../../../../public/dashboard/book/heart";
import { WishListHeart } from "@/components/BookCard";
import { useBookProvider } from "../provider/BookProvider";

export default function MainPic({
  liked,
  setLiked,
  selectedImage,
}: {
  liked: boolean;
  setLiked: React.Dispatch<React.SetStateAction<boolean>>;
  selectedImage:
    | {
        id: number;
        src: string;
      }
    | undefined;
}) {
  const { book } = useBookProvider();
  const isDiscounted = !!book?.discount;
  const isOutOfStock = book?.stock === 0;
  const isNewBook =
    new Date(book?.created_at ?? new Date()) >=
    new Date(new Date().setMonth(new Date().getMonth() - 1));
  return (
    <div className="h-fir relative flex w-fit items-center justify-center rounded-md border-2 border-gray-200 bg-white max-lg:flex-row">
      <div className="relative w-[80%] p-4">
        <Image
          src={selectedImage?.src ?? "/empty-book.svg"}
          className="h-[27rem] object-scale-down"
          height={500}
          width={500}
          alt="picture"
        />
      </div>
      {isDiscounted && !isOutOfStock && !isNewBook && (
        <div className="absolute left-3 top-4 z-10 rounded-full bg-primary-400 px-2.5 py-1 text-sm font-medium text-white">
          تخفيض{" "}
          {book.discount_type === "percentage"
            ? book.discount + "%"
            : book.discount + " د.م"}{" "}
        </div>
      )}
      {isOutOfStock && (
        <div className="absolute left-3 top-4 z-10 rounded-full bg-red-500 px-2.5 py-1 text-sm font-medium text-white">
          نفذت الكمية
        </div>
      )}
      {!isOutOfStock && isNewBook && (
        <div className="absolute left-3 top-4 z-10 rounded-full bg-[#2774A0] px-2.5 py-1 text-sm font-medium text-white">
          جديد{" "}
        </div>
      )}
      <button
        onClick={() => setLiked((e) => !e)}
        className="absolute -right-3 -top-3 transition-all duration-200"
      >
        <WishListHeart
          size={30}
          liked={book?.is_in_wishlist ?? false}
          book={{ id: book?.id ?? "" }}
        />
      </button>
    </div>
  );
}
