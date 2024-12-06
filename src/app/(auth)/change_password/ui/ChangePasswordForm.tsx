"use client";

import Image from "next/image";
import { useState } from "react";
import useChangePassword from "../../../../hooks/auth/useChangePassword";

export default function ChangePasswordForm() {
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [newPasswordFocused, setNewPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { mutate } = useChangePassword();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    mutate(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-end gap-2 py-5"
    >
      <h1 className="text-right text-xl font-semibold">
        إعادة تعيين كلمة المرور
      </h1>
      <label htmlFor="password" className="mt-4 text-sm">
        أدخل كلمة المرور الجديدة*
      </label>
      <div
        onFocus={() => setPasswordFocused(true)}
        onBlur={() => setPasswordFocused(false)}
        className={`${passwordFocused && "border-emerald-500"} flex w-full justify-between gap-2 rounded-md border p-2`}
      >
        {showPassword ? (
          <div
            className="cursor-pointer"
            onClick={() => setShowPassword((e) => !e)}
          >
            <Image
              width={25}
              height={25}
              src="/auth/eye.svg"
              alt="eye"
              className="opacity-90"
            />
          </div>
        ) : (
          <div
            className="cursor-pointer"
            onClick={() => setShowPassword((e) => !e)}
          >
            <Image
              width={25}
              height={25}
              src="/auth/eye-crossed.svg"
              className="opacity-40"
              alt="eye Crossed"
            />
          </div>
        )}
        <div className="flex flex-1 items-center justify-end gap-2">
          <input
            id="password"
            name="password"
            className="h-[25px] flex-1 bg-inherit outline-none"
            type={`${showPassword ? "text" : "password"}`}
            dir="rtl"
          />
          <Image width={25} height={25} src="/auth/unlock.svg" alt="lock" />
        </div>
      </div>
      <label htmlFor="newPassword" className="text-sm">
        أدخل كلمة المرور الجديدة*
      </label>
      <div
        onFocus={() => setNewPasswordFocused(true)}
        onBlur={() => setNewPasswordFocused(false)}
        className={`${newPasswordFocused && "border-emerald-500"} flex w-full justify-between gap-2 rounded-md border p-2`}
      >
        {showNewPassword ? (
          <div
            className="cursor-pointer"
            onClick={() => setShowNewPassword((e) => !e)}
          >
            <Image
              width={25}
              height={25}
              src="/auth/eye.svg"
              alt="eye"
              className="opacity-90"
            />
          </div>
        ) : (
          <div
            className="cursor-pointer"
            onClick={() => setShowNewPassword((e) => !e)}
          >
            <Image
              width={25}
              height={25}
              src="/auth/eye-crossed.svg"
              className="opacity-40"
              alt="eye Crossed"
            />
          </div>
        )}
        <div className="flex flex-1 items-center justify-end gap-2">
          <input
            id="password2"
            name="password2"
            className="h-[25px] flex-1 bg-inherit outline-none"
            type={`${showNewPassword ? "text" : "password"}`}
            dir="rtl"
          />
          <Image width={25} height={25} src="/auth/unlock.svg" alt="lock" />
        </div>
      </div>
      <button
        style={{ background: "#27A098" }}
        className="mt-3 w-full rounded-md p-3 text-center text-xl font-semibold text-white"
      >
        تغيير كلمة المرور
      </button>
    </form>
  );
}
