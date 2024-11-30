import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <div className="">
      <Image
        src="/auth/logo.svg"
        alt="logo"
        className=""
        width={100}
        height={100}
      />
    </div>
  );
}
