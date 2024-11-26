import { redirect } from "next/navigation";
import React from "react";
import ChangePasswordForm from "./ui/ChangePasswordForm";
import getUser from "@/api/getUser";
export default async function Page() {
  const { data } = await getUser();
  if (!data.user) redirect("/login");
  return <ChangePasswordForm />;
}
