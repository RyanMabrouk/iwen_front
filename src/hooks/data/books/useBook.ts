"use client";
import { useQuery } from "@tanstack/react-query";
import { bookQuery } from "./bookQuery";

export default function useBook(bookId: string) {
  const query = useQuery(bookQuery(bookId));
  return query;
}
