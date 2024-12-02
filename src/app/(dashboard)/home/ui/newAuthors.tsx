import Image from "next/image";
import React from "react";

export default function NewAuthors() {
  return (
    <div dir="rtl" className="flex my-[5rem] px-5  items-center justify-center sm:gap-[10rem] sm:flex-row flex-col gap-10" >
      <Image
        src={"/authors.png"}
        alt=""
        className="w-full  sm:w-[40rem] h-auto"
        height={1000}
        width={1000}
      />

      <div className="flex w-full flex-col gap-3 rounded-lg bg-white p-4 sm:w-[30rem] sm:p-0">
        <h1 className="mb-4 text-center text-2xl font-bold">
          مؤلفين جدد انضموا إلينا
        </h1>
        <p className="mb-6 text-center text-lg leading-relaxed text-gray-600">
          معرض أبوظبي الدولي للكتاب من قبل أحد ممثليه ... انضموا إلينا وكونوا
          جزءًا من هذا الحدث العالمي. ... ومواهبهم لخلق جيل جديد من الكتاب
          والناشرين
        </p>
        <button className="m-auto w-fit rounded-lg bg-color2 px-10 py-3 text-2xl text-white shadow-md hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-teal-300">
          ألقي نظرة
        </button>
      </div>
    </div>
  );
}
