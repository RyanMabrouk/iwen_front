import getSession from "@/api/getSession";
import { redirect } from "next/navigation";
import React from "react";
import ChangePasswordForm from "./ui/ChangePasswordForm";
export default async function Page() {
  const { session } = await getSession();
  if (!session) redirect("/login");
  return <ChangePasswordForm />;
}
