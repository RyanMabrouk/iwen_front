import React from "react";
import { eventsQuery } from "./eventsQuery";
import { useQuery } from "@tanstack/react-query";

export default function useEvents() {
  const query = useQuery(eventsQuery());
  return query;
}
