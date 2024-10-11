"use server";

import { createClient } from "@/lib/supabase";

const supabase = createClient();

export default async function signInWithOPT(email: string) {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
    },
  });
  if (error) return { error: "حدث خطأ ما، يرجى المحاولة مرة أخرى" };
  return { error: null };
}
