"use client";

import Image from "next/image";
import React, { useState } from "react";
import lock from "@/app/(auth)/(icons)/unlock.svg";
import envelope from "@/app/(auth)/(icons)/envelope.svg";
import eyeCrossed from "@/app/(auth)/(icons)/eye-crossed.svg";
import eye from "@/app/(auth)/(icons)/eye.svg";
import profile from "@/app/(auth)/(icons)/Profile.svg";
import useSignUp from "../actions/useSignUp";

export default function SignUpForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate: signUp } = useSignUp();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
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
                  src={eye}
                  className="opacity-90"
                  alt="Toggle password visibility"
                />
              ) : (
                <Image
                  src={eyeCrossed}
                  className="opacity-40"
                  alt="Toggle password visibility"
                />
              )
            ) : showConfirmPassword ? (
              <Image
                src={eye}
                className="opacity-90"
                alt="Toggle password visibility"
              />
            ) : (
              <Image
                src={eyeCrossed}
                className="opacity-40"
                alt="Toggle password visibility"
              />
            )}
          </button>
        )}
        <div className="flex flex-1 justify-end gap-2">
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
          <Image src={icon} alt={`${name} icon`} />
        </div>
      </div>
    </>
  );

  return (
    <form
      action={signUp}
      className="flex h-full w-full flex-col items-end gap-1"
    >
      {renderInput("الإسم", "name", "text", profile, "الإسم الكامل")}
      {renderInput(
        "البريد إلكتروني",
        "email",
        "email",
        envelope,
        " البريد الإلكتروني",
      )}
      {renderInput(
        "كلمة المرور",
        "password",
        "password",
        lock,
        " أدخل كلمة المرور",
        true,
      )}
      {renderInput(
        "التأكد من كلمة المرور",
        "confirmPassword",
        "password",
        lock,
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
}
