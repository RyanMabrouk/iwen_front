import Image from "next/image";
import React from "react";
import heart from "../../../../../../public/dashboard/book/heart";

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
  return (
    <div className="relative flex h-[25rem] w-[20rem] items-center justify-center rounded-md bg-white">
      <div className="relative h-4/6 w-8/12">
        <Image
          key={selectedImage?.id ?? 0}
          src={selectedImage?.src ?? ""}
          fill
          alt="picture"
        />
      </div>
      <button
        onClick={() => setLiked((e) => !e)}
        className="absolute right-5 top-5 transition-all duration-200"
      >
        {heart(liked)}
      </button>
    </div>
  );
}
