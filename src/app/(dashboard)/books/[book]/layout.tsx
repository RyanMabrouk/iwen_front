import React from "react";
import { Metadata } from "next";
import { cookies } from "next/headers";
import getEndpoint from "@/services/getEndpoint";
import sendRequest from "@/services/sendRequest";
import { IBookPopulated } from "@/types";

export async function generateMetadata({
  params: { book },
}: {
  params: { book: string };
}): Promise<Metadata> {
  
  const url = getEndpoint({ resource: "books", action: "getBookId" });
  const { data: bookData, error } = await sendRequest<IBookPopulated>({
    method: "GET",
    url: url(book),
  });
  if (!book || error ) {
    console.error("Error fetching book data:", error); 
    return {
      title: "الكتاب غير موجود | دار إيوان",
      description: "لم يتم العثور على هذا الكتاب.",
      openGraph: {
        title: "الكتاب غير موجود | دار إيوان",
        description: "لم يتم العثور على هذا الكتاب.",
        url: `https://www.dar-iwan.shop/books/${book}`,
        images: [{ url: "/default-book.png", width: 1200, height: 630, alt: "كتاب غير موجود" }],
      },
      twitter: {
        card: "summary_large_image",
        title: "الكتاب غير موجود | دار إيوان",
        description: "لم يتم العثور على هذا الكتاب.",
        images: ["/default-book.png"],
      },
    };
  }

  return {
    title: `${bookData?.title}`,
    description: bookData?.description ?? "اكتشف المزيد عن هذا الكتاب في دار إيوان.",
    keywords: [
      bookData?.title ?? "",
      bookData?.writer?.name ?? "",
      "كتب",
      "روايات",
      "مكتبة",
      "قراءة",
      "شراء كتب",
      "دار إيوان",
      "كتاب",
    ],
    openGraph: {
      title: `${bookData?.title} - ${bookData?.writer?.name} | دار إيوان`,
      description:
      bookData?.description ?? "اكتشف المزيد عن هذا الكتاب في دار إيوان.",
      url: `https://www.dar-iwan.shop/books/${book}`,
      images: [
        {
          url: bookData?.images_urls[0] ?? "/default-book.png",
          width: 1200,
          height: 630,
          alt: `${bookData?.title} - ${bookData?.writer?.name}`,
        },
      ],
      type: "book",
      locale: "ar_AR",
    },
    twitter: {
      card: "summary_large_image",
      title: `${bookData?.title} - ${bookData?.writer?.name} | دار إيوان`,
      description:
      bookData?.description ?? "اكتشف المزيد عن هذا الكتاب في دار إيوان.",
      images: [bookData?.images_urls[0] ?? "/default-book.png"],
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="">{children}</div>;
}
