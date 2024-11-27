"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { SlidersHorizontal } from "lucide-react";
import ViewPreference from "./ViewPreference";
import Sortings from "./Sortings";
import BooksFilters from "./BooksFilters";
import { FilterType, SortingType } from "../page";

export default function Navigation({
  sortings,
  setView,
  bookNumber,
  setBooks,
  filters,
  setFilters,
}: {
  sortings: SortingType;
  setView: (view: SortingType) => void;
  bookNumber: number;
  setBooks: React.Dispatch<React.SetStateAction<number>>;
  filters: FilterType;
  setFilters: React.Dispatch<React.SetStateAction<FilterType>>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex w-full items-center justify-between bg-white px-4 py-2 sm:px-6 lg:px-8">
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <ViewPreference bookNumber={bookNumber} setBooks={setBooks} />
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters & Sort
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <div className="grid gap-4 py-4">
                <BooksFilters
                  close={() => setIsOpen(false)}
                  filters={filters}
                  setFilters={setFilters}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <Sortings sortings={sortings} setView={setView} />
      </div>
    </nav>
  );
}
