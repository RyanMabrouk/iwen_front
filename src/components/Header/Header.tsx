"use client";
import Image from "next/image";
import React from "react";
import SearchBar from "../main/SearchBar";
import Logo from "../main/Logo";
import Select from "../main/Select";
const HeaderLoginButton = dynamic(() => import("./HeaderLoginButton"), {
  ssr: false,
});
import dynamic from "next/dynamic";
import { HeaderPhoneMenu } from "./HeaderPhoneMenu";
import CartButton from "./CartButton";
import Link from "next/link";
import createNewPathname from "@/helpers/createNewPathname";

export type Route = {
  href: string;
  params?: [
    {
      name: string;
      value: any;
    },
  ];
  text: string;
};

export default function Header() {
  const routes: Route[] = [
    {
      href: "/books?nationality=tunisian",
      text: "كتب تونسية",
    },
    {
      href: "/books?nationality=moroccan",
      text: "كتب مغربية",
    },
    {
      href: "/books",
      text: "جميع المنتوجات",
    },
    {
      href: createNewPathname({
        currentPathname: "/books",
        values: [
          {
            name: "view",
            value: "discount",
          },
        ],
      }),
      text: "عروض خاصة",
    },
  ];
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
          {/* <SearchBar className="lg:max-w-[607px]" /> */}
          <Logo />
        </div>
        <div className="mx-auto flex w-full items-center justify-start gap-12 max-lg:justify-between lg:w-fit">
          <Select text="العربية" className="w-full px-1.5 text-white" />
          <div className="flex w-full items-end justify-end gap-5 max-sm:gap-2 lg:items-start lg:justify-start">
            <CartButton />
            <HeaderLoginButton />
          </div>
        </div>
      </div>
      <div className="bg-primary-100">
        <HeaderPhoneMenu routes={routes} />
        <div>
          <div className="mx-auto flex w-fit items-center max-sm:hidden max-sm:w-full max-sm:flex-col max-sm:items-end">
            {routes.map((route, idx) => {
              return (
                <Link
                  href={route.href}
                  key={idx}
                  className="flex cursor-pointer justify-center px-8 py-5 transition-all duration-200 hover:bg-primary-300 max-sm:w-full"
                >
                  <span className="text-lg">{route.text}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
