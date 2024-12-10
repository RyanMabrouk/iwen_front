"use client";
import React from "react";
import InfoNav from "./InfoNav";
import InfoContent from "./InfoContent";
import PriceInfo from "./PriceInfo";
import { useStateToUrl } from "@/helpers/stateToUrl";

export type PageType = "main" | "details" | "comments" | "author" | "about";

export default function MainInfo() {
  const [selectedTab, setSelectedTab] = useStateToUrl("view", "main");
  return (
    <div className="flex h-auto w-[45rem] flex-col justify-between gap-3 max-sm:max-h-screen max-sm:w-screen max-sm:max-w-screen-sm">
      <div
        dir="rtl"
        className="flex flex-grow flex-col items-stretch gap-2 rounded-md border-2 border-gray-200 bg-white p-3"
      >
        <InfoNav
          selectedTab={selectedTab as PageType}
          setSelectedTab={setSelectedTab}
        />
        <InfoContent selectedTab={selectedTab as PageType} />
      </div>
      <PriceInfo />
    </div>
  );
}
