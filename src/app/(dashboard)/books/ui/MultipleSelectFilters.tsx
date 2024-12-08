import React, { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useFilterProvider } from "../provider/FilterProvider";

export default function MultipleSelectFilters() {
  const {
    categories,
    subcategories,
    category,
    subcategory,
    setCategory,
    setSubcategory,
  } = useFilterProvider();

  const [openCategory, setOpenCategory] = useState(false);
  const [openSubcategory, setOpenSubcategory] = useState(false);
  const multipleFilters: {
    label: string;
    button: string;
    command: string;
    search: string;
    selected: { id?: string | undefined; name?: string | undefined }[];
    table: { id?: string; name?: string }[];
    notFound: string;
    setter: React.Dispatch<
      React.SetStateAction<
        {
          id?: string | undefined;
          name?: string | undefined;
        }[]
      >
    >;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }[] = [
    {
      label: "الفئة",
      button: "اختر الفئة",
      command: "اختر الفئة",
      search: "ابحث عن الفئة",
      selected: category,
      setter: setCategory,
      table: categories,
      notFound: "لم يتم العثور على فئة",
      open: openCategory,
      setOpen: setOpenCategory,
    },

    /* {
      label: "الفئة الفرعية",
      button: "اختر الفئة الفرعية",
      command: "اختر الفئة الفرعية",
      search: "ابحث عن الفئة الفرعية",
      selected: subcategory,
      setter: setSubcategory,
      table: subcategories,
      notFound: "لم يتم العثور على فئة فرعية",
      open: openSubcategory,
      setOpen: setOpenSubcategory,
    }, */
  ];
  return (
    <>
      {multipleFilters?.map((filter) => (
        <div key={filter.label} className="space-y-2">
          <Popover open={filter.open} onOpenChange={filter.setOpen}>
            <PopoverTrigger asChild>
              <Button className="w-full" variant="outline">
                {filter.selected.length === 1 ? (
                  `فئة`
                ) : filter.selected.length === 2 ? (
                  "فئتين"
                ) : filter.selected.length > 2 ? (
                  <h2 dir="rtl">{filter.selected.length} فئات </h2>
                ) : (
                  filter.command
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" side="bottom" align="start">
              <Command dir="rtl">
                <div dir="rtl" className="flex justify-between">
                  <CommandInput placeholder={filter.search} />
                  <div className="m-1 flex items-center gap-0.5">
                    <button
                      onClick={() => {
                        filter.setOpen(false);
                      }}
                      className="h-full rounded-md bg-blue-500 px-3 text-white"
                    >
                      إنتهاء
                    </button>
                    <button
                      onClick={() => {
                        filter.setter([]);
                        filter.setOpen(false);
                      }}
                      className="h-full rounded-md bg-red-500 px-3 text-white"
                    >
                      فسخ
                    </button>
                  </div>
                </div>
                <CommandList>
                  <CommandEmpty>{filter.notFound}</CommandEmpty>
                  <CommandGroup>
                    {filter.table.map((e) => (
                      <CommandItem
                        key={e.id}
                        onSelect={() => {
                          filter.setter((prev) =>
                            prev.some((item) => item.id === e.id)
                              ? prev.filter((item) => item.id !== e.id)
                              : [...prev, { id: e.id, name: e.name }],
                          );
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={filter.selected.some(
                              (item) => item.id === e.id,
                            )}
                            readOnly
                            className="mr-2"
                          />
                          <h1 className="font-semibold transition-all duration-200 hover:text-color1">
                            {e.name}
                          </h1>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      ))}
    </>
  );
}
