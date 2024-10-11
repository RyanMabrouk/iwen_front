"use client";

import Image from "next/image";
import React, { useState } from "react";
import envelope from "@/app/(auth)/(icons)/envelope.svg";
import useForgotPassword from "../actions/useForgotPassword";

export default function ForgotPasswordForm() {
  const [emailSelected, setEmailSelected] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const { mutate } = useForgotPassword(email);
  return (
    <form action={mutate} className="flex flex-col items-end gap-3 py-5">
      <h1 className="text-left text-xl font-semibold">
        إعادة تعيين كلمة المرور
      </h1>
      <h1 className="text-right text-xl">
        أدخل عنوان البريد الإلكتروني المرتبط بحسابك و سنرسل لك رابطا لإعادة
        تعيين كلمة المرور
      </h1>
      <label htmlFor="email">البريد الإلكتروني*</label>
      <div
        onFocus={() => setEmailSelected(true)}
        onBlur={() => setEmailSelected(false)}
        className={`${emailSelected && "border-emerald-700"} flex h-[3rem] w-full justify-end gap-2 rounded-md border p-2 transition-all duration-300 focus:border focus:border-emerald-400`}
      >
        <input
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-[30px] flex-1 bg-inherit outline-none"
          type="email"
          dir="rtl"
        />
        <Image src={envelope} className="" alt="envelope" height={30} />
      </div>
      <button
        type="submit"
        style={{ background: "#27A098" }}
        className="text-md w-full rounded-md p-3 text-center font-semibold text-white"
      >
        مواصلة
      </button>
    </form>
  );
}
