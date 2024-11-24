"use client";
import { useQuery } from "@tanstack/react-query";
import { eventQuery } from "./eventQuery";

export default function useEvent(eventId: string) {
  const query = useQuery(eventQuery(eventId)); 
  return query;
}
