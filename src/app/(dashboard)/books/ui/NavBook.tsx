"use client";

import React from "react";
import Prev from "./Prev";
import Search from "./Search";

export default function NavBook() {
  return (
    <div className="flex w-full justify-between bg-white pb-4 pl-5 pr-4 pt-7">
      <Prev />
      <Search />
    </div>
  );
}
