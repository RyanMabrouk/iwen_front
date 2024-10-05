import getSession from "@/api/getSession";
import Credentials from "@/app/(auth)/login/ui/Credentials";

import { redirect } from "next/navigation";
import React from "react";
import SidePicture from "./ui/SidePicture";

export default async function Page() {
  const { session } = await getSession();
  if (session) redirect("/home");
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="grid h-[30rem] w-8/12 grid-cols-3 overflow-hidden rounded-2xl border bg-white">
        <Credentials />
        <SidePicture />
      </div>
    </div>
  );
}
