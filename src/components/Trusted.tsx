import React from "react";
import Image from "next/image";

export default function Trusted() {
  return (
    <div dir="rtl" className=" flex flex-col items-center mt-[3rem] gap-10 sm:gap-20">
      <span className="text-3xl font-bold">موثوقين من قبل</span>
      <div className=" gap-5 sm:gap-[5rem] px-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 items-center justify-center   ">
        {" "}
        {Array(5)
          .fill(null)
          .map((_, i) => (
            <div key={i} className="flex justify-center">
              <Image
                src={`/sponsor${i + 1}.png`}
                alt="trusted"
                width={1000}
                height={1000}
                className="w-auto h-auto"
              />
            </div>
          ))}
      </div>
    </div>
  );
}
