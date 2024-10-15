import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href={"/"}>
      <Image src={"/logo.png"} height={78} width={160} alt={""} className="" />
    </Link>
  );
}
