import { useState, useEffect, useCallback } from "react";
import { Slider } from "@mui/material";
/* import debounce from "lodash.debounce";
 */ import useTranslation from "@/translation/useTranslation";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import createNewPathname from "@/helpers/createNewPathname";

export default function PriceRangeFilter({priceRange, setPriceRange}: {priceRange: [number, number], setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>}) {
  const minPriceSearchParams = useSearchParams().get("minPrice");
  const maxPriceSearchParams = useSearchParams().get("maxPrice");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /* const debouncedOnChange = useCallback(
    debounce((newValue: number[]) => {
      router.push(
        createNewPathname({
          currentPathname: pathname,
          currentSearchParams: searchParams,
          values: [
            { name: "minPrice", value: String(newValue[0]) },
            { name: "maxPrice", value: String(newValue[1]) },
          ],
        }),
        {
          scroll: false,
        },
      );
    }, 1500),
    [value],
  );

  useEffect(() => {
    debouncedOnChange(value);
    return () => {
      debouncedOnChange.cancel();
    };
  }, value); */

  useEffect(() => {
    if (minPriceSearchParams && Number(minPriceSearchParams) !== priceRange[0]) {
      setPriceRange((prev) => [Number(minPriceSearchParams), prev[1]]);
    }
    if (maxPriceSearchParams && Number(maxPriceSearchParams) !== priceRange[1]) {
      setPriceRange((prev) => [prev[0], Number(maxPriceSearchParams)]);
    }
  }, [minPriceSearchParams, maxPriceSearchParams]);
  const { data: translation } = useTranslation();
  return (
    <div className="flex flex-col items-start justify-center bg-white">
      <span className="mb-1 text-sm font-medium uppercase">
        {translation?.lang["price"]} (TND)
      </span>
      <Slider
        className="!text-color2 !mx-1"
        onChange={(e, newValue) => {
          setPriceRange(newValue as [number, number]);
        }}
        value={priceRange}
        defaultValue={[1, 2000]}
        max={2000}
        min={1}
        valueLabelDisplay="auto"
        getAriaValueText={(value) => String(value)}
      />
      <div className="mt-2 flex flex-row items-center justify-between">
        <input
          type="number"
          value={priceRange[0]}
          className="focus:outline-color8 h-[2rem] w-full rounded-sm border border-gray-500 text-center"
          onChange={(e) => {
            const newValue = Math.max(
              5,
              Math.min(Number(e.target.value), priceRange[1]),
            );
            setPriceRange([newValue, priceRange[1]]);
          }}
        />
        <span className="mx-4 text-lg font-bold">-</span>
        <input
          type="number"
          value={priceRange[1]}
          className="focus:outline-color8 h-[2rem] w-full rounded-sm border border-gray-500 text-center"
          onChange={(e) => {
            const newValue = Math.min(
              999,
              Math.max(Number(e.target.value), priceRange[0]),
            );
            setPriceRange([priceRange[0], newValue]);
          }}
        />
      </div>
    </div>
  );
}
