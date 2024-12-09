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
    <div className="relative flex h-[27rem] w-[20rem] items-center justify-center rounded-md border-2 border-gray-200 bg-white max-lg:flex-row">
      <div className="relative h-4/6 w-8/12">
        <Image
          src={selectedImage?.src ?? "/empty-book.svg"}
          fill
          alt="picture"
        />
      </div>
      <button
        onClick={() => setLiked((e) => !e)}
        className="absolute right-5 top-5 transition-all duration-200"
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
