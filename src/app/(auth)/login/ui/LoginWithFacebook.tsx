"use client";
import useFacebookAuth from "@/actions/auth/useFacebookAuth";
import FcFacebook from "@/components/icons/FcFacebook";
import useTranslation from "@/translation/useTranslation";

import React from "react";

export default function LoginWithFacebook() {
  const { data: translation } = useTranslation();

  const { mutate: signUp } = useFacebookAuth();
  return (
    <button
      className={
        "flex w-64 cursor-pointer items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-all duration-200 ease-in-out hover:border-gray-400 hover:bg-gray-100 hover:shadow focus:outline-none focus:ring-2 focus:ring-gray-400 max-sm:w-full"
      }
      onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        signUp();
      }}
    >
      <span className="text-sm">سجل من خلال فايسبوك</span>
      <FcFacebook size={20} />
    </button>
  );
}
