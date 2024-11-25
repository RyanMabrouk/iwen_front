import React from "react";
import { eventsQuery } from "./eventsQuery";
import { useQuery } from "@tanstack/react-query";
import { eventQuery } from "./eventQuery";

export default function useEvent({ eventId }: { eventId: string }) {
  const query = useQuery(eventQuery(eventId));
  return query;
}
