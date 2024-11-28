"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Navbar() {
  const Pathname = usePathname();

  return (
    <ul className=" flex gap-3 text-sm sm:gap-4 items-center sm:text-lg font-semibold">
      <Link href={"/profile"}>
        <li
          className={`pb-1 ${
            Pathname.includes("profile")
              ? "border-b-2 border-color2 text-color2"
              : ""
          }`}
        >
          بيانات عامة
        </li>
      </Link>
      <Link href={"/purchaseHistory"}>
        <li
          className={`pb-1 ${
            Pathname.includes("purchaseHistory")
              ? "border-b-2 border-color2 text-color2"
              : ""
          }`}
        >
          تاريخ المشتريات
        </li>
      </Link>
      <Link href={"/changePassword"}>
        <li
          className={`pb-1 ${
            Pathname.includes("changePassword")
              ? "border-b-2 border-color2 text-color2"
              : ""
          }`}
        >
      تغيير  كلمة المرور
        </li>
      </Link>
    </ul>
  );
}
