"use client";

import React, { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FilterSelect } from "./FilterSelect";
import { FilterType } from "../page";

export default function BooksFilters({
  setFilters,
}: {
  setFilters: React.Dispatch<React.SetStateAction<FilterType>>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleApplyFilters = (newFilters: FilterType) => {
    setFilters(newFilters);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[150px]">
          <Filter className="mr-2 h-4 w-4" /> المرشحات
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <FilterSelect
          onApply={handleApplyFilters}
          onClose={() => setIsOpen(false)}
        />
      </PopoverContent>
    </Popover>
  );
}
