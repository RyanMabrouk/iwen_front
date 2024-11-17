"use client";
import { useQuery } from "@tanstack/react-query";
import { coverTypesQuery } from "./coverTypesQuery";
export default function useCoverTypes() {
  const query = useQuery(coverTypesQuery());
  return query;
}
