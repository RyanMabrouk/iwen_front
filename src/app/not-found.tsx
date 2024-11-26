"use client";
import React from "react";
import NotFoundPage from "/public/NotFound/NotFound.png";
import NotFoundPanda from "/public/NotFound/NotFoundPanda.png";
import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "@/components/main/buttons/PrimaryButton";
import TimePast from "@/components/icons/TimePast";
import { useRouter } from "next/navigation";

function NotFound() {
  const route = useRouter();
  return (
    <div className="flex h-screen items-center justify-center px-12">
      <div className="w-[28.375rem] space-y-[4.813rem]">
        <div className="max-sm:px-8">
          <Image
            src="/404.svg"
            className="mx-auto"
            alt=""
            width={1000}
            height={1000}
          />
        </div>
        <div className="space-y-10 text-center text-xl">
          <span className="font-bold">مشكلة في الاتصال بالإنترنت</span>
          <p className="text-center font-medium">
            ربما تم نقل الصفحة التي تبحث عنها، أو أعيدت تسميتها أو ربما لم تكن
            موجودة على الإطلاق
          </p>
          <PrimaryButton
            className="mx-auto flex items-center gap-4"
            onClick={() => route.refresh()}
          >
            <TimePast size="16" />
            <span>تحديث الصفحة</span>
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
