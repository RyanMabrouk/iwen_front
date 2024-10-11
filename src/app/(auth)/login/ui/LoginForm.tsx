"use client";

import React from "react";
import Image from "next/image";
import lock from "@/app/(auth)/(icons)/unlock.svg";
import envelope from "@/app/(auth)/(icons)/envelope.svg";
import eyeCrossed from "@/app/(auth)/(icons)/eye-crossed.svg";
import eye from "@/app/(auth)/(icons)/eye.svg";
import Link from "next/link";
import { usePage } from "../../../../provider/PageProvider";
import useLogin from "../../../../hooks/auth/useLogin";

export default function LoginForm() {
  const [emailSelected, setEmailSelected] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const { setPage } = usePage();
  const { mutate } = useLogin();
  return (
    <form
      action={mutate}
      className="flex w-full flex-col items-end justify-between gap-1 p-2 max-md:p-0"
    >
      <label htmlFor="email">البريد الإلكتروني*</label>
      <div
        onFocus={() => setEmailSelected(true)}
        onBlur={() => setEmailSelected(false)}
        className={`${emailSelected && "border-emerald-700"} ga 2 flex w-full justify-end rounded-md border p-2 transition-all duration-300 focus:border focus:border-emerald-400`}
      >
        <input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          className="h-[20px] flex-1 bg-inherit outline-none"
          type="email"
          dir="rtl"
        />
        <Image src={envelope} alt="envelope" />
      </div>
      <label htmlFor="password">كلمة المرور*</label>
      <div
        onFocus={() => setPassword(true)}
        onBlur={() => setPassword(false)}
        className={`${password && "border-emerald-500"} flex w-full justify-between gap-2 rounded-md border p-2`}
      >
        {showPassword ? (
          <div
            className="cursor-pointer"
            onClick={() => setShowPassword((e) => !e)}
          >
            <Image src={eye} alt="eye" className="opacity-90" />
          </div>
        ) : (
          <div
            className="cursor-pointer opacity-40"
            onClick={() => setShowPassword((e) => !e)}
          >
            <Image src={eyeCrossed} className="opacity-40" alt="eye Crossed" />
          </div>
        )}
        <div className="flex flex-1 justify-end gap-2">
          <input
            id="password"
            name="password"
            className="h-[20px] flex-1 bg-inherit outline-none"
            type={`${showPassword ? "text" : "password"}`}
            dir="rtl"
          />
          <Image src={lock} alt="lock" />
        </div>
      </div>
      <div className="flex w-full items-center justify-between p-2">
        <div className="flex gap-2">
          <input className="cursor-pointer bg-inherit" type="checkbox" />
          <h1 className="text-md text-zinc-600">تذكرني</h1>
        </div>
        <Link
          onClick={() => setPage(null)}
          href={`/forget_password?email=${email}`}
          className={`text-md text-nowrap text-zinc-600 transition-all duration-200 hover:text-emerald-700`}
        >
          نسيت كلمة المرور ؟
        </Link>
      </div>
      <button
        style={{ background: "#27A098" }}
        className="text-md w-full rounded-md p-3 text-center font-semibold text-white max-lg:text-sm"
      >
        تسجيل الدخول
      </button>
    </form>
  );
}
