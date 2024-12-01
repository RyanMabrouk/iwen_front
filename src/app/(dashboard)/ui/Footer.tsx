"use client";
import PrimaryButton from "@/components/main/buttons/PrimaryButton";
import Logo from "@/components/main/Logo";
import SearchBar from "@/components/main/SearchBar";
import Select from "@/components/main/Select";
import Image from "next/image";
import React from "react";
import Links from "./Links";
import useCurrentUser from "@/hooks/data/user/useCurrentUser";

export default function Footer() {
  const { data: user } = useCurrentUser();
  return (
    <div className="bg-color1">
      <div
        dir="rtl"
        className="flex flex-wrap items-start justify-center gap-10 bg-color1 p-5 text-white sm:pl-[8rem] sm:pr-10 sm:pt-10 md:justify-between"
      >
        {/* Left Section */}
        <div className="flex flex-col items-start gap-5 sm:gap-20">
          <Logo />
          <Select className="m-auto text-sm" text="العربية" />
        </div>

        {/* Middle Section */}
        <div className="flex flex-col items-start gap-5 sm:gap-14">
          {user?.data ? (
            <div className="flex gap-4 m-auto items-center">
              {" "}
              <div className="rounded-md text-color1 bg-white h-fit  p-2">
                {" "}
                {user.data.first_name + " " + user.data.last_name}
              </div>{" "}
              <Image
                src={user.data.avatar ?? "/noAvatar.png"}
                alt={user.data.last_name ?? ""}
                width={60}
                height={60}
                className="rounded-md"
              />
            </div>
          ) : (
            <PrimaryButton className="m-auto w-fit text-base font-normal">
              إنشاء حساب
            </PrimaryButton>
          )}

          <div className="flex flex-col gap-2 text-xs leading-relaxed">
            <div>العنوان : تونس ـ شارع أبو قاسم الشابي 4084</div>
            <div>+رقم الهاتف : 147 748 73 216</div>
          </div>
          <div className="m-auto flex items-center gap-10">
            <Image alt="twitter" src="/twitter.png" width={30} height={30} />
            <Image alt="facebook" src="/facebook.png" width={30} height={30} />
            <Image
              alt="instagram"
              src="/instagram.png"
              width={30}
              height={30}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-5">
          <SearchBar />
          <Links />
        </div>
      </div>

      <Image
        src={"/Group2.svg"}
        width={1920}
        height={1000}
        alt={""}
        className="w-full"
      />
    </div>
  );
}
