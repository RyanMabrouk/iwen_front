"use client";
import useGoogleAuth from "@/actions/auth/useGoogleAuth";
import FcGoogle from "@/components/icons/FcGoogle";
import useTranslation from "@/translation/useTranslation";
import React from "react";

export default function LoginWithGoogle() {
  const { data: translation } = useTranslation();

  const { mutate: signUp } = useGoogleAuth();
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
      <span className="text-sm">سجل من خلال جوجل</span>
      <FcGoogle size={20} />
    </button>
  );
}
