import Image from "next/image";
import React from "react";

export default function Discover() {
  return (
    <div className="flex flex-col pb-10 justify-center gap-10 sm:flex-row">
      <div className="m-auto flex max-w-[15rem] flex-col gap-3 sm:max-w-[20rem]">
        <div className="text-center text-lg font-semibold sm:text-xl md:text-2xl">
          من أجل خدمة العلم و أهله
        </div>
        <div className="text-center text-sm text-gray-500 sm:text-base md:text-lg">
          “ دار إيوان” ليست مجرد تجميع للكلمات والصفحات، بل هي أكوان من الفكر
          الإسلامي و الأدب التي تنير العقول وتغذي روح الباحثين و طلاب العلم .{" "}
        </div>
      </div>
      <Image
        src={"/authorsContact.png"}
        alt="authorsContact"
        width={1000}
        height={1000}
        className="m-auto h-auto max-sm:w-full sm:w-[30rem]"
      />
    </div>
  );
}
