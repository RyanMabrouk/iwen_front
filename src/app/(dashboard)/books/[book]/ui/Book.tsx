"use client";
import { Tables } from "@/types/database.types";
import React from "react";
import MainInfo from "./BookInfo";
import Pictures from "./Pictures";
import useBooks from "@/hooks/data/books/useBooks";
import { IBookPopulated } from "@/types";
import { useRouter } from "next/navigation";
import useBook from "@/hooks/data/books/useBook";
import { useBookProvider } from "../provider/BookProvider";

export default function BookInfo() {
  const { book } = useBookProvider();
  /* const dummyData: IBookPopulated = {
    canonical: "",
    cover_type_id: null,
    created_at: "",
    description: "",
    discount: 0,
    discount_type: "percentage",
    editor: "",
    id: "",
    images_urls: [
      "/dashboard/book/picture.png",
      "/dashboard/book/pic1.jpg",
      "/dashboard/book/pic2.png",
      "/dashboard/book/pic3.jpg",
      "/dashboard/book/pic4.jpg",
    ],
    isbn: "",
    meta_description: "",
    meta_image: "",
    meta_keywords: [],
    meta_title: "",
    page_count: 0,
    price: 0,
    price_after_discount: 0,
    release_year: null,
    share_house_id: null,
    slug: "",
    status: null,
    stock: 0,
    structured_data: "",
    title: "",
    updated_at: "",
    weight: 0,
    writer_id: null,
    corner_id: null,
    number_of_volumes: 0,
    price_dollar: 0,
    categories: [],
    subcategories: [],
    cover_type: null,
    writer: null,
    share_house: null,
    corner: null,
    writer_books: [],
    recommended_books: [],
  }; */
  return (
    <div
      className="flex h-fit items-stretch justify-center gap-3 p-5 transition-all duration-300"
      /* style={{ background: "#E4EFEF" }} */
    >
      <MainInfo />
      <Pictures images={book?.images_urls ?? []} />
    </div>
  );
}
