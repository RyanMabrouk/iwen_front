import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

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
import { PopoverClose } from "@radix-ui/react-popover";
import useWriters from "@/hooks/data/books/writers/useWriters";
import useCorners from "@/hooks/data/books/corners/useCorners";
import useCategories from "@/hooks/data/books/categories/useCategories";
import useSubCategories from "@/hooks/data/books/subCategories/useSubCategories";
import useShareHouses from "@/hooks/data/books/useShareHouses";
/*
const shareHouses = [
  { id: 1, name: "Share House 1" },
  { id: 2, name: "Share House 2" },
  { id: 3, name: "Share House 3" },
];
 const corners = [
  { id: 1, name: "Corner 1" },
  { id: 2, name: "Corner 2" },
  { id: 3, name: "Corner 3" },
];
const categories = [
  { id: 1, name: "Category 1" },
  { id: 2, name: "Category 2" },
  { id: 3, name: "Category 3" },
];
const subcategories = [
  { id: 1, name: "Subcategory 1" },
  { id: 2, name: "Subcategory 2" },
  { id: 3, name: "Subcategory 3" },
]; */

type FilterSelectProps = {
  onApply: (filters: any) => void;
  onClose: () => void;
};

export function FilterSelect({ onApply, onClose }: FilterSelectProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [writer, setWriter] = useState<{ id?: number; name?: string }>({});
  const [shareHouse, setShareHouse] = useState<{ id?: number; name?: string }>(
    {},
  );
  const [corner, setCorner] = useState<{ id?: number; name?: string }>({});
  const [category, setCategory] = useState<{ id?: number; name?: string }>({});
  const [subcategory, setSubcategory] = useState<{
    id?: number;
    name?: string;
  }>({});
  const [openWriter, setOpenWriter] = useState(false);
  const [openShareHouse, setOpenShareHouse] = useState(false);
  const [openCorner, setOpenCorner] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openSubcategory, setOpenSubcategory] = useState(false);
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
  const categories =
    categoriesData.data?.data?.map((e) => ({ id: e.id, name: e.name })) ?? [];
  const subcategories =
    subcategoriesData.data?.data?.map((e) => ({ id: e.id, name: e.name })) ??
    [];
  const shareHouses =
    shareHousesData.data?.data?.map((e) => ({ id: e.id, name: e.name })) ?? [];

  const handleApply = () => {
    onApply({
      priceRange,
      writer: writer.id?.toString(),
      shareHouse,
      corner,
      category,
      subcategory,
    });
    onClose();
  };
  const filters: {
    label: string;
    button: string;
    command: string;
    search: string;
    selected: { id?: number | undefined; name?: string | undefined };
    table: { id: string; name: string }[];
    notFound: string;
    setter: React.Dispatch<
      React.SetStateAction<{
        id?: number | undefined;
        name?: string | undefined;
      }>
    >;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }[] = [
    {
      label: "اسم الكاتب",
      button: "اختر الكاتب",
      command: "اختر الكاتب",
      search: "ابحث عن الكاتب",
      selected: writer,
      table: writers,
      setter: setWriter,
      notFound: "لم يتم العثور على كاتب",
      open: openWriter,
      setOpen: setOpenWriter,
    },
    {
      label: "دار النشر",
      button: "اختر دار النشر",
      command: "اختر دار النشر",
      search: "ابحث عن دار النشر",
      selected: shareHouse,
      table: shareHouses,
      setter: setShareHouse,
      notFound: "لم يتم العثور على دار نشر",
      open: openShareHouse,
      setOpen: setOpenShareHouse,
    },

    {
      label: "الركن",
      button: "اختر الركن",
      command: "اختر الركن",
      search: "ابحث عن الركن",
      selected: corner,
      table: corners,
      setter: setCorner,
      notFound: "لم يتم العثور على ركن",
      open: openCorner,
      setOpen: setOpenCorner,
    },

    {
      label: "الفئة",
      button: "اختر الفئة",
      command: "اختر الفئة",
      search: "ابحث عن الفئة",
      selected: category,
      table: categories,
      setter: setCategory,
      notFound: "لم يتم العثور على فئة",
      open: openCategory,
      setOpen: setOpenCategory,
    },

    {
      label: "الفئة الفرعية",
      button: "اختر الفئة الفرعية",
      command: "اختر الفئة الفرعية",
      search: "ابحث عن الفئة الفرعية",
      selected: subcategory,
      table: subcategories,
      setter: setSubcategory,
      notFound: "لم يتم العثور على فئة فرعية",
      open: openSubcategory,
      setOpen: setOpenSubcategory,
    },
  ];

  return (
    <div className="space-y-4 p-4">
      <div className="space-y-2">
        <Label>السعر</Label>
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

      {filters.map((filter) => (
        <div key={filter.label} className="space-y-2">
          <Popover open={filter.open} onOpenChange={filter.setOpen}>
            <PopoverTrigger asChild>
              <Button className="w-full" variant="outline">
                {filter.selected.name || filter.command}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" side="bottom" align="start">
              <Command dir="rtl">
                <div dir="rtl" className="b flex justify-between">
                  <CommandInput placeholder={filter.search} />
                  <button
                    onClick={() => {
                      filter.setter({});
                      filter.setOpen(false);
                    }}
                    className="m-1 rounded-md bg-red-500 px-3 text-white"
                  >
                    فسخ
                  </button>
                </div>
                <CommandList>
                  <CommandEmpty>{filter.notFound}</CommandEmpty>
                  <CommandGroup>
                    {filter.table.map((e) => (
                      <CommandItem
                        key={e.id}
                        onSelect={(value) => {
                          filter.setter({
                            id: parseInt(e.id),
                            name: e.name,
                          });
                          filter.setOpen(false);
                        }}
                      >
                        {e.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      ))}

      <Button onClick={handleApply} className="w-full">
        تطبيق المرشحات
      </Button>
    </div>
  );
}
