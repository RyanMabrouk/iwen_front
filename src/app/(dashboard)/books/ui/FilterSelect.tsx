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
import useWriters from "@/hooks/data/books/writers/useWriters";
import useCorners from "@/hooks/data/books/corners/useCorners";
import useCategories from "@/hooks/data/books/categories/useCategories";
import useSubCategories from "@/hooks/data/books/subCategories/useSubCategories";
import useShareHouses from "@/hooks/data/books/useShareHouses";
import { useBooksProvider } from "../provider/BooksProvider";

type FilterSelectProps = {
  onClose: () => void;
};

export function FilterSelect({ onClose }: FilterSelectProps) {
  const {
    writer: writerId,
    setWriter: setWriterId,
    shareHouse: shareHouseId,
    setShareHouse: setShareHouseId,
    corner: cornerId,
    setCorner: setCornerId,
    categories: categoriesIds,
    setCategories: setCategoriesIds,
    subcategories: subcategoriesIds,
    setSubcategories: setSubcategoriesIds,
    priceRange: priceRangeValue,
    setPriceRange: setPriceRangeValue,
  } = useBooksProvider();
  const [priceRange, setPriceRange] = useState<[number, number]>(
    (priceRangeValue.split("%") as unknown as [number, number]) ?? [0, 2000],
  );
  const [writer, setWriter] = useState<{ id?: string; name?: string }>({
    id: writerId,
  });
  const [corner, setCorner] = useState<{ id?: string; name?: string }>({
    id: cornerId,
  });
  const [shareHouse, setShareHouse] = useState<{ id?: string; name?: string }>({
    id: shareHouseId,
  });
  const [category, setCategory] = useState<{ id?: string; name?: string }[]>(
    categoriesIds.split("%").map((id) => ({ id })) ?? [],
  );
  const [subcategory, setSubcategory] = useState<
    { id?: string; name?: string }[]
  >(subcategoriesIds.split("%").map((id) => ({ id })) ?? []);

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
    setWriterId(writer.id ?? "");
    setShareHouseId(shareHouse.id ?? "");
    setCornerId(corner.id ?? "");
    setCategoriesIds(category.map((c) => c.id).join("%") as string);
    setSubcategoriesIds(subcategories.map((s) => s.id).join("%") as string);
    setPriceRangeValue(priceRange.join("%") as string);
    onClose();
  };
  const filters: {
    label: string;
    button: string;
    command: string;
    search: string;
    selected: { id?: string | undefined; name?: string | undefined };
    table: { id: string; name: string }[];
    notFound: string;
    setter: React.Dispatch<
      React.SetStateAction<{
        id?: string | undefined;
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
  ];
  const multipleFilters: {
    label: string;
    button: string;
    command: string;
    search: string;
    selected: { id?: string | undefined; name?: string | undefined }[];
    table: { id: string; name: string }[];
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
          max={2000}
          step={1}
          value={priceRange}
          onValueChange={(value: [number, number]) => setPriceRange(value)}
          className="[&_.range-slider__range]:bg-color1 [&_[role=slider]]:border-black [&_[role=slider]]:bg-color2 [&_[role=slider]]:focus:ring-color1"
          color="#27a098"
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
                            id: e.id,
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
      {multipleFilters.map((filter) => (
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

      <Button
        onClick={handleApply}
        className="w-full bg-color1 hover:bg-color2"
      >
        تطبيق المرشحات
      </Button>
    </div>
  );
}
