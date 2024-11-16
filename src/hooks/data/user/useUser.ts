"use client";
import { useQuery } from "@tanstack/react-query";
import { userQuery } from "./userQuery";

export default function useUser(userId: string) {
  const query = useQuery(userQuery(userId)); // Specify IBookPopulated here
  return query;
}
