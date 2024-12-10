"use client";
import PrimaryButton from "@/components/main/buttons/PrimaryButton";
import Logo from "@/components/main/Logo";
import SearchBar from "@/components/main/SearchBar";
import Select from "@/components/main/Select";
import Image from "next/image";
import React from "react";
import Links from "./Links";
import useCurrentUser from "@/hooks/data/user/useCurrentUser";
import {
  ADDRESS,
  FACEBOOK_URl,
  INSTAGRAM_URl,
  PHONE_NUMBER,
  TWITTER_URl,
} from "@/constants/Links";
import Link from "./Link";

export default function Footer() {
  const { data: user } = useCurrentUser();
  return (
    <div className="bg-color1">
      <div
        dir="rtl"
        className="flex flex-col items-start justify-center gap-10 bg-color1 p-5 text-white sm:pl-[8rem] sm:pr-10 sm:pt-10 md:flex-row md:justify-between"
      >
        <div className="flex flex-col items-start gap-5 max-sm:m-auto sm:gap-20">
          <Logo />
          <Select className="m-auto text-sm" text="العربية" />
        </div>

        <div className="flex flex-col items-start gap-5 sm:gap-10">
          {user?.data ? (
            <div className="flex flex-row-reverse items-center gap-2">
              <div className="h-fit rounded-md p-1 text-lg font-semibold text-white">
                {user.data.first_name + " " + user.data.last_name}
              </div>
              <Image
                src={
                  !!user.data.avatar ? user.data.avatar : "/default_avatar.png"
                }
                alt={user.data.last_name ?? ""}
                width={40}
                height={40}
                className="rounded-md"
              />
            </div>
          ) : (
            <PrimaryButton className="w-fit text-base font-normal">
              إنشاء حساب
            </PrimaryButton>
          )}

          <div className="flex flex-col gap-2 text-lg leading-relaxed">
            <div className="flex flex-row gap-1">
              <span>العنوان :</span>
              <span>{ADDRESS}</span>
            </div>
            <div className="flex flex-row gap-1">
              <span>رقم الهاتف :</span>
              <span>{PHONE_NUMBER}</span>
            </div>
          </div>
          <div className="flex items-center gap-10">
            <a href={TWITTER_URl} target="_blanck">
              {" "}
              <Image alt="twitter" src="/twitter.png" width={30} height={30} />
            </a>
            <a href={FACEBOOK_URl} target="_blanck">
              {" "}
              <Image
                alt="facebook"
                src="/facebook.png"
                width={30}
                height={30}
              />
            </a>
            <a href={INSTAGRAM_URl} target="_blanck">
              {" "}
              <Image
                alt="instagram"
                src="/instagram.png"
                width={30}
                height={30}
              />
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-5">
          <Links />
        </div>
      </div>
      <div className="h-[1px] w-full bg-white"></div>
      <div className="my-4 flex w-full flex-row-reverse items-start justify-start gap-2 px-6 text-lg text-white">
        <span> جميع الحقوق محفوظة للموقع من إنتاج شركة </span>
        <strong>دار إيوان</strong>
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
