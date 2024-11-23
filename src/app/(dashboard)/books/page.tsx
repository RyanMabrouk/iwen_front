"use client";
import React, { useEffect, useState } from "react";
import Navigation from "./ui/Navigation";
import BooksList from "./ui/BooksList";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type SortingType = "mostSold" | "newest" | "discount";

export default function page() {
  const [numberOfBooks, setNumberOfBooks] = React.useState(4);
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [sortings, setSortings] = useState<SortingType>(() => {
    return (searchParams.get("view") as SortingType) || "mostSold";
  });
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("view", sortings);
    router.push(`${pathName}?${newParams.toString()}`, { scroll: false });
  }, [sortings, pathName, router, searchParams]);
  return (
    <div className="flex flex-col gap-2">
      <Navigation
        sortings={sortings}
        setSortings={setSortings}
        bookNumber={numberOfBooks}
        setBooks={setNumberOfBooks}
      />
      <BooksList sortings={sortings} booksNumber={numberOfBooks} />
    </div>
  );
}
