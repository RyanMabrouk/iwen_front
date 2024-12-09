"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import useURL from "@/hooks/useURL";
import SingleSelectFilters from "./SingleSelectFilters";
import MultipleSelectFilters from "./MultipleSelectFilters";
import { useFilterProvider } from "../provider/FilterProvider";
import PriceRangeFilter from "../[book]/ui/PriceRangeFilter";

type FilterSelectProps = {
  onClose: () => void;
};

export function FilterSelect({ onClose }: FilterSelectProps) {
  const maxValue = 2100;
  const { update, getValue } = useURL();
  const { writer, corner, shareHouse, category, subcategory } =
    useFilterProvider();
  const [priceRange, setPriceRange] = useState<[number, number]>(
    (getValue("priceRange")?.split("%") as unknown as [number, number]) ?? [
      0,
      maxValue,
    ],
  );

  const handleApply = () => {
    update([
      { name: "writer", value: writer.id ? writer.id + "%" + writer.name : "" },
      { name: "shareHouse", value: shareHouse.id ?? "" },
      { name: "corner", value: corner.id ?? "" },
      {
        name: "categories",
        value: category.map((c) => c.id).join("%") as string,
      },
      {
        name: "subcategories",
        value: subcategory.map((s) => s.id).join("%") as string,
      },
      { name: "priceRange", value: priceRange.join("%") as string },
    ]);
    onClose();
  };

  return (
    <div className="space-y-4 p-4">
      <div className="space-y-2">
        <Label>السعر</Label>
        {/* <Slider
          min={0}
          max={maxValue}
          step={1}
          value={priceRange}
          onValueChange={(value: [number, number]) => setPriceRange(value)}
          className="[&_.range-slider__range]:bg-color1 [&_[role=slider]]:border-black [&_[role=slider]]:bg-color2 [&_[role=slider]]:focus:ring-color1"
          color="#27a098"
        /> */}
        <PriceRangeFilter
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />
        <div className="flex justify-between text-sm">
          <span dir="rtl">{priceRange[0]} د.م</span>
          <span dir="rtl">{priceRange[1]} د.م</span>
        </div>
      </div>

      <SingleSelectFilters />
      <MultipleSelectFilters />

      <Button
        onClick={handleApply}
        className="w-full bg-color1 hover:bg-color2"
      >
        تطبيق المرشحات
      </Button>
    </div>
  );
}
