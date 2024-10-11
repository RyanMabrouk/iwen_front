"use client";

import Image from "next/image";
import React from "react";
import logo from "@/app/(auth)/(icons)/logo.svg";
import Up_lines from "@/app/(auth)/(icons)/lines.png";
import Side_lines from "@/app/(auth)/(icons)/lines2.png";
import X from "@/app/(auth)/(icons)/Vector.svg";

export default function SidePicture() {
  return (
    <div
      className="relative row-span-10 flex h-full max-h-[30rem] w-full flex-col items-center justify-between overflow-hidden max-md:col-span-3 max-md:row-span-2 max-md:row-start-1 max-md:max-h-[10rem]"
      style={{ background: "#27A098" }}
    >
      {/* <button
        className="absolute right-0 top-0 z-10 bg-inherit p-2"
        aria-label="Close"
      >
        <Image
          src={X}
          quality={100}
          alt="Close"
          className="bg-transparent"
          width={24}
          height={24}
        />
      </button> */}

      <div className="flex flex-grow items-center justify-center">
        <Image
          src={logo}
          quality={100}
          className="min-md:top-[150px] absolute h-auto max-h-full w-auto max-w-full max-md:bottom-3 max-md:right-3"
          alt="Logo"
        />
      </div>

      <div className="absolute bottom-0 left-0 w-full">
        <Image
          src={Up_lines}
          quality={100}
          className="h-full w-[20px] md:hidden"
          alt="Decorative lines"
          layout="responsive"
        />
        <Image
          src={Side_lines}
          quality={100}
          className="absolute bottom-0 hidden md:block"
          alt="Decorative lines"
          layout="responsive"
        />
      </div>
    </div>
  );
}
