import Link from "next/link";
import React from "react";

const links = [
  {
    label: "تعرف علينا",
    href: "/about-us",
  },
  {
    label: "تواصل معنا",
    href: "/contact-us",
  },
  {
    label: "إكتشف جديدنا",
    href: "/discover",
  },
  {
    label: "سؤال و جواب",
    href: "/faq",
  },
  {
    label: "حسابي",
    href: "/my-account",
  },
  {
    label: "سلة المشتريات",
    href: "/cart",
  },
  {
    label: "آخر العروض",
    href: "/offers",
  },
  {
    label: "فضاء المؤلفين",
    href: "/authors-space",
  },
  {
    label: "تفاسير (14)",
    href: "/tafaseer",
  },
  {
    label: "المرأة في الإسلام (14)",
    href: "/women-in-islam",
  },
  {
    label: "ماقبل الإسلام (09)",
    href: "/pre-islam",
  },
  {
    label: "مواضيع أخرى (60)",
    href: "/other-topics",
  },
  {
    label: "فقه إسلامي (17)",
    href: "/islamic-fiqh",
  },
  {
    label: "الحج و العمرة (07)",
    href: "/hajj-and-umrah",
  },
  {
    label: "السيرة النبوية (18)",
    href: "/prophetic-biography",
  },
  {
    label: "مواضيع أخرى (60)",
    href: "/other-topics",
  },
];

export default function Links() {
  return (
    <div
      dir="rtl"
      className="grid text-white text-base  grid-cols-2 gap-6 p-4 text-center md:grid-cols-4 sm:grid-cols-3"
    >
      {links.map((link, index) => (
        <Link href={link.href} key={index}>
        <div
        className="hover:opacity-50"
        >
          {link.label}
        </div>
        </Link>
      ))}
    </div>
  );
}
