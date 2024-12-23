import { getQueryClient } from "@/constants/QueriesConfig";
import { bannersQuery } from "@/hooks/data/banners/bannersQuery";
import { eventsQuery } from "@/hooks/data/events/eventsQuery";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";
export default async function Hydration({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();
  await Promise.all([
    queryClient.prefetchQuery(eventsQuery()),
    queryClient.prefetchQuery(bannersQuery()),
  ]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
