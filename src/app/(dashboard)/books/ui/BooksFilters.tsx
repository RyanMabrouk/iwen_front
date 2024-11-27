"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { FilterType, GenreType } from "../page";

const genres: GenreType[] = ["test", "test2"];
const ratings = [1, 2, 3, 4, 5];

export default function BooksFilters({
  filters,
  setFilters,
  close,
}: {
  filters: FilterType;
  setFilters: React.Dispatch<React.SetStateAction<FilterType>>;
  close: () => void;
}) {
  const [expandedFilters, setExpandedFilters] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<GenreType[]>(
    filters.genres || [],
  );
  const [selectedRating, setSelectedRating] = useState<number>(
    filters.stars || 1,
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.priceMin ? filters.priceMin : 0,
    filters.priceMax ? filters.priceMax : 1000,
  ]);

  const handleGenreChange = (genre: GenreType) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    );
  };

  function toggleFilter(filter: string): void {
    setExpandedFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)
        : [...prevFilters, filter],
    );
  }

  return (
    <div className="space-y-4 rounded-lg bg-background p-4 shadow">
      <Select onValueChange={(value) => setSelectedRating(Number(value))}>
        <SelectTrigger dir="rtl" className="w-full">
          <SelectValue placeholder="التصنيف" />
        </SelectTrigger>
        <SelectContent>
          {ratings.map((rating) => (
            <SelectItem dir="rtl" key={rating} value={rating.toString()}>
              {rating === 1
                ? "نجمة وما فوق"
                : rating === 2
                  ? "نجمتين وما فوق"
                  : `${rating} نجوم وما فوق `}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div>
        <Button
          dir="rtl"
          variant="outline"
          onClick={() => toggleFilter("genres")}
          className="w-full justify-between"
        >
          المواضيع
          {expandedFilters.includes("genres") ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
        {expandedFilters.includes("genres") && (
          <div dir="rtl" className="mt-2 space-y-2">
            {genres.map((genre) => (
              <div
                key={genre}
                className="mr-3 flex items-center gap-2 space-x-2"
              >
                <Checkbox
                  id={genre}
                  checked={selectedGenres.includes(genre)}
                  onCheckedChange={() => handleGenreChange(genre)}
                />
                <label
                  htmlFor={genre}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {genre}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <Button
          dir="rtl"
          variant="outline"
          onClick={() => toggleFilter("price")}
          className="w-full justify-between"
        >
          السعر
          {expandedFilters.includes("price") ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
        {expandedFilters.includes("price") && (
          <div className="mt-2 space-y-2">
            <Slider
              min={0}
              max={1000}
              step={1}
              value={priceRange}
              onValueChange={(value: [number, number]) => setPriceRange(value)}
            />
            <div className="flex justify-between text-sm">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        )}
      </div>

      <div className="pt-4">
        <Button
          onClick={() => {
            setFilters((f) => ({
              ...f,
              stars: selectedRating as number,
              genres: selectedGenres as GenreType[],
              priceMax: priceRange[1] as number,
              priceMin: priceRange[0] as number,
            }));
            close();
          }}
          className="w-full"
        >
          تطبيق المرشحات
        </Button>
      </div>
    </div>
  );
}
