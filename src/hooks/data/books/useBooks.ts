"use client";
import { useQuery } from "@tanstack/react-query";
import { QueryBooksArgs, booksQuery } from "./booksQuery";
export default function useBooks(args: QueryBooksArgs) {
  const query = useQuery(booksQuery(args));
  return query;
}
