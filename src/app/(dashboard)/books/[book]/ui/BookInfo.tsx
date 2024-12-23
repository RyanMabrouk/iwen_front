"use client";
import React from "react";
import InfoNav from "./InfoNav";
import InfoContent from "./InfoContent";
import PriceInfo from "./PriceInfo";
import { useBookProvider } from "../provider/BookProvider";

export default function MainInfo() {
  const { view: selectedTab, setView: setSelectedTab } = useBookProvider();
  return (
    <div className="flex h-auto w-[45rem] flex-col justify-between gap-3 max-sm:max-h-screen max-sm:w-screen max-sm:max-w-screen-sm">
      <div
        dir="rtl"
        className="flex flex-grow flex-col items-stretch gap-2 rounded-md border-2 border-gray-200 bg-white p-3"
      >
        <InfoNav />
        <InfoContent selectedTab={selectedTab} />
      </div>
      <PriceInfo />
    </div>
  );
}
