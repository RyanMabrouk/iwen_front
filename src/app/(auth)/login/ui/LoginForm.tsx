import React from "react";
import Image from "next/image";
import lock from "@/app/(auth)/icons/unlock.svg";
import envelope from "@/app/(auth)/icons/envelope.svg";
import eye from "@/app/(auth)/icons/eye-crossed.svg";

export default function LoginForm() {
  const [email, setEmail] = React.useState<boolean>(false);
  const [password, setPassword] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  return (
    <div className="flex w-full flex-col items-end justify-between gap-1 p-2">
      <label htmlFor="email">البريد الإلكتروني*</label>
      <div
        onFocus={() => setEmail(true)}
        onBlur={() => setEmail(false)}
        className={`${email && "border-emerald-700"} flex w-full justify-end gap-2 rounded-md border p-2 transition-all duration-300 focus:border focus:border-emerald-400`}
      >
        <input
          id="email"
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
        <button onClick={() => setShowPassword((e) => !e)}>
          <Image src={eye} alt="eye" />
        </button>
        <div className="flex flex-1 justify-end gap-2">
          <input
            id="password"
            className="h-[20px] flex-1 bg-inherit outline-none"
            type={`${showPassword ? "text" : "password"}`}
            dir="rtl"
          />
          <Image src={lock} alt="lock" />
        </div>
      </div>
      <div className="flex w-full items-center justify-between p-2">
        <div className="flex gap-2">
          <input className="bg-inherit" type="checkbox" />
          <h1 className="text-md text-zinc-600">تذكرني</h1>
        </div>
        <button
          className={`text-md text-zinc-600 transition-all duration-200 hover:text-emerald-700`}
        >
          نسيت كلمة المرور
        </button>
      </div>
      <button
        style={{ background: "#27A098" }}
        className="text-md w-full rounded-md p-3 text-center font-semibold text-white"
      >
        تسجيل الدخول
      </button>
    </div>
  );
}
