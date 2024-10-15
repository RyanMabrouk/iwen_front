
import getSession from "@/api/getSession";

import { redirect } from "next/navigation";
import React from "react";
import LoginForm from "./ui/LoginForm";

export default async function Page() {
  const { session } = await getSession();
  if (session) redirect("/home");
  return <LoginForm />;
}
