"use client";
import { useQuery } from "@tanstack/react-query";
import { InfinityPaginationQueryType } from "@/types";
import { Tables } from "@/types/database.types";
import { ordersQuery } from "./ordersQuery";
import { myOrdersQuery } from "./myOrdersQuery";
export default function useMyOrders(args:InfinityPaginationQueryType<`orders.${keyof Tables<"orders">}`>) {
  const query = useQuery(myOrdersQuery(args));
  return query;
}
