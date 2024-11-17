import { UseQueryOptions } from "@tanstack/react-query";
import { Database } from "./database.types";

export type QueryReturnType<T extends () => UseQueryOptions> = Awaited<
  ReturnType<
    ReturnType<T>["queryFn"] extends (...args: any) => any
      ? ReturnType<T>["queryFn"]
      : never
  >
>;

export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

export type IDbTableName = keyof Database[Extract<
  keyof Database,
  "public"
>]["Tables"];
