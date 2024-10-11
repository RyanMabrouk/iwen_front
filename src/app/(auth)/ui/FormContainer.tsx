"use client";

import Link from "next/link";
import React from "react";
import LoginWithGoogle from "../login/ui/LoginWithGoogle";
import LoginWithFacebook from "../login/ui/LoginWithFacebook";
import { usePage } from "../../../provider/PageProvider";

export default function FormContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { page, setPage } = usePage();

  return (
    <div className="col-span-2 row-span-10 flex w-full flex-col items-end p-4 px-14 transition-all duration-300 max-lg:px-7 max-md:col-span-3 max-md:row-span-8 max-md:p-4">
      <div className="flex w-full justify-between p-2">
        <select
          className="bg-inherit outline-none"
          name="language"
          id="0"
          defaultValue="0"
        >
          <option value="0" disabled hidden>
            اللّغة
          </option>
          <option value="no option">العربية</option>
        </select>
        <h1 className="text-nowrap text-xl font-semibold max-lg:text-base">
          مرحبا بك في متجرنا للكتب
        </h1>
      </div>
      <hr />
      <div className="flex w-full items-center justify-end gap-24 p-1 transition-all duration-300 max-lg:gap-10 max-lg:text-base">
        <Link
          onClick={() => setPage("signup")}
          href="/signup"
          className={`text-nowrap border-white p-2 text-xl font-semibold transition-all duration-200 max-lg:text-base`}
          style={{
            color: page === "signup" ? "#31827D" : "#B3B9B9",
            borderBottom:
              page === "signup" ? "2px solid #31827D" : "2px solid #FFFFFF",
          }}
        >
          إنشاء حساب
        </Link>
        <Link
          onClick={() => setPage("login")}
          href="/login"
          className={`text-nowrap border-white p-2 text-xl font-semibold transition-all duration-200 max-lg:text-base`}
          style={{
            color: page === "login" ? "#31827D" : "#B3B9B9",
            borderBottom:
              page === "login" ? "2px solid #31827D" : "2px solid #FFFFFF",
          }}
        >
          تسجيل الدخول
        </Link>
      </div>
      <div className="w-full">{children}</div>
      {page === "login" && (
        <>
          <div className="my-4 flex w-full items-center max-lg:my-2">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-gray-500">أو</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className="flex w-full items-center justify-center gap-4 max-lg:flex-col max-lg:gap-2">
            <LoginWithGoogle />
            <LoginWithFacebook />
          </div>
        </>
      )}
    </div>
  );
}
