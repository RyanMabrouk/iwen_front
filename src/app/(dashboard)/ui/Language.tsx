import React from "react";
import Link from "./Link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import Image from "next/image";

export default function Language() {
  return (
    <Select>
      <SelectTrigger className="flex items-center gap-1 bg-inherit px-3 text-white outline-none">
        <SelectValue placeholder="العربية"></SelectValue>
        <Image
          src="/dashboard/angle-down.svg"
          alt="angle-down"
          width={20}
          height={20}
        />
      </SelectTrigger>
      <SelectContent
        className="mt-10 w-full gap-2 rounded-md border-2 border-white px-1 py-2 text-white transition-all duration-300"
        style={{ background: "#1C7775" }}
      >
        <SelectItem
          className="p-1 shadow-emerald-800 outline-emerald-800"
          value="1"
        >
          aaaaaaaaaaaaaaa
        </SelectItem>
        <SelectItem
          className="p-1 shadow-emerald-800 outline-emerald-800"
          value="2"
        >
          b
        </SelectItem>
        <SelectItem
          className="p-1 shadow-emerald-800 outline-emerald-800"
          value="3"
        >
          c
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
