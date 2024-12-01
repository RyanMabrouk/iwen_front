"use client";
import { useQuery } from "@tanstack/react-query";
import { InfinityPaginationQueryType } from "@/types";
import { Tables } from "@/types/database.types";
import { bannersQuery } from "./bannersQuery";
export default function useBanners() {
  const query = useQuery(bannersQuery());
  return query;
}
