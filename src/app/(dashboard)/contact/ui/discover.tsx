import Image from "next/image";
import React from "react";
import authorsContact from "../../../../../public/authorsContact.svg";

export default function Discover() {
  return (
    <div className="flex flex-col-reverse justify-center gap-6 transition-all ease-linear sm:flex-row">
      <div className="m-auto flex max-w-[15rem] flex-col gap-3 sm:max-w-[20rem]">
        <div className="text-center text-xl font-semibold sm:text-xl md:text-2xl">
          من أجل خدمة العلم و أهله
        </div>
        <div className="text-center text-sm text-gray-500 sm:text-base md:text-lg">
          <strong>دار إيوان</strong> ليست مجرد تجميع للكلمات والصفحات، بل هي
          أكوان من الفكر الإسلامي و الأدب التي تنير العقول وتغذي روح الباحثين و
          طلاب العلم .{" "}
        </div>
      </div>
      <Image
        src={authorsContact}
        alt=""
        width={1000}
        height={1000}
        className="m-full h-full min-h-[20svh] object-cover max-sm:w-full"
      />
    </div>
  );
}
