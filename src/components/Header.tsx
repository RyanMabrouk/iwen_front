import Image from "next/image";
import React from "react";
import ShoppingCart from "./icons/ShoppingCart";
import SearchBar from "./main/SearchBar";
import Logo from "./main/Logo";
import PrimaryButton from "./PrimaryButton";

import Select from "./main/Select";

export default function Header() {
  return (
    <div className="relative w-full overflow-hidden bg-primary-500 shadow-lg shadow-primary-500/15">
      <Image
        src="/Group.svg"
        height={30}
        width={1920}
        className="min-w-[1920px]"
        alt={""}
      />
      <div className="flex h-[123px] w-full items-center justify-between px-20">
        <div className="flex items-center gap-[4.375rem]">
          <Select text="العربية" className="text-white" />
          <div className="flex gap-[21px]">
            <button className="flex h-[3.313rem] w-fit min-w-[50px] items-center justify-center rounded-lg bg-white">
              <ShoppingCart size={22} className="text-primary-500" />
            </button>
            <PrimaryButton className={""} size={"md"}>
              انشاء حساب
            </PrimaryButton>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end gap-12">
          <SearchBar className="max-w-[37.563rem]" />
          {/* <input type="text" className=" outline-none" /> */}
          <Logo />
        </div>
      </div>
      <div className="flex h-[74px] w-full items-center justify-center bg-primary-100">
        <div className="flex gap-3">
          <div className="p-2.5">
            <Select text=" إستكشف جديدنا" />
          </div>
          <div className="p-2.5">
            <Select text=" تواصل معنا" />
          </div>
          <div className="p-2.5">
            <Select text="تعرف علينا" />
          </div>
        </div>
      </div>
    </div>
  );
}
