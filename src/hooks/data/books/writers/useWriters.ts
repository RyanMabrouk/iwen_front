"use client";
import { useQuery } from "@tanstack/react-query";
import { writersQuery } from "./writersQuery";
export default function useWriters() {
  const query = useQuery(writersQuery());
  return query;
}
