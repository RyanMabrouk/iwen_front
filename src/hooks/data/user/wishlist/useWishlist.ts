"use client";
import { useQuery } from "@tanstack/react-query";
import { InfinityPaginationQueryType } from "@/types";
import { Tables } from "@/types/database.types";
import { wishlistQuery } from "./wishlistQuery";
export default function useWishlist(
  args: InfinityPaginationQueryType<`wishlist.${keyof Tables<"books">}`>,
) {
  const query = useQuery(wishlistQuery(args));
  return query;
}
