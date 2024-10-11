"use server";

import { createClient } from "@/lib/supabase";

const supabase = createClient();

export default async function signInWithOPT(email: string) {
  console.log("signInWithOPT");
  console.log("email", email);
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
    },
  });
  if (error) throw new Error(`error: ${error.message}`);
  return null;
}
