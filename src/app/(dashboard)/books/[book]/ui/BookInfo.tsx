import React from "react";
import InfoNav from "./InfoNav";
import InfoContent from "./InfoContent";
import PriceInfo from "./PriceInfo";

export default function MainInfo() {
  const [selectedTab, setSelectedTab] = React.useState<number>(1);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col items-end gap-2 rounded-md bg-white p-3">
        <InfoNav selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <InfoContent selectedTab={selectedTab} />
      </div>
      <PriceInfo />
    </div>
  );
}
