import { QueriesConfig } from "@/constants/QueriesConfig";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import React from "react";
export default function Hydration({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient(QueriesConfig);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
