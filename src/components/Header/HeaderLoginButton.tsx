"use client";
import Image from "next/image";
import React from "react";
import PrimaryButton from "../main/buttons/PrimaryButton";
import useCurrentUser from "@/hooks/data/user/useCurrentUser";
import Link from "next/link";
export function HeaderLoginButton() {
  const { data: user } = useCurrentUser();
  if (user?.data) {
    return (
      <Link
        href={"/profile"}
        className="flex h-[3.313rem] w-fit min-w-[50px] items-center justify-center rounded-lg bg-white shadow-md"
      >
        <Image
          className="rounded-lg"
          src={user.data.avatar ? user.data.avatar : "/default_avatar.png"}
          width={50}
          height={50}
          alt=""
        />
      </Link>
    );
  }
  return (
    <Link href="/login">
      <PrimaryButton className="w-full min-w-[150px]" size="md">
        انشاء حساب
      </PrimaryButton>{" "}
    </Link>
  );
}
