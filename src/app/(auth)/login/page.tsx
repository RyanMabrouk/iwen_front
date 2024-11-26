import { redirect } from "next/navigation";
import React from "react";
import LoginForm from "./ui/LoginForm";
import getUser from "@/api/getUser";

export default async function Page() {
  const { data } = await getUser();
  if (data.user) redirect("/home");
  return <LoginForm />;
}
