"use client";
import { Tables } from "@/types/database.types";
import React from "react";
import MainInfo from "./BookInfo";
import Pictures from "./Pictures";

export default function BookInfo() {
  const dummyData: Tables<"books"> = {
    canonical: "",
    cover_type_id: null,
    created_at: "",
    description: "",
    discount: 0,
    discount_type: "percentage",
    editor: "",
    id: "",
    images_urls: [],
    isbn: "",
    meta_description: "",
    meta_image: "",
    meta_keywords: [],
    meta_title: "",
    page_count: 0,
    price: 0,
    price_after_discount: 0,
    price_dhs: 0,
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
  };

  return (
    <div
      className="flex items-stretch justify-center gap-3 p-5"
      style={{ background: "#E4EFEF" }}
    >
      <MainInfo />
      <Pictures />
    </div>
  );
}
