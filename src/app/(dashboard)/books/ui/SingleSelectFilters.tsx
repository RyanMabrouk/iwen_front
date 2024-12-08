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

export default function SingleSelectFilters() {
  const {
    writer,
    writers,
    setWriter,
    corner,
    corners,
    setCorner,
    shareHouse,
    shareHouses,
    setShareHouse,
  } = useFilterProvider();

  const [openWriter, setOpenWriter] = useState(false);
  const [openShareHouse, setOpenShareHouse] = useState(false);
  const [openCorner, setOpenCorner] = useState(false);

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
      label: "اسم المؤلف",
      button: "اختر المؤلف",
      command: "اختر المؤلف",
      search: "ابحث عن المؤلف",
      selected: writer,
      table: writers,
      setter: setWriter,
      notFound: "لم يتم العثور على مؤلف",
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
  return (
    <>
      {filters?.map((filter) => (
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
                    {filter?.table?.map((e) => (
                      <CommandItem
                        key={e?.id}
                        className=""
                        onSelect={(value) => {
                          filter.setter({
                            id: e?.id,
                            name: e?.name,
                          });
                          filter.setOpen(false);
                        }}
                      >
                        <h1 className="font-semibold transition-all duration-200 hover:text-color1">
                          {e.name}
                        </h1>
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
