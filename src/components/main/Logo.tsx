import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href={"/"} className={`block ${className}`}>
      <Image
        src={"/logo.png"}
        height={78}
        width={160}
        alt={""}
        className="max-w-none"
        style={{ height: "78px", width: "160px" }}
      />
    </Link>
  );
}
