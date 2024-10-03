import { UseQueryOptions } from "@tanstack/react-query";

export type QueryReturnType<T extends () => UseQueryOptions> = Awaited<
  ReturnType<
    ReturnType<T>["queryFn"] extends (...args: any) => any
      ? ReturnType<T>["queryFn"]
      : never
  >
>;
