"use client";
import { useQuery } from "@tanstack/react-query";
import { InfinityPaginationQueryType } from "@/types";
import { Tables } from "@/types/database.types";
import { ordersQuery } from "./ordersQuery";
export default function useOrders(args:InfinityPaginationQueryType<`orders.${keyof Tables<"orders">}`>) {
  const query = useQuery(ordersQuery(args));
  return query;
}
