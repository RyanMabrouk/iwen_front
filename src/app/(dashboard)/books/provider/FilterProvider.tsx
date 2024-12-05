import useCategories from "@/hooks/data/books/categories/useCategories";
import useCorners from "@/hooks/data/books/corners/useCorners";
import useSubCategories from "@/hooks/data/books/subCategories/useSubCategories";
import useShareHouses from "@/hooks/data/books/useShareHouses";
import useWriters from "@/hooks/data/books/writers/useWriters";
import useURL from "@/hooks/useURL";
import React, { createContext, useState } from "react";

type FilterState = {
  writers?: { id: string; name: string }[];
  corners?: { id: string; name: string }[];
  categories?: { id: string; name: string }[];
  subcategories?: { id: string; name: string }[];
  shareHouses?: { id: string; name: string }[];
  writer?: { id?: string; name?: string };
  shareHouse?: { id?: string; name?: string };
  corner?: { id?: string; name?: string };
  category?: { id?: string; name?: string }[];
  subcategory?: { id?: string; name?: string }[];
  setWriter?: React.Dispatch<
    React.SetStateAction<{
      id?: string | undefined;
      name?: string | undefined;
    }>
  >;
  setCorner?: React.Dispatch<
    React.SetStateAction<{
      id?: string | undefined;
      name?: string | undefined;
    }>
  >;
  setShareHouse?: React.Dispatch<
    React.SetStateAction<{
      id?: string | undefined;
      name?: string | undefined;
    }>
  >;
  setCategory?: React.Dispatch<
    React.SetStateAction<
      {
        id?: string | undefined;
        name?: string | undefined;
      }[]
    >
  >;
  setSubcategory?: React.Dispatch<
    React.SetStateAction<
      {
        id?: string | undefined;
        name?: string | undefined;
      }[]
    >
  >;
};

export const FilterContext = createContext<FilterState | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const { getValue } = useURL();
  const [category, setCategory] = useState<{ id?: string; name?: string }[]>(
    getValue("categories")
      ?.split("%")
      .map((id) => ({ id })) ?? [],
  );
  const [subcategory, setSubcategory] = useState<
    { id?: string; name?: string }[]
  >(
    getValue("subcategories")
      ?.split("%")
      .map((id) => ({ id })) ?? [],
  );
  const [writer, setWriter] = useState<{ id?: string; name?: string }>({
    id: getValue("writer")?.split("%")[0],
    name: getValue("writer")?.split("%")[1],
  });
  const [corner, setCorner] = useState<{ id?: string; name?: string }>({
    id: getValue("corner")?.split("%")[0],
    name: getValue("corner")?.split("%")[1],
  });
  const [shareHouse, setShareHouse] = useState<{ id?: string; name?: string }>({
    id: getValue("shareHouse")?.split("%")[0],
    name: getValue("shareHouse")?.split("%")[1],
  });
  const writersData = useWriters();
  const cornersData = useCorners();
  const categoriesData = useCategories();
  const subcategoriesData = useSubCategories();
  const shareHousesData = useShareHouses();

  if (
    writersData.isLoading ||
    cornersData.isLoading ||
    categoriesData.isLoading ||
    subcategoriesData.isLoading ||
    shareHousesData.isLoading
  )
    return <h1>تحميل المرشحات</h1>;
  const writers =
    writersData.data?.data?.map((e) => ({ id: e.id, name: e.name })) ?? [];
  const corners =
    cornersData.data?.data?.map((e) => ({ id: e.id, name: e.name })) ?? [];
  const shareHouses =
    shareHousesData.data?.data?.map((e) => ({ id: e.id, name: e.name })) ?? [];
  const categories =
    categoriesData.data?.data?.map((e) => ({ id: e.id, name: e.name })) ?? [];
  const subcategories =
    subcategoriesData.data?.data?.map((e) => ({ id: e.id, name: e.name })) ??
    [];
  const filterState: FilterState = {
    category,
    subcategory,
    writer,
    corner,
    shareHouse,
    setWriter,
    setCorner,
    setShareHouse,
    setCategory,
    setSubcategory,
    writers,
    corners,
    shareHouses,
    categories,
    subcategories,
  };
  return (
    <FilterContext.Provider value={filterState}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilterProvider() {
  const context = React.useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilterProvider must be used within a FilterProvider");
  }
  return {
    writers: context.writers!,
    corners: context.corners!,
    shareHouses: context.shareHouses!,
    categories: context.categories!,
    subcategories: context.subcategories!,
    writer: context.writer!,
    corner: context.corner!,
    shareHouse: context.shareHouse!,
    category: context.category!,
    subcategory: context.subcategory!,
    setWriter: context.setWriter!,
    setCorner: context.setCorner!,
    setShareHouse: context.setShareHouse!,
    setCategory: context.setCategory!,
    setSubcategory: context.setSubcategory!,
  };
}
