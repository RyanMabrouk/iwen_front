"use client";
import useOffers from "@/hooks/data/offers/useOffers";
import React from "react";
import BookPacksList from "./ui/BookPacksList";

export default function page() {
  const offersData = useOffers();
  if (offersData.isLoading) {
    return null;
  }
  const offers = offersData.data?.data;
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <BookPacksList offers={offers} />
    </div>
  );
}
