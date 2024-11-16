"use client";
import { useQuery } from "@tanstack/react-query";
import { orderQuery } from "./orderQuery";

export default function useOrder(orderId: string) {
  const query = useQuery(orderQuery(orderId)); 
  return query;
}
