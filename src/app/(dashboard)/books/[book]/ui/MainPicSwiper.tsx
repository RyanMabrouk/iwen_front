import React from "react";
import Image from "next/image";
import CustomSwiper from "@/components/ui/swiper";
import { ArrowLeft, ArrowRight } from "lucide-react";
import heart from "../../../../../../public/dashboard/book/heart";

interface Picture {
  id: number;
  src: string;
  isSelected: boolean;
}

interface MainPicSwiperProps {
  pictures: Picture[];
  liked: boolean;
  setLiked: React.Dispatch<React.SetStateAction<boolean>>;
  selectedImage: {
    id: number;
    src: string;
    isSelected: boolean;
  };
  set: (src: string) => void;
}

export default function MainPicSwiper({
  pictures,
  liked,
  setLiked,
  selectedImage,
  set,
}: MainPicSwiperProps) {
  const initialTable = [
    selectedImage,
    ...pictures.filter((pic) => pic.id !== selectedImage.id),
  ];
  return (
    <div className="relative flex h-[27rem] w-[22rem] flex-col items-center justify-center">
      <ArrowLeft
        size={40}
        className="custom-swiper-books-next absolute -left-10 top-1/2 z-10 -translate-y-1/2 cursor-pointer text-primary-400 max-sm:-left-6"
      />
      <ArrowRight
        size={40}
        className="custom-swiper-books-prev absolute -right-10 top-1/2 z-10 -translate-y-1/2 cursor-pointer text-primary-400 max-sm:-right-6"
      />
      <CustomSwiper
        loop
        onClick={() => console.log("slide")}
        navigation={{
          prevEl: ".custom-swiper-books-prev",
          nextEl: ".custom-swiper-books-next",
        }}
        slides={initialTable?.map((picture) => (
          <div
            key={picture.id}
            className="relative m-auto flex h-[27rem] w-[20rem] items-center justify-center rounded-md border-2 border-gray-200 bg-white max-lg:flex-row"
          >
            <div className="relative h-4/6 w-8/12">
              <Image
                src={picture.src}
                fill
                alt={`Picture ${picture.id}`}
                objectFit="cover"
              />
            </div>
            <button
              onClick={() => setLiked((prev) => !prev)}
              className="absolute right-5 top-5 transition-all duration-200"
            >
              {heart(liked, "transition-all duration-200 hover:text-red-500")}
            </button>
          </div>
        ))}
        slidesPerView={1}
        spaceBetween={20}
        className="h-full w-full"
      />
    </div>
  );
}
