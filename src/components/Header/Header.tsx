import Image from "next/image";
import React from "react";
import SearchBar from "../main/SearchBar";
import Logo from "../main/Logo";
import Select from "../main/Select";
import { HeaderLoginButton } from "./HeaderLoginButton";
import { HeaderPhoneMenu } from "./HeaderPhoneMenu";
import CartButton from "./CartButton";

export default function Header() {
  return (
    <div className="relative w-full overflow-hidden bg-primary-500 shadow-lg shadow-primary-500/15">
      <Image
        src="/Group.svg"
        height={30}
        width={1920}
        className="min-w-[1920px]"
        alt="Background"
      />

      <div className="flex items-center justify-between gap-8 px-20 py-6 max-lg:flex-col max-lg:px-4 lg:flex-row-reverse">
        <div className="flex w-full items-center justify-end gap-10 max-lg:flex-col-reverse max-lg:gap-6">
          <SearchBar className="lg:max-w-[607px]" />
          <Logo />
        </div>
        <div className="mx-auto flex w-full items-center max-lg:justify-between lg:max-w-[382px] lg:justify-start">
          <Select text="العربية" className="w-full px-1.5 text-white" />
          <div className="flex w-full max-w-[228px] gap-5 max-sm:gap-2">
            <CartButton />
            <HeaderLoginButton />
          </div>
        </div>
      </div>
      <div className="bg-primary-100">
        <HeaderPhoneMenu />
        <div>
          <div className="mx-auto flex w-fit items-center max-sm:hidden max-sm:w-full max-sm:flex-col max-sm:items-end">
            {["إستكشف جديدنا", "منتجات مميزة", "عروض خاصة"].map((text, idx) => (
              <div
                key={idx}
                className="flex cursor-pointer justify-center px-8 py-5 transition-all duration-200 hover:bg-primary-300 max-sm:w-full"
              >
                <span className="text-lg">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
