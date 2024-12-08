"use client";

import Image from "next/image";
import React, { useState } from "react";
import useSignUp from "../../../../hooks/auth/useSignUp";
import Link from "next/link";
import AnimatedCorrectIcon from "./AnimatedCorrectIcon";

export default function SignUpForm() {
  const [accountCreated, setAccountCreated] = useState<boolean>(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate: signUp } = useSignUp(setAccountCreated);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    signUp(formData);
  };

  const renderInput = (
    label: string,
    name: string,
    type: string,
    icon: string,
    placeholder: string,
    showPasswordToggle = false,
  ) => (
    <>
      <label htmlFor={name}>{label}*</label>
      <div
        className={`flex w-full justify-end gap-2 rounded-md border p-2 transition-all duration-300 ${
          focusedField === name ? "border-emerald-700" : ""
        }`}
      >
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() =>
              name === "password"
                ? setShowPassword(!showPassword)
                : setShowConfirmPassword(!showConfirmPassword)
            }
            aria-label={`${showPassword ? "Hide" : "Show"} password`}
          >
            {name === "password" ? (
              showPassword ? (
                <Image
                  width={20}
                  height={20}
                  src="/auth/eye.svg"
                  className="opacity-90"
                  alt="Toggle password visibility"
                />
              ) : (
                <Image
                  width={20}
                  height={20}
                  src="/auth/eye-crossed.svg"
                  className="opacity-40"
                  alt="Toggle password visibility"
                />
              )
            ) : showConfirmPassword ? (
              <Image
                width={20}
                height={20}
                src="/auth/eye.svg"
                className="opacity-90"
                alt="Toggle password visibility"
              />
            ) : (
              <Image
                width={20}
                height={20}
                src="/auth/eye-crossed.svg"
                className="opacity-40"
                alt="Toggle password visibility"
              />
            )}
          </button>
        )}
        <div className="flex flex-1 items-center justify-end gap-2">
          <input
            id={name}
            name={name}
            placeholder={placeholder}
            className="h-[20px] flex-1 outline-none"
            type={
              showPasswordToggle
                ? name === "password"
                  ? showPassword
                    ? "text"
                    : "password"
                  : showConfirmPassword
                    ? "text"
                    : "password"
                : type
            }
            dir="rtl"
            value={formState[name as keyof typeof formState]}
            onChange={handleInputChange}
            onFocus={() => setFocusedField(name)}
            onBlur={() => setFocusedField(null)}
            required
          />
          <Image width={20} height={20} src={icon} alt={`${name} icon`} />
        </div>
      </div>
    </>
  );

  if (!accountCreated)
    return (
      <form
        onSubmit={handleSubmit}
        className="flex h-full w-full flex-col items-end gap-1"
      >
        {renderInput(
          "الإسم",
          "name",
          "text",
          "/auth/Profile.svg",
          "الإسم الكامل",
        )}
        {renderInput(
          "البريد إلكتروني",
          "email",
          "email",
          "/auth/envelope.svg",
          " البريد الإلكتروني",
        )}
        {renderInput(
          "كلمة المرور",
          "password",
          "password",
          "/auth/unlock.svg",
          " أدخل كلمة المرور",
          true,
        )}
        {renderInput(
          "التأكد من كلمة المرور",
          "confirmPassword",
          "password",
          "/auth/unlock.svg",
          "أعد إدخال كلمة المرور",
          true,
        )}
        <button
          type="submit"
          style={{ background: "#27A098" }}
          className="text-md mt-5 w-full rounded-md p-3 text-center font-semibold text-white"
        >
          إنشاء حساب
        </button>
      </form>
    );
  else
    return (
      <div className="flex w-full flex-col items-center p-5">
        <AnimatedCorrectIcon src="/auth/correct.svg" alt="Correct icon" />
        <h1 className="text-xl">تهانينا !</h1>
        <p className="text-center text-2xl font-semibold">
          تهانينا ! تم إنشاء حسابك بنجاح
        </p>
        <Link
          href="/home"
          style={{ background: "#27A098" }}
          className="text-md mt-10 w-full rounded-md p-3 text-center font-semibold text-white"
        >
          تسجيل الدخول
        </Link>
      </div>
    );
}
