import React from "react";
import Header from "./ui/header";
import NavZone from "./ui/navZone";
import getUser from "@/api/getUser";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الحساب الشخصي"
}
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await getUser();
  if (!data.user) {
    redirect("/login");
  }
  return (
    <div className=" m-auto mt-12 flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-bgcolor1 p-10">
      <Header />
      <NavZone>{children}</NavZone>
    </div>
  );
}
