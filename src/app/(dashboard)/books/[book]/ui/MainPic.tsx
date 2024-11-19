import Image from "next/image";
import React from "react";
import heart from "../../../../../../public/dashboard/book/heart";

export default function MainPic({
  liked,
  setLiked,
}: {
  liked: boolean;
  setLiked: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="relative flex w-[20rem] items-center justify-center bg-white">
      <div className="relative h-4/6 w-8/12">
        <Image src="/dashboard/book/picture.png" fill alt="picture" />
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
