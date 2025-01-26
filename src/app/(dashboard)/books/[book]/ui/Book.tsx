"use client";
import React from "react";
import MainInfo from "./BookInfo";
import Pictures from "./Pictures";
import { useBookProvider } from "../provider/BookProvider";

export default function BookInfo() {
  const { book } = useBookProvider();
  return (
    <div className="flex h-fit items-stretch justify-center gap-3 bg-bgcolor1 p-5 transition-all duration-300 max-sm:w-screen max-sm:flex-col-reverse max-sm:items-center">
      <MainInfo />
      <Pictures images={book?.images_urls ?? []} />
    </div>
  );
}
