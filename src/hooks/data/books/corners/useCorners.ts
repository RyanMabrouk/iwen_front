"use client";
import { useQuery } from "@tanstack/react-query";
import { cornersQuery } from "./cornersQuery";
export default function useCorners() {
  const query = useQuery(cornersQuery());
  return query;
}
