"use client";
import Image from "next/image";
import React from "react";
import PrimaryButton from "../main/buttons/PrimaryButton";
import useCurrentUser from "@/hooks/data/user/useCurrentUser";
import Link from "next/link";

export function HeaderLoginButton() {
  const { data: user } = useCurrentUser();
  if (user?.data) {
    return <Image src="/avatar.png" width={1000} height={1000} alt="Avatar" />;
  }
  return (
    <Link href="/login">
      <PrimaryButton className="w-full min-w-[150px]" size="md">
        انشاء حساب
      </PrimaryButton>{" "}
    </Link>
  );
}
