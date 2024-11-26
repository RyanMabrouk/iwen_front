"use client";

import Image from "next/image";
import React, { useState } from "react";
import useForgotPassword from "../../../../hooks/auth/useForgotPassword";
import { useCounter } from "@/provider/auth/CounterProvider";
import resetPassword from "@/actions/auth/resetPassword";
import Input from "@/components/main/inputs/Input";
import PrimaryButton from "@/components/main/buttons/PrimaryButton";
import SecondaryButton from "@/components/main/buttons/SecondaryButton";
import useTranslation from "@/translation/useTranslation";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { z } from "zod";

export default function ForgotPasswordForm() {
  const [emailSelected, setEmailSelected] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const { mutate } = useForgotPassword(email);
  const { counter: cooldown, setCounter: setCooldown } = useCounter();
  const handleSubmit = (formData: FormData) => {
    if (cooldown === 0) {
      setCooldown(60);
      mutate(formData);
    }
  };
  return (
    <form action={handleSubmit} className="flex flex-col items-end gap-3 py-5">
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
        <Image
          width={30}
          height={30}
          src="/auth/envelope.svg"
          className=""
          alt="envelope"
        />
      </div>
      <button
        type="submit"
        style={{ background: "#27A098" }}
        className={`text-md w-full rounded-md p-3 text-center font-semibold text-white ${
          cooldown > 0 ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        مواصلة
      </button>
    </form>
  );
}
