"use client";

import Image from "next/image";
import React from "react";
import pic from "@/app/(auth)/icons/Group123.png";
import X from "@/app/(auth)/icons/Vector.svg";

interface SidePictureProps {
  imageSrc?: string;
  imageAlt?: string;
}

export default function SidePicture({
  imageSrc = "/Group123.png",
  imageAlt = "Background image",
}: SidePictureProps) {
  return (
    <div className="relative h-full w-full">
      <Image
        src={pic}
        alt={imageAlt}
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={85}
        className="object-cover"
      />
      <button
        className="absolute right-[39px] top-[37.5px] bg-inherit p-2"
        aria-label="Close"
      >
        <Image src={X} alt="Close" width={24} height={24} />
      </button>
    </div>
  );
}
