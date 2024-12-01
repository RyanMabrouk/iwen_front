"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Navbar() {
  const Pathname = usePathname();

  return (
    <ul className="flex items-center gap-3 text-sm font-semibold sm:gap-4 sm:text-lg">
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
          تغيير كلمة المرور
        </li>
      </Link>
      <Link href={"/wishlist"}>
        <li
          className={`pb-1 ${
            Pathname.includes("wishlist")
              ? "border-b-2 border-color2 text-color2"
              : ""
          }`}
        >
          قائمة الرغبات
        </li>
      </Link>
    </ul>
  );
}
