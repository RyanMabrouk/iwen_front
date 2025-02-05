"use client";
import useCategories from "@/hooks/data/books/categories/useCategories";
import Link from "next/link";
import React from "react";

const links = [
  {
    label: "تعرف علينا",
    href: "/contact",
  },
  {
    label: "تواصل معنا",
    href: "/contact",
  },
  {
    label: "إكتشف جديدنا",
    href: "/books",
  },
  {
    label: "آخر العروض",
    href: "/books",
  },
  {
    label: "حسابي",
    href: "/profile",
  },
];

export default function Links() {
  const { data: categories } = useCategories();
  const categoryLinks =
    categories?.data?.map((category) => ({
      label: category.name,
      href: `/books?categories=${category.id}`,
    })) ?? [];
  return (
    <div dir="rtl" className="flex flex-col gap-3">
      <span className="-mb-3 w-full font-bold items-center justify-center text-center text-xl">
        {"من نحن ؟"}
      </span>
      <span className="grid grid-cols-3 gap-6 p-4 text-center text-base text-white sm:grid-cols-3 md:grid-cols-5">
        {links.map((link, index) => (
          <Link href={link.href} key={index}>
            <div className="hover:opacity-50">{link.label}</div>
          </Link>
        ))}
      </span>
      <span className="-mb-3 w-full font-bold items-center justify-center text-center text-xl">
        إكتشف مواضيعنا
      </span>
      <span className="grid grid-cols-2 gap-6 p-4 text-center text-base text-white sm:grid-cols-3 md:grid-cols-5">
        {categoryLinks.map((link, index) => (
          <Link href={link.href} key={index}>
            <div className="hover:opacity-50">{link.label}</div>
          </Link>
        ))}
      </span>
    </div>
  );
}
