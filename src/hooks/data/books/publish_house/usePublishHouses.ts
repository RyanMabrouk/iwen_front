"use client";
import { useQuery } from "@tanstack/react-query";
import { publishHouseQuery } from "./publishHouseQuery";
export default function usePublishHouses() {
  const query = useQuery(publishHouseQuery());
  return query;
}
