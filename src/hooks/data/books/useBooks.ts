"use client";
import { useQuery } from "@tanstack/react-query";
import { booksQuery } from "./booksQuery";
import { InfinityPaginationQueryType } from "@/types";
import { Tables } from "@/types/database.types";
export default function useBooks(
  args: InfinityPaginationQueryType<`books.${keyof Tables<"books">}`>,
) {
  const query = useQuery(booksQuery(args));
  return query;
}
