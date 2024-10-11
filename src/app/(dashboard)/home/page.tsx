"use client";

import signOut from "@/actions/auth/signout";
import { useMutation } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import React from "react";

export default function page() {
  const { mutate } = useMutation({
    mutationFn: async () => {
      signOut();
      redirect("/login");
    },
  });
  return <button onClick={() => mutate()}>log out</button>;
}
