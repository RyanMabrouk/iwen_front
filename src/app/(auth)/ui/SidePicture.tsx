"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SidePicture() {
  return (
    <div
      className="relative row-span-10 flex h-full max-h-[30rem] w-full flex-col items-center justify-between overflow-hidden max-md:col-span-3 max-md:row-span-2 max-md:row-start-1 max-md:max-h-[10rem]"
      style={{ background: "#27A098" }}
    >
      <Link
        href="/home"
        className="absolute right-0 top-0 z-10 bg-inherit p-2"
        aria-label="Close"
      >
        <Image
          src="/auth/x.svg"
          quality={100}
          alt="Close"
          className="bg-transparent"
          width={24}
          height={24}
        />
      </Link>

      <div className="flex flex-grow items-center justify-center">
        <Image
          src="/auth/logo.svg"
          quality={100}
          width={125}
          height={125}
          className="min-md:top-[150px] absolute h-auto max-h-full w-auto max-w-full max-md:bottom-3 max-md:right-3"
          alt="Logo"
        />
      </div>

      <div className="absolute bottom-0 left-0 w-full">
        <Image
          src="/auth/lines.png"
          quality={100}
          width={100}
          height={100}
          className="h-full w-[20px] md:hidden"
          alt="Decorative lines"
          layout="responsive"
        />
        <Image
          src="/auth/lines2.png"
          quality={100}
          width={100}
          height={100}
          className="absolute bottom-0 hidden md:block"
          alt="Decorative lines"
          layout="responsive"
        />
      </div>
    </div>
  );
}
