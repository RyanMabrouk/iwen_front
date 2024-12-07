import React from "react";
import Image from "next/image";

export default function Trusted() {
  return (
    <div
      dir="rtl"
      className="mt-[3rem] flex flex-col items-center gap-10 sm:gap-20"
    >
      <span className="text-3xl font-bold">موثوقين من قبل</span>
      <div className="grid grid-cols-2 items-center justify-center gap-5 px-5 sm:grid-cols-3 sm:gap-[6rem] md:grid-cols-5">
        {Array(5)
          .fill(null)
          .map((_, i) => (
            <div key={i} className="flex justify-center">
              <Image
                src={`/sponsor${i + 1}.png`}
                alt="trusted"
                width={1000}
                height={1000}
                className="h-[7rem] w-[7rem]"
              />
            </div>
          ))}
      </div>
    </div>
  );
}
