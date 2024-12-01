import React from "react";
import SearchNormal from "../icons/SearchNormal";
import Filter from "../icons/Filter";
import { cn } from "@/lib/utils";

export default function SearchBar({ className }: { className?: string }) {
  return (
    <div dir="ltr" className={cn("flex h-[3.313rem] w-full", className)}>
      <div className="flex h-full w-full items-center rounded-l-lg bg-primary-100">
        <div className="flex h-full cursor-pointer items-center pl-[1.5rem]">
          <SearchNormal size={23} className="text-current" />
        </div>

        <input
          className="h-full w-full bg-transparent px-[1.25rem] text-lg placeholder-gray-400 outline-none"
          placeholder="...إبحث في متجرنا"
        />
      </div>
      <div className="flex h-full w-[3.813rem] items-center justify-center rounded-r-lg bg-primary-400">
        <Filter size={23} className="text-white" />
      </div>
    </div>
  );
}
