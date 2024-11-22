"use client";

import signOut from "@/actions/auth/signout";
import useBooks from "@/hooks/data/books/useBooks";
import { useMutation } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import React from "react";

export default function Page() {
  const { mutate } = useMutation({
    mutationFn: async () => {
      signOut();
      redirect("/login");
    },
  });
  const books = useBooks({});
  console.log(books);
  return <button onClick={() => mutate()}>log out</button>;
}
