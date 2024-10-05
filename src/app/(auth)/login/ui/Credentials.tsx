"use client";

import LoginForm from "./LogInForm";
import LoginWithFacebook from "./LoginWithFacebook";
import LoginWithGoogle from "./LoginWithGoogle";
import React from "react";
import SignUpForm from "./SignUpForm";

export default function Credentials() {
  const [login, setLogin] = React.useState<boolean>(true);
  return (
    <div className="col-span-2 flex w-full flex-col items-end p-4 px-14">
      <div className="flex w-full justify-between p-2">
        <select
          className="bg-inherit outline-none"
          name="language"
          id="0"
          defaultValue="0"
        >
          <option value="0" disabled>
            اللّغة
          </option>
          <option value="no option">العربية</option>
        </select>
        <h1 className="text-2xl font-semibold">مرحبا بك في متجرنا للكتب</h1>
      </div>
      <hr />
      <div className="flex w-7/12 items-center justify-between p-1">
        <button
          onClick={() => setLogin(false)}
          className={`border-b-2 border-white text-2xl font-semibold transition-all duration-200 ${login || "border-teal-600"}`}
          style={{ color: login ? "#B3B9B9" : "#31827D" }}
        >
          إنشاء حساب
        </button>
        <button
          onClick={() => setLogin(true)}
          className={`border-b-2 border-white text-2xl font-semibold transition-all duration-200 ${login && "border-teal-600"}`}
          style={{ color: login ? "#31827D" : "#B3B9B9" }}
        >
          تسجيل الدخول
        </button>
      </div>
      <div className="w-full">{login ? <LoginForm /> : <SignUpForm />}</div>
      {login && (
        <>
          <div className="my-4 flex w-full items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-gray-500">أو</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className="flex w-full items-center justify-center gap-4">
            <LoginWithGoogle />
            <LoginWithFacebook />
          </div>
        </>
      )}
    </div>
  );
}
