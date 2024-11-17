import React from "react";
import Prev from "./Prev";
import Search from "./Search";

export default function NavBook() {
  return (
    <div className="flex w-full justify-between pb-3 pl-5 pr-4 pt-6">
      <Prev />
      <Search />
    </div>
  );
}
