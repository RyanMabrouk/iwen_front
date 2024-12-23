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
