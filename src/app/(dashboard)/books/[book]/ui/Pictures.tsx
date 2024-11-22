import Image from "next/image";
import React from "react";
import MainPic from "./MainPic";
import SidePics from "./SidePics";

export default function Pictures({ images }: { images: string[] }) {
  const [pictures, setPictures] = React.useState(
    images.map((pic, i) => ({
      id: i,
      src: pic,
      isSelected: i == 0,
    })),
  );
  const [liked, setLiked] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<
    | {
        id: number;
        src: string;
        isSelected: boolean;
      }
    | undefined
  >(pictures[0]);
  const set = (src: string) => {
    setSelectedImage(pictures.find((pic) => pic.src === src));
    setPictures(
      pictures.map((pic) => ({ ...pic, isSelected: pic.src === src })),
    );
  };
  return (
    <div dir="rtl" className="flex items-stretch gap-3 max-lg:flex-col">
      <MainPic
        liked={liked}
        setLiked={setLiked}
        selectedImage={selectedImage}
      />
      <SidePics pictures={pictures} set={set} />
    </div>
  );
}
