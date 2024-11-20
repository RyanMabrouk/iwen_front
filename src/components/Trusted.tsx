import React from "react";
import Image from "next/image";

export default function Trusted() {
  return (
    <div className="sgap-[4.875rem] flex flex-col items-center space-y-[4.875rem]">
      <span className="text-3xl font-bold">موثوقين من قبل</span>
      <div className="grid-auto-flow-dense grid grid-cols-1 place-items-center items-center justify-center justify-items-center gap-32 px-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {" "}
        {Array(5)
          .fill(null)
          .map((_, i) => (
            <div key={i} className="flex justify-center">
              <img src={`/sponsor${i + 1}.png`} alt="trusted" />
            </div>
          ))}
      </div>
    </div>
  );
}
