"use client";
import { bannersQuery } from "./bannersQuery";
import { useQuery } from "@tanstack/react-query";

export default function useBanners() {
  const query = useQuery(bannersQuery());
  return query;
}
