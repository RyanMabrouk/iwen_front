"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useSendOTP from "../../../../../hooks/auth/useSendOTP";
import useVerifyOTP from "../../../../../hooks/auth/useVerifyOTP";

export default function Token() {
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const { mutate: send } = useSendOTP(email);
  const { mutate } = useVerifyOTP(email, verificationCode.join(""));

  useEffect(() => {
    if (verificationCode.join("").length === 6) {
      mutate();
    }
  }, [verificationCode, mutate]);

  const verificationInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleVerificationInputChange = (index: number, value: string) => {
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      if (value && index < 5) {
        verificationInputRefs[index + 1].current?.focus();
      }
    }
  };

  const handleVerificationInputKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace") {
      if (!verificationCode[index] && index > 0) {
        verificationInputRefs[index - 1].current?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      verificationInputRefs[index - 1].current?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      e.preventDefault();
      verificationInputRefs[index + 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const pastedOTP = pastedData.slice(0, 6).replace(/\D/g, "");

    if (pastedOTP.length === 6) {
      const newCode = pastedOTP.split("").map((char) => char || "");
      setVerificationCode(newCode);
      verificationInputRefs[5].current?.focus();
    }
  };

  return (
    <div className="flex flex-col items-end gap-3 max-md:gap-5 max-md:p-3">
      <h1 className="text-xl font-semibold max-md:text-base">
        نسخ رمز التحقق للمواصلة
      </h1>
      <h1 className="text-right text-xl max-md:text-base">
        : أدخل العدد المكون من 6 أرقام الذي أرسلناه إلى عنوان بريدك الإلكتروني
      </h1>
      <div className="flex w-full items-center justify-end gap-2 max-md:justify-between max-md:gap-1">
        {verificationCode.map((digit, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className="text-xl max-md:hidden">-</span>}
            <input
              ref={verificationInputRefs[index]}
              value={digit}
              onChange={(e) =>
                handleVerificationInputChange(index, e.target.value)
              }
              onKeyDown={(e) => handleVerificationInputKeyDown(index, e)}
              onPaste={handlePaste}
              maxLength={1}
              placeholder="-"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className={`h-[5rem] w-[4rem] rounded-xl border text-center text-2xl text-teal-600 outline-none max-xl:h-[4rem] max-xl:w-[3rem] max-lg:h-[3rem] max-lg:w-[35px] ${
                digit ? "border-teal-600" : "border-gray-300"
              }`}
            />
          </React.Fragment>
        ))}
      </div>
      <p className="flex items-center gap-2 max-md:mt-10">
        <button
          onClick={() => send()}
          className="cursor-pointer text-nowrap text-xl font-semibold max-lg:text-base"
        >
          إعادة الإرسال الآن
        </button>
        <span className="text-nowrap">لم تتلق الرمز ؟</span>
      </p>
    </div>
  );
}
