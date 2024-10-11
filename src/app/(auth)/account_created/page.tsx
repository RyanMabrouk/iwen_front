import Image from "next/image";
import React from "react";
import correct from "@/app/(auth)/(icons)/correct.svg";
import Link from "next/link";

export default function page() {
  return (
    <div className="flex w-full flex-col items-center p-5">
      <Image className="m-6" src={correct} alt="image" />
      <h1 className="text-xl">تهانينا !</h1>
      <p className="text-center text-2xl font-semibold">
        تهانينا ! تم إنشاء حسابك بنجاح
      </p>
      <Link
        href="/home"
        style={{ background: "#27A098" }}
        className="text-md mt-10 w-full rounded-md p-3 text-center font-semibold text-white"
      >
        تسجيل الدخول
      </Link>
    </div>
  );
}
