import Image from "next/image";
import React from "react";

export default function Discover() {
  return (
    <div className="flex flex-col justify-center gap-10">
      <Image
        src={"/authorsContact.png"}
        alt="authorsContact"
        width={1000}
        height={1000}
        className="h-auto m-auto sm:w-[40rem] max-sm:w-full "
      />
      <div className="flex flex-col gap-3 m-auto max-w-[15rem] sm:max-w-[20rem]">
        <div className="text-lg sm:text-xl md:text-2xl font-semibold text-center">من أجل خدمة العلم و أهله</div>
        <div className="text-gray-500 text-sm sm:text-base md:text-lg text-center">
          “ دار إيوان” ليست مجرد تجميع للكلمات والصفحات، بل هي أكوان من الفكر
          الإسلامي و الأدب التي تنير العقول وتغذي روح الباحثين و طلاب العلم .{" "}
        </div>
      </div>
    </div>
  );
}
