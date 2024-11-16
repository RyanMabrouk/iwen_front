"use client";
import { useQuery } from "@tanstack/react-query";
import { subCategoriesQuery } from "./subCategoriesQuery";
export default function useSubCategories() {
  const query = useQuery(subCategoriesQuery());
  return query;
}
