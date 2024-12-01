"use client";
import { useQuery } from "@tanstack/react-query";
import { shareHousesQuery } from "./shareHousesQuery";

export default function useShareHouses() {
  const query = useQuery(shareHousesQuery());
  return query;
}
