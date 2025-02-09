"use client";
import { useQuery } from "@tanstack/react-query";
import { bookQuery } from "./bookQuery";

export default function useBook(bookSlug: string) {
  const query = useQuery(bookQuery(bookSlug));
  return query;
}
