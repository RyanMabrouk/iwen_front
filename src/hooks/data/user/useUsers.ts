"use client";
import { useQuery } from "@tanstack/react-query";
import { InfinityPaginationQueryType } from "@/types";
import { Tables } from "@/types/database.types";
import { usersQuery } from "./usersQuery";
export default function useUsers( args: InfinityPaginationQueryType<`users.${keyof Tables<'users'>}`>) {
  const query = useQuery(usersQuery(args));
  return query;
}
