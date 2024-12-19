"use client";
import { useQuery } from "@tanstack/react-query";
import { offerQuery } from "./offerQuery";

export default function useOffer(id: string) {
  const query = useQuery(offerQuery(id));
  return {
    ...query,
    data: query.data
      ? {
          ...query.data?.data,
          books: query.data?.data?.books?.map((book) => ({
            ...book,
            quantity: 1,
          })),
        }
      : undefined,
  };
}
