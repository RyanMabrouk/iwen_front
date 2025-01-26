"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/constants/QueriesConfig";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Store({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
