import PrimaryButton from "@/components/main/buttons/PrimaryButton";
import Logo from "@/components/main/Logo";
import SearchBar from "@/components/main/SearchBar";
import Select from "@/components/main/Select";
import Image from "next/image";
import React from "react";
import Links from "./Links";

export default function Footer() {
  return (
    <div className="bg-color1">
      <div
      dir="rtl"
      className="flex flex-wrap justify-center items-start md:justify-between gap-10 bg-color1 p-5 text-white sm:pr-10 sm:pl-[8rem] sm:pt-10 "
    >
      {/* Left Section */}
      <div className="flex flex-col items-start gap-5 sm:gap-20">
        <Logo />
        <Select className="m-auto text-sm" text="العربية" />
      </div>

      {/* Middle Section */}
      <div className="flex flex-col items-start gap-5 sm:gap-14">
        <PrimaryButton className="w-fit text-base m-auto font-normal">
          إنشاء حساب
        </PrimaryButton>
        <div className="flex flex-col gap-2 text-xs leading-relaxed">
          <div>العنوان : تونس ـ شارع أبو قاسم الشابي 4084</div>
          <div>+رقم الهاتف : 147 748 73 216</div>
        </div>
        <div className="flex items-center m-auto gap-10 ">
          <Image alt="twitter" src="/twitter.png" width={30} height={30} />
          <Image alt="facebook" src="/facebook.png" width={30} height={30} />
          <Image alt="instagram" src="/instagram.png" width={30} height={30} />
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

    </div>  );
    
}
