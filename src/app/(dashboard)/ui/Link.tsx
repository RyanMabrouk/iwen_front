import Image from "next/image";
import React from "react";

export default function Link({ children }: { children: string }) {
  return (
    <li className="flex items-center gap-1 text-white">
      <span>{children}</span>
      <Image
        src="/dashboard/angle-down.svg"
        alt="angle-down"
        className="text-white"
        width={20}
        height={20}
      />
    </li>
  );
}
