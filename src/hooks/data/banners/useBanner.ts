"use client";
import { useQuery } from "@tanstack/react-query";
import { bannerQuery } from "./bannerQuery";

export default function useBanner(bannerId: string) {
  const query = useQuery(bannerQuery(bannerId)); 
  return query;
}
