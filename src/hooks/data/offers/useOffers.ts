"use client";
import { offersQuery } from "./offersQuery";
import { useQuery } from "@tanstack/react-query";

export default function useOffers() {
  const query = useQuery(offersQuery());
  return query;
}
