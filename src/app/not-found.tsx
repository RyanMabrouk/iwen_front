"use client";
import React, { Suspense } from "react";
import Image from "next/image";
import PrimaryButton from "@/components/main/buttons/PrimaryButton";
import TimePast from "@/components/icons/TimePast";
import Link from "next/link";
import { Player } from "@lottiefiles/react-lottie-player";

function NotFound() {
  return (
    <Suspense
      fallback={
        <Player
          className="m-auto"
          autoplay
          loop
          src="/loading.json"
          style={{ height: "12rem", width: "12rem" }}
        />
      }
    >
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
            <Link href={"/home"}>
              <PrimaryButton className="mx-auto flex items-center gap-4">
                <TimePast size="16" />
                <span>الذهاب للصفحة الرئيسية</span>
              </PrimaryButton>
            </Link>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default NotFound;
