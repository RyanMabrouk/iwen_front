import { redirect } from "next/navigation";
import React from "react";
import ForgotPasswordForm from "./ui/ForgotPasswordForm";
import getUser from "@/api/getUser";

export default async function Page() {
  const { data } = await getUser();
  if (data.user) redirect("/");
  return <ForgotPasswordForm />;
}
