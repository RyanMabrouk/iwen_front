import React, { useEffect, useState } from "react";
import InfoNav from "./InfoNav";
import InfoContent from "./InfoContent";
import PriceInfo from "./PriceInfo";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type PageType = "main" | "details" | "comments" | "author" | "about";

export default function MainInfo() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [selectedTab, setSelectedTab] = useState<PageType>(() => {
    return (searchParams.get("view") as PageType) || "main";
  });
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("view", selectedTab);
    router.push(`${pathName}?${newParams.toString()}`, { scroll: false });
  }, [selectedTab, pathName, router, searchParams]);
  return (
    <div className="flex max-h-[27rem] flex-col justify-between gap-3 max-sm:max-h-screen">
      <div
        dir="rtl"
        className="flex flex-grow flex-col items-stretch gap-2 rounded-md bg-white p-3"
      >
        <InfoNav selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <InfoContent selectedTab={selectedTab} />
      </div>
      <PriceInfo />
    </div>
  );
}
