import React from "react";
import { Metadata } from "next";
import { cookies } from "next/headers";
import getEndpoint from "@/services/getEndpoint";
import sendRequest from "@/services/sendRequest";
import { IBookPopulated } from "@/types";
import { Product, WithContext } from "schema-dts";

// This function to generate JSON-LD can be used by both metadata and layout
async function getBookData(bookId: string) {
  const url = getEndpoint({ resource: "books", action: "getBookId" });
  const { data: bookData, error } = await sendRequest<IBookPopulated>({
    method: "GET",
    url: url(bookId),
  });
  
  return { bookData, error };
}

export async function generateMetadata({ 
  params: { book },
}: { 
  params: { book: string }; 
}): Promise<Metadata> {
  const { bookData, error } = await getBookData(book);

  if (!book || error) {
    console.error("Error fetching book data:", error);
    return {
      title: "الكتاب غير موجود | دار إيوان",
      description: "لم يتم العثور على هذا الكتاب.",
      openGraph: {
        title: "الكتاب غير موجود | دار إيوان",
        description: "لم يتم العثور على هذا الكتاب.",
        url: `https://www.dar-iwan.shop/books/${book}`,
        images: [
          {
            url: "/default-book.png",
            width: 1200,
            height: 630,
            alt: "كتاب غير موجود",
          },
        ],
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
      description: bookData?.description ?? "اكتشف المزيد عن هذا الكتاب في دار إيوان.",
      url: `https://www.dar-iwan.shop/books/${book}`,
      images: [
        {
          url: bookData?.images_urls?.[0] ?? "/default-book.png",
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
      description: bookData?.description ?? "اكتشف المزيد عن هذا الكتاب في دار إيوان.",
      images: [bookData?.images_urls?.[0] ?? "/default-book.png"],
    },
  };
}

export default async function Layout({ 
  children, 
  params 
}: { 
  children: React.ReactNode;
  params: { book: string };
}) {
  const { bookData, error } = await getBookData(params.book);
  
  // Create jsonLd object only if we have book data
  const jsonLd = !error && bookData ? {
    "@context": "https://schema.org",
    "@type": "Book",
    name: bookData?.title,
    author: {
      "@type": "Person",
      name: bookData?.writer?.name ?? "Unknown Author",
    },
    publisher: {
      "@type": "Organization",
      name: bookData?.share_house?.name ?? "Unknown Publisher",
    },
    datePublished: bookData?.created_at ?? "Unknown Date",
    isbn: bookData?.isbn ?? "Unknown ISBN",
    image: bookData?.images_urls?.[0] ?? "/default-book.png",
    description: bookData?.description ?? "No description available.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: bookData?.total_rating ?? "0",
      reviewCount: bookData?.total_reviews_count ?? "0",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: bookData?.price ?? "0.00",
      availability: "https://schema.org/InStock",
      url: `https://www.dar-iwan.shop/books/${params.book}`,
    },
  } : null;

  return (
    <div className="">
      {jsonLd && (
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} 
        />
      )}
      {children}
    </div>
  );
}