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
import { FilterProvider } from "../provider/FilterProvider";

export default function BooksFilters() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button className="w-[150px]" variant="outline">
          <Filter className="mr-2 h-4 w-4" /> المرشحات
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <FilterProvider>
          <FilterSelect onClose={() => setIsOpen(false)} />
        </FilterProvider>
      </PopoverContent>
    </Popover>
  );
}
